# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2017-12-28 17:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('hub_name', models.CharField(max_length=250)),
                ('city_name', models.CharField(max_length=250)),
                ('cuisine', models.CharField(max_length=250)),
                ('address_line_1', models.CharField(max_length=1000)),
                ('address_state', models.CharField(max_length=2)),
                ('address_zipcode', models.DecimalField(decimal_places=0, max_digits=5)),
                ('phone_number', models.DecimalField(decimal_places=0, max_digits=10)),
                ('featured_image', models.CharField(max_length=1000)),
                ('logo', models.CharField(max_length=1000)),
            ],
        ),
    ]