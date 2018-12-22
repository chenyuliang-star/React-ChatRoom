const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/chat-room";

mongoose.connect(DB_URL)


//模型
const models = {
    user: {
        "user": { type: String, require: true},
        "pwd": { type: String, require: true},
        "type":  { type: String, require: true},
        //头像
        "img":  { type: String, require: true},
        //个人简介
        "desc":  { type: String, require: true},
        //职位
        "title":  { type: String, require: true},

        //如果你是牛人，那么你还有公司和薪酬字段
        "company": { type: String, require: true},
        "money": { type: String, require: true},
        "require": { type: String, require: true}
    },
    chat: {
        "chatid": { type: String, require: true },//唯一标识
        "from": { type: String, require: true },
        "to": { type: String, require: true },
        "read": { type: Boolean, require: true },//是否以读
        "content": { type: String, require: true },//内容
        "create_time": { type: Number, default: new Date().getTime() }//发生时间

    }
}
//将模式（表）存入数据库中
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports  = {
    //导出一个接口
    getModel (name) {
        return  mongoose.model(name)
    }
}
 