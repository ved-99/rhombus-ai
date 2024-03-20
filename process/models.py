from django.db import models

# Create your models here.

class Datatype(models.Model):
  file = models.FileField(upload_to='uploads/')
  filepath = models.CharField(max_length=255,blank=True)
  dtype = models.JSONField(blank=True)
