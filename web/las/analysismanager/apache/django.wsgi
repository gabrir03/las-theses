import os
import sys
import site

# Add the site-packages of the chosen virtualenv to work with
site.addsitedir('/virtualenvs/venvdj1.4/local/lib/python2.7/site-packages')

# Add the app's directory to the PYTHONPATH
sys.path.append('/srv/www/analysismanager/')

path = '/srv/www'
if path not in sys.path:
    sys.path.insert(0, '/srv/www')

os.environ['DJANGO_SETTINGS_MODULE'] = 'analysismanager.settings'

# Activate your virtual env
activate_env=os.path.expanduser("/virtualenvs/venvdj1.4/bin/activate_this.py")
execfile(activate_env, dict(__file__=activate_env))

import analysismanager.settings
import django.core.handlers.wsgi
_application = django.core.handlers.wsgi.WSGIHandler()
def application(environ, start_response):
    #print '*** SUBSITE URL = ' + environ['SCRIPT_NAME'] + ' ***'
    analysismanager.settings.LOGIN_URL = environ['SCRIPT_NAME'] + analysismanager.settings.LOGIN_URL
    analysismanager.settings.BASE_URL = environ['SCRIPT_NAME'] 
    analysismanager.settings.MEDIA_URL = environ['SCRIPT_NAME'] + analysismanager.settings.MEDIA_URL
    return _application(environ, start_response)

