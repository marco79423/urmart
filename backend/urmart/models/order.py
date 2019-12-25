from django.db import models, transaction

from urmart import errors
from urmart.models.product import Product


def format_check(func):
    def wrap_func(json_data):
        if not (
                isinstance(json_data, dict) and
                ('productId' in json_data and isinstance(json_data['productId'], int)) and
                ('qty' in json_data and isinstance(json_data['qty'], int)) and
                ('price' in json_data and (isinstance(json_data['price'], float) or isinstance(json_data['price'], int))) and
                ('customerId' in json_data and isinstance(json_data['customerId'], int)) and
                ('vip' in json_data and isinstance(json_data['vip'], bool))
        ):
            raise errors.InvalidFormat()
        return func(json_data)

    return wrap_func


def vip_check(func):
    def wrap_func(json_data):
        if not Product.objects.filter(id=json_data['productId']).exists():
            raise errors.ProductNotFound()
        product = Product.objects.get(id=json_data['productId'])
        if product.vip and not json_data['vip']:
            raise errors.CustomerNotMeetRequirements()
        return func(json_data)

    return wrap_func


def stock_check(func):
    def wrap_func(json_data):
        try:
            product = Product.objects.get(id=json_data['productId'])
            if product.stock_pcs < json_data['qty']:
                raise errors.ShortageOfStock()
        except Product.DoesNotExist:
            raise errors.ProductNotFound()
        return func(json_data)

    return wrap_func


class Order(models.Model):
    product_id = models.IntegerField()
    qty = models.IntegerField()
    price = models.FloatField()
    customer_id = models.IntegerField()
    vip = models.BooleanField()

    def serialize(self):
        return {
            'id': self.id,
            'productId': self.product_id,
            'qty': self.qty,
            'price': self.price,
            'customerId': self.customer_id,
            'vip': self.vip,
        }

    @staticmethod
    @format_check
    @vip_check
    @stock_check
    def create_order(json_data):
        with transaction.atomic():
            product = Product.objects.get(id=json_data['productId'])
            product.stock_pcs -= json_data['qty']

            product.save()
            return Order.objects.create(
                product_id=json_data.get('productId'),
                qty=json_data.get('qty'),
                price=json_data.get('price'),
                customer_id=json_data.get('customerId'),
                vip=json_data.get('vip'),
            )

    @staticmethod
    def delete_order(order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            raise errors.OrderNotFound()

        with transaction.atomic():
            product = Product.objects.get(id=order.product_id)
            product.stock_pcs += order.qty
            product.save()
            order.delete()
