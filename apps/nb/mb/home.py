#coding:utf-8
from django.views.decorators.csrf import csrf_exempt
from common.tools.func import to_json,getStrTime
from django.http import HttpResponse
from apps.nb.models.mb_number import MbNumber
from apps.nb.models.mb_number_area import MbNumberArea
from django.http.request import HttpRequest
from httplib import HTTPResponse
import re,urllib,time

@csrf_exempt
def get(req):
    q = req.GET or req.POST
    back = {'state':'ok'}
    numb = q.get('numb')
    province = q.get('province')
    city = q.get('city')
    export = q.get('export')
    args = {}
    if numb:
        args['numb'] = numb
    if province:
        args['province'] = province
    if city:
        args['city'] = city
    if args:
        r = MbNumber.objects.filter(**args)
    else:
        page = int(q.get('page','1'))
        every = int(q.get('every','9999'))
        fromNum = (page-1)*every
        toNum = fromNum+every
        r = MbNumber.objects.all()[fromNum:toNum]
    if r:
        back['data'] = [{'numb':m.numb,'province':m.province,'city':m.city} for m in r]
    if export:
        backstr = ''
        for data in back['data']:
            backstr += data['numb']+'\n'
        response = HttpResponse(backstr,content_type='application/octet-stream') 
        response['Content-Disposition'] = 'attachment; filename=%s' %'numbers.txt'
        return response
    else:
        return to_json(back)

@csrf_exempt
def add(req):
    q = req.GET or req.POST
    back = {'state':'ok'}
    numb = q.get('numb')
    if numb:
        state,back['data'] = addNumb(numb)
    return to_json(back)

def getBaiduNumber(numb):
    html = urllib.urlopen('http://www.baidu.com/s?wd=18571951231').read().replace('\n','')
    time.sleep(1)
    areas =  re.findall('<div class="op_mobilephone_r">.*?<span>.*?</span>.*?<span>(.*?)</span>.*?</div>',html)[0].split('&nbsp;')
    return areas[0],areas[1]

def addNumb(numb):
    province = city = ''
    r = MbNumberArea.objects.filter(numb=numb[:7])
    if r:
        r = r[0]
        province,city = r.province,r.city
    else:
        province,city = getBaiduNumber(numb)
        e = MbNumberArea(numb=numb[:7],province=province,city=city)
        e.save()
    if province:
        args = {'numb':numb,'province':province,'city':city}
        if MbNumber.objects.filter(**args):
            return 300,'repeat'
        else:
            p = MbNumber(**args)
            p.save()
        return 200,p.pk
    return 500,'can\'t found'

@csrf_exempt
def upload(req):
    q = req.GET or req.POST
    t = q.get('t')
    htm = '''
        <style>
        body {margin:0}
        input[type="file"]{width:140px}
        </style>
        <body>
        <form enctype="multipart/form-data" method="post" action="">
            <input name="file" type="file" />
            <input type="submit"value="Import" />
            <input type="hidden" name="t" value="Import" />
        </form>
        #file
        </body>
    '''
    dl = ''
    if t:
        file = req.FILES.get('file')
        if file:
            files = file.readlines()
            dl = '<dl>'
            for f in files:
                numb = re.findall('[0-9]+',f)
                if numb:
                    numb = numb[0]
                    state,msg = addNumb(numb)
                    if state==200:
                        numb += ' <span class="color:green">success '+str(msg)+'</span>'
                    else:
                        numb += ' <span class="color:red">'+msg+'</span>'
                    dl += '<dt>'+numb+'</dt>'
            dl += '</dl>'
        else:
            htm = htm.replace('#file', '未选择文件')
    htm = htm.replace('#file', dl)
    return HttpResponse(htm)