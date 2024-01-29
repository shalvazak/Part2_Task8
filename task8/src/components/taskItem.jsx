const TaskItem = ({ task, onMove, onDelete, showStartButton, section }) => {
    return (
      <li>
        {task}
        <button onClick={() => onDelete(section)}>Delete</button>
        {section !== 'completed' && <button onClick={() => onMove('completed')}>Finish</button>}
        {showStartButton && section === 'tasks' && <button onClick={() => onMove('inProgress')}>Start</button>}
      </li>
    );
};


export default TaskItem;
