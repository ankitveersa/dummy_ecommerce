import os
import sys
import environ
 
# Get project root directory
root = environ.Path(__file__) - 2
ROOT_DIR = root()
BASE_DIR = ROOT_DIR
PROJECT_ROOT_DIR = ROOT_DIR
 
# Initialize environment
env = environ.Env()
 
# Determine environment (default to 'dev' if not set)
app_env = env.str("APP_ENV", "dev")
 
# Only attempt to load config file if not in production
if app_env != "prod":
    # Build the default config file path
    default_config_path = os.path.join(PROJECT_ROOT_DIR, "conf", f"{app_env}.conf")
 
    # Allow override via environment variable
    config_path = env.str("APPENV_FILE", default=default_config_path)
 
    # Only load if file exists
    if os.path.exists(config_path):
        environ.Env.read_env(config_path)
    else:
        # Only warn for non-production environments
        if app_env != "prod":
            print(f"Note: Config file not found at {config_path}, using environment variables only",
                  file=sys.stderr)
else:
    # In production, ensure we're not trying to load any config file
    if os.environ.get("APPENV_FILE"):
        print("Warning: APPENV_FILE is set in production but will be ignored",
              file=sys.stderr)