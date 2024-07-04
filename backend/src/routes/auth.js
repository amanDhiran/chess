import { Router } from "express";
import passport from "passport";
import prisma from "../db/index.js";
import jwt from 'jsonwebtoken';

const userRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

userRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/game",
    failureRedirect: "/login",
  })
);

userRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['read:user', 'user:email'] }),
);

userRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: "http://localhost:5173/game",
    failureRedirect: '/login',
  }),
);

userRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ error: "Failed to log out" });
    } else {
      res.status(200).json({ message: "Successfully logged out" });
    }
  });
});

userRouter.get('/user', async (req, res) => {
  if (req.user) {
    const user = req.user;

    const dbUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    })
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({
      token,
      id: user.id,
      name: dbUser?.name
    })
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

export default userRouter;
