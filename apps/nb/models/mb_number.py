# -- coding: utf8 --
from django.db import models

class MbNumber(models.Model):
    numb = models.CharField(max_length=11)
    province = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    class Meta:
        db_table = 'mb_number'
