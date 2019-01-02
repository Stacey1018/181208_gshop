<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id ? '/userinfo': '/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
            <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cateforys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(catefory,index) in cateforys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+catefory.image_url">

              </div>
              <span>{{catefory.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
        <ShopList/>
      </div>

    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
export default {
  data(){
    return{
      baseImageUrl:'http://fuss10.elemecdn.com'
    }
  },
	mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed:{
    ...mapState(['address','categorys','userInfo']),
    /**
     * 根据categorys一维数组生成一个2维数组
     * 小数组中的元素最大个数是8
     */
    categorysArr(){
      const {categorys} = this
      // 准备一个空的二维数组
      const arr = []
      let minArr = []
      // 遍历categorys
      categorys.forEach(c => {
        
        if(minArr.length === 8){
          minArr = []
        }
        if(minArr.length === 0){
          arr.push(minArr)
        }
        minArr.push(c)
      });
      return arr
    }
  },
  watch:{
    categorys(value){//categorys中有数据了，在异步更新界面前执行
      // 使用setTimeout可以实现 但不是最好的
      // setTimeout(()=>{
      //   // 创建swiper轮播对象
		  //   new Swiper('.swiper-container', {
			//     loop: true,
			//     pagination: {
			// 	    el: '.swiper-pagination'
			//     }
		  //   })
      // },100)

      // 界面更新 立即创建swiper对象
      this.$nextTick(()=>{ // 一旦界面更新 ，立即调用(此条语句要写在数据更新后)
        new Swiper('.swiper-container', {
			    loop: true,
			    pagination: {
				    el: '.swiper-pagination'
			    }
		    })
      })
    } 
  },
  components: {
		HeaderTop,
		ShopList
	},
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
