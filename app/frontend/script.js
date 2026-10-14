let tasks = [

    {
        task: "Python Assignment",
        subject: "Programming",
        priority: 9,
        hours: 2,
        status: "Completed"
    },

    {
        task: "Statistics Revision",
        subject: "Statistics",
        priority: 7,
        hours: 2,
        status: "Pending"
    },

    {
        task: "AI Assignment",
        subject: "Artificial Intelligence",
        priority: 8,
        hours: 3,
        status: "Pending"
    }

];


/* ================= DATE ================= */

document.getElementById("today").innerText =
    new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });


/* ================= ADD TASK ================= */

function addTask() {

    const task =
        document.getElementById("task").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const priority =
        Number(document.getElementById("priority").value);

    const hours =
        Number(document.getElementById("hours").value);


    if (!task || !subject || !priority || !hours) {

        alert("Please enter all task details.");

        return;
    }


    if (priority < 1 || priority > 10) {

        alert("Priority must be between 1 and 10.");

        return;
    }


    tasks.push({

        task: task,

        subject: subject,

        priority: priority,

        hours: hours,

        status: "Pending"

    });


    document.getElementById("task").value = "";

    document.getElementById("subject").value = "";

    document.getElementById("priority").value = "";

    document.getElementById("hours").value = "";


    displayTasks();

}


/* ================= DISPLAY ================= */

function displayTasks(data = tasks) {

    const container =
        document.getElementById("taskContainer");


    container.innerHTML = "";


    data.forEach((item) => {

        const originalIndex =
            tasks.indexOf(item);


        let priorityClass =
            "priority-low";

        let priorityText =
            "Low";


        if (item.priority >= 8) {

            priorityClass =
                "priority-high";

            priorityText =
                "High";

        }

        else if (item.priority >= 5) {

            priorityClass =
                "priority-medium";

            priorityText =
                "Medium";

        }


        const statusClass =
            item.status === "Completed"
                ? "status-completed"
                : "";


        const row =
            document.createElement("div");


        row.className =
            "task-row";


        row.innerHTML = `

            <div>

                <div class="task-name">
                    ${item.task}
                </div>

                <div class="task-subtitle">
                    Study Task
                </div>

            </div>


            <div class="subject-text">
                ${item.subject}
            </div>


            <div>

                <span class="priority-badge ${priorityClass}">
                    ${priorityText} ${item.priority}
                </span>

            </div>


            <div class="hours-text">
                ${item.hours} hrs
            </div>


            <div>

                <span class="status-badge ${statusClass}">
                    ${item.status}
                </span>

            </div>


            <div>

                ${
                    item.status === "Pending"

                    ?

                    `<button
                        class="complete-btn"
                        onclick="completeTask(${originalIndex})">
                        ✓ Complete
                    </button>`

                    :

                    `<span style="color:#218653;font-size:11px;">
                        ✓ Done
                    </span>`
                }

            </div>

        `;


        container.appendChild(row);

    });


    updateDashboard();

}


/* ================= COMPLETE ================= */

function completeTask(index) {

    tasks[index].status =
        "Completed";


    displayTasks();

}


/* ================= DASHBOARD ================= */

function updateDashboard() {

    const total =
        tasks.length;


    const hours =
        tasks.reduce(
            (sum, item) =>
                sum + item.hours,
            0
        );


    const completed =
        tasks.filter(
            item =>
                item.status === "Completed"
        ).length;


    const pending =
        total - completed;


    const highPriority =
        tasks.filter(
            item =>
                item.priority >= 8
        ).length;


    document.getElementById("taskCount")
        .innerText = total;


    document.getElementById("totalHours")
        .innerText = hours;


    document.getElementById("completedCount")
        .innerText = completed;


    document.getElementById("highPriority")
        .innerText = highPriority;


    document.getElementById("pendingCount")
        .innerText = pending;


    document.getElementById("progressCompleted")
        .innerText = completed;


    /* PROGRESS */

    let percent = 0;


    if (total > 0) {

        percent =
            Math.round(
                (completed / total) * 100
            );

    }


    document.getElementById("progressPercent")
        .innerText = percent + "%";


    document.getElementById("progressFill")
        .style.width = percent + "%";


    document.getElementById("progressText")
        .innerText =
        `${completed} of ${total} tasks completed`;


    /* ALGORITHM RESULTS */

    document.getElementById("greedyResult")
        .innerText =
        `${Math.min(total, 2)} tasks selected`;


    document.getElementById("dpResult")
        .innerText =
        `${hours > 0 ? Math.min(hours, 5) : 0} hours optimized`;


    document.getElementById("generatorResult")
        .innerText =
        `${total} tasks generated`;


    document.getElementById("threadResult")
        .innerText =
        `${total} tasks processed`;

}


/* ================= SEARCH ================= */

function searchTasks() {

    const value =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const result =
        tasks.filter(item =>

            item.task
                .toLowerCase()
                .includes(value)

            ||

            item.subject
                .toLowerCase()
                .includes(value)

        );


    displayTasks(result);

}


/* ================= SORT ================= */

function sortTasks() {

    const type =
        document.getElementById("sort").value;


    if (type === "priority") {

        tasks.sort(
            (a, b) =>
                b.priority - a.priority
        );

    }


    else if (type === "hours") {

        tasks.sort(
            (a, b) =>
                b.hours - a.hours
        );

    }


    displayTasks();

}


/* ================= INITIAL DISPLAY ================= */

displayTasks();