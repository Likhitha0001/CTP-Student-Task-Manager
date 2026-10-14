import time
from collections.abc import Callable


# Decorator
def timer(func: Callable):

    def wrapper(*args, **kwargs):

        start = time.time()

        result = func(*args, **kwargs)

        end = time.time()

        print(
            f"Execution time: "
            f"{end - start:.6f} seconds"
        )

        return result

    return wrapper


# Generator
def task_generator(tasks):

    yield from tasks


# Functional programming
def difficult_tasks(tasks):

    return list(
        filter(
            lambda task: task.priority >= 8,
            tasks
        )
    )