---
share_link: https://share.note.sx/hdm4bi9i#RFxV8ZnmgcOq+naywb5BLLbS/CEdv2m2ZvXOi/cPcUY
share_updated: 2025-12-09T23:22:26+02:00
---
2025-12-06 10:17
Tags: #storage #os/persistance 
##### Content
#### RAID (Redundant Array of Independent Disks)
A technique that combines multiple disk drives into a logical unit (RAID set) and provides protection, performance, or both. 
Uses Static mapping (logical `x` always maps to physical `y`) as opposed to dynamic (data structures, like Page Tables).
##### RAID Components
- **RAID Controller:** Applies RAID technique on disks (either inside storage controller or a software)
- **RAID Set / Array:** Group of disks where RAID is applied on

![[Pasted image 20251220130354.png|300]]

##### RAID Techniques
- Mirroring: 2 disks minimum, putting data in both D1 and D2 (protection oriented)
- Striping: 2 disks minimum, splitting data (in **chunks**) between D1 and D2 (performance oriented)
- Parity: 3 disks minimum
	- Uses striping on D1 and D2, then calculates parity (using XOR) and puts it in D3. So that D1 or D2 data is recoverable using the other's data + parity data. 
	- Reading data from all disks is not needed on write, as you can generate the new parity from old + new data + old parity

**Note:** Write Penalty is the number of operations needed for a successful write to disk
##### RAID Types
- RAID 0 (Striping)
	Write Penalty = 1 (write to disk)
	![[Pasted image 20251206094902.png|400]]

- RAID 1 (Mirroring)
	Write Penalty = 2 (write to 2 disks)
	 ![[Pasted image 20251206094953.png|200]]

- RAID 1 + 0 (Mirroring +Striping)
	Write Penalty = 2 (write to 2 disks, striping doesn't count as an operation)
	4 Disks Minimum
	![[Pasted image 20251206095106.png|400]]	

- RAID 3 (Parity)
	Write Penalty = 4 (read old parity, read old data, write new parity, write new data)
	Data is stripped in **byte** level
	Not used in practice because its single, dedicated parity disk creates a bottleneck and a single point of failure
	![[Pasted image 20251206095558.png|400]]

- RAID 4 (parity)
	It's highly similar to RAID 3 with the only difference being that data is striped in **block** level (e.g., 16KB, 64KB, 128KB)

- RAID 5 (Parity Distributed Across Disks)
	Write Penalty = 4 (read old parity, read old data, write new parity, write new data)
	![[Pasted image 20251206095842.png|400]]

- RAID 6 (Each Parity Distributed Across 2 Disks)
	Write Penalty = 6 (read old data, read 2 old parities, write new data, write 2 new parities)
	4 Disks minimum (2 data + 2 parity)
	![[Pasted image 20251206100354.png|400]]

##### Production RAID Levels Comparison

![[Pasted image 20251220134344.png|500]]
Where:
- `N`: Number of disks
- `S`: Sequential Read speed
- `R`: Random Read speed

##### Dynamic Disk Sparing (Hot Sparing)
A hot sparing refers to a process that temporarily replaces a failed disk drive with a 
spare drive in a RAID array by taking the identity of the failed disk drive. 

![[Pasted image 20251206101416.png|400]]
##### References
ISM v4
[[ostep lec 17]]