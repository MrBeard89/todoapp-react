import { useState } from 'react'
import './App.css'

function App() {
  const [newTask, setNewTask] = useState('')
  const [todoList, setTodoList] = useState([])

  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  const addTask = () => {
    if (newTask.length === 0) {
      return false
    }
    const task = {
      id: todoList.length === 0 ? +1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    }
    setTodoList([...todoList, task])
    console.log(todoList, task)
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id)
    setTodoList(newTodoList)
  }

  const completedTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true }
        } else {
          return task
        }
      })
    )
    console.log(todoList)
  }
  return (
    <div className='App'>
      <div className='container'>
        <h1>React Todo List</h1>
        <form method='#' action='#' className='input_container'>
          <input
            maxLength='40'
            className='input form-control'
            placeholder='Get started with Todos...'
            required
            onChange={handleChange}
          />

          <button className='btn btn-primary' onClick={addTask}>
            Add
          </button>
        </form>

        <div className='list_container'>
          {todoList.map((task, key) => {
            return (
              <div key={key} className='list_component'>
                <h2
                  style={{ backgroundColor: task.completed ? 'rgba(11,55,225, 0.908)' : 'white' }}
                >
                  {task.taskName}
                </h2>
                <div className='buttons'>
                  <button className='btn btn-info' onClick={() => completedTask(task.id)}>
                    Done
                  </button>
                  <button className='btn btn-danger' onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
          {todoList.length === 0 ? '' : <span className='counter'>{todoList.length}</span>}
        </div>
      </div>
    </div>
  )
}

export default App
