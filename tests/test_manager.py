from app.manager import TaskManager
from app.models import Task


def test_add_task():

    manager = TaskManager()

    manager.add_task(
        Task(
            "Python",
            "Programming",
            9,
            2
        )
    )

    assert len(manager.tasks) == 1


def test_total_hours():

    manager = TaskManager()

    manager.add_task(
        Task(
            "Python",
            "Programming",
            9,
            2
        )
    )

    manager.add_task(
        Task(
            "AI",
            "AI",
            8,
            3
        )
    )

    assert manager.total_hours() == 5


def test_search():

    manager = TaskManager()

    manager.add_task(
        Task(
            "Python",
            "Programming",
            9,
            2
        )
    )

    result = manager.search("Python")

    assert result is not None