import router from '../../router'
import store from '../../data/store'
import { getStorage,loginOut } from '../utils/auth'
import { MessageBox } from 'element-ui'

router.beforeEach(async (to, from, next) => {
    //进行token检查
    const hasToken = getStorage()
    if(!hasToken){
        loginOut()
    }
    if (store.getters.permission.addRouters.length === 0) {
        to.query.isSinglePage && store.dispatch('setIsSinglePage')
        store
            .dispatch('GenerateRoutes').then(() => {
                router.addRoutes(store.getters.permission.addRouters.concat({ path: '*', redirect: '/404' }))
                next({ ...to, replace: true })
            }).catch(err => {
                console.log(err)
                MessageBox({
                    message: '获取菜单树失败！',
                    showCancelButton: false,
                    confirmButtonText: '确定',
                    type: 'error',
                    callback() {

                    }
                })
            })
    } else {
        next()
    }
})
router.afterEach(to => {
    if (store.getters.app.tags.show) {
        store.dispatch('setTagsList', to)
        store.dispatch('setTagsActivetag', to.name)
    }
    store
        .dispatch('setCrumbs', to.matched)
})

