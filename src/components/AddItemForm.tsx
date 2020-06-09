import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        {setNewTaskTitle(e.currentTarget.value)}
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div className="addItemForm">
            <input
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>Field is required</div>}
        </div>
    );

}

export default AddItemForm;
