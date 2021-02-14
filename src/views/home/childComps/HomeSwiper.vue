<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      islode: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageload() {
      if (!this.islode) {
        this.$emit("swiperImageLoad");
        this.islode = true;
        //或者加修饰符。once
      }
    },
  },
};
</script>

<style>
</style>