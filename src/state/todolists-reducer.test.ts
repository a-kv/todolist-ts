import {
    ActionType,
    addTodolistAC,
    changeTodolistFilterAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType, FilterValuesType} from '../App';
//ok
test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
//ok
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState,  addTodolistAC(newTodoListTitle))
        // { type: 'ADD-TODOLIST', title: newTodoListTitle}) вместо готового объеката вызываем функцию. которая возвращает этот объект

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});
//ok
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist Title";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,// можно типизировать action или добавить к типу as const
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
//ok
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2, //  <<<
        filter: newFilter //  <<<
    };

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2)); // отдаем параметры из ActionType <<<

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

