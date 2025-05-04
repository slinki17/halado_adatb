"""
URL configuration for library project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)
router.register(r'copies', BookCopyViewSet)
router.register(r'borrowings', BorrowingViewSet)
router.register(r'reservations', ReservationViewSet)

urlpatterns = [
    path('', select_user, name='select_user'),
    path('books/<int:user_id>/', book_list, name='book_list'),
    path('reserve/<int:user_id>/<int:copy_id>/', reserve_copy, name='reserve_copy'),
    path('borrow/<int:user_id>/<int:copy_id>/', borrow_copy, name='borrow_copy'),
    path('return/<int:user_id>/<int:copy_id>/', return_copy, name='return_copy'),

]


