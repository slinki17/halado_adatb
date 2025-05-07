import psycopg2
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def sync_table(source_cursor, target_cursor, table_name, fields):
    print(f"Szinkronizálás: {table_name}")
    source_cursor.execute(f"SELECT {', '.join(fields)} FROM {table_name}")
    rows = source_cursor.fetchall()

    target_cursor.execute(f"DELETE FROM {table_name}")

    placeholders = ', '.join(['?'] * len(fields))
    insert_sql = f"INSERT INTO {table_name} ({', '.join(fields)}) VALUES ({placeholders})"

    for row in rows:
        target_cursor.execute(insert_sql, row)

def sync_gcp_to_sqlite():
    gcp_conn = psycopg2.connect(
        host="34.65.182.224",
        database="library",
        user="postgres",
        password="h6twqPNO",
        port=5432
    )
    gcp_cursor = gcp_conn.cursor()

    sqlite_path = BASE_DIR / 'db.sqlite3'
    sqlite_conn = sqlite3.connect(sqlite_path)
    sqlite_cursor = sqlite_conn.cursor()

    sqlite_cursor.execute("DELETE FROM borrowing")
    sqlite_cursor.execute("DELETE FROM reservations")
    sqlite_cursor.execute("DELETE FROM copies")
    sqlite_cursor.execute("DELETE FROM books")
    sqlite_cursor.execute("DELETE FROM users")

    sync_table(gcp_cursor, sqlite_cursor, "users", ["user_id", "name", "email", "phone", "type"])
    sync_table(gcp_cursor, sqlite_cursor, "books", ["book_id", "title", "author", "year", "genre"])
    sync_table(gcp_cursor, sqlite_cursor, "copies", ["copy_id", "book_id", "status"])
    sync_table(gcp_cursor, sqlite_cursor, "reservations", ["reservation_id", "user_id", "copy_id", "reservation_date", "expiration_date", "status"])
    sync_table(gcp_cursor, sqlite_cursor, "borrowing", ["borrow_id", "user_id", "copy_id", "date", "due", "return_date", "status"])

    sqlite_conn.commit()

    gcp_cursor.close()
    gcp_conn.close()
    sqlite_conn.close()

    print("Szinkronizálás sikeres")
