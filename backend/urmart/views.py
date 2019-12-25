import io
import json

from celery.result import AsyncResult
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from urmart import errors
from urmart.models import Shop, Product, Order
from urmart.tasks import handle_task


class APIView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class ShopListView(APIView):

    def get(self, request):
        return JsonResponse({
            'data': [
                shop.serialize() for shop in Shop.objects.all().order_by('id')
            ]
        })


class ProductListView(APIView):

    def get(self, request):
        return JsonResponse({
            'data': [
                product.serialize() for product in Product.objects.all().order_by('id')
            ]
        })


class OrderListView(APIView):

    def get(self, request):
        return JsonResponse({
            'data': [
                order.serialize() for order in Order.objects.all().order_by('id')
            ]
        })

    def post(self, request):
        try:
            order = Order.create_order(json.loads(request.body))
        except errors.APIError as e:
            return JsonResponse({
                'error': e.serialize(),
            }, status=400)

        return JsonResponse({
            'data': order.serialize(),
        }, status=201)


class OrderDetailView(APIView):
    def delete(self, request, order_id):
        try:
            Order.delete_order(order_id)
        except errors.APIError as e:
            return JsonResponse({
                'error': e.serialize(),
            }, status=400)

        return HttpResponse(status=204)


class TaskListView(APIView):
    def post(self, request):
        try:
            json_data = json.loads(request.body)
            topic = json_data['topic']
        except KeyError:
            return JsonResponse({
                'error': errors.InvalidFormat().serialize(),
            }, status=400)

        async_result = handle_task.delay(topic)
        return JsonResponse({
            'data': {
                'id': async_result.id,
            }
        })


class TaskStatusDetailView(APIView):
    def get(self, request, task_id):
        async_result = AsyncResult(task_id)
        return JsonResponse({
            'data': {
                'state': async_result.state,
            }
        })


class TaskResultDetailView(APIView):
    def get(self, request, task_id):
        async_result = AsyncResult(task_id)
        result = async_result.get()
        response = HttpResponse(io.StringIO(result['data']))
        response['Content-Type'] = 'application/octet-stream'
        response['Content-Disposition'] = 'attachment;filename="{filename}"'.format(**result)
        return response
