import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {addTodolistTC, fetchTodolistsTC,} from "./store/TodolistsReducer";
import {TaskType} from "./todolists-api";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "./store/hooks";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    const todolists = useAppSelector(state => state.todolists)
    let tasks = useAppSelector(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTask = tasks[tl.id]
                    return <Todolist
                        key={tl.id}
                        todolist={tl}
                        filter={tl.filter}
                        tasks={allTodolistTask}
                    />
                })
            }
        </div>
    )
}

export default App
