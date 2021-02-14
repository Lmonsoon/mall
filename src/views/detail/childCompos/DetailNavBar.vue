<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>

      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="titleCilck(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleCilck(index) {
      this.currentIndex = index;
      this.$emit("titleCilck", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
  font-size: 13px;
}
.active {
  color: var(--color-higt-text);
}
.back img {
  margin-top: 12px;
}
</style>