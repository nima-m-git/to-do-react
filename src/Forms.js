import { useState, useEffect } from 'react';

function GroupForm ({ addGroup, exitForm, }) {
    const [title, setTitle] = useState('');
    const onSubmit = () => {
        addGroup(title);
        exitForm();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Title:
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <input type='submit' value='Submit' />
        </form>
    )
}


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
        <form onSubmit={onSubmit}>
            <label>Title:
                <input type='text' onChange={(e) => setTaskForm({ title: e.target.value })} value={taskForm.title || ''}/>
            </label>
            <label>Note:
                <input type='textfield' onChange={(e) => setTaskForm({ note: e.target.value })} value={taskForm.note || ''}/>
            </label>
            <input type='submit' value='Submit'/>
        </form>
    )
}

export { GroupForm, TaskForm, }