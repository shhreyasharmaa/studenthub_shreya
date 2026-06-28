import { useState, useEffect } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: input,
        done: false,
      },
    ]);

    setInput("");
  }

  function toggleTask(index) {
    const updatedTasks = [...tasks];

    updatedTasks[index].done = !updatedTasks[index].done;

    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);

    setTasks(updatedTasks);
  }

  return (
    <div className="card">
      <h2>Task Manager ✨</h2>

      <input
        type="text"
        placeholder="Add a task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(index)}
            />

            <span
              style={{
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>

            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;