import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTudolists] = useState<TodolistType[]>([
        {id: todolistID1, title: "what to learn", filter: 'all'},
        {id: todolistID2, title: "what to buy", filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID:string,taskId: string) {
        /*        let filteredTasks = tasks.filter(t => t.id != id);
                setTasks(filteredTasks);*/
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(f=>f.id!==taskId)})

    }

    function addTask(todolistID:string,title: string) {
                let newTasks = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:[newTasks,...tasks[todolistID]] })
    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        /*        let task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.isDone = isDone;
                }
                setTasks([...tasks]);*/
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(m=>m.id===taskId ? {...m,isDone}: m)})
    }


    function changeFilter(todolistID:string, value: FilterValuesType) {
        /*        setFilter(value);*/
        setTudolists(todolists.map(m=>m.id===todolistID ? {...m,filter: value}: m))
    }
const removeT=(todolistID:string)=> {
        setTudolists(todolists.filter(f=>f.id!==todolistID))
    delete tasks [todolistID]
    }

    return (
        <div className="App">
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist title="What to learn"
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={m.filter}
                              key={m.id}
                              todolistID={m.id}
                              removeT={removeT}
                    />
                )
            })}
        </div>
    )
}

export default App;
