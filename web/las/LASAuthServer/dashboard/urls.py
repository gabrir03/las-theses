from django.conf.urls.defaults import *

# las/dashboard/home/
urlpatterns = patterns('',
    (r'^home/$','dashboard.views.home'),
    (r'^load_data/$','dashboard.views.loadData'),
)
