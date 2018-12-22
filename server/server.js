const express = require("express");
const userRouter = require("./user");
const bodyParser = require("body-parser");//用来解析post
const cookieParser = require("cookie-parser");
 
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);  //用于与express配合使用

const model = require("./model");
const chat = model.getModel("chat"); 


io.on("connection", function (socket) {
//    chat.remove( {}, function () {})
    socket.on("sendMsg", function (data) {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join("-");
        
        chat.create({ chatid, from, to, content: msg, read: false, create_time: new Date().getTime() }, function (err, doc) {
            if (err) return res.json({ code: 1, msg: "后台出错"});
            io.emit("recvMsg", doc)
        })
    })
})

app.use(bodyParser.json())
app.use(cookieParser());
app.use("/user", userRouter);

server.listen(9093, function () {
    console.log(666);
})