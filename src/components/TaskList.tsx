import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;

    const newTask = [...tasks];

    let newRandomId = Math.random() * (1000 - 1) + 1;

    for(let i = 0; i < newTask.length; i++){
      if(newTask[i].id === newRandomId){
        newRandomId = Math.random() * (1000 - 1) + 1;
        i = 0;
      }
      if(newTask[i].title === newTaskTitle) return;
    }

    newTask.push({
      id: newRandomId, 
      title: newTaskTitle, 
      isComplete: false
    });

    setTasks(newTask);
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTask = [...tasks];
    newTask.map( tk => {
      if(tk.id === id){
        tk.isComplete = !tk.isComplete;
      }
    });

    setTasks(newTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTask = [...tasks];
    newTask.map( (tk, index) => {
      if(tk.id === id){
        newTask.splice(index, 1);
      }
    });

    setTasks(newTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}