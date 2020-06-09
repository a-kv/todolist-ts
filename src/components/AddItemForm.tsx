import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        {
            setNewTaskTitle(e.currentTarget.value)
        }
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
            <TextField variant='outlined'
                       value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={'Field is required'}

                // className={error ? 'error' : ''}
            />
            <IconButton color={"primary"} onClick={addItem}><AddBox/></IconButton>
            {/*<Button variant='contained' color='primary' onClick={addItem}>+</Button>*/}
            {/*{error && <div className='error-message'>Field is required</div>}*/}
        </div>
    );

}

export default AddItemForm;
