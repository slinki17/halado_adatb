from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import UserSerializer, BookSerializer, BookCopySerializer, BorrowingSerializer, ReservationSerializer
from rest_framework import viewsets
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from datetime import timedelta

#Backend

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer

class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = Copies.objects.all()
    serializer_class = BookCopySerializer

class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservations.objects.all()
    serializer_class = ReservationSerializer

def select_user(request):
    users = Users.objects.all()
    return render(request, 'select_user.html', {'users': users})

def book_list(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    books = Books.objects.all()
    copies = Copies.objects.all()

    active_borrowings = Borrowing.objects.filter(user=user, return_date__isnull=True)

    from django.utils import timezone
    today = timezone.now().date()
    active_reservations = Reservations.objects.filter(user=user, expiration_date__gte=today)

    return render(request, 'book_list.html', {
        'user': user,
        'books': books,
        'copy_list': copies,
        'borrowings': active_borrowings,
        'reservations': active_reservations,
    })



def reserve_copy(request, user_id, copy_id):
    copy = get_object_or_404(Copies, pk=copy_id)
    Reservations.objects.create(
        user_id=user_id,
        copy=copy,
        reservation_date=timezone.now().date(),
        expiration_date=timezone.now().date() + timedelta(days=3),
        status=2 
    )
    copy.status = 2  
    copy.save()
    return redirect('book_list', user_id=user_id)

def borrow_copy(request, user_id, copy_id):
    copy = get_object_or_404(Copies, pk=copy_id)
    Borrowing.objects.create(
        user_id=user_id,
        copy=copy,
        date=timezone.now().date(),
        due=timezone.now().date() + timedelta(days=14),
        status=3
    )
    copy.status = 3 
    copy.save()
    return redirect('book_list', user_id=user_id)

def return_copy(request, user_id, copy_id):
    from django.utils import timezone

    copy = get_object_or_404(Copies, pk=copy_id)

    borrowing = Borrowing.objects.filter(
        user_id=user_id,
        copy_id=copy_id,
        return_date__isnull=True
    ).order_by('-date').first()

    if borrowing:
        borrowing.return_date = timezone.now().date()
        borrowing.status = 0
        borrowing.save()

    copy.status = 1 
    copy.save()

    return redirect('book_list', user_id=user_id)

