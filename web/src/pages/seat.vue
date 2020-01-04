<template>
	<div class="seat">
		<mt-header title="影院" fixed>
		  <router-link to="/" slot="left">
		    <mt-button icon="back" @click="back()"></mt-button>
		  </router-link>
		</mt-header>
		<div class="m-title">
        	<h2>{{obj.title}}</h2>
	        <h4>今天12月18日 {{obj.time}} {{obj.type}}</h4>
	        <div class="lobby">
	        	<span>{{obj.address}}银幕</span>
	        </div>
    	</div>
    	
    	<div class="container">
    		<div class="seating">
				<ul>
					<li v-for="(i,j) in seat" :class="i[2]==2?celled:i[2]==1?selected:''" @click="select(i,j)" :key="j"></li>
				</ul>
			</div>
			<div class="tips-seat">
				<span class="selecting">可选</span>
				<span class="selected">已选</span>
				<span class="selled">已售</span>
			</div>
			<div class="ticket">
				<h5>已选座位</h5>
				<div class="ticket-item" v-for="(i,j) in checked" :key="j">
					{{i[0]}}排{{i[1]}}座<em>￥{{obj.price}}</em>
					<span @click="select(i,j)">x</span>
				</div>
			</div>
    	</div>
    	
   		<a href="javascript:;" class="btn" @click="submit()">￥{{obj.price*checked.length}}确认选座</a>
	</div>
</template>

<script>
export default {
	data(){
		return {
			obj:{},
			seat:[],
			celled:"celled",
			selected:"selected"
		}
	},
	computed:{
		checked(){
			return this.seat.filter(i=>i[2]==1)
		}
	},
	async created(){
		var res = await this.$http.get("/cinema?id="+this.$route.query.id)
		console.log(res)
		this.obj = res.data;
		var selected = res.data.selected.join("|").split("|");//["9,6", "9,7"]
		console.log(selected)
		for(let i=1;i<=res.data.seat;i++){
			var row = Math.ceil(i/12);
			var col = i%12?i%12:12;
			if(selected.includes(row+","+col)){
				this.seat.push([row,col,2])
			}else{
				this.seat.push([row,col,0])
			}
		}
		console.log(this.seat)
	},
	methods:{
		select(i,j){ 
			if(i[2]!=2){
				if(i[2]==1){
					this.seat.splice(j,1,[i[0],i[1],0])
				}else{
					this.seat.splice(j,1,[i[0],i[1],1])
				}
			}
			
		},
		async submit(){
			if(sessionStorage.getItem("user")){
				if(this.checked.length==0){
					return this.$toast("最少买一张票")
				}
				if(this.checked.length>8){
					this.$toast("最多买8张票")
				}
				//收集数据
				var data = {
					title:this.obj.title,
					address:this.obj.address,
					time:this.obj.time,
					checked:this.checked,
					total:this.obj.price*this.checked.length,
					user:sessionStorage.getItem("user")
				}
				//发请求 写入order表中
				var res = await this.$http.post("/order?id="+this.obj._id,data);
				this.$toast(res.data)
				
				//跳转
				this.$router.push("/order")
			}else{
				this.$router.push("/login")
			}
		},
		back(){
			 this.$router.go(-1);
		}
	}
}
</script>

<style lang="less" scoped>
.seat {
	header{
		height: 0.4rem;
		font-size: 0.16rem;
	}
	.m-title {
		height: 0.6rem; display: flex; flex-direction: column;
		 color: #009CDC; background: #fff; justify-content: center;
		border-bottom: 1px solid #ccddee; margin-bottom: 0.1rem;
		position:fixed; top: 0.4rem; left: 0; width: 100%; padding-left: 0.1rem;
		h2{ font-weight:normal; font-size: 0.16rem;}
		h4{ font-weight:normal; color: #666;font-size: 0.14rem;}
		
		& .lobby{
			position: absolute; bottom:-0.2rem; left:50%;
			background:url(../assets/images/screen.png) no-repeat;
			background-size:contain; color: #fff; text-align: center;
			font-size: 0.12rem;
			width: 40%; transform: translateX(-50%); height: 0.2rem;
		}
	}
	
	.seating {
		margin-top: 1.3rem;
		
		ul {
			display:flex;  flex-wrap: wrap; list-style: none;
			justify-content: center;
			
			li {
				width: 8.3%;height: 0.3rem;
				background:url(../assets/images/e_seat.png) no-repeat center;
				background-size:80%;
			}
			
			& .celled {
				background:url(../assets/images/sell_seat.png) no-repeat center;
			    background-size:80%;
			}
			
			& .selected {
				background:url(../assets/images/sed_seat.png) no-repeat center;
			    background-size:80%;
			}
		}
		
	}
	
	.tips-seat {
		background: #fff; 
		border-bottom: 1px solid #ccc;
	    height: 0.4rem; 
	    display: flex; 
	    flex: 1;
	    justify-content: space-around;
	    align-items: center; 
	    font-size: 0.14rem; 
	    padding: 0 0.2rem;
	    position: relative;
	    
	    span{
	    	width: 33.3%;
	    	text-align: center;
	    	line-height: 0.3rem;
	    }
	    & .selecting{
	    	background: url(../assets/images/e_seat.png) no-repeat center left 10%;
	    	background-size:25%;
	    }
	    
	    & .selected{
	    	background: url(../assets/images/sed_seat.png) no-repeat center left 10%;
	    	background-size:25%;
	    }
	    
	    & .selled{
	    	background: url(../assets/images/sell_seat.png) no-repeat center left 10%;
	    	background-size:25%;
	    }
	}
	
	.ticket {
		font-size: 0.12rem;
		margin-bottom: 0.5rem;
		padding: 0.1rem;
		
		
		.ticket-item{
			display: inline-block;
			width: 30%;
			position: relative;
			margin-top: 0.1rem;
			padding:0.05rem 0.2rem;
			height: 0.4rem;
			background: url(../assets/images/seat_item.png) no-repeat;
			background-size:100%;
			
			em{
				display: block;
				font-style: normal;
				color: #FF5500;
			}
			span{
				position: absolute;
				right: 0.1rem;
				top: 0.2rem;
			}
		}
	}
	.btn {
		 position: fixed; bottom: 0; left: 0; background: #009CDC;
		 text-align: center; line-height: 0.4rem; color: #fff; width: 100%;
		 text-decoration: none;
	}
	
	
}
</style>