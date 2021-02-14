<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center> 购物街 </template></nav-bar
    >
    <tab-control
      class="tabcontrol"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-type="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backtop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

// import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",

  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      taboffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.$bus.$on("itemImageLoad", () => {
    //   // this.$refs.scroll && this.$refs.scroll.
    //   refresh();
    // });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.homeItemImageLoad);
  },
  methods: {
    swiperImageLoad() {
      //  this.taboffsetTop=this.$refs.TabControl.$el.offsetTop;
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // debounce(func,delay){
    //     let timer=null;
    //   return function(...args){
    //     if(timer) clearTimeout(timer);
    //     timer=setTimeout(() => {

    //       func.apply(this,args);

    //     },delay)
    //   }
    // },
    /**
     * 事件监听
     */
    tabClick(i) {
      switch (i) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = i;
      this.$refs.tabControl2.currentIndex = i;
    },

    /**
     * 网络相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //console.log(res)
        // this.goods[type].list.push(...res.data.data.list)
        this.goods[type].list = [
          ...this.goods[type].list,
          ...res.data.data.list,
        ];
        this.goods[type].page += 1;
      });
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.taboffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.finishPullUp();
      //
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1; */
}
.tabcontrol {
  width: 100%;
  position: fixed;
  top: 44px;
  z-index: 1;
}
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
/* .fixed{
  position: fixed;
  left: 0;
  top: 44px;
} */
</style>