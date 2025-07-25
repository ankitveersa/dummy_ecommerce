from rest_framework import viewsets
from app.product.models import  Order, OrderItem
from app.product.api.serializers.orders_serializer import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.utils import timezone
from django.db.models.functions import TruncMonth
from rest_framework.response import Response
from django.db.models import Sum ,F


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='count-this-month')
    def count_this_month(self, request):
        now = timezone.now()
        month_orders = Order.objects.filter(
            created_at__year=now.year,
            created_at__month=now.month
        ).count()
        return Response({"count": month_orders})

    @action(detail=False, methods=['get'], url_path='total-revenue')
    def total_revenue(self, request):
        total = OrderItem.objects.aggregate(
            total_revenue=Sum(F('quantity') * F('product__price'))
        )['total_revenue'] or 0

        return Response({"total_revenue": total})


