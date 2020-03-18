<template>
  <div class="app-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in getCrumbs" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Crumb",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["crumbs","app"]),
    getCrumbs() {
      return this.crumbs.crumbsList;
    },
    getRoutes(){
      return this.app.routes;
    }
  },
  methods:{
    getPathOnly(item){
      return this.getRoutes[item.name].pathOnly
    }
  }
};
</script>
<style lang="stylus" scoped></style>