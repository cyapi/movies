<template>
	<div class="reg">
		<mt-header title="注册页">
		  <router-link to="/" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <router-link to="/login" slot="right">
		  	登录
		  </router-link>
		</mt-header>
		<div class="reg-main">
    	<div class="reg-from">
    		<label><input type="text" v-model="obj.userName" placeholder="请输入用户名"></label>
    		<label><input type="password" v-model="obj.pwd" placeholder="请输入密码"></label>
    		<label><input type="password" v-model="pwds" placeholder="请确认密码"></label>
    	</div>
    	<div class="treaty">
    		<input type="checkbox" id="treaty" checked="checked">
    		<label for="treaty">我已阅读并同意《格莱科技用户协议》</label>
    	</div>
    	<mt-button type="primary" size="large" @click="submit()" >立即注册</mt-button>
		<div class="contact">
			<span>© 格莱科技 027-87229009</span>
		</div>
    	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				obj:{
					userName:"",
					pwd:""
				},
				pwds:""
			}
		},
		methods:{
			submit(){
				//验证：
				//1.用户名是否被占用
				//2.所有的项都必填
				if(!this.obj.userName || !this.obj.pwd || !this.pwds){
					this.$toast("用户名、密码必填")
					return false;
				}
				//3.密码和确认密码是否一样
				if (this.obj.pwd != this.pwds){
					this.$toast("两次密码不一致")
					return false;
				}
				this.$http.post("/reg",this.obj).then(res=>{
					//console.log(res)
					if(res.data.status){	
						this.$router.push("/login")
					}else{
						this.$toast("用户名重复，请重新输入")
						this.obj.userName = "";
						this.obj.pwd = "";
						this.pwds = "";
					}
				},err=>{
					this.$toast("网络错误")
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.reg{
	color: #888;
	
	header {
		height: 0.4rem;
		font-size: 0.16rem;
	}
	
	.reg-from {
		
		input {
			outline: none;
			display: block;
			width: 100%;
			line-height: 0.45rem;
			margin: 0.1rem 0;
			border: 0;
			border-radius: 0.05rem;
			padding-left: 0.1rem;
			font-size: 0.12rem;
		}
	}
	button{margin: 0.05rem 0;}
	
	label{font-size: 0.12rem;}
	
	.contact{text-align: center;font-size: 0.12rem;}
}
</style>