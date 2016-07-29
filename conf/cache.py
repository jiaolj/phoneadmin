# -*- coding: utf-8 -*-
#缓存配置
CACHE_BACKEND = 'memcached://jiaolj.com:11211/'
#会话设置
SESSION_ENGINE = 'django.contrib.sessions.backends.cache' #db,cache
SESSION_COOKIE_AGE = 3600*2