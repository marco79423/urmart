from django.db import models


class Shop(models.Model):
    name = models.CharField(max_length=64)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }
