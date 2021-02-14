<template>
  <div class="tab-bar-item" @click="itemclick">
      <div v-if="!isAct">
<slot name="item-icon"></slot>
      </div>
      <div v-else>
<slot name="item-icon-active"></slot>
      </div>
      <div :style="actyv">
<slot name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
name:'TabBarItem',
props:{
  path:String,
  acty:{
      type:String,
      default:'red'
  }
},
data() {
    return {
        // isAct:true
    }
},
computed:{
isAct(){
  return this.$route.path.indexOf(this.path) !== -1
},
actyv(){
    return this.isAct? {color:this.acty}:{}
}
},
methods: {
  itemclick(){
    if(this.$route.path!==this.path){
      this.$router.replace(this.path)
    }
  }
},
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  height: 49px;
  text-align: center;
  box-shadow:0px -1px 1px rgba(100, 100,100, .2) ;
  font-size: 14px;
  
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 4px 0 2px 0;
}
.act{
    color:pink;
}
</style>