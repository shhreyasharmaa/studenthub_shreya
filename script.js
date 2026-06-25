let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") return;

    tasks.push({ text: task, done: false });

    saveTasks();
    displayTasks();

    input.value = "";
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        taskList.innerHTML += `
        <li>
            <input type="checkbox" ${task.done ? "checked" : ""} 
                onclick="toggleTask(${index})">

            <span style="text-decoration:${task.done ? "line-through" : "none"}">
                ${task.text}
            </span>

            <button onclick="deleteTask(${index})">❌</button>
        </li>
        `;
    });
}

displayTasks();

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    let title = document.getElementById("noteTitle").value;
    let text = document.getElementById("noteText").value;

    if (title === "" || text === "") return;

    notes.push({ title, text });

    saveNotes();
    displayNotes();

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    displayNotes();
}

function editNote(index) {
    let newTitle = prompt("Edit title", notes[index].title);
    let newText = prompt("Edit note", notes[index].text);

    if (newTitle && newText) {
        notes[index].title = newTitle;
        notes[index].text = newText;

        saveNotes();
        displayNotes();
    }
}

function displayNotes() {
    let container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach((note, index) => {
        container.innerHTML += `
        <div class="note-card" onclick="editNote(${index})">
            <h4>${note.title}</h4>
            <p>${note.text}</p>
            <button onclick="event.stopPropagation(); deleteNote(${index})">❌</button>
        </div>
        `;
    });
}

displayNotes();

container.innerHTML += `
<div class="note-card">

<h4>${note.title}</h4>

<p>${note.text}</p>

<button onclick="deleteNote(${index})">
🗑️
</button>

</div>
`;
