<template>
  <div class="tab-control">
      <div v-for="(value,i) in titles" :key="i" class="tab-control-item"
      :class="{active:i==currentIndex} " @click="itemclick(i)"
      >
        <span>{{value}}</span>
      </div>
  </div>
</template>

<script>
export default {
 name:'TabControl',
 props: {
     titles:{
         type:Array,
         default(){
             return[]
         }
     }
 },
 data () {
     return {
         currentIndex:0,
     }
 },
 methods:{
     itemclick(i){
         this.currentIndex=i;
         this.$emit('tabClick',i)
     }
 }
}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1;
    height: 40px;
    line-height:40px
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>