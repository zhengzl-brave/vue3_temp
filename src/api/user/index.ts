import { get, post } from '@/utils/http'

enum URL {
    login = '/user/login'
}
interface LoginRes {
    token: string
}
export interface LoginData {
    username: string
    password: string
}

const login = async (data: LoginData) => post<any>({ url: URL.login, data })

export {
    login
}