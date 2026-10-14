from concurrent.futures import ThreadPoolExecutor


def process_task(name: str):

    return f"Processed: {name}"


def run_threading(tasks):

    names = [
        task.name
        for task in tasks
    ]

    with ThreadPoolExecutor(
        max_workers=3
    ) as executor:

        results = executor.map(
            process_task,
            names
        )

    for result in results:
        print(result)