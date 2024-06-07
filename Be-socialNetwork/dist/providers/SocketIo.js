"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const Log_1 = __importDefault(require("../middlewares/Log"));
class SocketIo {
    //là một phương thức tĩnh để khởi tạo máy chủ Socket.IO với máy chủ HTTP đã cho.
    static init(server) {
        Log_1.default.showLogs("connect SocketIo success !");
        // tạo máy chủ mới !
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });
        this.io.on("connection", (socket) => {
            console.log("connected", socket.id);
            const userId = socket.handshake.query.userId;
            if (userId !== undefined) {
                this.userSocketMap[userId] = socket.id;
            }
            this.io.emit("getOnelineUser", Object.keys(this.userSocketMap));
            socket.on("disconnect", () => {
                console.log("user disconnect", socket.id);
                delete this.userSocketMap[socket.id];
                this.io.serverSideEmit("getOnelineUser", Object.keys(this.userSocketMap));
            });
        });
    }
    static getReaceiverSocketId(receiverId) {
        return this.userSocketMap[receiverId];
    }
    static getIo() {
        return this.io;
    }
}
//khai báo một userSocketMap thành viên tĩnh sẽ ánh xạ ID người dùng tới ID ổ cắm tương ứng của nó
SocketIo.userSocketMap = {};
exports.default = SocketIo;
