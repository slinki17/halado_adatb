insert into Users values
(1,'John Doe','johndoe79@gmail.com','540-210-4560','user'),
(2,'Sarah Connor','sarah.c.88@gmail.com','785-317-6540','user'),
(3,'Eric Mathews','e.mathews91@gmail.com','332-490-3570','user')
go
insert into Books values
(1,'The Great Gatsby','F. Scott Fitzgerald',1925,'Classic'),
(2,'To Kill a Mockingbird','Harper Lee',1960,'Fiction'),
(3,'1984','George Orwell', 1949,'Dystopian'),
(4,'The Catcher in the Rye','J.D. Salinger',1951,'Fiction'),
(5,'Pride and Prejudice','Jane Austen',1813,'Romance'),
(6,'The Hobbit','J.R.R. Tolkien',1937,'Fantasy'),
(7,'Moby-Dick','Herman Melville',1851,'Adventure'),
(8,'War and Peace','Leo Tolstoy',1869,'Historical'),
(9,'The Road','Cormac McCarthy',2006,'Post-Apocalyptic'),
(10,'The Alchemist','Paulo Coelho',1988,'Fantasy');
go
insert into Copies values
(1,1,1),
(2,1,1),
(3,2,1),
(4,2,2),
(5,3,1),
(6,3,1),
(7,4,1),
(8,4,1),
(9,5,1),
(10,5,2),
(11,6,1),
(12,6,2),
(13,7,1),
(14,7,1),
(15,8,1),
(16,8,2),
(17,9,1),
(18,9,1),
(19,10,1),
(20,10,2)
go
insert into Borrowing values
(1,1,4,'2025-02-12','2025-03-20','2025-03-15'),
(2,1,10,'2024-12-10','2025-01-12','2025-01-15'),
(3,2,12,'2025-01-15','2025-03-02','2025-03-01'),
(4,3,16,'2025-03-01','2025-04-25','2025-04-26'),
(5,3,20,'2024-11-07','2025-01-02','2025-01-01')
go
insert into Reservations values
(1,1,2,'2025-01-16','2025-03-18',2),
(2,2,5,'2025-03-20','2025-06-27',1),
(3,2,6,'2025-02-07','2025-05-01',1),
(4,3,9,'2024-10-10','2025-01-04',2)


