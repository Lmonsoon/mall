<template>
  <div id="detail">
    <detail-nav-bar @titleCilck="titleCilck" ref="detailnav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="CommentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childCompos/DetailNavBar";
import DetailSwiper from "./childCompos/DetailSwiper";
import DetailBaseInfo from "./childCompos/DetailBaseInfo";
import DetailShopInfo from "./childCompos/DetailShopInfo";
import DetailGoodsInfo from "./childCompos/DetailGoodsInfo";
import DetailParamInfo from "./childCompos/DetailParamInfo";
import DetailCommentInfo from "./childCompos/DetailCommentInfo";
import DetailBottomBar from "./childCompos/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { itemListenerMixin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
import { mapActions } from "vuex";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // BackTop,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      CommentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      // isShowBackTop: false,
    };
  },
  created() {
    //1. 保存传入的 iid
    this.iid = this.$route.params.id;
    //2.根据 iid 请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //1.获取顶部图片轮播数据
      // console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.CommentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   this.themeTopYs=[];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.data.list;
    });
    this.getThemeTopYs = debounce(() => {
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        console.log(this.themeTopYs);
      }, 100);
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopYs();
    },
    titleCilck(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;

      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            positionY >= this.themeTopYs[i])
        ) {
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = i;
        }
      }
      this.isShowBackTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // this.$store.dispatch("addCart", product).then(res=>{

      // });
      this.addCart(product).then((res) => {
        this.$toast.show(res);
      });
    },
  },

  destroyed() {
    this.$bus.$off("itemImageLoad", this.homeItemImageLoad);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 3;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
  overflow: hidden;
}
</style>
