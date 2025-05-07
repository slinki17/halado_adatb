from .models import *
from .serializers import UserSerializer, BookSerializer, BookCopySerializer, BorrowingSerializer, ReservationSerializer
from rest_framework import viewsets
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
from datetime import timedelta
from django.db import transaction
from django.http import JsonResponse
from .migrate import sync_gcp_to_sqlite
import logging
logger = logging.getLogger('library')

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

@transaction.atomic
def reserve_copy(request, user_id, copy_id):
    copy = get_object_or_404(Copies, pk=copy_id)
    reservation = Reservations.objects.create(
        user_id=user_id,
        copy=copy,
        reservation_date=timezone.now().date(),
        expiration_date=timezone.now().date() + timedelta(days=3),
        status=2 
    )
    copy.status = 2  
    copy.save()

    logger.info(f"User {user_id} reserved copy {copy_id} until {reservation.expiration_date}")
    return redirect('book_list', user_id=user_id)

@transaction.atomic
def borrow_copy(request, user_id, copy_id):
    copy = get_object_or_404(Copies, pk=copy_id)

    reservation = Reservations.objects.filter(
        user_id=user_id,
        copy_id=copy_id,
        expiration_date__gte=timezone.now().date()
    ).first()

    if reservation:
        reservation.delete()

    Borrowing.objects.create(
        user_id=user_id,
        copy=copy,
        date=timezone.now().date(),
        due=timezone.now().date() + timedelta(days=14),
        status=3
    )

    copy.status = 3
    copy.save()

    logger.info(f"User {user_id} borrowed copy {copy_id} (from reservation: {bool(reservation)})")
    return redirect('book_list', user_id=user_id)


@transaction.atomic
def cancel_reservation(request, user_id, reservation_id):
    reservation = get_object_or_404(Reservations, pk=reservation_id, user_id=user_id)

    copy = reservation.copy
    reservation.delete()

    copy.status = 1
    copy.save()

    logger.info(f"User {user_id} canceled reservation {reservation_id} for copy {copy.copy_id}")
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
        logger.info(f"User {user_id} returned copy {copy_id}")
        borrowing.save()
    else:
        logger.warning(f"Return attempt without borrowing: user {user_id}, copy {copy_id}")

    copy.status = 1 
    copy.save()

    return redirect('book_list', user_id=user_id)

def sync_from_gcp(request):
    try:
        sync_gcp_to_sqlite()
        return JsonResponse({"status": "success", "message": "Adatok szinkronizálva a GCP-ből SQLite-ba."})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)