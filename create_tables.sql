create table Users(

	user_id serial primary key,
	name varchar(255),
	email varchar(255),
	phone varchar(255),
	type varchar(255)

);

create table Books(

	book_id serial primary key,
	title varchar(255),
	author varchar(255),
	year int,
	genre varchar(255)
	
);

create table Copies(

	copy_id serial primary key,	
	book_id int,
	status varchar(255),
	foreign key (book_id) references Books(book_id)
	
);

create table Borrowing(

	borrow_id serial primary key,
	user_id int,
	copy_id int,
	date date,
	due date,
	return_date date,
	status int,
	foreign key (user_id) references Users(user_id),
	foreign key (copy_id) references Copies(copy_id)

);

create table Reservations(

	reservation_id serial primary key,
	user_id int,
	copy_id int,
	reservation_date date,
	expiration_date date,
	status int,
	foreign key (user_id) references Users(user_id),
	foreign key (copy_id) references Copies(copy_id)

);
