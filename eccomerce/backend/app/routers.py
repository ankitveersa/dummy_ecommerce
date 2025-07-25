from rest_framework import routers
# from app import views  # Replace 'your_app' with your actual app name
from app.customer.api.views.customer_views import CustomerViewSet
from app.customer.api.views.admin_views import AdminViewSet, LoginViewSet
from app.product.api.views.products_views import ProductViewSet
from app.product.api.views.orders_views import OrderViewSet

router = routers.DefaultRouter()


router.register(r'users', AdminViewSet)
router.register(r'login',LoginViewSet ,basename='login')

# for customers
router.register(r'customers', CustomerViewSet)

# for products and orders
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = router.urls