import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {RemoveTodolistActionType} from "./todolists-reducer";

// export type RemoveTasksActionType = {
//     type: 'REMOVE-TASK'
//     taskId: string
//     todolistId: string
// }
export type AddTasksActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string

}


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            /*let {[action.id]: [], ...rest} = {...state}
            return rest*/
        }

        default:
            throw new Error("I don't understand this type")
    }
}

type ActionsType = RemoveTasksACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | changeTaskTitleACType
    | addTodolistACType
    | RemoveTodolistACType
    | RemoveTodolistActionType

type RemoveTasksACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', taskId, todolistId
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK', title, todolistId
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE", taskId, title, todolistId
    } as const
}

type addTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (todolistId: string) => {
    return {
        type: "ADD-TODOLIST", todolistId
    } as const
}

type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST", id
    } as const
}

//export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType =>  ({type: 'REMOVE-TASK', taskId, todolistId}) as const
//export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>