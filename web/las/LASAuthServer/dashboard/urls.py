from django.conf.urls.defaults import *

# las/dashboard/home/
urlpatterns = patterns('',
    (r'^home/$','dashboard.views.home'),
    (r'^load_derived/$','dashboard.views.loadDerived'),
    (r'^load_split/$','dashboard.views.loadSplit'),
    (r'^load_slide_lab/$','dashboard.views.loadSlideLab'),
    (r'^load_slide_prep/$','dashboard.views.loadSlidePrep'),
    (r'^load_revalue/$','dashboard.views.loadRevalue'),
    (r'^load_transfers/$','dashboard.views.loadTransfers'),
    (r'^load_implanted_mice/$','dashboard.views.loadImplantedMice')
)
