import { API_BASE } from "./config.js";

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
  

 // ------------- Fetchers -------------
  async function fetchBooks(): Promise<Book[]> {
    const res = await fetch(`${API_BASE}/books/`);
    return res.json();
  }
  
  async function fetchCopies(): Promise<Copy[]> {
    const res = await fetch(`${API_BASE}/copies/`);
    return res.json();
  }
  
  async function fetchBorrowings(): Promise<Borrowing[]> {
    const res = await fetch(`${API_BASE}/borrowings/`);
    return res.json();
  }
  
  async function fetchReservations(): Promise<Reservation[]> {
    const res = await fetch(`${API_BASE}/reservations/`);
    return res.json();
  }
  
  // ------------- Renderelés -------------
  async function renderBooks() {
    const books = await fetchBooks();
    const list = document.getElementById("book-list")!;
    list.innerHTML = "";
  
    books.forEach((b) => {
      const li = document.createElement("li");
      li.textContent = `#${b.id} "${b.title}" by ${b.author} (${b.year}), genre=${b.genre}`;
      list.appendChild(li);
    });
  }
  
  async function renderCopies() {
    const copies = await fetchCopies();
    const list = document.getElementById("copy-list")!;
    list.innerHTML = "";
  
    copies.forEach((c) => {
      const li = document.createElement("li");
      li.textContent = `#${c.id} → book=${c.book}, status=${c.status}`;
      list.appendChild(li);
    });
  }
  
  async function renderBorrowings() {
    const borrowings = await fetchBorrowings();
    const list = document.getElementById("borrowing-list")!;
    list.innerHTML = "";
  
    borrowings.forEach((b) => {
      const returned = b.return_date || "Not returned";
      let li = document.createElement("li");
      li.textContent = `#${b.id} user=${b.user}, copy=${b.copy}, date=${b.date}, due=${b.due}, returned=${returned}, status=${b.status}`;
      list.appendChild(li);
    });
  }
  
  async function renderReservations() {
    const reservations = await fetchReservations();
    const list = document.getElementById("reservation-list")!;
    list.innerHTML = "";
  
    reservations.forEach((r) => {
      const li = document.createElement("li");
      li.textContent = `#${r.id} user=${r.user}, copy=${r.copy}, reserved=${r.reservation_date}, exp=${r.expiration_date}, status=${r.status}`;
      list.appendChild(li);
    });
  }
  
  function init() {
    console.log('a')
    renderBooks();
    renderCopies();
    renderBorrowings();
    renderReservations();
  }
  
  init();
  