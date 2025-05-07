var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_BASE } from "./config.js";
// ------------- Fetchers -------------
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/books/`);
        return res.json();
    });
}
function fetchCopies() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/copies/`);
        return res.json();
    });
}
function fetchBorrowings() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/borrowings/`);
        return res.json();
    });
}
function fetchReservations() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/reservations/`);
        return res.json();
    });
}
// ------------- Renderelés -------------
function renderBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield fetchBooks();
        const list = document.getElementById("book-list");
        list.innerHTML = "";
        books.forEach((b) => {
            const li = document.createElement("li");
            li.textContent = `#${b.id} "${b.title}" by ${b.author} (${b.year}), genre=${b.genre}`;
            list.appendChild(li);
        });
    });
}
function renderCopies() {
    return __awaiter(this, void 0, void 0, function* () {
        const copies = yield fetchCopies();
        const list = document.getElementById("copy-list");
        list.innerHTML = "";
        copies.forEach((c) => {
            const li = document.createElement("li");
            li.textContent = `#${c.id} → book=${c.book}, status=${c.status}`;
            list.appendChild(li);
        });
    });
}
function renderBorrowings() {
    return __awaiter(this, void 0, void 0, function* () {
        const borrowings = yield fetchBorrowings();
        const list = document.getElementById("borrowing-list");
        list.innerHTML = "";
        borrowings.forEach((b) => {
            const returned = b.return_date || "Not returned";
            let li = document.createElement("li");
            li.textContent = `#${b.id} user=${b.user}, copy=${b.copy}, date=${b.date}, due=${b.due}, returned=${returned}, status=${b.status}`;
            list.appendChild(li);
        });
    });
}
function renderReservations() {
    return __awaiter(this, void 0, void 0, function* () {
        const reservations = yield fetchReservations();
        const list = document.getElementById("reservation-list");
        list.innerHTML = "";
        reservations.forEach((r) => {
            const li = document.createElement("li");
            li.textContent = `#${r.id} user=${r.user}, copy=${r.copy}, reserved=${r.reservation_date}, exp=${r.expiration_date}, status=${r.status}`;
            list.appendChild(li);
        });
    });
}
function init() {
    console.log('a');
    renderBooks();
    renderCopies();
    renderBorrowings();
    renderReservations();
}
init();
