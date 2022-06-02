import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string

}
export type SecondTasksActionType = {
    type: ''
}

type ActionsType = RemoveTasksActionType | SecondTasksActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }

        case '':
            return state
        //     ...state,
        //     [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
        // }
        default:
            return state
    }
}

type RemoveTasksACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}

type SecondTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return {
        type: ''
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
