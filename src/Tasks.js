import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

import { TaskForm } from './Forms';
import { ConfirmDelete } from './ConfirmDelete';

import { motion, AnimatePresence } from 'framer-motion';

const animationProps = {
    initial: {
        opacity: 0,
        translateY: 40,
    },
    animate: {
        opacity: 1,
        translateY: 0,
    },
    exit: {
        opacity: 0,
        translateY: 40,
    }
}


function Tasks({ group, updateGroupTasks }) {
    const [tasks, setTasks] = useImmer(group.tasks || {});
    const [taskForm, setTaskForm] = useState({
        show: false,
        action: null,
        selected: null,
    });
    const [removeBox, setRemoveBox] = useState({
        show: false,
        item: null,
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
        <div className='tasksContainer'>
            <div className='tasks'>
                <div className='head-bar'>
                    <p style={{ 'text-decoration': 'underline' }}>Tasks</p>
                    <button className='new-btn' 
                        onClick={() => {
                            setTaskForm({
                                show: true,
                                action: 'new'
                            });
                        }
                    }>+</button>
                </div>
                <AnimatePresence initial={true}>
                    <ul>
                        {Object.entries(tasks).map(([taskName, taskObj], index) => (
                                <motion.li 
                                    key={taskName}
                                    variants={animationProps}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                    transition={{ delay: 0.1*index }}
                                >
                                    <div className='task'>
                                        <button className='remove-btn' onClick={() => setRemoveBox({ show: true, item: taskName, })}>x</button>
                                        <p className={(taskObj.completed) ? 'title crossed' : 'title'} onClick={() => {
                                            setTaskForm({
                                                show: true,
                                                action: 'update',
                                                selected: taskObj,
                                            });
                                        }
                                        }>{taskName}</p>
                                        <button className='complete-btn' onClick={() => completeTaskToggle(taskName)}>&#10003;</button>
                                    </div>
                                    {removeBox.show && (removeBox.item === taskName) &&
                                        <ConfirmDelete 
                                            deleteFunc={removeTask}
                                            deleteItem={removeBox.item}
                                            closeCallback={() => setRemoveBox({ show: false, })}
                                        />
                                    }
                                </motion.li>
                            )
                        )}
                    </ul>
                </AnimatePresence>
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