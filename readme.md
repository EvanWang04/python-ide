# Python IDE

This is a online Python IDE.

## How To Run

1. Clone the repository:
    ```bash
    git clone ...
    ```

2. Navigate into the project directory:
    ```bash
    cd python-ide
    ```

3. Run the application with docker:
    ```bash
    docker-compose up
    ```

4. Open your web browser and go to `localhost:3000`.

5. To edit the resources allocated for each user submission, go into ./backend/

## How It's Built

The Python IDE is built using Next.js and FastAPI.

- **Next.js** is used for the frontend of the application, providing a robust framework for building the user interface.
- **FastAPI** is used for the backend of the application, handling API requests and executing Python code.
- For safety and isolation, the user-submitted Python code is executed in a separate sibling Docker container that is spun up and shut down after every submission.