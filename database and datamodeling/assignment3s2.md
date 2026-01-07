
A query frequently runs:

  SELECT * FROM bookings

WHERE doctor_id = ?

AND appointment_date >= ?

AND appointment_date <= ?;

Propose a composite index
Explain column order choice.


solution: as query exicute left to right firstly doctor_id should get searched and then appoinment_date. so we need to make indexing according to that so doctor_id would come left to appointment_id.

Query would be: CREATE INDEX idx_booking_doctor_date
                ON booking(doctor_id, appointment_id)