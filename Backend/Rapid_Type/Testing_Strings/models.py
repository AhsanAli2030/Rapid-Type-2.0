from django.db import models

# Create your models here.
class Languages_Text(models.Model):
    name=models.CharField(max_length=100)
    published_date = models.DateField()
    text=models.TextField()

    def __str__(self):
        return self.name
