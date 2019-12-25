import json

from django.test import TestCase, Client

from urmart.models import Shop, Product, Order


class APITestCase(TestCase):
    maxDiff = None

    client = Client()

    def check_json_response(self, response, expect_status, expect_content):
        self.assertEquals(json.loads(response.content.decode('utf-8')) if response.content else None, expect_content)
        self.assertEquals(response.status_code, expect_status)


class ShopListViewTestSuite(APITestCase):

    def test_get_empty_shop_list(self):
        self.check_json_response(
            response=self.client.get('/apis/shops'),
            expect_status=200,
            expect_content={
                'data': []
            }
        )

    def test_get_shop_list(self):
        Shop.objects.create(id=1, name='shop 1')
        Shop.objects.create(id=2, name='shop 2')

        self.check_json_response(
            response=self.client.get('/apis/shops'),
            expect_status=200,
            expect_content={
                'data': [
                    {'id': 1, 'name': 'shop 1'},
                    {'id': 2, 'name': 'shop 2'},
                ]
            }
        )

    def tearDown(self) -> None:
        Shop.objects.all().delete()


class ProductListViewTestSuite(APITestCase):

    def test_get_empty_product_list(self):
        self.check_json_response(
            response=self.client.get('/apis/products'),
            expect_status=200,
            expect_content={
                'data': []
            }
        )

    def test_get_product_list(self):
        Product.objects.create(id=1, name='product 1', stock_pcs=1, price=1.0, shop_id=1, vip=False)
        Product.objects.create(id=2, name='product 2', stock_pcs=2, price=2.0, shop_id=2, vip=True)

        self.check_json_response(
            response=self.client.get('/apis/products'),
            expect_status=200,
            expect_content={
                'data': [
                    {'id': 1, 'name': 'product 1', 'stockPcs': 1, 'price': 1.0, 'shopId': 1, 'vip': False},
                    {'id': 2, 'name': 'product 2', 'stockPcs': 2, 'price': 2.0, 'shopId': 2, 'vip': True},
                ]
            }
        )

    def tearDown(self) -> None:
        Product.objects.all().delete()


class OrderListViewTestSuite(APITestCase):

    def test_get_empty_order_list(self):
        self.check_json_response(
            response=self.client.get('/apis/orders'),
            expect_status=200,
            expect_content={
                'data': []
            }
        )

    def test_get_order_list(self):
        Order.objects.create(id=1, product_id=1, qty=1, price=1.0, customer_id=1, vip=False)
        Order.objects.create(id=2, product_id=2, qty=2, price=2.0, customer_id=2, vip=True)

        self.check_json_response(
            response=self.client.get('/apis/orders'),
            expect_status=200,
            expect_content={
                'data': [
                    {'id': 1, 'productId': 1, 'qty': 1, 'price': 1.0, 'customerId': 1, 'vip': False},
                    {'id': 2, 'productId': 2, 'qty': 2, 'price': 2.0, 'customerId': 2, 'vip': True},
                ]
            }
        )

    def test_create_order(self):
        Product.objects.create(id=1, name='product 1', stock_pcs=1, price=1.0, shop_id=1, vip=False)

        response = self.client.post('/apis/orders', json.dumps({
            'productId': 1,
            'qty': 1,
            'price': 1.0,
            'customerId': 1,
            'vip': False
        }), content_type="application/json")

        self.check_json_response(
            response=response,
            expect_status=201,
            expect_content={
                'data': {
                    'id': json.loads(response.content.decode('utf-8'))['data']['id'],
                    'productId': 1,
                    'qty': 1,
                    'price': 1.0,
                    'customerId': 1,
                    'vip': False
                }
            }
        )

    def test_create_order_with_invalid_format(self):
        response = self.client.post('/apis/orders', json.dumps({}), content_type="application/json")

        self.check_json_response(
            response=response,
            expect_status=400,
            expect_content={
                'error': {
                    'code': '400-000',
                    'message': '格式不合法',
                }
            }
        )

    def test_create_order_with_invalid_customer(self):
        Product.objects.create(id=1, name='product 1', stock_pcs=1, price=1.0, shop_id=1, vip=True)

        response = self.client.post('/apis/orders', json.dumps({
            'productId': 1,
            'qty': 1,
            'price': 1.0,
            'customerId': 1,
            'vip': False
        }), content_type="application/json")

        self.check_json_response(
            response=response,
            expect_status=400,
            expect_content={
                'error': {
                    'code': '400-002',
                    'message': '客戶不符合要求',
                }
            }
        )

    def test_create_order_with_shortage_of_stock(self):
        Product.objects.create(id=1, name='product 1', stock_pcs=1, price=1.0, shop_id=1, vip=False)

        response = self.client.post('/apis/orders', json.dumps({
            'productId': 1,
            'qty': 10,
            'price': 1.0,
            'customerId': 1,
            'vip': False
        }), content_type="application/json")

        self.check_json_response(
            response=response,
            expect_status=400,
            expect_content={
                'error': {
                    'code': '400-003',
                    'message': '庫存不足',
                }
            }
        )

    def tearDown(self) -> None:
        Order.objects.all().delete()
        Product.objects.all().delete()


class OrderDetailViewTestSuite(APITestCase):
    def test_delete_order(self):
        Product.objects.create(id=1, name='product 1', stock_pcs=1, price=1.0, shop_id=1, vip=False)
        Order.objects.create(id=1, product_id=1, qty=1, price=1.0, customer_id=1, vip=False)

        self.check_json_response(
            response=self.client.delete('/apis/orders/1'),
            expect_status=204,
            expect_content=None
        )

        product = Product.objects.get(id=1)
        self.assertEquals(product.stock_pcs, 2)
