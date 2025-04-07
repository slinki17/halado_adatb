insert into Users (name,email,phone,type) values
('John Doe','johndoe79@gmail.com','540-210-4560','user'),
('Sarah Connor','sarah.c.88@gmail.com','785-317-6540','user'),
('Eric Mathews','e.mathews91@gmail.com','332-490-3570','user');

insert into Books (title,author,year,genre) values
('The Great Gatsby','F. Scott Fitzgerald',1925,'Classic'),
('To Kill a Mockingbird','Harper Lee',1960,'Fiction'),
('1984','George Orwell', 1949,'Dystopian'),
('The Catcher in the Rye','J.D. Salinger',1951,'Fiction'),
('Pride and Prejudice','Jane Austen',1813,'Romance'),
('The Hobbit','J.R.R. Tolkien',1937,'Fantasy'),
('Moby-Dick','Herman Melville',1851,'Adventure'),
('War and Peace','Leo Tolstoy',1869,'Historical'),
('The Road','Cormac McCarthy',2006,'Post-Apocalyptic'),
('The Alchemist','Paulo Coelho',1988,'Fantasy');

insert into Copies (book_id,status) values
(1,1),
(1,1),
(2,1),
(2,3),
(3,1),
(3,1),
(4,1),
(4,1),
(5,1),
(5,2),
(6,1),
(6,2),
(7,1),
(7,1),
(8,1),
(8,3),
(9,1),
(9,1),
(10,1),
(10,3);

insert into Borrowing (user_id,copy_id,date,due,return_date,status) values
(3,20,'2024-11-07','2025-01-02','2025-01-01',2),
(1,10,'2024-12-10','2025-01-12','2025-01-15',2),
(2,12,'2025-01-15','2025-03-02','2025-03-01',2),
(1,4,'2025-02-12','2025-05-02',NULL,1),
(3,16,'2025-03-01','2025-04-25',NULL,1),
(2,20,'2025-03-01','2025-06-01',NULL,1);

insert into Reservations (user_id,copy_id,reservation_date,expiration_date,status) values
(3,15,'2024-10-10','2025-01-04',2),
(1,2,'2025-01-16','2025-03-18',2),
(2,10,'2025-03-20','2025-06-27',1),
(2,12,'2025-02-07','2025-05-01',1);
