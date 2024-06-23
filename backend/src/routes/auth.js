import { Router } from "express"
import passport from "passport"

const userRouter = Router() 

userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login'}),
(req, res) => {
    res.redirect('http://localhost:5173/game/')
    res.json({
        msg: "user registered"
    })
})

userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}))

userRouter.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error logging out:', err);
        res.status(500).json({ error: 'Failed to log out' });
      } else {
        res.redirect('http://localhost:5173/');
      }
    });
  });
  

export default userRouter;