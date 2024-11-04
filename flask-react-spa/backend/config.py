import os

class Config:
    """Base configuration with default settings."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default_secret_key')  # Used for securing sessions and cookies
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///metrics.db')  # Default to SQLite, can be set to other databases
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable to save resources
    CORS_HEADERS = 'Content-Type'  # Ensure CORS headers are included in responses
    DEBUG = False  # Base setting, overridden in specific environments
    TESTING = False  # Base setting, overridden in testing environment

class DevelopmentConfig(Config):
    """Configuration for development environment."""
    DEBUG = True  # Enable debug mode for development

class TestingConfig(Config):
    """Configuration for testing environment."""
    TESTING = True  # Enable testing mode
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test_metrics.db'  # Use a separate database for testing

class ProductionConfig(Config):
    """Configuration for production environment."""
    SECRET_KEY = os.environ.get('SECRET_KEY')  # Ensure this is set in production for security
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')  # Ensure the database URI is set in production
    DEBUG = False  # Disable debug mode for security

# Dictionary to map environment names to configuration classes
config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}

# Function to get the configuration class by name
def get_config(env_name):
    return config_by_name.get(env_name, Config)
