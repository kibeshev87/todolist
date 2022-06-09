import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {RemoveTodolistAC} from "./state/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type Task1PropsType = {
    task: TaskType
    todolistId: string
}

export const Task1 = React.memo(({task, todolistId}: Task1PropsType) => {

    const {id, isDone, title} = task
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId));
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [dispatch, id])

    return (
        <div key={id}
             className={isDone ? "is-done" : ""}>
            <input type={"checkbox"}
                   onChange={onChangeHandler}
                   checked={isDone}
            />

            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            <button onClick={onClickHandler}>X</button>
        </div>
    )
})

