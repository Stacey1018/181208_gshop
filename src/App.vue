<template>
  <div id="app">
    <router-view/>
    <FootetGuide v-show="$route.meta.showFooter" />
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import FootetGuide from './components/FootetGuide/FootetGuide'
export default {
  mounted(){
    // this.$store.dispatch('getAddress')
    // const result = await reqFoodTypes()
    // console.log(result);
    this.getAddress()
    this.getUserInfo()
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  },
	components: {
		FootetGuide
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
</style>



