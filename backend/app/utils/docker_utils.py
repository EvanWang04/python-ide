import docker
from fastapi import HTTPException
from config import settings
import shlex

SIBLING_IMAGE_NAME = settings.sibling_image_name


def run_container(code: str):
    client = docker.from_env()
    safe_code = shlex.quote(code)
    return client.containers.run(
        settings.sibling_image_name,
        f"python3 -c {safe_code}",
        detach=True,
        mem_limit=settings.user_submitted_code_mem_limit,
        cpu_period=settings.user_submitted_code_cpu_period,
        cpu_quota=settings.user_submitted_code_cpu_quota,
        network_disabled=settings.user_submitted_code_network_disabled,
    )


def execute_code_in_docker(code: str) -> str:
    container = None
    try:
        container = run_container(code)

        container.wait(timeout=5)
        stdout = container.logs(stdout=True, stderr=False).decode("utf-8")
        stderr = container.logs(stdout=False, stderr=True).decode("utf-8")

        if stderr:
            raise HTTPException(
                status_code=400, detail=f"Error executing code: {stderr}"
            )

        return stdout
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        try:
            container.stop()
            container.remove(force=True)
        except:
            # Container was already removed
            pass
