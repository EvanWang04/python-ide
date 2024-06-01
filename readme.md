## Python IDE
This is an online Python IDE.

# How To Run
1. Clone the repository:
``` bash
git clone https://github.com/EvanWang04/python-ide.git
```

2. Navigate into the project directory:
``` bash
cd python-ide
```

3. Run the application with docker (and install docker if needed: https://docs.docker.com/get-docker/):
``` bash
docker-compose up
```

4. Open your web browser and go to localhost:3000.

5. To edit the resources allocated for each user-submitted Python code execution, go into ./backend/.env and edit the resources allocated.

## Usage Guide

- Write some Python code, the pandas and scipy libraries are available, and test the code.
- If your code works, submit it to persist it. You can view all your submitted code on the submitted code page.
- Only code that does not error will be persisted.

## How It's Built
The Python IDE is built using Next.js and FastAPI.

- Next.js is used for the application's frontend, and Tailwind is used for styling.
- FastAPI is used for the application's backend, handling API requests and executing Python code.
- @monaco-editor/react is used as the prebuilt code editor.
- The user-submitted Python code is executed in a sibling Docker container that is spun up and removed after every submission. This is done to execute user code in a trusted, isolated space to prevent malicious user code.
    - Each sibling docker container gets built off the same docker image built when the application starts.
    - Sibling containers do not have write access to the filesystem but still have a temporary directory to write to.
- PostgreSQL is used as the database to store working user-submitted code. SQLAlchemy is used as the ORM to interact with the database.
