# -*- coding: utf-8 -*-
#mysql设置
mysql_ip = 'jiaolj.com'
mysql_uname = 'jiaolj'
mysql_passwd = '10534jun'
#mongo设置
mongo_ip = 'jiaolj.com'
mongo_uname = 'jiaolj'
mongo_passwd = '10534jun'

MONGODB = {
    'host': mongo_ip,
    'port': 27017,
    'name': mongo_uname,
    'passwd': mongo_passwd,
}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db',
        'USER': mysql_uname,
        'PASSWORD': mysql_passwd,
        'HOST': mysql_ip,
        'charset': 'utf8',
    }
}