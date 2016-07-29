# -- coding: utf8 --
from django.db import models

class User(models.Model):
    uname = models.CharField()
    passwd = models.CharField()
    key = models.CharField()
    group = models.IntegerField()
    regtime = models.DateTimeField(auto_now_add=True)
    rank = models.IntegerField(default='0')
    class Meta:
        db_table = 'user'
