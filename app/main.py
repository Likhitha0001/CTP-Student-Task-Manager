from app.algorithms import greedy_tasks, max_study_hours
from app.concurrency import run_threading
from app.manager import TaskManager
from app.models import Task
from app.utils import difficult_tasks, task_generator


def print_task_table(tasks):

    print("-" * 80)

    print(
        f"{'Task':<25}"
        f"{'Subject':<15}"
        f"{'Priority':<10}"
        f"{'Hours':<8}"
        f"{'Status'}"
    )

    print("-" * 80)

    for task in tasks:

        status = "Completed" if task.completed else "Pending"

        print(
            f"{task.name:<25}"
            f"{task.subject:<15}"
            f"{task.priority:<10}"
            f"{task.hours:<8}"
            f"{status}"
        )

    print("-" * 80)


def print_result_table(title, value):

    print("-" * 50)
    print(f"{'Result':<25}{'Value'}")
    print("-" * 50)
    print(f"{title:<25}{value}")
    print("-" * 50)


def main():

    manager = TaskManager()

    # Add tasks
    manager.add_task(
        Task(
            "Python Assignment",
            "Programming",
            9,
            2
        )
    )

    manager.add_task(
        Task(
            "Statistics Revision",
            "Statistics",
            7,
            2
        )
    )

    manager.add_task(
        Task(
            "AI Assignment",
            "AI",
            8,
            3
        )
    )

    # All Tasks
    print("\n===== STUDENT TASK MANAGER =====")
    print_task_table(manager.tasks)

    # Search
    print("\n===== SEARCH TASK =====")

    result = manager.search("AI Assignment")

    if result:
        print_task_table([result])
    else:
        print("Task not found.")

    # Before Sorting
    print("\n===== BEFORE SORTING =====")
    print_task_table(manager.tasks)

    # Sorting
    manager.sort_tasks()

    print("\n===== AFTER SORTING BY PRIORITY =====")
    print_task_table(manager.tasks)

    # Complete Task
    print("\n===== COMPLETE TASK =====")

    manager.complete_task("Python Assignment")

    print("\n===== UPDATED TASKS =====")
    print_task_table(manager.tasks)

    # Total Hours
    print("\n===== TOTAL STUDY HOURS =====")

    total = manager.total_hours()

    print_result_table(
        "Total Study Hours",
        total
    )

    # Greedy
    print("\n===== GREEDY SELECTION =====")

    selected = greedy_tasks(
        manager.tasks,
        4
    )

    print_task_table(selected)

    # Dynamic Programming
    print("\n===== DYNAMIC PROGRAMMING =====")

    hours = [2, 3, 4]

    maximum = max_study_hours(
        hours,
        5
    )

    print_result_table(
        "Maximum Study Hours",
        maximum
    )

    # Generator
    print("\n===== GENERATOR =====")

    generated_tasks = list(
        task_generator(manager.tasks)
    )

    print_task_table(generated_tasks)

    # Functional Programming
    print("\n===== DIFFICULT TASKS =====")

    difficult = difficult_tasks(
        manager.tasks
    )

    print_task_table(difficult)

    # Threading
    print("\n===== THREADING =====")

    names = [
        task.name
        for task in manager.tasks
    ]

    print("-" * 50)
    print(f"{'Task':<30}{'Result'}")
    print("-" * 50)

    # Run threading
    run_threading(manager.tasks)

    print("-" * 50)


if __name__ == "__main__":
    main()