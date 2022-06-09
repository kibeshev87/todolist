import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = React.memo(({
                                    task,
                                    removeTask,
                                    changeTaskStatus,
                                    changeTaskTitle
                                }: TaskPropsType) => {

    console.log('Task')

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle, task.id])

    return (
        <div key={task.id}
             className={task.isDone ? "is-done" : ""}>
            <input type={"checkbox"}
                   onChange={onChangeHandler}
                   checked={task.isDone}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <button onClick={onClickHandler}>X</button>
        </div>
    )
})

