import router from '../../router'
import store from '../../data/store'


router.beforeEach(async (to, from, next) => {
    if (store.getters.permission.addRouters.length === 0) {
        to.query.isSinglePage&&store.dispatch('setIsSinglePage')
        store
            .dispatch('GenerateRoutes').then(() => {
                router.addRoutes(store.getters.permission.addRouters.concat({ path: '*', redirect: '/404' }))
                next({ ...to, replace: true })
            }).catch(err => {
                console.log(err)
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

