"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// login
router.get('/google', passport_1.default.authenticate("google", { scope: ['profile', 'email'] }));
// login success 
router.get('/login/success', (req, res) => {
    if (req.user) {
        return res.status(200).json({
            success: true,
            message: "User Authenticated",
            user: req.user
        });
    }
    return res.status(200).json({
        success: false,
        message: "User Not Authenticated",
    });
});
// log out 
router.get('/log-out', (req, res) => {
    return req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        return res.status(200).json({
            success: true,
            message: "logout successFully!"
        });
    });
});
// kết quả 
router.get('/google/callback', passport_1.default.authenticate("google"), (req, res) => {
    res.redirect('/');
});
exports.default = router;
