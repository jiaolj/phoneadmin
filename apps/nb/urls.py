from django.conf.urls import patterns, include, url
from conf.settings import APP_NAME
from conf.urls import urlpatterns

urlpatterns += patterns('apps.'+APP_NAME+'.home',
    url(r'^$', 'home'),
    url(r'^login.html$', 'login'),
)
urlpatterns += patterns('',
    url(r'^ueditor/', include('apps.'+APP_NAME+'.ueditor.urls')),
)
handler404 = 'common.views.error.page_not_found'
handler500 = 'common.views.error.page_error'