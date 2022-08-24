import { defineStore } from 'pinia'

export interface userState {
    token: string
}
export const useUser = defineStore('user', {
    state: (): userState => ({
        token: sessionStorage.getItem('token') as string
    }),
    getters: {
    },
    actions: {
        saveToken(token: string) {
            this.token = token
            this.saveTokenToLocalge(this.token)
        },
        // 持久化存储token
        saveTokenToLocalge(token: string) {
            sessionStorage.setItem('token', token)
        }
    }
})