import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import '../App.css';
import {FilterValueType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

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
    changeTitle: (taskId: string, title: string, todoListId: string) => void
}

function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onComplitedClickHandler = () => props.changeFilter('completed', props.id);

    return (
        <div className="Todolist">
            <div>
                <h3>{props.title}</h3>
                <AddItemForm addItem={addTask}/>
                <div>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTaskTitle = (title: string) => {
                                props.changeTitle(t.id, title, props.id)
                            }

                            return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox color="primary"
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <EditableSpan value={t.title} onChange={onChangeTaskTitle}/>
                                <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
                            </div>
                        })
                    }
                </div>
                <div>
                    <Button color={"default"} className={props.filter === 'all' ? 'active-filter' : ''}
                            onClick={onAllClickHandler}>All
                    </Button>
                    <Button color={"secondary"} className={props.filter === 'active' ? 'active-filter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button color={"primary"} className={props.filter === 'completed' ? 'active-filter' : ''}
                            onClick={onComplitedClickHandler}>Completed
                    </Button>
                </div>

            </div>
        </div>
    );

}

export default Todolist;
