#-*- coding:utf-8 -*-
from django.http import HttpResponseRedirect 
import functools,logging
from common.tools.func import to_json,getStrTime

logger = logging.getLogger('app')
'''
process_request  接受request之后确定所执行的view之前  
process_view  确定了所要执行的view之后 view真正执行之前
process_response   view 执行之后 
process_exception(self, request, exception)  view抛出异常
settings里面安装中间件MIDDLEWARE_CLASSES=()
这里指定的顺序和实际运行时运行的顺序相关，
在request阶段：process_request，process_view 按照其所在类在配置中的先后顺序进行，
在response阶段：process_response，process_exception 则按照相反的顺序进行。
还有一点就是在整个流程中，每一个process_response都会执行到，
而其余三种，都可能会因为其他的直接retuen response或者不发生异常而不被执行到。
'''

nologin = ['favicon.ico','static','login','user','pictools/find']
#from django.contrib.auth import SESSION_KEY
#from urllib import quote
class QtsAuthenticationMiddleware(object): 
    def process_request(self,req):
        back = {'state':'error','msg':'need login'}
        p = req.get_full_path()
        isPath = False
        for n in nologin:
            if n in p:
                isPath = True
        if not isPath:
            #logger.info('url: '+p+' '+getStrTime(1))
            if req.is_ajax():
                if req.session.get('user_token'):
                    pass
                else:
                    return to_json(back)
            else:
                if req.session.get('user_token'):
                    pass
                else:
                    return HttpResponseRedirect('/login.html?back_url='+p)

def logindirector(text):
    #带参数的验证
    if  isinstance(text,str):
        def decorator(func):
            @functools.wraps(func)
            def islogin(request,*args,**kw):
                request_url=request.META.get('HTTP_REFERER','/')
                if request.session.get('user_token'):
                    #判断权限
                    if text=='admin' and request.session.get('rank')=='0':
                        return func(request,*args,**kw)
                return HttpResponseRedirect(request_url)
            return islogin
        return decorator
    #不带参数的验证
    else:
        @functools.wraps(text)
        def islogin(request,*args,**kw):
            if request.session.get('user_token'):
                return text(request,*args,**kw)
            else:
                return HttpResponseRedirect("/useradmin/")
        return islogin