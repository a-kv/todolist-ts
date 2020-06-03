import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import '../App.css';
import {FilterValueType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
}

function Todolist(props: PropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null )

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        {
            setNewTaskTitle(e.currentTarget.value)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.ctrlKey && e.charCode === 13) {
            props.addTask(newTaskTitle, props.id);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('')
        }else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onComplitedClickHandler = () => props.changeFilter('complited', props.id);


    return (
        <div className="Todolist">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={newTaskTitle}
                        onChange={onNewTitleChangeHandler}
                        onKeyPress={onKeyPressHandler}
                        className={error ?'error': ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className='error-message'>Field is required</div> }
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }

                            return <li key={t.id} className={t.isDone? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'complited' ? 'active-filter' : ''} onClick={onComplitedClickHandler}>Completed</button>
                </div>

            </div>
        </div>
    );

}

export default Todolist;
