from rest_framework import viewsets
from app.product.models import Product
from app.product.api.serializers.products_serializer import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view , action
from rest_framework.response import Response
from app.product.models import Product
from django.db.models import Sum


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [IsAuthenticated]


    @action(detail=False, methods=['get'], url_path='top-selling')
    def top_selling(self, request):
        top_products = (
            Product.objects
            .annotate(total_sold=Sum('orderitem__quantity'))
            .order_by('-total_sold')[:5]
        )
        data = [
            {
                "id": p.id,
                "name": p.name,
                "price": float(p.price),
                "stock": p.stock,
                "total_sold": p.total_sold or 0
            }
            for p in top_products
        ]
        return Response(data)

    @action(detail=False, methods=['get'], url_path='low-stock')
    def low_stock(self, request):
        threshold = 10
        low_stock_products = Product.objects.filter(stock__lt=threshold)
        serializer = self.get_serializer(low_stock_products, many=True)
        return Response(serializer.data)