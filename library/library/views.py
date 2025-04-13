from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import UserSerializer, BookSerializer, BookCopySerializer, BorrowingSerializer, ReservationSerializer
from rest_framework import viewsets

#Backend

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = Copy.objects.all()
    serializer_class = BookCopySerializer

class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer