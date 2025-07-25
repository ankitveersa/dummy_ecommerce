# from .env import env
# import os
 
# # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# from pathlib import Path

# # Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
 
# SECRET_KEY = env.str("SECRET_KEY", "django-insecure-dev-key-only....")
 
# DEBUG = env.bool("DEBUG", default=True)
# TEMPLATE_DEBUG = DEBUG
 
# ALLOWED_HOSTS = ["*"]
# ROOT_URLCONF = "app.urls"
# WSGI_APPLICATION = "app.wsgi.application"
# ASGI_APPLICATION = "app.routing.application"
 
# MIGRATION_MODULES = {}
 
# # Internationalization
# # https://docs.djangoproject.com/en/3.0/topics/i18n/
 
# LANGUAGE_CODE = "en-us"
# TIME_ZONE = "UTC"
# USE_I18N = True
# USE_L10N = True
# USE_TZ = True
 
# # Static files (CSS, JavaScript, Images)
# # https://docs.djangoproject.com/en/3.0/howto/static-files/
 
# STATIC_URL = "/static/"
# STATIC_ROOT = "static_files"
# MEDIA_ROOT = "media_files"
 
# CORS_ORIGIN_ALLOW_ALL = True
 
# CORS_ALLOW_METHODS = [
#     "GET",
#     "OPTIONS",
#     "PATCH",
#     "POST",
#     "PUT",
# ]
 
# CORS_ALLOW_HEADERS = [
#     "accept",
#     "accept-encoding",
#     "authorization",
#     "content-type",
#     "dnt",
#     "origin",
#     "user-agent",
#     "x-csrftoken",
#     "x-requested-with",
#     "Access-Control-Allow-Origin",
# ]
 
# # Default primary key field type
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
 
# STORAGES = {
#     "default": {
#         "BACKEND": "django.core.files.storage.FileSystemStorage",
#     },
#     "staticfiles": {
#         "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
#     },
# }
 
# CSRF_TRUSTED_ORIGINS = ['https://adir-backend-a2d3fjhzagekh3dp.canadacentral-01.azurewebsites.net']
 
# # Azure B2C Configuration
# AZURE_B2C_TENANT = "yourtenant"
# AZURE_B2C_POLICY = "B2C_1_signupsignin"
# AZURE_B2C_CLIENT_ID = "your-client-id"
 
 
 
# # Values of below variables are used in azure app service environment variables when APP_ENV=prod
# # If not set, default values defined below are used
# # Database Configuration
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': env.str("APP_DB_NAME", "petstore-backend-database"),
#     }
# }


# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql",
#         "HOST": env.str("APP_DB_HOST", "petstore-backend-server.postgres.database.azure.com"),
#         "PORT": env.str("APP_DB_PORT", 5432),
#         "NAME": env.str("APP_DB_NAME", "petstore-backend-database"),
#         "USER": env.str("APP_DB_USER", "vmbxlxzwyn"),
#         "PASSWORD": env.str("APP_DB_PASSWORD", "WLwVpdi$aSpQLKKm"),
#         "OPTIONS": {
#             "sslmode": "prefer",
#         },
#     }
# }
 
# Zoho CRM Configuration
# Create logs directory if it doesn't exist
# LOG_DIR = os.path.join(BASE_DIR, 'logs')
# os.makedirs(LOG_DIR, exist_ok=True)
 
# # Zoho Logging
# ZOHO_LOG_FILE = env.str('ZOHO_LOG_FILE', default=os.path.join(LOG_DIR, 'zoho.log'))
 
# # Logging Configuration for Zoho SDK
# LOGGING = {
#     'version': 1,
#     'disable_existing_loggers': False,
#     'formatters': {
#         'verbose': {
#             'format': '{levelname} {asctime} {module} {message}',
#             'style': '{',
#         },
#         'simple': {
#             'format': '{levelname} {message}',
#             'style': '{',
#         },
#     },
#     'handlers': {
#         'zoho_file': {
#             'level': 'INFO',
#             'class': 'logging.handlers.RotatingFileHandler',
#             'filename': ZOHO_LOG_FILE,
#             'maxBytes': 5 * 1024 * 1024,  # 5 MB
#             'backupCount': 3,  
#             'formatter': 'verbose',
#             'encoding': 'utf8',
#         },
#         'console': {
#             'level': 'INFO',
#             'class': 'logging.StreamHandler',
#             'formatter': 'simple',
#         },
#     },
#     'loggers': {
#         'zohocrmsdk': {
#             'handlers': ['zoho_file', 'console'],
#             'level': 'INFO',
#             'propagate': True,
#         },
#     },
#     'root': {
#         'handlers': ['console'],
#         'level': 'WARNING',
#     },
# }





from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-mi0!=8hl9sabhi5r-jdwfryo--dgv1!txgp3tff@8r+95+n==4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'app.customer',
    'app.product'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

ROOT_URLCONF = 'app.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'app.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

