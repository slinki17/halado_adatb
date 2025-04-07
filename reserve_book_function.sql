CREATE OR REPLACE FUNCTION reserve_book(
    p_user_id INT,
    p_copy_id INT,
    p_reservation_date DATE,
    p_expiration_date DATE
) RETURNS VOID AS $$
DECLARE
    v_status INT;
BEGIN
    SELECT status INTO v_status FROM copies WHERE copy_id = p_copy_id;
    IF v_status = 1 THEN
        INSERT INTO reservations (user_id, copy_id, reservation_date, expiration_date, status)
        VALUES (p_user_id, p_copy_id, p_reservation_date, p_expiration_date, 1);
        UPDATE copies SET status = 2 WHERE copy_id = p_copy_id;
    ELSE
        RAISE EXCEPTION 'A kiválasztott könyvmásolat nem elérhető foglalásra.';
    END IF;
END;
$$ LANGUAGE plpgsql;

--példa használat (nem fut le, mert a könymásolat már le van foglalva)
select reserve_book(1,12,'2025-04-07','2025-05-30')

--példa használat (nem fut le, mert a könyvmásolat már ki van kölcsönözve)
select reserve_book(1,20,'2025-04-07','2025-05-30')

--példa használat (lefut, mert a másolat elérhető)
select reserve_book(1,13,'2025-04-07','2025-05-30')

select * from copies
select * from reservations

