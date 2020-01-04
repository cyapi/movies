//npm i koa koa-static koa-router koa-body koa2-cors mongoose -S
let Koa=require("koa")
let server=new Koa();

//引入数据库（会把代码执行）及 会导出一个user表对象
var {user,movie,cinema,order} = require("./mongo")

let static1=require("koa-static")
server.use(static1("./src"))

//koa2-cors
//cors就是一种跨域解决方案：它是一个资源共享器
let cors=require("koa2-cors")
server.use(cors())

//启用了koa-body之后才可以接收post请求
let body=require("koa-body")
server.use(body())

//使用koa-router 后端来写接口
let Router=require("koa-router")
let router=new Router()

router.post("/reg",async (ctx,next)=>{
	//1。接受前端post发来的请求 
	let res=ctx.request.body;
	//2.把数据写到数据库中的uesr表中
	let one = new user(res)//用user表的格式创建出一行数据
	var result = await user.findOne({userName:res.userName})
	//准确判断
	if (result) {
		ctx.body = {
			status:0,
			message:"用户名重复，请重新输入"
		}
	}else{
		//把这一行数据one保存到user表中
		await one.save()
		//3.服务器返回一个数据给前端
		ctx.body = {
			status:1,
			message:"注册成功"
		}
		
	}
	
	
})

router.post("/login",async (ctx,next)=>{
	//1、拿到前端post发过来数据
	let res = ctx.request.body;//{userName,pwd}
	//2.把要user表对象拿到，找到有没有这一条符合标准的数据
	var result = await user.findOne({userName:res.userName,pwd:res.pwd})
	//准确判断
//	if (result) {
//		var pwd = user.findOne({pwd:res.pwd})
//		if (pwd) {
//			ctx.body = {
//				status:1,
//				message:"登陆成功"
//			}
//		}else{
//			ctx.body = {
//				status:0,
//				message:"密码错误"
//			}
//		}
//	}else{
//		ctx.body = {
//			status:0,
//			message:"用户名错误"
//		}
//	}
	
	//模糊判断
	if (result) {
		ctx.body = {
			status:1,
			message:"登陆成功"
		}
	}else{
		ctx.body = {
			status:0,
			message:"用户或密码错误"
		}
	}
	//如果有可以登录如果没有 ，说明用户名或密码错误
})

router.get("/movie",async (ctx,next)=>{
	if(ctx.query.id){
		ctx.body = await movie.findOne({_id:ctx.query.id})
	}else{
		ctx.body = await movie.find()
	}
})

router.get("/cinema",async (ctx,next)=>{
	//如何接受前端get形式的  查询字符串	
//console.log(ctx.query.title)
	//用ctx.query.title
	if(ctx.query.id){
		ctx.body = await cinema.findOne({_id:ctx.query.id})
	}else{
		ctx.body = await cinema.find({title:ctx.query.title})
	}
	
})

router.post("/order",async (ctx,next)=>{
	//get数据
	//ctx.query.id
	var cinema1 = await cinema.findOne({_id:ctx.query.id})
	var checked = ctx.request.body.checked.map(i=>{
		i.pop();
		return i;
	})
	var newArr = cinema1.selected.concat(checked);
	await cinema.updateOne({_id:ctx.query.id},{selected:newArr})
	//post数据
	//ctx.request.body
	var one = new order(ctx.request.body)
	await one.save()
	ctx.body = "购票成功"
	
})

router.get("/order",async (ctx,next)=>{
	ctx.body = await order.find({user:ctx.query.user})
})

server.use(router.routes())

server.listen(3002,err=>{
	console.log("服务器启动在3002端口")
})
//server.listen(3002,这里是一个监听地址可以不写    ,err=>{
//	console.log("服务器启动在3002端口")
//})
