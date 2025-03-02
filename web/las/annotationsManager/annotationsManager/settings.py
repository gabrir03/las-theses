# Django settings for annotationsManager project.
import os

DEBUG = False
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

MANAGERS = ADMINS

DB_NAME='lasannotations'
DB_USERNAME='annotusr'
DB_PASSWORD='annotpwd2013'
DB_HOST='lasmysql'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': DB_NAME,                      # Or path to database file if using sqlite3.
        'USER': DB_USERNAME,                      # Not used with sqlite3.
        'PASSWORD': DB_PASSWORD,                  # Not used with sqlite3.
        'HOST': DB_HOST,
        'PORT': '3306',                      # Set to empty string for default. Not used with sqlite3.
        'OPTIONS' : {'init_command': 'SET default_storage_engine=INNODB'},
    }
}

GRAPH_DB = 'lasneo4j'
NEO4J_URL= 'http://'+GRAPH_DB+':7474/db/data'

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.4/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ['*']

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'Europe/Rome'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = False

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = '/srv/www/annotationsManager/media/'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = '/annotations/media/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
STATIC_ROOT = ''

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'x5ht(!#i4jthwwph$5$iy&amp;v@$+vt!h2zma$$5d^qi*x!%pu9l8'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'api.middleware.ContentTypeMiddleware',
    'api.middleware.XsSharingMiddleware',
)

ROOT_URLCONF = 'annotationsManager.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'annotationsManager.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
     'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'LASAuth',
    'piston',
    'editpermission',
    'annotations',
)

AUTHENTICATION_BACKENDS = (
    'LASAuth.auth.LASAuthBackend',
    'django.contrib.auth.backends.ModelBackend',
)

SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}


from utils import getLASUrl
DOMAIN_URL=getLASUrl()

LOGIN_URL = '/auth/startlogin/'
LAS_AUTH_SERVER_URL = DOMAIN_URL+'/las/laslogin/'
LAS_AUTH_USE_HTTPS = True
THIS_APP_SHORTNAME='AMM'
AUTH_SECRET_KEY = '~f_9+U?Gv Q/~[aGHFjtFctX/Y>-t9zEwymt9<F!>~-Yoz3-{q2uKdtH<FAfa;s<'
API_SHARED_KEY = 'u8Hk;GVTbW|siLN0([_gryt2/c)]G7@g$l}.@t?A+Sq/=2l||2ZVkV@w)9+uLQE('
SYNC_PERMISSIONS_URL=DOMAIN_URL+'/las/syncPermissions/'

CSRF_COOKIE_PATH = '/annotations'
SESSION_COOKIE_PATH = '/annotations'
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 14400

import ssl
ssl._create_default_https_context = ssl._create_unverified_context
