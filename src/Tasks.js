import { useImmer } from 'use-immer';
const { useState, useEffect } = require("react");


function Tasks(group) {
    const [tasks, setTasks] = useImmer(JSON.parse(localStorage.getItem(group)).tasks);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        localStorage.setItem(group, JSON.stringify(group, tasks));
    })

    
    const removeTask = (task) => Object.keys(tasks).reduce((object, key) => {
        if (key !== task) {
            object[key] = tasks[key]
        }
        return object
    }, {})


    const completeTaskToggle = (task) => {
        setTasks(draft => {
            draft[task].completed = (tasks[task].completed) ? false : true;
        })
    }

    const updateTask = (task) => {
        setTasks(draft => {
            draft[selectedTask] = task;
        })
    }
        

    return (
        <div>
            <div className='tasks'>
                <button onClick={() => setShowTaskForm(true)}>+</button>
                <ul>
                    {tasks.map((task) => {
                        <li>
                            <button onClick={() => setTasks(draft => draft = removeTask(task))}>x</button>
                            <button onClick={() => completeTaskToggle(task)}>Complete</button>
                            <p onClick={() => setSelectedTask(task)}>{task.name}</p>
                        </li>
                    })}
                </ul>
            </div>
            { showTaskForm && <TaskForm /> }
            { selectedTask && <ExpandedTask task={selectedTask} updateTask={updateTask}/> }
        </div>
    )
}