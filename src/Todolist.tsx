import React, {useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {addTaskTC, fetchTasksTC} from "./store/TasksReducer";
import {
    changeTodolistFilterTC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC
} from "./store/TodolistsReducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType, TodolistType} from "./todolists-api";
import {useAppDispatch} from "./store/hooks";

type PropsType = {
    todolist: TodolistType
    filter: FilterValuesType
    tasks: TaskType[]
}

export const Todolist = React.memo(({todolist, filter, tasks}: PropsType) => {

    const dispatch = useAppDispatch()

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    const addTask = (title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, title))
    }

    const removeTodolist = () => {
        dispatch(removeTodolistTC(todolist.id))
    }

    const onAllClickHandler = () =>
        dispatch(changeTodolistFilterTC(todolist.id, 'all'))
    const onActiveClickHandler = () =>
        dispatch(changeTodolistFilterTC(todolist.id, 'active'))
    const onCompletedClickHandler = () =>
        dispatch(changeTodolistFilterTC(todolist.id, 'completed'))


    return <div>
        <h3>
            <EditableSpan value={todolist.title} onChangeCallback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    /*const onClickHandler = () => dispatch(removeTaskAC(todolistId, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(todolistId, t.id, newIsDoneValue))
                    }
                    const onTitleChangeHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(todolistId, t.id, newTitle))
                    }*/


                    return <li key={t.id}
                               className={t.status === TaskStatuses.Completed ? 'is-done' : ''}
                        /*className={t.isDone ? "is-done" : ""}*/>
                        <Task todolistId={todolist.id} task={t}
                            /*isDone={t.isDone}
                            onClickCallback={onClickHandler}
                            onChangeCallback={onChangeHandler}
                            onTitleCallback={onTitleChangeHandler}*/
                        />
                        {/*<input type="checkbox"
                               onChange={(e)=>onChangeHandler(e.currentTarget.checked, t.id)}
                               checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={()=>onTitleChangeHandler(t.id, t.title)}/>
                        <button onClick={()=>onClickHandler(t.id)}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})


