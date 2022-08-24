import { get, post } from '@/utils/http'

enum URL {
    manageList = '/manage/list',
    manageAdd = '/manage/add'
}

export interface paramsState {
    pageSize: number,
    pageNum: number,
    totalPage?: number
}

const manageList = async (data: paramsState) => post<any>({ url: URL.manageList, data })

const manageAdd = async(data: any) => post<any>({
    url: URL.manageAdd, data
})

export {
    manageList,
    manageAdd
}