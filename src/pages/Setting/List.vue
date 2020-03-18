<template>
  <div class="wrapper">
      <p><el-button @click="changeTxt">变换</el-button></p>
      <p>{{Txt}}</p>
  </div>
</template>

<script>
export default {
  name:'List',
  data(){
    return {
        Txt:''
    }
  },
  methods:{
      changeTxt(){
          this.Txt=Math.random()
      }
  }
}
</script>
<style lang="stylus" scoped></style>