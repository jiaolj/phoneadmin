# -*- coding: utf-8 -*-
from common.tools.func import to_json,getStrTime,loggerInfo
from common.tools import des
from common.models.user import User
from common.models.user_group import UserGroup

def get(req):
    back = {'state':'ok'}
    back['data'] = req.session.get('user_token')
    if back['data']:
        back['msg'] = 'get user_token ok'
    else:
        back['state'] = 'error'
        back['msg'] = 'expire or logout'
    return to_json(back)

def reg(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    uname = q.get('uname')
    passwd = q.get('passwd')
    r = User.objects.filter(uname=uname)
    if r:
        back['state'] = 'error'
        back['msg'] = '账号已注册'
        loggerInfo('reg error:'+back['msg'])
    else:
        u = User(uname=uname,passwd=passwd)
        u.save()
        back['msg'] = '注册成功'
        loggerInfo('reg ok:'+back['msg']+'：'+str(u.pk))
    return to_json(back)

def login(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    uname = q.get('uname')
    passwd = q.get('passwd')
    if uname and passwd:
        if '=' == passwd[-1]:
            ur = User.objects.filter(uname=uname,key=passwd)
            if ur:
                passwd = ur[0].passwd
        r = User.objects.filter(uname=uname,passwd=passwd)
        if r:
            user = r[0]
            group = 'other'
            gr = UserGroup.objects.filter(pk=user.group)
            if gr:
                group = gr[0].name
            encryptdata,iv,key = des.encrypt(passwd)
            r.update(key=encryptdata)
            req.session['user_token'] = {'uname':uname,'rank':user.rank,'group':group}
            back['msg'] = 'login ok'
            back['data'] = {'encryptdata':encryptdata}
            loggerInfo('uname:'+uname+', '+back['msg'])
        else:
            back['state'] = 'error'
            back['msg'] = 'uname or passwd error'
            loggerInfo('uname:'+uname+' passwd:'+passwd+', login error:'+back['msg'])
    else:
        back['state'] = 'error'
        back['msg'] = 'need uname or passwd'
        loggerInfo('login error:'+back['msg'])
    return to_json(back)

def logout(req):
    back = {'state':'ok'}
    if req.session.get('user_token'):
        uname = req.session['user_token']['uname']
        del req.session['user_token']
        back['msg'] = 'logout'
        loggerInfo('uname:'+uname+', '+back['msg'])
    else:
        back['msg'] = 'already logout'
    return to_json(back)