let mongo = require("mongoose")
mongo.connect("mongodb://127.0.0.1:27017/xiaolai",{ useNewUrlParser: true })

mongo.connection.on("connected",err=>{
  		console.log("数据库连接成功")
})
mongo.connection.on("error",err=>{
  		console.log("数据库连接失败")
})

let userHead = mongo.Schema({
	userName:String,
	pwd:String
})
let user=mongo.model("user",userHead)

let movieHead=mongo.Schema({
	photo:String,
	title:String,
	category:Array,
	type:String,
	rank:Number,
	description:String,
	actor:Array,
	time:String
})
let movie=mongo.model("movie",movieHead)

//var one = new movie({
//	photo:"img/movie.jpg",
//	title:"芳华",
//	category:["爱情","战争","剧情"],
//	type:"2D",
//	rank:9.2,
//	description:"本片讲述了上世纪七十到八十年代充满理想和激情的军队文工团，一群正值芳华的青春少年，经历着成长中的爱情萌发与充斥变数的人生命运。乐于助人、质朴善良的刘峰（黄轩 饰），和从农村来，屡遭文工团女兵歧视与排斥的何小萍（苗苗 饰），“意外”离开了浪漫安逸的文工团，卷入了残酷的战争，在战场上继续绽放着血染的芳华。他们感受着集体生活的痛与暖、故人的分别与重逢，还有时代变革之下，每个人的渺小脆弱和无力招架。而昔日的文工团战友萧穗子（钟楚曦 饰）、林丁丁（杨采钰 饰）、郝淑雯（李晓峰 饰）、陈灿（王天辰 饰）等人，在大时代的背景之下，每个人的命运大相径庭，拥有着出人意料的人生归宿……从来不需要想起，永远也不会忘记。",
//	actor:["黄轩","苗苗"],
//	time:"2017-12-15"
//})
//one.save()


let cinemaHeader = mongo.Schema({
	title:String,
	time:String,
	price:Number,
	address:String,
	type:String,
	selected:Array,
	seat:Number
})
let cinema = mongo.model("cinema",cinemaHeader)
//var one = new cinema({
//	title:"末日崩塌",
//	time:"09:30",
//	price:45,
//	address:"3号厅",
//	type:"国语2D",
//	photo:"img/movie.jpg",
//	selected:[[6,6],[6,7],[7,6],[7,7]],
//	seat:120
//})
//one.save()

let orderHeader = mongo.Schema({
	title:String,
	address:String,
	time:String,
	checked:Array,
	total:Number,
	user:String
})
let order = mongo.model("order",orderHeader)


module.exports={user,movie,cinema,order}
