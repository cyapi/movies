<template>
<div class="logo">
	<img src="../assets/images/LOGO_text.png"/>
</div>
</template>

<script>
export default{
	mounted(){
		setTimeout(()=>{
			this.$router.push("/home")
		},3000)
	}
}
</script>

<style lang="less" scoped>
	.logo{
		margin-top: 1rem;
		text-align: center;
		img{
			width: 80%;
		}
	}
</style>