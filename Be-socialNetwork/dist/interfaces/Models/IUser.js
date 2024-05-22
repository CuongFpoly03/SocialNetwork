"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["active"] = "active";
    UserStatus["block"] = "block";
    UserStatus["pending"] = "pending";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["admin"] = "admin";
    UserRole["user"] = "user";
    UserRole["root"] = "root";
})(UserRole || (exports.UserRole = UserRole = {}));
