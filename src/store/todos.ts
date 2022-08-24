import { defineStore } from 'pinia'
import { todoItem, ID } from '@/types/todo'
import { todos } from '@/mocks/todos'

export type todolist = {
    todos: todoItem[]
}
export const useTodos = defineStore('todos', {
    state: (): todolist => ({
        todos: todos
    }),
    getters: {
        // 为数据附加key值
        todosWidthKey(state) {
            return state.todos.map(item => Object.assign({ ...item, key: item.id }))
        }
    },
    actions: {
        // 新增数据
        increateItem(info: todoItem) {
            this.todos.unshift(info)
        },
        // 更新勾选
        updateItem(checkIds: ID[]) {
            this.todos = this.todos.map((item: todoItem) => {
                if(checkIds.includes(item.id)) {
                    return { ...item, hasCheck: true}
                } else {
                    return { ...item, hasCheck: false}
                }
            })
        },
        // 更新状态
        updateStatu(id: ID, state: boolean) {
            const res = this.todos.find((item: todoItem) => item.id === id)
            if(res) {
                res.hasCheck = state
            }
        },
        // 删除数据项
        deleteItem(id: ID) {
            const res = this.todos.findIndex((item: todoItem) => item.id === id)
            this.todos.splice(res, 1)
        },
        // 删除所选
        deleteChoose(checkIds: ID[]) {
            checkIds.forEach(item => {
                this.deleteItem(item)
            })
        }
    }
})