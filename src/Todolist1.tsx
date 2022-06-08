import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {TodolistType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist1({todolist}: PropsType) {

    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }


    const dispatch = useDispatch()


    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(id))
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }

    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(id, 'completed'))

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type={"checkbox"}
                               onChange={onChangeHandler}
                               checked={t.isDone}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <button onClick={onClickHandler}>X</button>
                    </div>
                })
            }
        </div>
        <div>
            <button className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


