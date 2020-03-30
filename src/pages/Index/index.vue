<template>
  <div class="wrapper">
    <p>index</p>
    <el-button plain @click="cancel">取消</el-button>
    <el-button type="primary" v-btnHas="'IndexIndex_save'" @click="save" plain>保存</el-button>
    <el-button type="success" v-btnHas="'IndexIndex_done'" plain>完成</el-button>
    <p >
      <img  src="~@/assets/icons/svg/breakfast.svg" alt="">
      <img  src="~@/assets/images/baobao.png" alt="">
      </p>
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">{{item.name}}——{{item.creatTime}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as api from "apiF/Index";
export default {
  name: "Index",
  data() {
    return {
      list:[]
    };
  },
  methods: {
    save() {
      api.getList().then(res => {
        this.list=res.data.list
      });
    },
    cancel(){
      this.list=[]
    }
  }
};
</script>
<style lang="stylus" scoped>
img 
  display inline-block
  width 80px
  height 80px
</style>