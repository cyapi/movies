<template>
	<div class="detail">
	    <mt-header :title="obj.title">
	    	<router-link to="/" slot="left">
			    <mt-button icon="back" @click="back()"></mt-button>
	    	</router-link>
	    </mt-header>
	    <div class="container detail-container">
	    	<div class="banner">
	    		<div class="thumbnail">
	    			<img v-if="obj.photo" v-bind="{src:pic+obj.photo}">
	    		</div>
	    		<div class="movie-intr">
	    			<h1>{{obj.title}}</h1>
	    			<div class="star-level">
	    				<div id="star_con" class="star-vote">
							<span id="add_star" class="add-star"></span>
							<span id="del_star" class="del-star":style="{width:star}"></span>
						</div>
	    				<div class="point">
	    					{{obj.rank}}
	    				</div>
	    			</div>
	    			<p>剧情：{{obj.category}}</p>
	    			<p>主演：{{obj.actor}}</p>
	    			<p>上映时间：{{obj.time}}大陆</p>
	    		</div>
	    	</div>
	    	<div class="movie-recommend">
	    		<p>{{obj.description}}</p>
	    	</div>
	   	</div>
	   	<mt-button type="primary" size="large" @click="submit()" >立即订购</mt-button>
	</div>
</template>

<script>
export default{
	data(){
		return{
			obj:{},
			star:0
		}
	},
	async created(){
		var res = await this.$http.get("/movie?id="+this.$route.query.id);
		//console.log(res)
		this.obj = res.data;
		this.star = this.obj.rank*10+"%";
		this.obj.category = this.obj.category.join('、')
		this.obj.actor = this.obj.actor.join('、')
	},
	methods:{
		submit(){
			this.$router.push({path:"/cinema",query:{title:this.obj.title,rank:this.obj.rank}})
		},
		back(){
			 this.$router.go(-1);
		}
	}
}
</script>

<style lang="less" scoped>
.detail{
	
	header{
			height: 0.4rem;
			font-size: 0.16rem;
		}
	
	.banner{
		display: flex;
		padding: 0.12rem;
		width: 100%;
		background: url(../assets/images/bg.jpg) no-repeat;
		background-size: cover;
		
		.thumbnail{
			width: 35%;
			img{
				width: 100%;
				height: auto;
			}
		}
		.movie-intr{
			width: 65%;
			padding-left: 0.12rem;
			color: #fff;
			font-size: 0.14rem;
			
			.star-vote {
				width: 0.93rem;
				height:0.16rem;
				position: relative;
				margin: 0.1rem 0;
				
				span {
					display: block;
					width: 100%;
					height: 100%;
					position: absolute; left: 0; top: 0;
					background: url(../assets/images/2.png);
					background-size: cover;
				}
				.del-star {
					width: 70%;
					background: url(../assets/images/1.png);
					background-size: cover;
				}
			}
		}
	}
	.movie-recommend{
		padding: 0.12rem;
		text-indent: 2em;
		line-height: 0.22rem;
		font-size: 0.14rem;
	}
}

</style>