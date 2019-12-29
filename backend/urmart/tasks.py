import csv
import io
import os

from celery import shared_task

from backend.settings import BASE_DIR
from urmart import errors
from urmart.models import Order, Shop


@shared_task
def handle_task(topic):
    if topic == 'top3':
        return generate_top3_report()
    elif topic == 'statistics_by_shop':
        return generate_statistics_by_shop_report()
    else:
        raise errors.TopicNotSupported()


def generate_top3_report():
    with open(os.path.join(BASE_DIR, 'urmart', 'sqls', 'get_top3.sql'), encoding='utf-8') as fp:
        sql = fp.read()

    with io.StringIO() as fp:
        writer = csv.DictWriter(fp, fieldnames=('id', 'name', 'qty',))
        writer.writeheader()
        for r in Order.objects.raw(sql):
            writer.writerow({
                'id': r.id,
                'name': r.name,
                'qty': r.qty
            })
        fp.seek(0)
        return {
            'filename': 'top3.csv',
            'data': fp.read(),
        }


def generate_statistics_by_shop_report():
    with open(os.path.join(BASE_DIR, 'urmart', 'sqls', 'get_statistics_by_shop.sql'), encoding='utf-8') as fp:
        sql = fp.read()

    with io.StringIO() as fp:
        writer = csv.DictWriter(fp, fieldnames=('name', 'total_price', 'total_qty', 'order_qty'))
        writer.writeheader()
        for r in Shop.objects.raw(sql):
            writer.writerow({
                'name': r.name,
                'total_price': r.total_price,
                'total_qty': r.total_qty,
                'order_qty': r.order_qty,
            })
        fp.seek(0)
        return {
            'filename': 'statistics_by_shop.csv',
            'data': fp.read(),
        }
