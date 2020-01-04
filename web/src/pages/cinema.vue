<template>
	<div class="cinema">
		 <mt-header title="影院">
	    	<router-link to="/" slot="left">
			    <mt-button icon="back" @click="back()"></mt-button>
	    	</router-link>
	    </mt-header>
	    <div class="m-title">
	        <h3>{{$route.query.title}}<em>{{$route.query.rank}}分</em></h3>
	    </div>
	    <div class="container">
			<div class="scene-item" v-for="(i,index) in list" :key="index">
				<span class="c-time">{{i.time}}</span>
				<span class="c-type">{{i.type}}<em>{{i.address}}</em></span>
				<span class="c-price">￥{{i.price}}</span>
				<span class="c-btn">
					<button @click="$router.push({path:'/seat',query:{id:i._id}})">选择购票</button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			list:[]
		}
	},
	async created(){
		var res = await this.$http.get("/cinema?title="+this.$route.query.title)
		console.log(res)
		this.list = res.data;
	},
	methods:{
		back(){
			 this.$router.go(-1);
		}
	}
}
</script>

<style lang="less" scoped>
.cinema{
	
	header{
		height: 0.4rem;
		font-size: 0.16rem;
	}
	
	.m-title{
		line-height: 0.3rem;
		background: #FFFFFF;
		text-align: center;
		border-bottom: 1px solid #d8e7ef;
		
		h3{
			color: #076fa2;
			font-size: 0.14rem;
			
			em{
				color: #FF5500;
				font-size: 0.12rem;
				font-style: normal;
				padding-left: 0.03rem;
			}
		}
	}
	
	.container{
		font-size: 0.14rem;
		margin-top: 0.2rem;
		
		.scene-item{
			display: flex;
			justify-content:space-around;
			
			span { 
				display: flex; 
				flex: 1; 
				text-align: center;
				height: 0.55rem ; 
				align-items: center; 
				flex-wrap: wrap; 
				justify-content: center; 
				
				button{
					font-size: 0.1rem;
					color: #076FA2;
					width: 60%;
					height: 35%;
					border: 1px solid #076FA2;
					border-radius: 0.02rem;
				}
			}
			
			& .c-type { 
				font-size: 0.14rem;
				em { display: block; width:100%;font-size: 0.12rem;}
			}
			
			&:nth-child(odd){
				background: #fff;
			}
		}
	}
	
}
</style>