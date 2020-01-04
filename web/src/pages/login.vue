<template>
	<div class="login">
		<div class="login-logo">
			<img src="../assets/images/LOGO.png"/>
		</div>
		<div class="login-from">
			<label>
				<input type="text" v-model="obj.userName" placeholder="请输入用户名">
			</label>
			<label>
				<input type="password" v-model="obj.pwd" placeholder="请输入密码">
			</label>
		</div>
		<mt-button type="primary" size="large" @click="submit()" >登录</mt-button>
		<div class="login-link">
			<router-link to="/reg">
				还没账号？
			</router-link>
			<router-link to="/home">
				暂不登录
			</router-link>
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
			}
		}
	},
	methods:{
		async submit(){
			//验证
			if(!this.obj.userName || !this.obj.pwd){
				this.$toast("用户名和密码必须填写")
				return false;
			}
			var res = await this.$http.post("/login",this.obj)
			if(res.data.status){
				sessionStorage.setItem("user",this.obj.userName)	
				this.$router.push("/home")
			}else{
				this.$toast(res.data.message)
				this.obj.userName = "";
				this.obj.pwd = "";
			}
		}
	}
}
</script>

<style lang="less" scoped>
.login{
	padding: 0.3rem;
	
	.login-logo{
		width: 45%;
		margin: 0.5rem auto 0.1rem;
		text-align: center;
		
		img{
			width: 100%;
		}
	}
	.login-from {
		
		input {
			background: rgb(240,243,249);
			width: 100%;
			line-height: 0.4rem;
			margin-bottom: 0.1rem;
			font-size: 0.14rem;
			padding-left: 0.08rem;
			outline: none;
			border: 0;
			border-bottom: 1px solid #ccc;
		}
	}
	.login-link{
		margin-top: 0.05rem;
		display: flex;
		justify-content: space-between;
	}
}
</style>