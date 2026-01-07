Q. Given the table:

orders

id  user_id  status created_at

Suggest appropriate indexes

Explain why you choose them


solution:
If id is a primary key, then it already has an index. If not, according to me, columns like id and user_id should have indexes because in the future we will fetch data primarily using these fields. If the orders table gets a high number of entries or the number of users increases, searching by user_id or id without indexes can increase latency.

Applying indexes on fields like status or created_at would not be effective because we are not going to search by these fields.