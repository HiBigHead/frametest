<!-- Sider -->
<template>
  <div class="app-sider" :class="mode=='vertical'?'app-sider-ver':''">
    <div class="app-avatar" v-if="mode=='vertical'&&getAvatar">
      <div v-show="!siderThumbnail">big</div>
      <div v-show="siderThumbnail">nail</div>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :mode="mode"
    >
      <template v-for="item in getMenuNavs">
        <template v-if="item.path!='*'&&item.meta.isShow">
          <el-menu-item
            v-if="!item.pathChildrenShow||item.children<1"
            :index="item.pathNav"
            :key="item.name"
          >
            <i class="el-icon-location" :class="isActive(item)?'s-nav-active':''"></i>
            <span slot="title" :class="isActive(item)?'s-nav-active':''">{{item.meta.title}}</span>
          </el-menu-item>
          <template v-else>
            <el-submenu :index="item.pathNav" :key="item.name">
              <template slot="title">
                <i class="el-icon-location" :class="isActive(item)?'s-nav-active':''"></i>
                <span slot="title" :class="isActive(item)?'s-nav-active':''">{{item.meta.title}}</span>
              </template>
              <template v-if="item.children">
                <template v-for="item2 in item.children">
                  <template v-if="item2.meta.isShow">
                    <el-menu-item
                      v-if="!item2.pathChildrenShow||item2.children<1"
                      :index="item2.pathNav"
                      :key="item2.name"
                    >
                      <i class="el-icon-location" :class="isActive(item2)?'s-nav-active':''"></i>
                      <span
                        slot="title"
                        :class="isActive(item2)?'s-nav-active':''"
                      >{{item2.meta.title}}</span>
                    </el-menu-item>
                    <template v-else>
                      <el-submenu :index="item2.pathNav" :key="item2.name">
                        <template slot="title">
                          <i class="el-icon-location" :class="isActive(item2)?'s-nav-active':''"></i>
                          <span
                            slot="title"
                            :class="isActive(item2)?'s-nav-active':''"
                          >{{item2.meta.title}}</span>
                        </template>
                        <template v-if="item2.children">
                          <template v-if="item2.children">
                            <template v-for="item3 in item2.children">
                              <template v-if="item3.meta.isShow">
                                <el-menu-item
                                  v-if="!item3.pathChildrenShow||item3.children<1"
                                  :index="item3.pathNav"
                                  :key="item3.name"
                                >
                                  <i class="el-icon-location"></i>
                                  <span slot="title">{{item3.meta.title}}</span>
                                </el-menu-item>
                                <template v-else>
                                  <el-submenu :index="item3.pathNav" :key="item3.name">
                                    <template slot="title">
                                      <i class="el-icon-location"></i>
                                      <span slot="title">{{item3.meta.title}}</span>
                                    </template>
                                  </el-submenu>
                                </template>
                              </template>
                            </template>
                          </template>
                        </template>
                      </el-submenu>
                    </template>
                  </template>
                </template>
              </template>
            </el-submenu>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Sider",
  props: {
    mode: String
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["app", "permission"]),
    getMenuNavs() {
      return this.permission.menuNavs;
    },
    isCollapse() {
      return this.app.sidebar.thumbnail;
    },
    showTags() {
      return this.app.tags.show;
    },
    tagsList() {
      return this.app.tags.list;
    },
    getAvatar() {
      return this.app.sidebar.avatar;
    },
    siderThumbnail() {
      return this.app.sidebar.thumbnail;
    }
  },
  methods: {
    isActive(item) {
      let path = this.$route.path;
      let currentNav = false;
      let hasPath = this.hasPathFn(item, path);
      if (path == item.pathNav || path == item.redirect || hasPath) {
        currentNav = true;
      }
      return currentNav;
    },
    hasPathFn(item, path) {
      let hasPath = false;
      item.children &&
        item.children.forEach(function(item2) {
          if (item2.pathNav == path) {
            hasPath = true;
          } else {
            item2.children &&
              item2.children.forEach(function(item3) {
                if (item3.pathNav == path) {
                  hasPath = true;
                } 
              });
          }
        });
      return hasPath;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
