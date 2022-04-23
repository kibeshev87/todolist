import {TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: todolistsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
        return state.map(el=>el.id === action.payload.id ? {...el, title: action.payload.title} : el )
        }
        default:
            return state
    }
}

type todolistsReducerType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string ) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id, title
        }
    } as const
}