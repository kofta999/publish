2026-03-09 15:26
Tags: #cloud/aws/compute 
##### Content
Placement Groups are a logical configuration that allows you to influence the physical placement of your EC2 instances within the AWS data centers. This is critical for optimizing network performance or increasing application availability.

### Cluster Placement Groups
A Cluster Placement Group packs instances close together inside a single **Availability Zone (AZ)**.

**Key Features**
* **Physical Layout:** Instances are placed on the same physical rack or in very close proximity.
* **Performance:** Provides the lowest possible network latency and the highest network throughput (up to 10 Gbps or 25 Gbps).
* **Use Cases:**
	* High-Performance Computing (HPC).
    * Big Data / Distributed Analytics (e.g., Hadoop, Spark).
    * Low-latency applications (e.g., specialized financial trading).
* **Risk:** If the specific rack or hardware fails, all instances in the group are likely affected.

> **Pro Tip:** To maximize performance, use the same instance type for all instances in a Cluster group.

![[Pasted image 20260309152725.png]]

### Spread Placement Groups
A Spread Placement Group strictly places each instance on a distinct, separate piece of hardware.

**Key Features**
* **Physical Layout:** Every single instance is placed on a different rack, each with its own network and power.
* **Maximum Reliability:** A single rack failure will only affect one instance in the group.
* **Limitations:** You are limited to **7 instances per AZ** per group.
* **Use Cases:**
	* Critical individual instances (e.g., a primary database and its secondary).
    * Applications where hardware-level isolation is mandatory for safety.

![[Pasted image 20260309152817.png|358]]

### Partition Placement Groups
A Partition Placement Group spreads instances across logical segments called **partitions**.

**Key Features**
* **Physical Layout:** Each partition represents a group of racks. AWS ensures that each partition has its own independent power and networking.
* **Isolation:** Instances in Partition A do not share hardware with Partition B.
* **Scale:** You can have up to **7 partitions per AZ**.
* **Use Cases:**
	* Large distributed and replicated workloads.
    * HDFS, HBase, and Cassandra.
    * Kafka (where you want different brokers on different partitions).

![[Pasted image 20260309152854.png|347]]

---
#### Critical Implementation Notes

* **Moving Instances:** You cannot move an existing instance into a placement group. You must create an AMI of the instance and then launch a new instance into the group.
* **Capacity Errors:** If you get an "Insufficient Capacity" error when launching into a Cluster group, it means the specific rack is full. You may need to stop and restart all instances in the group to allow AWS to find a new rack with enough room.
##### References
