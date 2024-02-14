import React from 'react';

import './Styles.css'

export default function Homepage() {
  /**======================
   **   declarations section
   *========================**/
  const [taskInput, setTaskInput] = React.useState('')
  const [tasks, setTasks] = React.useState([
    { id: 1, task: 'task 1', isDone: false },
  ])
  const [edit, setEdit] = React.useState({
    id: '',
    status: false
  })
  /*==== END OF SECTION ====*/


  /**======================
   **    functions section
   *========================**/
  const handleInput = (e) => {
    setTaskInput(e.target.value)
  }
  const addTask = () => {
    if (taskInput === '') {
      alert('Task is empty')
      return
    }
    // if task is exist
    if (tasks.find(task => task.task === taskInput)) {
      alert('Task is already exist')
      return
    }
    setTasks([...tasks, { id: tasks.length + 1, task: taskInput, isDone: false }])
    setTaskInput('')
  }
  const taskEdit = (id) => {
    let findIndex = tasks.findIndex(task => task.id === id)
    setTaskInput(tasks[findIndex].task)
    setEdit({
      id: id,
      status: true
    })
  }
  const updateTask = () => {
    let newTasks = [...tasks]
    let findIndex = newTasks.findIndex(task => task.id === edit.id)
    newTasks[findIndex].task = taskInput
    setTasks(newTasks)
    setEdit({
      id: '',
      status: false
    })
    setTaskInput('')
  }
  const taskDelete = (id) => {
    let newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  const statusChange = (e, id) => {
    let newTasks = [...tasks]
    let findIndex = newTasks.findIndex(task => task.id === id)
    newTasks[findIndex].isDone = e.target.checked
    setTasks(newTasks)
  }
  /*==== END OF SECTION ====*/


  /**======================
   **    render section
   *========================**/
  const renderTasks = (type) => {
    return tasks.map((task, index) => {
      if (type === 'all' || type === 'inprogress' && !task.isDone || type === 'done' && task.isDone || !type) {
        let stylecss = 'activeTask'
        if (task.isDone) stylecss = 'doneTask'
        return (
          <div key={index} className={stylecss}>
            <div className="taskStatus">
              <input type="checkbox" checked={task.isDone} onChange={(e) => { statusChange(e, task.id) }} />
              <span>{task.task}</span>
            </div>
            <div className="taskBtn">
              <button className='editBtn' onClick={() => { taskEdit(task.id) }}>Edit</button>
              <button className='deleteBtn' onClick={() => {taskDelete(task.id)}}>
                del
              </button>
            </div>
          </div>
        )
      }
    })
  }
  /*==== END OF SECTION ====*/


  return (
    <div className='taskBoard'>
      <h2 style={{
        marginTop: '17px',
      }}>Tasks board</h2>
      <div className="taskInput">
        <input type="text" value={taskInput} placeholder='add task' onChange={handleInput} />
        {edit.status ? <button className='btn btn-success' onClick={updateTask}>Update</button> : <button className="btn btn-primary" onClick={addTask}>Add</button>}
      </div>
      <div className='container'>
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Inprogress</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Done</button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            {renderTasks('all')}
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">{renderTasks('inprogress')}</div>
          <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">{renderTasks('done')}</div>
        </div>
      </div>
    </div>
  )
}
