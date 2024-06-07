"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleApi_1 = __importDefault(require("../Api/googleApi"));
const Home_1 = __importDefault(require("../../controllers/WEB/Home"));
const router = (0, express_1.Router)();
// google auth 
router.use('/auth', googleApi_1.default);
// web
router.get('/', Home_1.default.index);
exports.default = router;
