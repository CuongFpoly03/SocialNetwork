import { Router } from "express";
import passport from "passport";
const router = Router();

// login
router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }))

// login success 
router.get('/login/success', (req: any, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "User Authenticated",
            user: req.user
        })
    }
    return res.status(200).json({
        success: false,
        message: "User Not Authenticated",
    })
})

// log out 
router.get('/log-out', (req: any, res: any) => {
    return req.logout((err: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json({
            success: true,
            message: "logout successFully!"
        })
    });
})

// kết quả 
router.get('/google/callback', passport.authenticate("google"), (req, res) => {
    res.redirect('/')
})

export default router