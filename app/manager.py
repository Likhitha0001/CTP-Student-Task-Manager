from app.algorithms import merge_sort, search_task
from app.models import Task


class TaskManager:

    def __init__(self):
        self.tasks: list[Task] = []

    def add_task(self, task: Task):
        self.tasks.append(task)

    def show_tasks(self):

        print("-" * 75)
        print(
            f"{'Task':<25}"
            f"{'Subject':<15}"
            f"{'Priority':<10}"
            f"{'Hours':<8}"
            f"{'Status'}"
        )
        print("-" * 75)

        for task in self.tasks:

            status = "Completed" if task.completed else "Pending"

            print(
                f"{task.name:<25}"
                f"{task.subject:<15}"
                f"{task.priority:<10}"
                f"{task.hours:<8}"
                f"{status}"
            )

        print("-" * 75)

    def search(self, name: str):
        return search_task(self.tasks, name)

    def complete_task(self, name: str):

        task = self.search(name)

        if task:
            task.completed = True
            print("Task completed!")
        else:
            print("Task not found.")

    def sort_tasks(self):
        self.tasks = merge_sort(self.tasks)

    def total_hours(self) -> int:

        return sum(
            task.hours
            for task in self.tasks
        )