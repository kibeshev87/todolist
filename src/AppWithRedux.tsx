import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist1} from './Todolist1';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



    const dispatch = useDispatch()


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        let action = RemoveTodolistAC(id)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(id, title))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    // let allTodolistTasks = tasks[tl.id];
                    // let tasksForTodolist = allTodolistTasks;
                    //
                    // if (tl.filter === "active") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                    // }
                    // if (tl.filter === "completed") {
                    //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                    // }

                    return <Todolist1
                        key={tl.id}
                        todolist={tl}//при использовании Todolist1
                        // id={tl.id}
                        // title={tl.title}
                        // tasks={tasks[tl.id]}
                        // removeTask={removeTask}
                        // changeFilter={changeFilter}
                        // addTask={addTask}
                        // changeTaskStatus={changeStatus}
                        // filter={tl.filter}
                        // removeTodolist={removeTodolist}
                        // changeTaskTitle={changeTaskTitle}
                        // changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default AppWithRedux;
