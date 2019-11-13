# from django.urls import path
from django.conf.urls.defaults import *
# from . import views

# urlpatterns = [
#    path('', views.index, name='index'),
# ]

# biobank/dashboard/home/
urlpatterns = patterns('',
    (r'^home/$','dashboard.views.dashboardHome'),
)
