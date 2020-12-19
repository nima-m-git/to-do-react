import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';

import { TaskForm } from './Forms';
import Task from './Task';

import { motion, AnimatePresence } from 'framer-motion';

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
                    <p style={{ 'textDecoration': 'underline' }}>Tasks</p>
                    <button className='new-btn' 
                        onClick={() => {
                            setTaskForm({
                                show: (!taskForm.show),
                                action: 'new'
                            });
                        }
                    }>{(taskForm.show) ? '-' : '+'}</button>
                </motion.div>

                <AnimatePresence exitBeforeEnter>
                    {taskForm.show && 
                        <TaskForm 
                            action={(taskForm.action === 'new') ? addTask : updateTask} 
                            task={taskForm.selected} 
                            exitForm={() => setTaskForm({ show: false })}
                        /> 
                    }
                </AnimatePresence>
                    
                <motion.ul
                    className='tasksList'
                    layout
                    variants={variants}
                    initial='closed'
                    animate='open'
                    exit='closed'
                    key='list'
                >
                    {Object.entries(tasks).map(([taskTitle, task], i) => (
                        <Task 
                            task={task} 
                            tasks={tasks} 
                            setTasks={setTasks} 
                            setTaskForm={setTaskForm}
                            key={i} 
                        />
                    ))}
                </motion.ul>
            </div>
        </motion.div>
    )
}


export default Tasks