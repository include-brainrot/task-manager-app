// @ts-nocheck
"use client";

import React, { useState } from 'react';
import styles from './BoxRow.module.css';

const BoxRow = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [newRecurringTask, setNewRecurringTask] = useState('');
  const [recurringDays, setRecurringDays] = useState([]);
  const [tasks, setTasks] = useState({
    Sunday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: 'recurring' }],
    Monday: [{ task: 'Task 1', label: 'recurring' }, { task: 'Task 2', label: '' }],
    Tuesday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: 'recurring' }],
    Wednesday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: '' }],
    Thursday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: 'recurring' }],
    Friday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: '' }],
    Saturday: [{ task: 'Task 1', label: '' }, { task: 'Task 2', label: 'recurring' }],
  });

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewRecurringTaskChange = (event) => {
    setNewRecurringTask(event.target.value);
  };

  const handleRecurringDaysChange = (day) => {
    const updatedDays = recurringDays.includes(day)
      ? recurringDays.filter(d => d !== day)
      : [...recurringDays, day];
    setRecurringDays(updatedDays);
  };

  const addNewTask = () => {
    if (newTask) {
      const newTaskObj = { task: newTask, label: '' };
      const updatedTasks = { ...tasks };
      updatedTasks[selectedDay].push(newTaskObj);
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const addNewRecurringTask = () => {
    if (newRecurringTask && recurringDays.length > 0) {
      const newTaskObj = { task: newRecurringTask, label: 'recurring' };
      const updatedTasks = { ...tasks };
      recurringDays.forEach(day => {
        updatedTasks[day] = [...updatedTasks[day], newTaskObj];
      });
      setTasks(updatedTasks);
      setNewRecurringTask('');
      setRecurringDays([]);
    }
  };

  const renderTaskInput = () => (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={handleNewTaskChange}
        placeholder="Enter new task"
      />
      <button onClick={addNewTask}>Add Task</button>
    </div>
  );

  const renderRecurringTaskInput = () => (
    <div>
      <input
        type="text"
        value={newRecurringTask}
        onChange={handleNewRecurringTaskChange}
        placeholder="Enter new recurring task"
      />
      <div>
        {Object.keys(tasks).map((day) => (
          <div key={day}>
            <input
              type="checkbox"
              checked={recurringDays.includes(day)}
              onChange={() => handleRecurringDaysChange(day)}
            />
            {day}
          </div>
        ))}
      </div>
      <button onClick={addNewRecurringTask}>Add Recurring Task</button>
    </div>
  );

  const renderTasksForDay = (day) => (
    <div>
      <h3>{day}</h3>
      {tasks[day].map((taskObj, index) => (
        <div key={index}>{taskObj.task}</div>
      ))}
    </div>
  );

  const renderRecurringTasks = () => {
    const recurringTasks = Object.values(tasks).flat().filter(task => task.label === 'recurring');
    return (
      <div className={styles.recurringTasks}>
        <h2>Recurring Tasks</h2>
        {recurringTasks.map((task, index) => (
          <div key={index}>{task.task}</div>
        ))}
        {renderRecurringTaskInput()}
      </div>
    );
  };

  const renderTasks = () => {
    if (selectedDay !== null) {
      return (
        <div className={styles.tasksBox}>
          <button onClick={() => setSelectedDay(null)}>Back</button>
          {renderTasksForDay(selectedDay)}
          {renderTaskInput()}
        </div>
      );
    }
    return (
      <div className={styles.boxRow}>
        {Object.keys(tasks).map((day) => (
          <div key={day} className={styles.box} onClick={() => handleDayClick(day)}>
            {renderTasksForDay(day)}
          </div>
        ))}
      </div>
    );
  };

  return (
    // <div className={styles.mainContainer}>
    //   {renderTasks()}
    //   {renderRecurringTasks()}
    // </div>
     <div className={styles.container}>
     <div className={styles.dayBox}>
       {/* Day boxes go here... */}
       {Object.keys(tasks).map((day) => (
         <div key={day} className={styles.box} onClick={() => handleDayClick(day)}>
           <h3 className={styles.heading}>{day}</h3>
           {/* List tasks for each day */}
           {tasks[day].map((taskObj, index) => (
             <div key={index} className={styles.taskItem}>
               {taskObj.task}
             </div>
           ))}
         </div>
       ))}
     </div>
     {selectedDay && (
       <div className={styles.tasksBox}>
         <button className={styles.actionButton} onClick={() => setSelectedDay(null)}>
           Back
         </button>
         <h2 className={styles.heading}>{selectedDay} Tasks:</h2>
         {tasks[selectedDay].map((taskObj, index) => (
           <div key={index} className={styles.taskItem}>
             {taskObj.task}
           </div>
         ))}
         <input
           className={styles.taskInput}
           type="text"
           value={newTask}
           onChange={handleNewTaskChange}
           placeholder="Enter new task"
         />
         <button className={styles.actionButton} onClick={addNewTask}>
           Add Task
         </button>
       </div>
     )}
     <div className={styles.recurringBox}>
       <h2 className={styles.heading}>Recurring Tasks</h2>
       {/* List recurring tasks here... */}
       <input
         className={styles.taskInput}
         type="text"
         value={newRecurringTask}
         onChange={handleNewRecurringTaskChange}
         placeholder="Enter new recurring task"
       />
       <div>
         {Object.keys(tasks).map((day) => (
           <label key={day} className={styles.checkboxLabel}>
             <input
               className={styles.recurringCheckbox}
               type="checkbox"
               checked={recurringDays.includes(day)}
               onChange={() => handleRecurringDaysChange(day)}
             />
             {day}
           </label>
         ))}
       </div>
       <button className={styles.actionButton} onClick={addNewRecurringTask}>
         Add Recurring Task
       </button>
     </div>
   </div>
  );
};

export default BoxRow;
