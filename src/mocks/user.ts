import { errorResult, requestParams, successResult } from "@/utils/results"
import { MockMethod } from 'vite-plugin-mock'

export function createUserList() {
    return [
        {
            id: 'user01',
            username: 'zhengzl',
            password: '123456',
            token: 'P1DeqWBao0HTU47Q'
        },
        {
            id: 'user02',
            username: 'linjc',
            password: '123456',
            token: 'yg8bE8nZwiCL4nQg'
        }
    ]
}

export default [
    {
        url: '/user/login',
        timeout: 200,
        method: 'post',
        response: (request: requestParams) => {
            const { username, password } = request?.body
            const checkUser = createUserList().find(item => item.username = username && item.password === password)
            if(!checkUser) {
                return errorResult('登录失败！')
            }
            return successResult({ token: checkUser.token, code: 200 })
        }
    }
] as MockMethod[]