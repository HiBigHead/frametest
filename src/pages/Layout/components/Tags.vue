<template>
  <div class="app-tags">
    <el-tabs v-model="activeTag" type="card" @tab-click="clickTab" @tab-remove="removeTab">
      <el-tab-pane
        v-for="item in tagsList"
        :closable="tagsList.length>1"
        :key="item.name"
        :label="item.meta.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tags",
  inject: ["reload"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["app"]),
    tagsList() {
      return this.app.tags.tagsList;
    },
    activeTag: {
      get() {
        return this.app.tags.activeTag;
      },
      set(val) {
        this.$store.dispatch("setTagsActivetag", val);
      }
    }
  },
  methods: {
    clickTab(tab) {
      if (this.$route.fullPath != this.app.routes[tab.name].pathNav) {
        this.$router.replace(this.app.routes[tab.name].pathNav);
      } else {
        this.reload();
      }
    },
    removeTab(name) {
      let tagsList = this.tagsList;
      let activeTag = this.activeTag;
      for (let i = 0; i < tagsList.length; i++) {
        const ele = tagsList[i];
        if (activeTag == name && name == ele.name) {
          let nextListName = tagsList[i + 1]
            ? tagsList[i + 1].name
            : tagsList[i - 1].name;
          this.$store.dispatch("setTagsActivetag", nextListName);
          this.$router.replace(this.app.routes[nextListName].pathNav);
          break;
        }
      }
      this.$store.dispatch("delTagsList", name);
    }
  }
};
</script>
<style lang="stylus" scoped></style>