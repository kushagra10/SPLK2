from django.db import models

# Create your models here.
class Hotel(models.Model):
    name = models.CharField(max_length=250)
    hub_name = models.CharField(max_length=250)
    city_name = models.CharField(max_length=250)
    cuisine = models.CharField(max_length=250)
    address_line_1 = models.CharField(max_length=1000)
    address_state = models.CharField(max_length=2)
    address_zipcode = models.DecimalField(decimal_places=0,max_digits=5)
    phone_number = models.DecimalField(decimal_places=0, max_digits=10)
    featured_image = models.CharField(max_length=1000)
    logo = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


