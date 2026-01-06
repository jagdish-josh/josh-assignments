Data normalization is the process of storing structured data in a database in an efficient way by reducing redundancy and improving consistency and integrity. If a database is not normalized, redundancy in the database will increase. The same value can be inserted in multiple ways, which can reduce consistency. Data may be forced to keep multiple NULL values in columns, which can increase irrelevant space in the database. As a result, database server costs will increase, and the load on a single table will also increase.



Q. Convert the following unnormalized data into 1NF:

Order_ID Customer_Name Products  
101      Rahul         Laptop, Mouse



Data into 1NF

Order_ID Customer_Name Products  
101      Rahul         Laptop  
101      Rahul         Mouse
