from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    sibling_image_name: str
    user_submitted_code_mem_limit: str
    user_submitted_code_cpu_period: int
    user_submitted_code_cpu_quota: int
    user_submitted_code_network_disabled: bool
    user_submitted_code_read_only_enabled: bool

    class Config:
        env_file = ".env"


settings = Settings()
