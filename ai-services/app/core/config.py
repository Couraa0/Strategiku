import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Skripsi AI Services"
    PROJECT_VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Example config variables
    MODEL_PATH: str = os.getenv("MODEL_PATH", "app/assets/models/")
    
    class Config:
        case_sensitive = True

settings = Settings()
