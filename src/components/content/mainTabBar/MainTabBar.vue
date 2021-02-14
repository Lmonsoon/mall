<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="pink">
        <template v-slot:item-icon>
            <img src="~assets/img/ioc0.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
            <img src="~assets/img/ioc0-v.svg" alt="">
        </template>
        <template v-slot:item-text>
            首页
        </template>
      </tab-bar-item>
        <tab-bar-item path="/category" activeColor="pink">
      <template v-slot:item-icon>
            <img src="~assets/img/ioc1.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
            <img src="~assets/img/ioc1-v.svg" alt="">
        </template>
        <template v-slot:item-text>
            分类
        </template>
      </tab-bar-item>
        <tab-bar-item path="/cart" activeColor="pink">
   <template v-slot:item-icon>
            <img src="~assets/img/ioc2.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
            <img src="~assets/img/ioc2-v.svg" alt="">
        </template>
        <template v-slot:item-text>
            购物车
        </template>
      </tab-bar-item>
       <tab-bar-item path="/profile" activeColor="pink">
   <template v-slot:item-icon>
            <img src="~assets/img/ioc3.svg" alt="">
        </template>
        <template v-slot:item-icon-active>
            <img src="~assets/img/ioc3-v.svg" alt="">
        </template>
        <template v-slot:item-text>
            我的
        </template>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
name: 'MainTabBar',
components: {
    TabBarItem,
    TabBar

}
}
</script>

<style>

</style>