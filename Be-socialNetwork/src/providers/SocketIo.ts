import { Server } from "socket.io";
import http from 'http'
import Log from "../middlewares/Log";
class SocketIo {
    //io tĩnh riêng
    private static io: Server
    //khai báo một userSocketMap thành viên tĩnh sẽ ánh xạ ID người dùng tới ID ổ cắm tương ứng của nó
    private static userSocketMap: {
        [key: string] : string
    } = {};
    //là một phương thức tĩnh để khởi tạo máy chủ Socket.IO với máy chủ HTTP đã cho.
    public static init(server: http.Server) {
        Log.showLogs("connect SocketIo success !");

        // tạo máy chủ mới !
        this.io = new Server(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
            },
        });
        this.io.on("connection", (socket) => {
            console.log("connected", socket.id);
            const userId = socket.handshake.query.userId as string;
            if(userId !== undefined) {
                this.userSocketMap[userId] = socket.id;
            }
            this.io.emit("getOnelineUser", Object.keys(this.userSocketMap));
                
            socket.on("disconnect", () => {
                console.log("user disconnect" , socket.id);
                delete this.userSocketMap[socket.id];
                this.io.serverSideEmit("getOnelineUser", Object.keys(this.userSocketMap))
            })
        })
    }
    public static getReaceiverSocketId(receiverId: string): string | undefined {
        return this.userSocketMap[receiverId];
    }
    public static getIo():Server {
        return this.io;
    }
}

export default SocketIo