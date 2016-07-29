# -*- coding: utf-8 -*-
import os
from attr import APP_NAME
from db import DATABASES
from log import LOGGING
from cache import CACHE_BACKEND,SESSION_ENGINE,SESSION_COOKIE_AGE
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
SECRET_KEY = '#)1_b=*kspc$y!freef-8dbc(e!dl_dpi06kx^3f-7gvc(oms('
DEBUG = True
TEMPLATE_DEBUG = True
ALLOWED_HOSTS = ['*'] #debug=False的时候要设置

INSTALLED_APPS = (
    #'django.contrib.contenttypes',
    'django.contrib.sessions', #会话设置
    #'django.contrib.messages',
    'django.contrib.staticfiles',
    'apps.'+APP_NAME,
    'corsheaders',#跨域
    'common',
)
MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware', #会话设置
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    #'django.contrib.auth.middleware.AuthenticationMiddleware',
    #'django.contrib.messages.middleware.MessageMiddleware',
    #'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'common.user.middleware.QtsAuthenticationMiddleware',
)
#跨域设置
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost',
)
ROOT_URLCONF = 'apps.'+APP_NAME+'.urls'
LANGUAGE_CODE = 'zh-hans' 
DEFAULT_CHARSET = 'UTF-8'
WSGI_APPLICATION = 'conf.wsgi.application'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
#全局模板变量
TEMPLATE_CONTEXT_PROCESSORS = (
    'apps.'+APP_NAME+'.processor.model',
)
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    'apps/'+APP_NAME+'/static',
    'common/static',
    STATIC_ROOT
)
STATIC_ROOT = ''
