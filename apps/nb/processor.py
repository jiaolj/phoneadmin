# -*- coding: utf-8 -*-
from conf.host import config

#全局模板变量
def model(req):
    user_token = req.session.get('user_token')
    return  {
        'host' : config,
        'user_token' : user_token,
        'menuList' : [
            {'name':'首页','href':'/','active':'home'},
            {'name':'资讯搜索','href':'/search/','active':'search'},
            {'name':'事件分析','href':'/analyze/','active':'analyze'},
            {'name':'知识图谱','href':'/knowledge/','active':'knowledge'},
            {'name':'内容加工','href':'/create/','active':'create'},
            {'name':'我的订阅','href':'/custom/','active':'custom'},
        ]
    }