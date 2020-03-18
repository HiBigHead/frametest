<!-- Layout -->
<template>
  <div class="app-page">
    <Header v-if="!getIsSinglePage"></Header>
    <Tags v-if="!getIsSinglePage&&showTags" :class="{'app-tags_nail':this.app.sidebar.thumbnail}"></Tags>
    <Sider
      v-if="!getIsSinglePage&&showSider"
      :mode="getMenuSider"
      :class="{'app-sider_nail':this.app.sidebar.thumbnail}"
    ></Sider>
    <div
      class="app-content"
      :class="{'app-content_nosider':!showSider,'app-content_thumbnail':showSider&&this.app.sidebar.thumbnail,
    'app-content_crumb':showCrumb,'app-content_tags':showTags,'app-content_crumb_tags':showTags&&showCrumb}"
      :style="{padding:getIsSinglePage?'15px':'75px 15px 15px 215px'}"
    >
      <Crumb v-if="!getIsSinglePage&&showCrumb"></Crumb>
      <Content></Content>
    </div>
    <!-- <Footer  v-if="!getIsSinglePage"></Footer> -->
  </div>
</template>

<script>
import Header from "./components/Header";
import Tags from "./components/Tags";
import Sider from "./components/Sider";
import Crumb from "./components/Crumb";
import Content from "./components/Content";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    Header,
    Tags,
    Sider,
    Crumb,
    Content
  },
  data() {
    return {
      content: {
        style: {
          padding: "15px"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["app"]),
    getIsSinglePage() {
      return this.app.isSinglePage;
    },
    showBorder(){
      return this.app.hasBorder;
    },
    showCrumb() {
      return this.app.crumb.show;
    },
    showSider() {
      return this.app.menuMode == "vertical";
    },
    getMenuSider() {
      return this.app.menuMode;
    },
    showTags() {
      return this.app.tags.show;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
