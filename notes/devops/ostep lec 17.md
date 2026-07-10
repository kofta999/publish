### CS 537: OS - 17 | Persistence: RAID

This lecture covers **RAID** (Redundant Array of Independent Disks), a technology that combines multiple physical disks into a single logical unit to improve capacity, performance, and reliability.

---

#### Summary:

The professor introduces RAID as a transparent layer between the file system and physical hardware. The file system sees a single large linear array of blocks, while the RAID controller handles the mapping to actual disks. The lecture evaluates four primary RAID levels—0, 1, 4, and 5—comparing them based on capacity, reliability (using a fail-stop model), and performance across different workloads (sequential vs. random, reads vs. writes).

---

#### Key Points:

* **RAID 0 (Striping):** Blocks are distributed across disks in a round-robin fashion.
* **Performance:** Offers the best throughput for both reads and writes ( single disk performance) [00:30:00](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=1800).
* **Reliability:** No redundancy; if one disk fails, all data is lost [00:31:45](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=1905).


* **RAID 1 (Mirroring):** Data is duplicated across two or more disks.
* **Capacity:** Efficiency is  (for ), as half the space is used for copies [00:45:12](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=2712).
* **Performance:** Excellent for random reads (all disks can work independently), but writes are limited by the slowest disk in the mirror [00:38:45](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=2325).


* **RAID 4 (Dedicated Parity):** Uses a single dedicated disk to store parity (XOR) of data on other disks.
* **The Bottleneck:** While good for reads, every write must update the parity disk, making it a severe performance bottleneck for random writes [00:59:19](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=3559).


* **RAID 5 (Distributed Parity):** Rotates the parity block across all disks in the array to remove the RAID 4 bottleneck.
* **Left Symmetric Mapping:** A specific layout that ensures sequential reads can utilize all disks effectively [01:04:20](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=3860).
* **Performance:** Random writes still suffer a "write penalty" (4 physical I/Os for 1 logical write), but the load is balanced across the array [01:10:03](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=4203).



---

#### Knowledge Gaps:

* The lecture mentions **RAID 6**, which can handle two simultaneous disk failures, but notes it is beyond the scope of this specific session [01:10:54](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=4254).
* **Latent Sector Errors** (silent corruption) are not the focus here; the lecture assumes a **Fail-Stop** model where disks simply die and notify the system [00:36:10](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=2170).

---

#### Questions Answered:

* **Why use inexpensive disks instead of one high-end disk?** Leveraging "economies of scale" makes it cheaper to combine many commodity disks than to buy one specialized, high-capacity, high-speed unit [00:17:45](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=1065).
* **How does RAID update parity efficiently?** Instead of reading all disks, the controller can use "additive" or "subtractive" parity: reading the old data and old parity to calculate the new parity with only 4 I/O operations [00:53:50](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=3230).
* **What is the RAID Write Hole?** A crash during a write can leave the data and parity inconsistent. Hardware RAIDs solve this with battery-backed non-volatile RAM (NVRAM) to journal pending writes [00:47:42](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=2862).

---

#### Homework Problems:

* **Logical to Physical Mapping:** Calculate the disk and offset for a block using `Disk = Address % DiskCount` and `Offset = Address / DiskCount` [00:27:15](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=1635).
* **Parity Calculation:** Given a stripe of data (e.g., 0011), determine the parity bit using XOR [00:50:56](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=3056).
* **Throughput Analysis:** Calculate the random write throughput of a RAID 5 system with  disks  [01:09:55](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=4195).

---

#### Ponder Question:

* **If you are running a database with high random write requirements and cost is no object, why might you choose RAID 10 over RAID 5?** [01:12:15](http://www.youtube.com/watch?v=EBvnXTVtGSw&t=4335)