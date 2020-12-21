import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { TaskForm } from './Forms';
import Task from './Task';


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
    const [sorted, setSorted] = useState(null);
    const [taskForm, setTaskForm] = useState({
        show: false,
        action: null,
        selected: null,
    });

    const manageTask = {
        addTask: (task) => setTasks(tasks => [...tasks, task]),
        updateTask: (taskToUpdate) => setTasks(tasks.map(task => (task.id === taskToUpdate.id) ? taskToUpdate : task)),
        removeTask: (taskToRemove) => setTasks(tasks.filter(task => task.id !== taskToRemove.id)),
    }

    const orderByComplete = () => {
        if (!sorted) {
            setTasks([...tasks].sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed) ? 1 : -1));
        } else {
            setTasks([...tasks].sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed) ? -1 : 1));
        }
        setSorted(!sorted);
    }

    const removeCompleted = () => {
        tasks.filter(task => task.completed).forEach(task => manageTask.removeTask(task));
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
                <motion.div layout>
                    <div className='head-bar'>
                        <p style={{ 'textDecoration': 'underline' }}>Tasks</p>
                        <button className='new-btn' 
                            onClick={() => {
                                setTaskForm({
                                    show: (!taskForm.show),
                                    action: 'new'
                                });
                            }
                        }>{(taskForm.show) ? '-' : '+'}</button>
                    </div> 
                    <div className='manage-bar'>
                        <button onClick={() => orderByComplete()}>Sort</button>
                        <button onClick={() => removeCompleted()}>Remove Completed</button>
                    </div>
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
                    variants={variants}
                    initial='closed'
                    animate='open'
                    exit='closed'
                    key='list'
                    layout
                >
                    {tasks.map((task, i) => (
                        <Task 
                            task={task} 
                            removeTask={manageTask.removeTask}
                            updateTask={manageTask.updateTask}
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