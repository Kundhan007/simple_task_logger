// HTML structure
const app = document.getElementById("app");

// Display today's date as the heading
const heading = document.createElement("h2");
const today = new Date().toLocaleDateString("en-GB"); // Day first format
heading.textContent = `Date: ${today}`;
app.appendChild(heading);

// Create a container for the time logger
const container = document.createElement("div");
container.className = "time-logger-container";
app.appendChild(container);

// Add column headers
const headerRow = document.createElement("div");
headerRow.className = "header-row";

const headers = ["SNO", "Time (AM/PM)", "Planned", "Actual"];
headers.forEach(header => {
    const headerDiv = document.createElement("div");
    headerDiv.textContent = header;
    headerDiv.className = header.toLowerCase().replace(/[^a-z]/g, "-") + "-header";
    headerRow.appendChild(headerDiv);
});
container.appendChild(headerRow);

// Generate a row dynamically
let snoCounter = 1;

function createRow(hour) {
    const row = document.createElement("div");
    row.className = "time-logger-row";

    // SNO cell
    const sno = document.createElement("div");
    sno.textContent = snoCounter++;
    sno.className = "sno-cell";
    row.appendChild(sno);

    // Time (hr) cell
    const time = document.createElement("div");
    time.textContent = hour;
    time.className = "time-cell";
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
    column.className = "task-column";

    // // Label above input box
    // const title = document.createElement("div");
    // title.textContent = label;
    // title.className = "task-label";
    // column.appendChild(title);

    // Add initial task
    addTask(column);

    // Add button
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.className = "add-task-button";
    addButton.addEventListener("click", () => addTask(column));
    column.appendChild(addButton);

    return column;
}

function addTask(column) {
    const task = document.createElement("input");
    task.type = "text";
    task.placeholder = "Enter task...";
    task.className = "task-input";
    column.insertBefore(task, column.lastElementChild);

    // Adjust parent container width dynamically
    adjustColumnWidths();
}

function adjustColumnWidths() {
    const columns = container.querySelectorAll(".task-column");
    columns.forEach(column => {
        const tasks = column.querySelectorAll(".task-input");
        const maxWidth = Math.max(...Array.from(tasks).map(task => task.value.length * 8 || 120));
        column.style.minWidth = `${maxWidth}px`;
    });
}

// Generate initial rows with hours from 8:00 AM to 12:00 PM and 1:00 PM to 12:00 AM
const startHour = 8;
const endHour = 12;

for (let hour = startHour; hour <= endHour; hour++) {
    createRow(`${hour}:00 AM`);
}
for (let hour = 1; hour <= endHour; hour++) {
    createRow(`${hour}:00 PM`);
}
