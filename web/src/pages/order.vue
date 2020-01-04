<template>
	<div class="order">
		<mt-header title="我的订单"></mt-header>
		
		<div class="container">
	    	<div class="order-item" v-for="(i,index) in list" :key="index">
	    		<div class="abc">
	    			<div><img src="../assets/images/movie.jpg"></div>
		    		<div class="status">
		    			<h5>{{i.title}} {{i.checked.length}}张</h5>
		    			<p>10月24日 {{i.time}}</p>
		    			<p>{{i.address}}
		    				<span class="ticket-item" v-for="(k,m) in i.checked" :key="m">
								{{i.checked[0][0]}}排{{i.checked[0][1]}}座,
							</span>
		    			</p>
		    		</div>
		    	</div>
		    	<div class="em"><em>总价：{{i.total*i.checked.length}}元</em><span>已完成</span></div>
	    	</div>
	   </div>
		<div class="nav-bar">
	   		<ul>
	   			<li><router-link to="/home"><span>电影</span></router-link></li>
	   			<li><router-link to="/order" class="active01"><span>订单</span></router-link></li>
	   			<li><router-link to="/user"><span>我的</span></router-link></li>
	   		</ul>
   		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			list:[]
		}
	},
	async created(){
		var res = await this.$http.get("/order?user="+sessionStorage.getItem("user"))
		console.log( res.data)
		this.list = res.data
	}
}
</script>

<style lang="less" scoped>
.order{
	header {
		height: 0.4rem;
		font-size: 0.16rem;
	}
	.container{
		margin: 0.2rem 0 0.5rem;
		
		
		.order-item{
			background: #fff;
			margin-bottom: 0.1rem;
			
			.abc{
				display: flex;
				justify-content: flex-start;
				padding: 0.1rem;
				
				.status{
					p{
						padding-top: 0.1rem;
					}
				}
				img{
					width: 80%;
					height: auto;
				}
			}
			.em{
				border-top: 1px solid #076FA2;
				padding: 0.1rem;
				display: flex;
				justify-content: space-between;
				
				em{
					font-style: normal;
				}
			}
		}
		
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
				background: url(../assets/images/order_icon.png) no-repeat center top 10%;
				background-size: 25%;
			}
			& li:nth-child(3) {
				background: url(../assets/images/uder.png) no-repeat center top 10%;
				background-size: 25%;
			}
		}
	}
}
</style>