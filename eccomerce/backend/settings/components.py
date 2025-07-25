 
# CORE_APPS = (
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",
# )
 
 
# THIRD_PARTY_APPS = (
#     "channels",
#     "rest_framework",
#     "drf_yasg",
#     "corsheaders",
#     "django_extensions"
# )
 
# OUR_APPS = (
#     "app.appuser",
# )
 
# INSTALLED_APPS = CORE_APPS + THIRD_PARTY_APPS + OUR_APPS
 
 
# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',
#     'django.middleware.security.SecurityMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'whitenoise.middleware.WhiteNoiseMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     # 'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
#     'app.zoho.middleware.ZohoSDKMiddleware'  # Updated to new location
# ]
 
# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]
 
 
# WSGI_APPLICATION = 'app.wsgi.application'
 
# # Password validation
# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]
 
 
# REST_FRAMEWORK = {
#     "JSON_UNDERSCOREIZE": {
#         "no_underscore_before_number": True,
#     },
#     "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
#     "DEFAULT_AUTHENTICATION_CLASSES": [
#         "rest_framework.authentication.SessionAuthentication",
#     ],
#     "DEFAULT_RENDERER_CLASSES": [
#         "app.common.renderers.CustomJSONRenderer",
#         "djangorestframework_camel_case.render.CamelCaseJSONRenderer",
#         "djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer",
#     ],
#     "DEFAULT_PARSER_CLASSES": [
#         "djangorestframework_camel_case.parser.CamelCaseFormParser",
#         "djangorestframework_camel_case.parser.CamelCaseMultiPartParser",
#         "djangorestframework_camel_case.parser.CamelCaseJSONParser",
#     ],
#     "EXCEPTION_HANDLER": "app.common.exception_handler.custom_exception_handler",
# }
 
# CORS_ORIGIN_ALLOW_ALL = True
 
 
