#coding:utf-8
from django.views.decorators.csrf import csrf_exempt
from common.tools.func import to_json,getStrTime
from apps.nb.models.mb_number import MbNumber
from apps.nb.models.mb_number_area import MbNumberArea

@csrf_exempt
def get(req):
    q = req.GET or req.POST
    back = {'state':'ok'}
    numb = q.get('numb')
    province = q.get('province')
    city = q.get('city')
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
        every = int(q.get('every','20'))
        fromNum = (page-1)*every
        toNum = fromNum+every
        r = MbNumber.objects.all()[fromNum:toNum]
    if r:
        back['data'] = [{'numb':m.numb,'province':m.province,'city':m.city} for m in r]
    return to_json(back)

@csrf_exempt
def add(req):
    q = req.GET or req.POST
    back = {'state':'ok'}
    numb = q.get('numb')
    if numb:
        r = MbNumberArea.objects.filter(numb=numb[:7])
        if r:
            r = r[0]
            p = MbNumber(numb=numb,province=r.province,city=r.city)
            p.save()
            back['data'] = p.pk
    return to_json(back)