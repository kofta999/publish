2025-04-28 16:31
Tags: #system-design
##### Content
Talks about the trade-offs between consistency and availability when the system suffers partitions

#### ATM Example
Consider 2 ATMs, 1 customer account
Functions: Withdraw, Deposit, Check Balance
Limitation: Balance should not drop below zero
Each ATM has a copy of account balance

Consider a partition case: which means ATM 1 cannot connect to ATM 2
What should ATM 1 do is the design decision the CAP theorem talks about, either be consistent or available

#### Consistent design
ATM 1 will not accept any transactions until connection to ATM 2 is restored

#### Available design
ATM 1 allows transactions, then notify ATM 2 when connection is restored

But in real world, we can talk about **degrees** of availability and consistency

For example:
#### Partially Available design
- Deposits: yes
- Withdrawals: no | small and rate-limited
- Balance Info: no | tentative (we aren't sure if it's correct)


Consistent designs are easier to build / more simple at the cost of availability
##### References
https://youtu.be/k-Yaq8AHlFA