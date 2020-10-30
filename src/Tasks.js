import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

import { TaskForm } from './Forms';


function Tasks({ group, updateGroupTasks }) {
    const [tasks, setTasks] = useImmer(group.tasks || {});
    const [taskForm, setTaskForm] = useState({
        show: false,
        action: null,
        selected: null,
    });

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

    const removeTask = (taskName) => {
        setTasks(draft => {
            delete draft[taskName];
        })
    }

    const completeTaskToggle = (task) => {
        setTasks(draft => {
            draft[task].completed = (tasks[task].completed) ? false : true;
        })
    }

    useEffect(() => {
        updateGroupTasks({ group, tasks });
    }, [tasks, updateGroupTasks, group])
 
    return (
        <div>
            <div className='tasks'>
                <div className='head-bar'>
                    <p>Tasks</p>
                    <button className='new-btn' 
                        onClick={() => {
                            setTaskForm({
                                show: true,
                                action: 'new'
                            });
                        }
                    }>+</button>
                </div>
                <ul>
                    {Object.entries(tasks).map(([taskName, taskObj]) => {
                        return (
                            <li key={taskName} className='task'>
                                <button className='remove-btn' onClick={() => setTasks(draft => draft = removeTask(taskName))}>x</button>
                                <p className={(taskObj.completed) ? 'title crossed' : 'title'} onClick={() => {
                                    setTaskForm({
                                        show: true,
                                        action: 'update',
                                        selected: taskObj,
                                    });
                                }
                                }>{taskName}</p>
                                <button className='complete-btn' onClick={() => completeTaskToggle(taskName)}>&#10003;</button>
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