import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

import { TaskForm } from './Forms';


function Tasks({ group, }) {
    const [tasks, setTasks] = useImmer(JSON.parse(localStorage.getItem(group)).tasks || {});
    const [taskForm, setTaskForm] = useState({
        show: false,
        action: null,
        selected: null,
    });

    useEffect(() => {
        localStorage.setItem(group, JSON.stringify({
            tasks,
        }));

        console.log(taskForm.selected)
    })

    const addTask = (task) => {
        setTasks(draft => {
            draft[task.title] = task;
        })
    }

    const updateTask = (task) => {
        setTasks(draft => {
            delete draft[taskForm.selected.title];
            draft[task.title] = task;
        })
    }

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
 
    return (
        <div>
            <div className='tasks'>
                <p>Tasks</p>
                <button onClick={() => {
                    setTaskForm({
                        show: true,
                        action: 'new'
                    });
                }
                }>+</button>
                <ul>
                    {Object.keys(tasks).map((task) => {
                        return (
                            <li key={task} className='task'>
                                <button onClick={() => setTasks(draft => draft = removeTask(task))}>x</button>
                                <p className='title' onClick={() => {
                                    setTaskForm({
                                        show: true,
                                        action: 'update',
                                        selected: JSON.parse(localStorage.getItem(group)).tasks[task],
                                    });
                                }
                                }>{task}</p>
                                <button onClick={() => completeTaskToggle(task)}>&#10003;</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            {taskForm.show && 
                <TaskForm 
                    action={(taskForm.action === 'new') ? addTask : updateTask} 
                    task={taskForm.selected} 
                    exitForm={() => setTaskForm({ show: false })}
                /> 
            }
        </div>
    )
}


export default Tasks