import {TasksStateType,} from "../App";
import {act} from "react-dom/test-utils";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type ActionType1 = {
    type: 'REMOVE_TASK',
    taskId: string,
    todolistId: string,
}
export type ActionType2 = {
    type: 'ADD_TASK',
    todolistId: string,
    title: string

}
export type ActionType3 = {
    type: 'CHANGE_TASK',
    taskId: string,
    isDone: boolean,
    todolistId: string,

}
export type ChangeTitleActionType = {
    type: 'CHANGE_TITLE',
    taskId: string,
    title: string,
    todolistId: string,

}


export type ActionType = ActionType1 | ActionType2 |ActionType3 | ChangeTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    let copyState={...state};
    switch (action.type) {
        case 'REMOVE_TASK':
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId);
            return copyState;
        case "ADD_TASK":
            let newTask = {
                id: v1(), title: action.title, isDone: false
            }
            copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]]
            return copyState;
        case "CHANGE_TASK":
            copyState[action.todolistId] = copyState[action.todolistId].map(t =>{
                if(t.id !== action.taskId){
                    return t;
                 } else {
                    return {...t, isDone: action.isDone}
                }
            })
           return copyState;
            case "CHANGE_TITLE":
            copyState[action.todolistId] = copyState[action.todolistId].map(t =>{
                if(t.id !== action.taskId){
                    return t;
                 } else {
                    return {...t, title: action.title}
                }
            })
                return copyState;
        case 'ADD-TODOLIST':
            copyState[action.todolistId] = [] // в1 создает новый ключ в массиве и это пустой массив
           return copyState; // создаем в двух местах разные ай ди для одного объекта!!! см todolist-reduser
        case 'REMOVE-TODOLIST':
            delete copyState[action.id];
           return copyState;
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): ActionType1 => {
    return { type: 'REMOVE_TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): ActionType2 => {
    return { type: 'ADD_TASK', todolistId, title}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ActionType3 => {
    return { type: 'CHANGE_TASK', taskId, isDone, todolistId}
}

export const changeTitleStatusAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return { type: 'CHANGE_TITLE', taskId, title, todolistId}
}



