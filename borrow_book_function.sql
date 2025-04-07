CREATE OR REPLACE FUNCTION borrow_book(
	p_user_id INT,
    p_copy_id INT,
    p_date DATE,
    p_due DATE
) RETURNS VOID AS $$
DECLARE
	v_status INT;
BEGIN
	SELECT status INTO v_status FROM copies WHERE copy_id = p_copy_id;
	IF (v_status = 1) OR (v_status = 2 AND p_user_id IN 
	(SELECT user_id FROM reservations WHERE copy_id = p_copy_id AND status = 1)) THEN
		INSERT INTO borrowing (user_id,copy_id,date,due,return_date,status)
		VALUES (p_user_id,p_copy_id,p_date,p_due,NULL,1);
		UPDATE copies SET status = 3 WHERE copy_id = p_copy_id;
	ELSE
		RAISE EXCEPTION 'A kiválasztott könyvmásolat nem elérhető kölcsönzésre.';
	END IF;
END;
$$ LANGUAGE plpgsql;

--példa használat (lefut, mert nincs lefoglalva vagy kikölcsönözve):
SELECT borrow_book(2,17,'2025-04-07','2025-06-07')

--példa használat (nem fut le, mert már le van foglalva egy másik felhasználó által)
SELECT borrow_book(1,12,'2025-04-07','2025-06-07')

--példa használat (nem fut le, mert már ki van kölcsönözve)
select borrow_book(3,16,'2025-04-07','2025-06-07')

--példa használat (lefut, mert le van foglalva, de a megadott felhasználó által)
select borrow_book(2,10,'2025-04-07','2025-06-07')

select * from copies
select * from borrowing
select * from reservations