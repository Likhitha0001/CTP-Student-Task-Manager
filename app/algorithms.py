from app.models import Task


# Merge Sort - Divide and Conquer
def merge_sort(tasks: list[Task]) -> list[Task]:

    if len(tasks) <= 1:
        return tasks

    mid = len(tasks) // 2

    left = merge_sort(tasks[:mid])
    right = merge_sort(tasks[mid:])

    result = []

    i = 0
    j = 0

    while i < len(left) and j < len(right):

        if left[i].priority >= right[j].priority:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result


# Linear Search
def search_task(tasks: list[Task], name: str):

    for task in tasks:

        if task.name.lower() == name.lower():
            return task

    return None


# Greedy Algorithm
def greedy_tasks(
    tasks: list[Task],
    available_hours: int
):

    sorted_tasks = sorted(
        tasks,
        key=lambda task: task.priority,
        reverse=True
    )

    selected = []
    used_hours = 0

    for task in sorted_tasks:

        if used_hours + task.hours <= available_hours:

            selected.append(task)
            used_hours += task.hours

    return selected


# Dynamic Programming
def max_study_hours(
    hours: list[int],
    available: int
):

    dp = [0] * (available + 1)

    for hour in hours:

        for j in range(available, hour - 1, -1):

            dp[j] = max(
                dp[j],
                dp[j - hour] + hour
            )

    return dp[available]