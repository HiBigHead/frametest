<!-- Header -->
<template>
  <div class="app-header">
    <div class="left" :class='{"left_thumbnail":siderThumbnail}'>left</div>
    <div class="right">
      <div v-if='showSider'>
        <el-button  @click='setSiderThumbnail' type="primary" :icon="siderThumbnail?'el-icon-s-unfold':'el-icon-s-fold'"></el-button>
      </div>
      <Sider v-if='!showSider' :mode='getMenuSider'></Sider>
      <div v-else style="flex:1"></div>
      <Tail></Tail>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sider from "./Sider";
import Tail from "./Tail";
export default {
  name: "Header",
  components:{
    Sider,
    Tail
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["app"]),
    showSider(){
      return this.app.menuMode=="vertical"
    },
    getMenuSider(){
      return this.app.menuMode
    },
    siderThumbnail(){
      return this.app.sidebar.thumbnail
    }
  },
  methods:{
    setSiderThumbnail(){
      this.$store.dispatch('setSideBarThumbnail')
    }
  }
};
</script>
<style lang="stylus" scoped></style>
