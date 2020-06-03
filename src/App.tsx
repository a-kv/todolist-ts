import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'complited';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}
type TasksStateType ={
    [key: string]: Array<TaskType>
}


function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'what to learn', filter: 'all'},
        {id: todoListId2, title: 'what to buy', filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'css', isDone: false},
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'react', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Whiskey', isDone: false},
        ],
    })

    // let [filter, setFilter] = useState<FilterValueType>('all');

    // let tasksForTodoList = tasks;
    // if (filter === 'active') {
    //     tasksForTodoList = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === 'complited') {
    //     tasksForTodoList = tasks.filter(t => t.isDone === true)
    // }
    //
    // function changeFilter(value: FilterValueType) {
    //     setFilter(value)
    // }
    function changeFilter (value: FilterValueType, todoListId: string) {
        let todo = todoLists.find(tl => tl.id === todoListId);
        if(todo){
            todo.filter = value
        }
        setTodoLists([...todoLists]);
    }

    function removeTask(id: string, todoListId: string) {
        let todoList = tasks[todoListId];
        tasks[todoListId] = todoList.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoList = tasks[todoListId];
        tasks[todoListId] = [task, ...todoList]
        setTasks({...tasks});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                }
                if (tl.filter === 'complited') {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );

}

export default App;
