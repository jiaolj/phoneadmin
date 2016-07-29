# -*- coding: utf-8 -*-

entityType = {
    'xx' : ['TBT/SPS通报','召回','动植物疫情','传染病疫情','商品质量问题'],
    'mf' : ['TBT/SPS通报','召回'],
    'dz' : ['动植物疫情'],
    'crb' : ['传染病疫情'],
    'zl' : ['商品质量问题'],
    'other' : [''],
}

ES_HOST = 'http://192.168.1.253:8181/guojian'
ApiConfig = {
    'elasticSearch' : {
        'HOST': ES_HOST,
        'PATH': '/infos/search',
        'TIMEOUT' :6,
    },
    'info' : {
        'HOST': ES_HOST,
        'PATH': '/infos/detail/get',
        'TIMEOUT' :6,
    },
    'events_map' : {
        'HOST': ES_HOST,
        'PATH': '/events/map',
        'TIMEOUT' :6,
    },
    'events_list' : {
        'HOST': ES_HOST,
        'PATH': '/events/list',
        'TIMEOUT' :6,
    },
    'events_timeline' : {
        'HOST': ES_HOST,
        'PATH': '/events/timeline',
        'TIMEOUT' :6,
    },
    'events_relation' : {
        'HOST': ES_HOST,
        'PATH': '/events/relation',
        'TIMEOUT' :6,
    },
}
