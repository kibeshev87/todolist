import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type SecondTasksActionType = {
    type: ''
}

type ActionsType = RemoveTasksACType
    | AddTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.todolistId)
            }
        }

        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    isDone: action.isDone
                } : task)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
                return copyState
        }

        default:
            return state
    }
}

export type RemoveTasksACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistId
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId
    } as const
}




//export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasksActionType =>  ({type: 'REMOVE-TASK', taskId, todolistId}) as const
//export type RemoveTasksActionType = ReturnType<typeof removeTaskAC>
//
// case "CHANGE-TASK-STATUS": {
//     return {
//         ...state, [action.todolistId]: state[action.todolistId]
//             .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)
//     }
// }
// case "CHANGE-TASK-TITLE": {
//     return {
//         ...state, [action.todolistId]: state[action.todolistId]
//             .map(el => el.id === action.taskId ? {...el, title: action.title} : el)
//     }
// }
// case "ADD-TODOLIST": {
//     return {
//         ...state, [action.todolistId]: []
//     }
// }
// case "REMOVE-TODOLIST": {
//     let copyState = {...state}
//     delete copyState[action.id]
//     return copyState
//     /*let {[action.id]: [], ...rest} = {...state}
//     return rest*/
// }
