import React, {useCallback} from 'react';
import {UniversalCheckBox} from "./UniversalCheckBox";
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
                                    changeTaskTitle,
                                    changeTaskStatus
                                }: TaskPropsType) => {

    console.log('Task')

    const onClickHandler = () => removeTask(task.id)

    const onChangeHandler = (checkedValue: boolean, taskId: string) => {
        changeTaskStatus(task.id, checkedValue)
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle, task.id])

    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <UniversalCheckBox callback={(checkedValue: boolean) => onChangeHandler(checkedValue, task.id)}
                               checked={task.isDone}/>
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <button onClick={onClickHandler}>x</button>
        </div>
    );
});

