let tasksData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

let dragElement = null;

// LOAD FROM LOCAL STORAGE

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach(task => {
            const div = document.createElement("div"); // FIX

            div.classList.add("task");
            div.setAttribute("draggable", "true");
            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
            `;

            column.appendChild(div);

            div.addEventListener("dragstart", () => { // FIX
                dragElement = div;
            });

            div.addEventListener("dragend", () => {
                dragElement = null;
            });

            div.querySelector("button").addEventListener("click", () => {
                div.remove();
                updateTaskCounts();
            });
        });
    }
}

// EXISTING TASK DRAG EVENTS

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

    task.addEventListener("dragend", () => {
        dragElement = null;
    });
});

// UPDATE COUNTS + STORAGE

function updateTaskCounts() {
    tasksData = {};

    [todo, progress, done].forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            };
        });

        count.innerText = tasks.length;
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}


// COLUMN DRAG EVENTS

function addDragEventsOnColumns(column) {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("dragenter", () => {
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");
        updateTaskCounts();
    });
}

addDragEventsOnColumns(todo);
addDragEventsOnColumns(progress);
addDragEventsOnColumns(done);

// MODAL CONTROLS

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addNewTask = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

// ADD NEW TASK

addNewTask.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-inp").value;
    const taskDesc = document.querySelector("#task-desc-inp").value;

    if (taskTitle.trim() === "") return;

    const div = document.createElement("div");
    div.setAttribute("draggable", true);
    div.classList.add("task");
    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button>Delete</button>
    `;

    todo.appendChild(div);

    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    div.addEventListener("dragend", () => {
        dragElement = null;
    });

    div.querySelector("button").addEventListener("click", () => {
        div.remove();
        updateTaskCounts();
    });

    updateTaskCounts();
    modal.classList.remove("active");

    document.querySelector("#task-title-inp").value = "";
    document.querySelector("#task-desc-inp").value = "";
});

updateTaskCounts();
