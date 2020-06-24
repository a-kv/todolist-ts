import {FilterValuesType, TodoListType,} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType,
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    id: string
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType;

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id); //пробегаемся по массиву с тудулистами и сравниваем id тудулиста с тем id, что пришел в action
        case 'ADD-TODOLIST':
            let newTodoList = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            } // создаем новый тудулист
            return [...state, newTodoList] // разворачиваем стейт и кладем туда новый Todolist
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) { // псевдоистина true
                todolist.title = action.title; // не имьютабельно меняем тайтл
                return [...state];
            }
            return state;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state];
            }
            return state;
        }
        default:
            return state;

    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()} // в момент создания объекта экшон присв ему ай ди
}

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
