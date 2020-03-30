<!-- Content -->
<template>
  <div class="app-content-cont" :style="{'height':minHeight}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
  props:{
    minHeight:String
  }
};
</script>
<style lang="stylus" scoped></style>
