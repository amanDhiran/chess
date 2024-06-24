import { Router } from "express";
import passport from "passport";

const userRouter = Router();

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

userRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ error: "Failed to log out" });
    } else {
      res.redirect("http://localhost:5173/");
    }
  });
});

userRouter.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

export default userRouter;
