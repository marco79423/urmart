from django.urls import path

from . import views

urlpatterns = [
    path(r'apis/shops', views.ShopListView.as_view()),
    path(r'apis/products', views.ProductListView.as_view()),
    path(r'apis/orders', views.OrderListView.as_view()),
    path(r'apis/orders/<int:order_id>', views.OrderDetailView.as_view()),

    path(r'apis/tasks', views.TaskListView.as_view()),
    path(r'apis/tasks/<str:task_id>/status', views.TaskStatusDetailView.as_view()),
    path(r'apis/tasks/<str:task_id>/result', views.TaskResultDetailView.as_view()),
]
