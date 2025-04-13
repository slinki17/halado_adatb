import { API_BASE } from "./config.js";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string | null;
};

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
};

type Copy = {
  id: number;
  book: number;    
  status: string; 
};

type Borrowing = {
  id: number;
  user: number;    
  copy: number;    
  date: string;    
  due: string;     
  return_date: string | null;
  status: number;  
};

type Reservation = {
  id: number;
  user: number; 
  copy: number;
  reservation_date: string;
  expiration_date: string;
  status: number;
};

// ------------- Könyv létrehozása -------------
async function createBook(data: Omit<Book, "id">) {
  await fetch(`${API_BASE}/books/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
}

// ------------- Könyvpéldány létrehozása -------------
async function createCopy(data: Omit<Copy, "id">) {
  await fetch(`${API_BASE}/copies/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
}

// ------------- Bérlés létrehozása -------------
async function createBorrowing(data: Omit<Borrowing, "id"|"return_date">) {
  await fetch(`${API_BASE}/borrowings/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
}

// ------------- Foglalás létrehozása -------------
async function createReservation(data: Omit<Reservation, "id">) {
  await fetch(`${API_BASE}/reservations/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
}

// ------------- FORM BEKÖTÉSEK -------------
function setupBookForm() {
  const form = document.getElementById("book-form") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const title = (document.getElementById("book_title") as HTMLInputElement).value;
    const author = (document.getElementById("book_author") as HTMLInputElement).value;
    const year = parseInt((document.getElementById("book_year") as HTMLInputElement).value, 10);
    const genre = (document.getElementById("book_genre") as HTMLInputElement).value;

    await createBook({ title, author, year, genre });
    form.reset();
    alert("Book added!");
  };
}

function setupCopyForm() {
  const form = document.getElementById("copy-form") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const book = parseInt((document.getElementById("copy_book_id") as HTMLInputElement).value, 10);
    const status = (document.getElementById("copy_status") as HTMLSelectElement).value;

    await createCopy({ book, status });
    form.reset();
    alert("Book copy added!");
  };
}

function setupBorrowingForm() {
  const form = document.getElementById("borrowing-form") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();

    const user = parseInt((document.getElementById("borrowing_user") as HTMLInputElement).value, 10);
    const copy = parseInt((document.getElementById("borrowing_copy") as HTMLInputElement).value, 10);
    const date = (document.getElementById("borrowing_date") as HTMLInputElement).value;
    const due = (document.getElementById("borrowing_due") as HTMLInputElement).value;
    const status = parseInt((document.getElementById("borrowing_status") as HTMLInputElement).value, 10) || 0;

    await createBorrowing({ user, copy, date, due, status });
    form.reset();
    alert("Borrowing added!");
  };
}

function setupReservationForm() {
  const form = document.getElementById("reservation-form") as HTMLFormElement;
  form.onsubmit = async (e) => {
    e.preventDefault();

    const user = parseInt((document.getElementById("reservation_user") as HTMLInputElement).value, 10);
    const copy = parseInt((document.getElementById("reservation_copy") as HTMLInputElement).value, 10);
    const reservation_date = (document.getElementById("reservation_date") as HTMLInputElement).value;
    const expiration_date = (document.getElementById("reservation_expiration") as HTMLInputElement).value;
    const status = parseInt((document.getElementById("reservation_status") as HTMLInputElement).value, 10) || 0;

    await createReservation({ user, copy, reservation_date, expiration_date, status });
    form.reset();
    alert("Reservation added!");
  };
}

// ------------- INIT -------------
function init_add() {
  setupBookForm();
  setupCopyForm();
  setupBorrowingForm();
  setupReservationForm();
}

init_add();
