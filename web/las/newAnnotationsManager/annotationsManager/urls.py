from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'annotationsManager.views.home', name='home'),
    # url(r'^annotationsManager/', include('annotationsManager.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    (r'^', include('annotations.urls')),
    (r'^api/', include('api.urls')),
    (r'^auth/', include('LASAuth.urls')),
    (r'^permission/', include('editpermission.urls')),
    (r'forbidden/', 'django.views.defaults.permission_denied'),

)

if settings.DEBUG:
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve',  
         {'document_root':     settings.MEDIA_ROOT}),
    )

