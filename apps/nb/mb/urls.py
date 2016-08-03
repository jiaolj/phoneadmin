from django.conf.urls import patterns, include, url
from conf.settings import APP_NAME

urlpatterns = patterns('apps.'+APP_NAME+'.mb.home',
    url(r'^get$', 'get'),
    url(r'^add$', 'add'),
    url(r'^upload$', 'upload'),
)
