CREATE OR REPLACE FUNCTION return_book(
    p_user_id INT,
    p_copy_id INT,
    p_return_date DATE
) RETURNS VOID AS $$
DECLARE
	v_status1 INT;
	v_status2 INT;
BEGIN
	SELECT status into v_status1 FROM copies WHERE copy_id = p_copy_id;
	SELECT status into v_status2 FROM borrowing WHERE user_id = p_user_id AND copy_id = p_copy_id;
    IF v_status1 = 3 AND v_status2 = 1 THEN
		UPDATE borrowing SET status = 2, return_date = p_return_date
		WHERE user_id = p_user_id AND copy_id = p_copy_id;
    	UPDATE copies SET status = 1 WHERE copy_id = p_copy_id;
	ELSE
		RAISE EXCEPTION 'A kiválasztott könyvet nem lehet visszaváltani.';
	END IF;
END;
$$ LANGUAGE plpgsql;

--példa használat (lefut)
select return_book(1,4,'2025-04-07')

--példa használat (nem fut le)
select return_book(3,10,'2025-04-07')

select * from borrowing
select * from copies