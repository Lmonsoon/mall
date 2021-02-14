<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center> 购物车({{ cartLength }}) </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-button-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartButtonBar from "./childComps/CartButtonBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartButtonBar,
    NavBar,
    CartList,
  },
  computed: {
    //辅助函数
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>