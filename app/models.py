from dataclasses import dataclass


@dataclass
class Task:
    name: str
    subject: str
    priority: int
    hours: int
    completed: bool = False


class StudyTask(Task):

    def display(self) -> str:
        status = "Completed" if self.completed else "Pending"

        return (
            f"{self.name} | "
            f"{self.subject} | "
            f"Priority: {self.priority} | "
            f"Hours: {self.hours} | "
            f"{status}"
        )