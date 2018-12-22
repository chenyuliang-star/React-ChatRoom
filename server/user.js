const express  = require("express");
const model = require("./model");
const User = model.getModel("user");
const utils = require("utility");
const chat = model.getModel("chat"); 

//引入utility文件，用于密码的加密
const userRouter = express.Router();


userRouter.get("/getmsglist", function (req, res) {
    const userId = req.cookies.userId;
    let users = {};

    User.find( {}, function (err, doc) {
        if (err) return res.json({ code: 1, msg: "后端出错"});
        else {
            doc.forEach( (v) => {
                users[v._id] = {
                    name: v.user,
                    img: v.img
                }
            })
        }
    })
    //查询自己发出的，和自己接受的
    chat.find( {"$or": [{ from: userId}, { to: userId }]}, function (err, doc) {
        if (err) return res.json({ code: 1, msg: "后端出错"})
        else return res.json({ code: 0, data: doc, users: users});
    })
})

//根据type返回对应列表
userRouter.get("/list", function (req, res) {
    // User.remove( {} , function () {} );
    const { type } = req.query;
    User.find( { type }, function (err, doc){
        if (err) return res.json({ code: 1, msg: '后端出错'})
        else return res.json({ code: 0, data: doc})
    })
})

//更新消息状态
userRouter.post("/readMsg", function (req, res) {
    const { userId } = req.cookies;
    const { from  } = req.body;

     chat.update( { from, to: userId }, { "$set": { read: true }}, { multi: true }, function (err, doc) {
         if (err) return res.json({ code: 1, msg: "后台出错"})
         return res.json({ code: 0, num: doc.nModified})
     })
})

//信息补充更新
userRouter.post("/update", function (req, res) {
    const { userId } = req.cookies;
    
    if (!userId) return res.json({code: 1});
    const body = req.body;
    User.findByIdAndUpdate(userId, body, function (err, doc) {
        if (err) return res.json({ code: 1, msg: "后端出错"});
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({ code: 0, data});
    })
})
//处理登录
userRouter.post("/login", function (req,res) {
    const { user, pwd } = req.body;
    User.findOne( { user, pwd: md5Pwd(pwd)},{pwd:0, __v: 0}, function (err, doc) {
        if (!doc) return res.json({ code: 1, msg: "用户名或者密码错误"});
        else {
            res.cookie("userId", doc._id);
            return res.json({ code: 0, data: doc})
        }
    })
})
//处理注册
userRouter.post("/register", function (req, res) {
    const { user, pwd, type } = req.body;
    User.findOne(  { user }, function (err, doc) {
        if (doc) return res.json({ code: 1, msg: "用户名重复"});
        else {
            //必须使用这种方法，因为用creat方法，没有办法获取_id
            const userModel = new User({user, type, pwd: md5Pwd(pwd)});
            userModel.save( function (err, doc) {
                if (err) return res.json({ code: 1, msg: "后端出错"});
                else {
                    const { user, type, _id } = doc;
                    res.cookie("userId", _id);
                    return res.json({ code: 0, data: { user, type, _id } })
                }
            })
        }
    })
})
//对密码进行加密
function md5Pwd (pwd) {
    const string = "sdjaodoaujdjadu842085r02w97rjfanosdf45fdsa64d_;'a;ld;kapdojadj";
    return utils.md5(utils.md5(string+pwd));
}
userRouter.get("/info", function (req, res) {
    //获取当前cookie的信息
    const userId = req.cookies.userId;
    //如何存在，证明该人已经登录过，那么就不应该跳转到登录页面，
    if ( !userId ) {
        return res.json( { "code": 1 });
    }
    User.find({ _id: userId}, {pwd:0, __v: 0}, function (err, doc) {
        if (err) return res.json({ code: 1, msg: "后端出错" });
        else {
            //知道该人存在，那么查找该人的信息并返回。
            return res.json({ code: 0, data: doc})
        }
    })
})
module.exports = userRouter;