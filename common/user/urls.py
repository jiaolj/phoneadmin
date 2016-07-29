from django.conf.urls import patterns, url

urlpatterns = patterns('common.user.home',
    url(r'^get', 'get'),
    url(r'^reg', 'reg'),
    url(r'^login', 'login'),
    url(r'^logout', 'logout'),
)