import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {
        'API-KEY': '7bb2e83b-e2d3-4826-936e-3aa87ef57425'
    },
    withCredentials: true
})

export const todolistApi = {
    getTodo() {
     return  instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title:string) {
        return  instance.post<BaseResponseType<{item: TodoType}>>('todo-lists', {title})
    },
    deleteTodo(todolistId:string) {
        return  instance.delete<BaseResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    // updateTodolistsTitle(todolistId:string,title:string) {
    //     return   instance.put<BaseResponseType,AxiosResponse<BaseResponseType>,{title:string}>(`todo-lists/${todolistId}`, {title})
    // }
}
type TodoType = {
    addedDate: string
    id: string
    order:number
    title: string
}


type BaseResponseType<T> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}