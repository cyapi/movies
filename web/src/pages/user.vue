<template>
	<div class="user">
		<mt-header title="我的"></mt-header>
		<div class="space-top">
			<mt-cell title="我的订单" class="list">
		 	 <span> <img slot="icon" src="../assets/images/left_gray.png" width="24" height="24"></span>
			</mt-cell>
			<mt-cell title="优惠卷" class="list">
		 	 <span> <img slot="icon" src="../assets/images/left_gray.png" width="24" height="24"></span>
			</mt-cell>
			<mt-cell title="影院会员卡" class="list">
		 	 <span> <img slot="icon" src="../assets/images/left_gray.png" width="24" height="24"></span>
			</mt-cell>
		</div>
		<div class="space-top">
			<mt-cell title="想看的电影" class="list">
		 	 <span> <img slot="icon" src="../assets/images/left_gray.png" width="24" height="24"></span>
			</mt-cell>
			<mt-cell title="看过的电影" class="list">
		 	 <span> <img slot="icon" src="../assets/images/left_gray.png" width="24" height="24"></span>
			</mt-cell>	
		</div>
		<mt-button type="primary" size="large" @click="submit()">点击退出</mt-button>
		<div class="user-footer">
			<div class="user-logo">
				<img src="../assets/images/LOGO.png"/>
			</div>
			<p>客服电话：027-87229009</p>
		</div>
		<div class="nav-bar">
	   		<ul>
	   			<li><router-link to="/home"><span>电影</span></router-link></li>
	   			<li><router-link to="/order"><span>订单</span></router-link></li>
	   			<li><router-link to="/user" class="active01"><span>我的</span></router-link></li>
	   		</ul>
   		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			obj:{}
		}
	},
	methods:{
		async submit(){
			sessionStorage.removeItem("user",this.obj.userName)	
			this.$router.push("/")
		}
	}
}
</script>

<style lang="less" scoped>
.user{
	header {
		height: 0.4rem;
		font-size: 0.16rem;
	}
	
	.list{
		border-bottom:1px solid #d8e7ef;
	}
	.space-top{
		margin-top: 0.1rem;
	}
	.user-footer{
		margin-top: 0.3rem;
		text-align: center;
		color: #999;
		
		p{
			padding-top: 0.05rem;
			font-size: 0.12rem;
		}
	}
	button{
		margin-top: 0.1rem;
	}
	.nav-bar {
		height: 0.5rem;
		background-color: #26A2FF;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		ul {
			display: flex;
			justify-content: space-around;
			line-height: 0.4rem;
			list-style: none;
			li {
				width: 30%;
				float: left;
				text-align: center;
				margin: 0 1.6%;
				margin-top: 0.02rem;
				list-style: none;
				
				a {
					color: #fff;
					text-decoration: none;
					span {
						padding-top: 0.15rem;
						display: block;
					}
				}
				.active01{
					color: #f90;
				}
			}
			& li:nth-child(1) {
				background: url(../assets/images/movie_icon2.png) no-repeat center top 10%;
				background-size: 25%;
			}
			& li:nth-child(2) {
				background: url(../assets/images/order.png) no-repeat center top 10%;
				background-size: 25%;
			}
			& li:nth-child(3) {
				background: url(../assets/images/uder_icon.png) no-repeat center top 10%;
				background-size: 25%;
			}
		}
	}
}
</style>