import { defineStore } from 'pinia'

export interface setting {
    updateSystemSetting: string
}
export const useSetting = defineStore('setting', {
    state: (): setting => ({
        updateSystemSetting: 'default'
    }),
    getters: {
    },
    actions: {
        setUpdateSystemSetting(val: string) {
            this.updateSystemSetting = val
        }
    }
})