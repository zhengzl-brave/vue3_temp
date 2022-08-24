import { errorResult, requestParams, successResult } from "@/utils/results"
import { MockMethod } from 'vite-plugin-mock'
import { manageItem } from '@/types/manage'

export function createManageList() {
    const infos: manageItem[] = []
    for(let i = 0; i < 20; i++) {
        infos.push({
            id: `${i + 1}`,
            datSource: 'APP上报',
            questionType: '大管接小管',
            drainType: '污水',
            drainArea: '荔城',
            aboutRoald: '广州市荔湾区永明街道',
            facilityType: '排水管道',
            disposeState: '1',
            disposePerson: '排水管道',
            disposeTime: '2021-03-08 12:47:28',
        })
    }
    return infos
}

export default [
    {
        url: '/manage/list',
        timeout: 200,
        method: 'post',
        response: (request: requestParams) => {
            const { pageNum, pageSize } = request.body
            let len: number = createManageList().length / pageSize
            let totalPage: number = len - Math.floor(len) > 0 ? Math.floor(len) + 1 : len
            let resList = createManageList().slice((pageNum - 1) * pageSize, pageNum * pageSize)
            
            return successResult({ res: resList, code: 200, pageSize: pageSize, pageNum: pageNum, totalPage: totalPage, total: createManageList().length })
        }
    },
    {
        url: '/manage/add',
        timeout: 200,
        method: 'post',
        response: (request: requestParams) => {
            const obj = { ...request.body, id: (createManageList().length + 1) + '' }
            const arr = createManageList().concat(obj)
            return successResult({ message: '添加成功', code: 200, now: arr })
        }
    }
] as MockMethod[]