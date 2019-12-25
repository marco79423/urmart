from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=128)
    stock_pcs = models.IntegerField()
    price = models.FloatField()
    shop_id = models.IntegerField()
    vip = models.BooleanField()

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'stockPcs': self.stock_pcs,
            'price': self.price,
            'shopId': self.shop_id,
            'vip': self.vip,
        }
