import { useState } from 'react'
import './App.css'

function App() {
  //States
  const [newTask, setNewTask] = useState('')
  const [selectedTodoArray, setSelectedTodoArray] = useState('all')
  const [todoList, setTodoList] = useState([])
  const [filteredList, setFilteredList] = useState([])

  //HandleEvent
  const handleChange = (event) => {
    setNewTask(event.target.value)
  }

  //Addtask Function
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
    setNewTask('')
  }

  //Delete task function
  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id)
    setTodoList(newTodoList)

    const newFilteredList = filteredList.filter((task) => task.id !== id)
    setFilteredList(newFilteredList)
  }

  //Complete Task function
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

    setFilteredList(
      filteredList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true }
        } else {
          return task
        }
      })
    )
  }

  //Filter Functions
  let filteredTodos = []
  const filterCompleted = () => {
    filteredTodos = todoList.filter((task) => task.completed === true)
    setFilteredList(filteredTodos)
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
            //Controlled input
            onChange={handleChange}
            value={newTask}
          />

          <button className='btn btn-primary' onClick={addTask}>
            Add
          </button>
        </form>

        <div className='list_container'>
          {selectedTodoArray === 'completed'
            ? filteredList.map((task, key) => {
                return filteredList.length > 0 ? (
                  <div key={key} className='list_component'>
                    <h2
                      style={{
                        backgroundColor: task.completed ? 'rgba(11,55,225, 0.908)' : 'white',
                      }}
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
                ) : (
                  <h1
                    key={key}
                    style={{
                      color: 'blue',
                      opacity: '0.5',
                    }}
                  >
                    Nothing here
                  </h1>
                )
              })
            : todoList.map((task, key) => {
                return (
                  <div key={key} className='list_component'>
                    <h2
                      style={{
                        backgroundColor: task.completed ? 'rgba(11,55,225, 0.908)' : 'white',
                      }}
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

          {todoList.length === 0 ? '' : <span className='all-counter'>{todoList.length}</span>}
          {filteredList.length === 0 ? '' : <span className='arrow'>{`>`}</span>}
          {filteredList.length === 0 ? (
            ''
          ) : (
            <span className='filtered-counter'>{filteredList.length}</span>
          )}
          <button
            className='completed'
            onClick={() => (filterCompleted(), setSelectedTodoArray('completed'))}
            style={{ display: todoList.length > 0 ? 'block' : 'none' }}
          >
            Completed
          </button>
          <button
            className='all-todos'
            onClick={() => setSelectedTodoArray('all')}
            style={{ display: todoList.length > 0 ? 'block' : 'none' }}
          >
            All
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
