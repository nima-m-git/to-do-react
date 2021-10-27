import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const formVariants = {
  open: {
    scale: 1,
    opacity: 1,
  },
  closed: {
    opacity: 0,
    originX: 0.8,
    originY: 0,
    scale: 0,
  },
};

const FormContainer = (props) => (
  <motion.div
    layout
    transition={{ fade: 'easeIn' }}
    variants={formVariants}
    initial="closed"
    animate="open"
    exit="closed"
    key="form"
  >
    {props.children}
  </motion.div>
);

const GroupForm = ({ addGroup, exitForm }) => {
  const [title, setTitle] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    addGroup(title);
    exitForm();
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </FormContainer>
  );
};

const TaskForm = ({ action, task, exitForm }) => {
  const [taskForm, setTaskForm] = useState({
    title: task?.title,
    note: task?.note,
  });

  const onSubmit = (e) => {
    const finalTask = {
      ...taskForm,
      id: task?.id || uuidv4(),
    };
    e.preventDefault();
    action(finalTask);
    exitForm();
  };

  useEffect(() => {
    setTaskForm({
      title: task?.title,
      note: task?.note,
    });
  }, [task]);

  return (
    <FormContainer>
      <form onSubmit={onSubmit} className="taskForm">
        <label>
          Title:
          <input
            type="text"
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            value={taskForm.title || ''}
          />
        </label>
        <label>
          Note:
          <textarea
            rows={3}
            onChange={(e) => setTaskForm({ ...taskForm, note: e.target.value })}
            value={taskForm.note || ''}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </FormContainer>
  );
};

export { GroupForm, TaskForm };
