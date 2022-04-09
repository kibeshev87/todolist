import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {Modal} from "./components/Modal";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    const removeTask = (id: string, todolistId: string) => {
        /*
                let todolistTasks = tasks[todolistId];
                tasks[todolistId] = todolistTasks.filter(t => t.id != id);
                setTasks({...tasks});
        */
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    const addTodolist = (newTitle: string) => {
        let newID = v1()
        setTodolists([{id: newID, title: newTitle, filter: "all"}, ...todolists])
        setTasks({...tasks, [newID]: []})
    }

    const updateTask = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ?
                {...el, title: newTitle} : el)
        })
    }

    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ?
            {...el, title: newTitle} :
            el))
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
    }

    return (
        <div className="App">

            {/*<Modal title={'New data'}>*/}
            {/*    <div>dddddddddd</div>*/}
            {/*    <h3>H3</h3>*/}
            {/*    <input type="text"/>*/}
            {/*    <button>X</button>*/}
            {/*</Modal>*/}

            {/*<Modal title={'Data22222'}>*/}
            {/*    <h3>H3</h3>*/}
            {/*    <input type="checkbox"/>*/}
            {/*</Modal>*/}



            <AddItemForm callBack={addTodolist}/>

            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                })
            }


        </div>
    )
}

export default App;
