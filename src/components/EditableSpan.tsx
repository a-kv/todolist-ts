import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    onChange: (newValue: string) => void //save data and send to the top
}

function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false); //create local state
    let [newTitle, setNewTitle] = useState<string>(props.value)

    const activeEditMode = () => {
        setEditMode(true);
        setNewTitle(props.value);
    }
    const deActiveEditMode = () => {
        setEditMode(false)
        // props.onChange(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.onChange(newTitle);
            deActiveEditMode();
        }
    }
    return (
        editMode
            ? <input
                value={newTitle}
                autoFocus={true}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                onBlur={deActiveEditMode} //action when cursor det out input
            /> // or just autoFocus without value
            : <span onDoubleClick={activeEditMode}>{props.value}</span>
    )
}

export default EditableSpan;