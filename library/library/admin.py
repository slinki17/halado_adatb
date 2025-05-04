from django.contrib import admin
from .models import *

admin.site.register(Users)
admin.site.register(Books)
admin.site.register(Copies)
admin.site.register(Borrowing)
admin.site.register(Reservations)
