import axiosApi from '@/common/utils/axiosApi'
import * as filter from './filter'
export function getList(params) {
    return axiosApi({
        url: '/list',
        method: 'get',
        filter: filter.getList,
        params: params
    })

}
