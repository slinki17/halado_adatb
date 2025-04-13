from django.db import models

class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.id})"

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    year = models.IntegerField()
    genre = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.id})"

class Copy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)

    def __str__(self):
        return f"Copy {self.id} of {self.book.title} - {self.status}"

class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(Copy, on_delete=models.CASCADE)
    date = models.DateField()
    due = models.DateField()
    return_date = models.DateField(blank=True, null=True)
    status = models.IntegerField()

    def __str__(self):
        return f"Borrowing {self.id} by {self.user.name} of copy {self.copy.id}"

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(Copy, on_delete=models.CASCADE)
    reservation_date = models.DateField()
    expiration_date = models.DateField()
    status = models.IntegerField()

    def __str__(self):
        return f"Reservation {self.id} by {self.user.name} for copy {self.copy.id}"
