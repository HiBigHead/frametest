<!-- Layout -->
<template>
  <div class="app-page">
    <Header
      :leftWidth="siderWidth()"
      v-if="!getIsSinglePage"
      :style="{height:style.header.height,'line-height':style.header.height}"
    ></Header>
    <Tags
      v-if="!getIsSinglePage&&showTags"
      :class="{'app-tags_nail':this.app.sidebar.thumbnail}"
      :style="{top:style.header.height,height:style.tags.height,left:siderWidth(),width:'calc(100vw - '+siderWidth()+')'}"
    ></Tags>
    <Sider
      v-if="!getIsSinglePage&&showSider"
      :mode="getMenuSider"
      :style="{width:showSider?siderWidth():'inherit',height:showSider?'calc(100vh - '+ style.header.height+')':'inherit' ,top:style.header.height}"
    ></Sider>
    <div class="app-content" :style="{padding:contentPadding()}">
      <Crumb v-if="!getIsSinglePage&&showCrumb"></Crumb>
      <Content :minHeight="contentHeight()"></Content>
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
      style: {
        header: {
          height: "60px"
        },
        tags: {
          height: "41px"
        },
        crumb: {
          height: "30px"
        },
        sider: {
          width: "200px",
          widthNail: "64px"
        },
        content: {
          padding: "10px"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["app"]),
    getIsSinglePage() {
      return this.app.isSinglePage;
    },
    showCrumb() {
      return this.app.crumb.show;
    },
    showSider() {
      return this.app.menuMode == "vertical";
    },
    siderNail() {
      return this.app.sidebar.thumbnail;
    },
    getMenuSider() {
      return this.app.menuMode;
    },
    showTags() {
      return this.app.tags.show;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getIsSinglePage &&
        to.query.pagePadding &&
        (vm.style.content.padding = to.query.pagePadding);
    });
  },
  methods: {
    siderWidth() {
      return this.getIsSinglePage || !this.showSider
        ? '0px'
        : this.siderNail
        ? this.style.sider.widthNail
        : this.style.sider.width;
    },
    contentPadding() {
      let padd = this.getContent();
      return padd.contentPadding;
    },
    contentHeight() {
      let minHeight = this.getContent();
      return "calc(100vh - " + minHeight.contentMinHeight + ")";
    },
    getContent() {
      let contentPadd = this.style.content.padding;
      let heightHeader = this.style.header.height;
      let heightTags = this.style.tags.height;
      let heightCrumb = this.style.crumb.height;

      //padding
      let hegitHT =
        parseInt(heightHeader) +
        parseInt(heightTags) +
        parseInt(contentPadd) +
        "px";
      let hegitHTC = parseInt(heightHeader) + parseInt(heightTags) + "px";

      let contentPaddTop = this.getIsSinglePage
        ? contentPadd
        : this.showTags && !this.showCrumb
        ? hegitHT
        : this.showTags && this.showCrumb
        ? hegitHTC
        : !this.showTags && this.showCrumb
        ? heightHeader
        : parseInt(heightHeader) + parseInt(contentPadd) + "px";

      let contentPaddRight = this.getIsSinglePage
        ? contentPadd
        : parseInt(this.siderWidth()) + parseInt(contentPadd) + "px";

      //min-height
      let singleInitHeight = parseInt(contentPadd) * 2 + "px";
      let contentInitHeight =
        parseInt(heightHeader) + parseInt(contentPadd) * 2 + "px";
      let contentC =
        parseInt(heightHeader) +
        parseInt(contentPadd) +
        parseInt(heightCrumb) +
        "px";
      let contentT =
        parseInt(heightHeader) +
        parseInt(contentPadd) * 2 +
        parseInt(heightTags) +
        "px";
      let contentTC =
        parseInt(heightHeader) +
        parseInt(contentPadd) +
        parseInt(heightTags) +
        parseInt(heightCrumb) +
        "px";
      let contentMinHeight =
        this.showCrumb && !this.showTags
          ? contentC
          : !this.showCrumb && this.showTags
          ? contentT
          : this.showCrumb && this.showTags
          ? contentTC
          : contentInitHeight;
      return {
        contentPadding: this.getIsSinglePage
          ? contentPadd
          : contentPaddTop +
            " " +
            contentPadd +
            " " +
            contentPadd +
            " " +
            contentPaddRight,
        contentMinHeight: this.getIsSinglePage
          ? singleInitHeight
          : contentMinHeight
      };
    }
  }
};
</script>
<style lang="stylus" scoped></style>
