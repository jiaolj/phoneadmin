# -- coding: utf8 --
import urllib,urllib2

class HttpCls:
    _host = {}
    _url = None

    def __init__(self, host):
        self._host = host

    def __get_url(self):
        self._url = self._host['HOST'] + self._host['PATH'];

    def set_url(self,url):
        self._url = url

    def http_get(self,arg):
        """
        @params arg|数据字典
        """

        self.__get_url()
        #print self._url
        if( self._url != None  ):
            query = self._url + '?' + urllib.urlencode(arg)
            req = urllib2.Request(url=query)
            try:
                content = urllib2.urlopen(req,timeout=self._host['TIMEOUT']).read()
            except:
                return '{"code":500,"msg":"open url fail"}'
            return content
        else:
            return None

    def http_post(self,arg):
        self.__get_url()

        if( self._url != None  ):
            data_urlencode = urllib.urlencode(arg)
            requrl = self._url
            req = urllib2.Request(url = requrl,data =data_urlencode)
            try:
                content = urllib2.urlopen(req).read()
            except:
                return 'read error, need right url'
            return content
        else:
            return None