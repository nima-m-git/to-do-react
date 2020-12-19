import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
};


function GroupForm ({ addGroup, exitForm, }) {
    const [title, setTitle] = useState('');
    const onSubmit = () => {
        addGroup(title);
        exitForm();
    };

    return (
        <motion.div
            layout
            transition={{ fade: 'easeIn' }}
            variants={formVariants}
            initial='closed'
            animate='open'
            exit='closed'
            key='form'
        >
            <form onSubmit={onSubmit}>
                <label>Title:
                    <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                </label>
                <input type='submit' value='Submit' />
            </form>
        </motion.div>
    )
};


function TaskForm ({ action, task, exitForm, }) {
    const [taskForm, setTaskForm] = useState({
        title: task?.title,
        note: task?.note,
    })

    const onSubmit = () => {
        action(taskForm);
        exitForm();
    }

    useEffect(() => {
        setTaskForm({
            title: task?.title,
            note: task?.note,
        })
    }, [task])

    return (
        <motion.div
            transition={{ ease: 'easeIn' }}
            variants={formVariants}
            initial='closed'
            animate='open'
            exit='closed'
            key='form'
            layout
        >
            <form onSubmit={onSubmit} className='taskForm'>
                <label>Title:
                    <input type='text' onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })} value={taskForm.title || ''}/>
                </label>
                <label>Note:
                    <textarea rows={3} onChange={(e) => setTaskForm({ ...taskForm, note: e.target.value })} value={taskForm.note || ''}/>
                </label>
                <input type='submit' value='Submit'/>
            </form>
        </motion.div>
    )
};

export { GroupForm, TaskForm, }