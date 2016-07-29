# -*- coding: utf-8 -*-
import os
from attr import APP_NAME
#日志配置
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
            'formatter': 'verbose'
        },
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'django_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
            'formatter': 'verbose'
        },
        'django_console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'app_file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/'+APP_NAME+'.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['django_file', 'django_console'],
            'propagate': True,
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
        'app': {
            'handlers': ['app_file', 'console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
    }
}