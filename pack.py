# -*- coding: utf-8 -*-
import os,sys

#静态文件打包
def collectstatic():
    #sudo vim /usr/local/lib/python2.7/dist-packages/django/contrib/staticfiles/management/commands/collectstatic.py 输入:166
    os.system('python manage.py collectstatic')
    os.system('sh restart.sh phoneadmin')
#修改settings
def updateSettings():
    fname = 'conf/settings.py'
    f = open(fname,'r+')
    flist = f.readlines()
    snum = 0
    line = -1
    DEBUG = 'False'
    for fl in flist:
        line += 1
        if 'STATIC_ROOT' in fl: #启用STATIC_ROOT
            if snum==0:
                snum +=1
            else:
                flist[line] = ''
        flist[line] = flist[line].replace('DEBUG = True','DEBUG = '+DEBUG)
    f = open(fname,'w+')
    f.writelines(flist)

if __name__ == '__main__':
    if sys.argv[1]=='yes' or raw_input('yes/no ')=='yes':
        updateSettings()
        collectstatic()