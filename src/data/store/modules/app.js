const app = {
    state: {
        routes: {},
        isSinglePage:true,//是否显示框架
        hasBorder:true,//单页情况下有无边框
        menuMode: 'vertical',//vertical,horizontal 
        sidebar: {
            thumbnail: false,
            hoverShowTitle: true,
            avatar:false,//menuMode为vertical时有效
        },
        topbar: {

        },
        crumb: {
            show: true,
            separator: '/',
            separatorClass: ''
        },
        tags: {
            show: false,
            activeTag: '',
            tagsList: []
        }
    },
    mutations: {
        SET_SIDEBAR_THUMBNAIL: state => {
            state.sidebar.thumbnail = !state.sidebar.thumbnail
        },
        SET_TAGS_ACTIVETAG: (state, name) => {
            state.tags.activeTag = name
        },
        SET_TAGS_LIST: (state, item) => {
            !state.tags.tagsList.some(ele => ele.name == item.name) && state.tags.tagsList.push(item)
        },
        DEL_TAGS_LIST: (state, name) => {
            state.tags.tagsList.forEach((item, index) => {
                if (item.name == name) {
                    state.tags.tagsList.splice(index,1)
                }
            })
        }
    },
    actions: {
        setSideBarThumbnail({ commit }) {
            commit('SET_SIDEBAR_THUMBNAIL')
        },
        setTagsActivetag({ commit }, name) {
            commit('SET_TAGS_ACTIVETAG', name)
        },
        setTagsList({ commit }, item) {
            commit('SET_TAGS_LIST', item)
        },
        delTagsList({ commit }, name) {
            commit('DEL_TAGS_LIST', name)
        }
    }
}
export default app