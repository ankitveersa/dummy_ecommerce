from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.product.models import Product
from django.db.models import Sum

@api_view(['GET'])
def top_selling_products(request):
    top_products = (
        Product.objects
        .annotate(total_sold=Sum('orderitem__quantity'))
        .order_by('-total_sold')[:5]
    )
    result = [
        {
            "id": p.id,
            "name": p.name,
            "price": float(p.price),
            "stock": p.stock,
            "total_sold": p.total_sold or 0
        }
        for p in top_products
    ]
    return Response(result)
