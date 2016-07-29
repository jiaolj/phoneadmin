# -- coding: utf8 --
from django.db import models

class UserGroup(models.Model):
    name = models.CharField()
    remark = models.CharField()
    class Meta:
        db_table = 'user_group'
