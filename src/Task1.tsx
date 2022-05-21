import React, {useCallback} from 'react';
import {UniversalCheckBox} from "./UniversalCheckBox";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type Task1PropsType = {
    task: TaskType
    todolistId: string
}

export const Task1 = React.memo(({task, todolistId}: Task1PropsType) => {

    const {id, isDone, title} = task

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))

    const onChangeHandler = (isDone: boolean, taskId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
       dispatch(changeTaskTitleAC(id, newValue, todolistId))
    }, [dispatch, id])

    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <UniversalCheckBox callback={(isDone: boolean) => onChangeHandler(isDone, task.id)}
                               checked={task.isDone}/>
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <button onClick={onClickHandler}>x</button>
        </div>
    );
});

