# -*- coding: utf-8 -*-
from django.http import HttpResponse
from common.tools.func import to_json,to_temp,loggerInfo
from django.views.decorators.cache import cache_page
from conf.settings import SESSION_COOKIE_AGE
from django.views.decorators.csrf import csrf_exempt
from apps.nb.services.es import ElsCls
from common.tools.func  import to_json
import apps.nb.services.knowledge_service as service
import json,os,random,time

#@cache_page(SESSION_COOKIE_AGE)
def home(req):
    active = 'home'
    kwd = '全部'
    loggerInfo(active+'_page')
    seoTitle = '管理系统'
    placeholder = '请输入关键词'
    return to_temp(active,req,locals())

def login(req):
    loggerInfo('login_page')
    seoTitle = '登陆'
    return to_temp('login',req,locals())