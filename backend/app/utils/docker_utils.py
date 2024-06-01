from typing import Optional

import docker
import shlex
from docker.models.containers import Container
from docker import DockerClient
from fastapi import HTTPException

from config import settings

SIBLING_IMAGE_NAME = settings.sibling_image_name


def run_container(code: str) -> Container:
    client: DockerClient = docker.from_env()
    safe_code: str = shlex.quote(code)

    return client.containers.run(
        settings.sibling_image_name,
        f"python3 -c {safe_code}",
        detach=True,
        mem_limit=settings.user_submitted_code_mem_limit,
        cpu_period=settings.user_submitted_code_cpu_period,
        cpu_quota=settings.user_submitted_code_cpu_quota,
        network_disabled=settings.user_submitted_code_network_disabled,
        read_only=settings.user_submitted_code_read_only_enabled,
        volumes={"temp_dir": {"bind": "/tmp", "mode": "rw"}},
    )


def execute_code_in_docker(code: str) -> str:
    container: Optional[Container] = None
    try:
        container = run_container(code)

        container.wait(timeout=5)
        stdout: str = container.logs(stdout=True, stderr=False).decode("utf-8")
        stderr: str = container.logs(stdout=False, stderr=True).decode("utf-8")

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
        except docker.errors.APIError as e:
            # Container was already removed
            pass
