Consistency:
* In Data: when having a normalized view of data (Pictures / Picture_Likes) tables
* In Reads: If we updated a value to X and when we read it it's X then its consistent in reads, but with replicas, caches etc, that becomes not guaranteed

An Example of an inconsistent reads
![[Pasted image 20241018151313.png]]

The other replicas will *eventually* be consistent with the master node. 

Read inconsistency is in both SQL and NoSQL databases, but data consistency is unique to SQL.

The moment you introduce cache or scale horizontally, you becme inconsistent.

It's up to the developer to tolerate consistency or not (Twitter Likes VS Credit Account).
