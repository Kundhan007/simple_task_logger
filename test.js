// HTML structure
const app = document.getElementById("app");

// Sample date heading
const heading = document.createElement("h2");
heading.textContent = "Date: Sample Text";
app.appendChild(heading);

// Create a container for the time logger
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "10px";
app.appendChild(container);

// Generate a row dynamically
let snoCounter = 1;

function createRow() {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flexWrap = "wrap";
    row.style.gap = "10px";
    row.style.alignItems = "center";

    // SNO cell
    const sno = document.createElement("div");
    sno.textContent = snoCounter++;
    sno.style.flex = "1";
    sno.style.minWidth = "30px";
    sno.style.fontWeight = "bold";
    row.appendChild(sno);

    // Time (hr) cell
    const time = document.createElement("div");
    time.textContent = "Time (hr)";
    time.style.flex = "2";
    time.style.minWidth = "60px";
    row.appendChild(time);

    // Planned tasks cell
    const planned = createTaskColumn("Planned");
    row.appendChild(planned);

    // Actual tasks cell
    const actual = createTaskColumn("Actual");
    row.appendChild(actual);

    container.appendChild(row);
}

function createTaskColumn(label) {
    const column = document.createElement("div");
    column.style.display = "flex";
    column.style.flexDirection = "column";
    column.style.gap = "5px";
    column.style.flex = "4";
    column.style.minWidth = "120px";

    // Label
    const title = document.createElement("div");
    title.textContent = label;
    title.style.fontWeight = "bold";
    column.appendChild(title);

    // Add initial task
    addTask(column);

    // Add button
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.style.marginTop = "5px";
    addButton.addEventListener("click", () => addTask(column));
    column.appendChild(addButton);

    return column;
}

function addTask(column) {
    const task = document.createElement("input");
    task.type = "text";
    task.placeholder = "Enter task...";
    task.style.padding = "5px";
    task.style.flex = "1";
    column.insertBefore(task, column.lastElementChild);

    // Adjust parent container width dynamically
    adjustColumnWidths();
}

function adjustColumnWidths() {
    const columns = container.querySelectorAll("div > div");
    columns.forEach(column => {
        const tasks = column.querySelectorAll("input");
        const maxWidth = Math.max(...Array.from(tasks).map(task => task.value.length * 8 || 120));
        column.style.minWidth = `${maxWidth}px`;
    });
}

// Generate initial rows
for (let i = 0; i < 4; i++) {
    createRow();
}