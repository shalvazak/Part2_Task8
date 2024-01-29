import React, { useState } from 'react';
import TaskItem from './components/taskItem';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask('');
  };

  const moveTask = (index, sourceColumn, destinationColumn) => {
    const taskToMove = sourceColumn[index];

    // Remove task from the source column
    const updatedSourceColumn = sourceColumn.filter((_, i) => i !== index);

    // Add task to the destination column
    if (destinationColumn === 'inProgress') {
      setInProgressTasks((prevInProgressTasks) => [...prevInProgressTasks, taskToMove]);
    } else if (destinationColumn === 'completed') {
      setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskToMove]);
    }

    // Update the source column
    if (sourceColumn === tasks) {
      setTasks(updatedSourceColumn);
    } else if (sourceColumn === inProgressTasks) {
      setInProgressTasks(updatedSourceColumn);
    } else if (sourceColumn === completedTasks) {
      setCompletedTasks(updatedSourceColumn);
    }
  };

  const onDelete = (index, section) => {
    // Remove task from the corresponding section
    if (section === 'tasks') {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    } else if (section === 'inProgress') {
      setInProgressTasks((prevInProgressTasks) => prevInProgressTasks.filter((_, i) => i !== index));
    } else if (section === 'completed') {
      setCompletedTasks((prevCompletedTasks) => prevCompletedTasks.filter((_, i) => i !== index));
    }
  };

  ///////////////

  return (
    <div className="container">
      <div className="addTask">
        <input type="text" value={newTask} onChange={handleChange} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="todo-container">

        <div className="notCompleted">
          <h3>Tasks to be Performed</h3>
          <ol>
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onMove={(destination) => moveTask(index, tasks, destination)}
                onDelete={(section) => onDelete(index, section)}
                showStartButton
                section="tasks"
              />
            ))}
          </ol>
        </div>


        <div className="inprogress">
          <h3>In Progress</h3>
          <ol>
            {inProgressTasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onMove={(destination) => moveTask(index, inProgressTasks, destination)}
                onDelete={(section) => onDelete(index, section)}
                section="inProgress"
              />
            ))}
          </ol>
        </div>
        
        <div className="Completed">
          <h3>Completed Works</h3>
          <ol>
            {completedTasks.map((task, index) => (
              <TaskItem
                key={index}
                task={task}
                onDelete={(section) => onDelete(index, section)}
                section="completed"
              />
            ))}
          </ol>
        </div>
      </div>

      
    </div>
  );
};

export default TodoApp;
