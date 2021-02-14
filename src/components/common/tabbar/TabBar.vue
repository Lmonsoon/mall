<template>
  <div class="tabbar">
      <slot></slot>
  </div>
</template>

<script>
export default {
name:'TabBar'
}
</script>

<style>
.tabbar{
    display: flex;
    flex-flow: row nowrap;
    justify-content:space-around;
    position: fixed;
    background-color: #f6f6f6;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>