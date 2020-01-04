<template>
	<div class="home">

		<div class="m-title">
			<mt-header title="小莱电影"></mt-header>
			<h3>影片</h3>
		</div>
		<div class="container">
			<div class="movie-list" v-for="(i,index) in list" :key="index">
				<div class="movie-left">
					<div class="movie-img">
						<img v-bind="{src:pic+i.photo}">
					</div>
					<div class="movie-info">
						<div class="hd">
							<h2>{{i.title}}</h2>
							<div class="movie-type"><span>{{i.type}}</span><s>IMAX</s></div>
						</div>
						<p>剧情:{{i.category.join("、")}}</p>
						<p>主演:{{i.actor.join("、")}}</p>
					</div>
				</div>
				<div class="movie-right">
					<div class="grade">
						{{i.rank}}分
					</div>
					</a>
					<div class="buy">
					    <router-link :to="{path:'/detail',query:{id:i._id}}">购票</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="nav-bar">
	   		<ul>
	   			<li><router-link to="/home" class="active01"><span>电影</span></router-link></li>
	   			<li><router-link to="/order"><span>订单</span></router-link></li>
	   			<li><router-link to="/user"><span>我的</span></router-link></li>
	   		</ul>
   		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		async created() {
			var res = await this.$http.get("/movie")
			//console.log(res)
			this.list = res.data
		}
	}
</script>

<style lang="less" scoped>
.home {
header {
	height: 0.4rem;
	font-size: 0.16rem;
}
.m-title {
	text-align: center;
	width: 100%;
	position: fixed;
	top: 0;
	line-height: 0.3rem;
	color: #009cdc;
	background: #fff;
	border-bottom: 1px solid #d8e7ef;
	h3 {
		font-weight: normal;
		font-size: 0.14rem;
	}
}
.container {
	margin: 0.8rem 0;
	.movie-list {
		display: flex;
		justify-content: space-between;
		margin: 0.1rem;
		padding-bottom: 0.1rem;
		border-bottom: 1px solid #d8e7ef;
		.movie-left {
			display: flex;
			flex: 1;
			.movie-img {
				width: 30%;
				img {
					width: 100%;
					height: auto;
				}
			}
			.movie-info {
				width: 40%;
				font-size: 0.1rem;
				margin-left: 0.1rem;
				h2 {
					font-size: 0.14rem;
				}
				.movie-type {
					width: 0.7rem;
					border: 1px solid #009CDC;
					border-radius: 3px;
					display: flex;
					background: #fff;
					margin: 0.1rem 0;
					span {
						display: inline-block;
						background: #009CDC;
						color: #fff;
						width: 30%;
					}
					s {
						width: 70%;
						display: inline;
						text-decoration: none;
						text-align: center;
					}
				}
				p {
					padding-bottom: 0.05rem;
				}
			}
		}
	}
	.movie-right {
		width: 30%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		.grade {
			color: #FF5500;
			font-size: 0.14rem;
		}
		.buy {
			line-height: 0.25rem;
			background: #26a2ff;
			padding: 0 0.1rem;
			border-radius: 0.05rem;
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
			background: url(../assets/images/movie_icon.png) no-repeat center top 10%;
			background-size: 25%;
		}
		& li:nth-child(2) {
			background: url(../assets/images/order.png) no-repeat center top 10%;
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