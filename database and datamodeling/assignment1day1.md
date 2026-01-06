1. To store Transaction Detail :

Database: SQL
Why: provides strong inbuilt ACID property, easy to maintain relation with other data, indexing can be applied on the fields like transaction_dates, transaction_id,account_id easy to fetch relation data by join operation on the multiple relational table and stable for high volume transaction details.

2. For storing logs:

Database: NoSQL
Why: easy to scale horizontally, log files can change over time so it is schema-less, better for write heavy operation. The database mostly used are CassandraDB, DynamoDB, MongoDB.

3. Maintaining caches:

Database: In-memory
Why: it stores data into RAM buffer, faster to retrieve, reading and writing speed of data is way higher, mostly used databases are Redis, Memcached.
