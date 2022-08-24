import { defineStore } from 'pinia'

export interface mangeState {
    popuVisible: boolean
}
export const useManage = defineStore('manage', {
    state: (): mangeState => ({
        popuVisible: false
    }),
    getters: {
    },
    actions: {
        setPopupVisible(visible: boolean) {
            this.popuVisible = visible
        }
    }
})