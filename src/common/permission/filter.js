import store from '../../data/store'
// 过滤动态路由
export function filterRouters(pagesRouterList, res) {
    let btns = []
    let pages = []
    filter(res.data.permission.page.children, btns, pages)
    filterPage(pagesRouterList, pages)
    console.log(pagesRouterList);
    
    return {
        router: pagesRouterList,
        btns: btns
    }
}
function filter(data, btns, pages, dep = 0) {
    data.forEach(function (item) {
        if (item.code.match('_')) {
            btns.push(item.code)
        } else {
            pages.push({ code: item.code, dep: dep })
        }
        if (item.children && item.children.length > 0) {
            filter(item.children, btns, pages, dep++)
        }
    })
}
function filterPage(pagesRouterList, pages) {
    for (let i = 0; i < pagesRouterList.length; i++) {
        let item = pagesRouterList[i]
        if (item.path == '*') continue
        itemParams(pages,item)
        if (item.hasPermission) {
            item.pathNav = item.path
            item.pathList.push(item.pathNav)
            if (item.children.length == 1 && !item.pathChildrenShow) {
                item.pathOnly = true
                store.getters.app.routes[item.children[0].name] = item.children[0]
            } else {
                item.children.forEach(function (item2) {
                    itemParams(pages,item2)
                    if (item2.hasPermission) {
                        item2.pathNav = item.pathNav + '/' + item2.path
                        item.pathList.push(item2.pathNav)
                        item2.pathList.push(item2.pathNav)
                        if (item2.children && item2.children.length == 1 && !item2.pathChildrenShow) {
                            item2.pathOnly = true
                            store.getters.app.routes[item2.children[0].name] = item2.children[0]
                        } else {
                            item2.children && item2.children.forEach(function (item3) {
                                itemParams(pages,item3)
                                if (item3.hasPermission) {
                                    item3.pathOnly = true
                                    item3.pathNav = item2.pathNav + '/' + item3.path
                                    item.pathList.push(item3.pathNav)
                                    item2.pathList.push(item3.pathNav)
                                }
                            })
                        }
                    }
                })
            }
            store.getters.app.routes[item.name] = item
        }
    }
}
function itemParams(pages,item){
    item.hasPermission = hasPermissionFn(pages, item)
    item.pathChildrenShow = pathChildrenShowFn(item)
    item.pathOnly = false
    item.pathList=[]
}
function hasPermissionFn(pages, item) {
    let hasPermission = pages.some(item2 => item2.code == item.name)
    item.hasPermission = hasPermission
    return hasPermission;
}
function pathChildrenShowFn(item) {
    return item.children && item.children.some(item2 => item2.meta.isShow === true)
}
