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
    const [tasks, setTasks] = useState(group.tasks || []);
    const [taskForm, setTaskForm] = useState({
        show: false,
        action: null,
        selected: null,
    });

    const manageTask = {
        addTask: (task) => {
            setTasks(tasks => [...tasks, task]);
        },
        updateTask: (taskToUpdate) => {
            setTasks(tasks.map(task => (task.id === taskToUpdate.id) ? taskToUpdate : task));
        },
        completeTaskToggle: (taskToToggle) => {
            const taskToUpdate = {
                ...taskToToggle,
                completed: !taskToToggle.completed,
            }
            manageTask.updateTask(taskToUpdate);
        },
        removeTask: (taskToRemove) => {
            console.log(taskToRemove)
            setTasks(tasks.filter(task => task.id !== taskToRemove.id));
        },
    }


    const orderTasksByComplete = () => {
        (Object.entries(tasks).map(([taskName, task]) => task).sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed) ? 1 : -1))
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
                
                {/* Head Bar */}
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
                
                {/* Form */}
                <AnimatePresence exitBeforeEnter>
                    {taskForm.show && 
                        <TaskForm 
                            action={(taskForm.action === 'new') ? manageTask.addTask : manageTask.updateTask} 
                            task={taskForm.selected} 
                            exitForm={() => setTaskForm({ show: false })}
                        /> 
                    }
                </AnimatePresence>
                
                {/* Task List */}
                <motion.ul
                    className='tasksList'
                    layout
                    variants={variants}
                    initial='closed'
                    animate='open'
                    exit='closed'
                    key='list'
                >
                    {tasks.map((task, i) => (
                        <Task 
                            task={task} 
                            removeTask={manageTask.removeTask}
                            completeTaskToggle={manageTask.completeTaskToggle}
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