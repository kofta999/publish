---
share_link: https://share.note.sx/32v0lryd#kg8hBzxG3nTiwTU0W3qHmnP/+UXjjME4AuIe5eol4oY
share_updated: 2025-12-09T23:17:38+02:00
---
2025-12-09 18:28
Tags: #storage 
##### Content

##### Disk Controllers
Consists of
- **Frontend**
	- Ports: Connectivity with the server
	- Controller: Encapsulation, Decapsulation, Read and Write Requests
- **Cache**
	- Improves performance
	- We aim to increase cache hits using algorithms like MRU, LRU, Prefetch (for sequential data)
	- Methods: [[caching#write-through|Write-through]], [[caching#write-behind (write-back)|Write-back]]
	 ![[Pasted image 20251206103519.png|500]]
	
	- Cache Data Protection Techniques
		- Cache Mirroring: Using 2 cache components
		- Cache Vaulting: Connecting cache to a battery in case of a power failure

- **Backend**
	- Ports: Connectivity with physical disks
	- Controller: Encapsulation, Decapsulation, Read and Write Requests, Error Detection

![[Pasted image 20251206102429.png|700]]

##### References
