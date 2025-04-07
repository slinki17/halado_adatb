create table Users(

	user_id int primary key,
	name varchar(255),
	email varchar(255),
	phone varchar(255),
	type varchar(255)

);

create table Books(

	book_id int primary key,
	title varchar(255),
	author varchar(255),
	year int,
	genre varchar(255)
	
);

create table Copies(

	copy_id int primary key,
	book_id int,
	status varchar(255),
	foreign key (book_id) references Books(book_id)
);

create table Borrowing(

	borrow_id int primary key,
	user_id int,
	copy_id int,
	date date,
	due date,
	return_date date,
	foreign key (user_id) references Users(user_id),
	foreign key (copy_id) references Copies(copy_id)

);

create table Reservations(

	reservation_id int primary key,
	user_id int,
	copy_id int,
	reservation_date date,
	expiration_date date,
	status varchar(255),
	foreign key (user_id) references Users(user_id),
	foreign key (copy_id) references Copies(copy_id)

);
