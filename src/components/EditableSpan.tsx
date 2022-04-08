import React, {ChangeEvent, useState} from 'react';

type EditeValuePropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditeValuePropsType) => {
    let [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    let [edite, setEdite] = useState(false)
    const turnOnHandler = () => {
        setEdite(true)
    }
    const turnOffHandler = () => {
        setEdite(false)
        props.callBack(newTitle)
    }


    return (
        edite
            ? <input value={newTitle}
                     autoFocus
                     onChange={onChangeHandler}
                     onBlur={turnOffHandler}/>

            : <span onDoubleClick={turnOnHandler}>{props.title}</span>

    );
};

