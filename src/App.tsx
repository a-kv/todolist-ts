import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType> //ассоциативный массив
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

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todo = todoLists.find(tl => tl.id === todoListId);
        if (todo) {
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
        // let todoTist = tasks[todoListId];
        let task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTitle(taskId: string, title: string, todoListId: string) {
        let task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }
    function removeTodoList(todoListId: string) {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(newTodoLists);
        delete tasks[todoListId];
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId: string = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }
                    return (
                        <Grid item>
                            <Paper style={{padding: '10px'}}>
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
                                    changeTitle={changeTitle}
                                    removeTodoList={removeTodoList}
                                />
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}


export default App;
