from django.db import models
from app.customer.models import Customer
import uuid

class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name=models.CharField(max_length=50)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock=models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} {self.id}"

    class Meta:
        db_table = 'product'
        ordering = ['price', 'stock']
        verbose_name = 'Product'
        verbose_name_plural = 'Products'



class Order(models.Model):
    STATUS_CHOICES = [("PENDING","Pending"),
                      ("PROCESSING","Processing"),
                      ("SHIPPED","Shipped"),
                      ("DELIVERED","Delivered"),
                      ("CANCELED","Canceled")]
    id=models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    products = models.ManyToManyField(Product, through='OrderItem')
    status = models.CharField(choices=STATUS_CHOICES, default="PENDING", max_length=50)

    def __str__(self):
        return f"Order #{self.id} by {self.customer.first_name}"

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Order #{self.order.id})"



