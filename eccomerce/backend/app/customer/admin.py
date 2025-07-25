from django.contrib import admin
from app.customer.models import Customer  # Import your Customer model
from app.customer.models import Admin
# Register your models here.
admin.site.register(Customer)
admin.site.register(Admin)
