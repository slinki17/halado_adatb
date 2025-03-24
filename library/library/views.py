from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User, Book, BookCopy, Borrowing, Reservation
from django.shortcuts import render
from .models import Book

#Frontend

def book_list(request):
    books = Book.objects.all()  # Fetch all books from the database
    return render(request, 'book_list.html', {'books': books})

#Backend

