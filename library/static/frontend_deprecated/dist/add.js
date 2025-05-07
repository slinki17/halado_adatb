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
// ------------- Könyv létrehozása -------------
function createBook(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_BASE}/books/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    });
}
// ------------- Könyvpéldány létrehozása -------------
function createCopy(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_BASE}/copies/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    });
}
// ------------- Bérlés létrehozása -------------
function createBorrowing(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_BASE}/borrowings/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    });
}
// ------------- Foglalás létrehozása -------------
function createReservation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_BASE}/reservations/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    });
}
// ------------- FORM BEKÖTÉSEK -------------
function setupBookForm() {
    const form = document.getElementById("book-form");
    form.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const title = document.getElementById("book_title").value;
        const author = document.getElementById("book_author").value;
        const year = parseInt(document.getElementById("book_year").value, 10);
        const genre = document.getElementById("book_genre").value;
        yield createBook({ title, author, year, genre });
        form.reset();
        alert("Book added!");
    });
}
function setupCopyForm() {
    const form = document.getElementById("copy-form");
    form.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const book = parseInt(document.getElementById("copy_book_id").value, 10);
        const status = document.getElementById("copy_status").value;
        yield createCopy({ book, status });
        form.reset();
        alert("Book copy added!");
    });
}
function setupBorrowingForm() {
    const form = document.getElementById("borrowing-form");
    form.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const user = parseInt(document.getElementById("borrowing_user").value, 10);
        const copy = parseInt(document.getElementById("borrowing_copy").value, 10);
        const date = document.getElementById("borrowing_date").value;
        const due = document.getElementById("borrowing_due").value;
        const status = parseInt(document.getElementById("borrowing_status").value, 10) || 0;
        yield createBorrowing({ user, copy, date, due, status });
        form.reset();
        alert("Borrowing added!");
    });
}
function setupReservationForm() {
    const form = document.getElementById("reservation-form");
    form.onsubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const user = parseInt(document.getElementById("reservation_user").value, 10);
        const copy = parseInt(document.getElementById("reservation_copy").value, 10);
        const reservation_date = document.getElementById("reservation_date").value;
        const expiration_date = document.getElementById("reservation_expiration").value;
        const status = parseInt(document.getElementById("reservation_status").value, 10) || 0;
        yield createReservation({ user, copy, reservation_date, expiration_date, status });
        form.reset();
        alert("Reservation added!");
    });
}
// ------------- INIT -------------
function init_add() {
    setupBookForm();
    setupCopyForm();
    setupBorrowingForm();
    setupReservationForm();
}
init_add();
