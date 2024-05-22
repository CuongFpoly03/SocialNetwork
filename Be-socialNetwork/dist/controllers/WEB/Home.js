"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomePage {
    static index(req, res, next) {
        return res.render('index', { title: "Home Page" });
    }
}
exports.default = HomePage;
