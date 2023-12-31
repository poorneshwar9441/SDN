# Generated by Django 5.0 on 2023-12-06 11:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_userprofile_amount_alter_userprofile_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.AlterField(
            model_name='expense',
            name='participants',
            field=models.ManyToManyField(related_name='expenses_participated', to='core.user'),
        ),
        migrations.AlterField(
            model_name='expense',
            name='payer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expenses_paid', to='core.user'),
        ),
        migrations.AlterField(
            model_name='group',
            name='members',
            field=models.ManyToManyField(to='core.user'),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
