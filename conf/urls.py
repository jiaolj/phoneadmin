from django.conf.urls import patterns, include, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('',
    url(r'^user/', include("common.user.urls")),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT})
)
