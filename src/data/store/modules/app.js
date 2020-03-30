const app = {
    state: {
        routes: {},
        isSinglePage:false,//是否显示框架
        menuMode: 'vertical',//vertical,horizontal 
        sidebar: {
            thumbnail: false,
            hoverShowTitle: true,
            avatar:false,//menuMode为vertical时有效
        },
        topbar: {

        },
        crumb: {
            show: false,
            separator: '/',
            separatorClass: ''
        },
        tags: {
            show: true,
            activeTag: '',
            tagsList: []
        }
    },
    mutations: {
        SET_IS_SINGLE_PAFE:state => {
            state.isSinglePage = !state.isSinglePage
        },
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
        setIsSinglePage({commit}){
            commit('SET_IS_SINGLE_PAFE')
        },
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