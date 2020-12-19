import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

import { TaskForm } from './Forms';
import { ConfirmDelete } from './ConfirmDelete';

import { motion, AnimatePresence } from 'framer-motion';

const item = {
    closed: {
        opacity: 0,
        translateY: 40,
    },
    open: {
        opacity: 1,
        translateY: 0,
    },
}

const variants = {
    open: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.15, 
            delayChildren: 0.1,

        },
    },
    closed: {
        opacity: 0,
        transition: { 
            staggerChildren: 0.15, 
            staggerDirection: -1,
            wait: 'afterChildren' 
        },
    }
};

const containerVariants = {
    open : {
        scale: 1,
        opacity: 1,
    },
    closed: {
        opacity: 0,
        originX: 0.8,
        originY: 0,
        scale: 0,
        transition: {
            delay: 0.3,
            wait: 'afterChildren'
        }
    }
}

const formVariants = {
    open : {
        scale: 1,
        opacity: 1,
    },
    closed: {
        opacity: 0,
        originX: 0.8,
        originY: 0,
        scale: 0,
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
        <motion.div 
            layout
            className='tasksContainer'
            variants={containerVariants}
            initial='closed'
            animate='open'
            exit='closed'
            key='container'
        >
            <div className='tasks'>
                <motion.div className='head-bar' layout>
                    <p style={{ 'text-decoration': 'underline' }}>Tasks</p>
                    <button className='new-btn' 
                        onClick={() => {
                            setTaskForm({
                                show: (taskForm.show) ? false : true,
                                action: 'new'
                            });
                        }
                    }>{(taskForm.show) ? '-' : '+'}</button>
                </motion.div>

                <AnimatePresence exitBeforeEnter>
                    {taskForm.show && 
                        <motion.div
                            transition={{ ease: 'easeIn' }}
                            variants={formVariants}
                            initial='closed'
                            animate='open'
                            exit='closed'
                            key='form'
                            layout
                        >
                            <TaskForm 
                                action={(taskForm.action === 'new') ? addTask : updateTask} 
                                task={taskForm.selected} 
                                exitForm={() => setTaskForm({ show: false })}
                            /> 
                        </motion.div>
                    }
                </AnimatePresence>
                    
                <motion.ul
                    layout
                    variants={variants}
                    initial='closed'
                    animate='open'
                    exit='closed'
                    key='list'
                >
                    {Object.entries(tasks).map(([taskName, taskObj]) => (
                            <motion.li 
                                key={taskName}
                                variants={item}
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
                </motion.ul>
            </div>
        </motion.div>
    )
}


export default Tasks