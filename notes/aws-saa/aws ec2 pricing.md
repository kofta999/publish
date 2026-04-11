2025-02-08 13:49
Tags: #cloud/aws/compute  
##### Content
#### On-Demand Instances
- **Standard rate:** No discounts or commitments. (highest cost, no upfront payments)
- **Use case:** Ideal for development/testing or unpredictable workloads.
- **Billing:**
	- **Per-second billing:**
		- Minimum of 1 minute.
		- Applies to Amazon Linux, Ubuntu, and On-Demand/Reserved/Spot instances + volumes.
	- **Per-hour billing:**
		- Applies to commercial Linux distros and Windows.

#### Reserved Instances (RI)
- **Commitment**: 1 or 3 years.
- **Discount**: Up to 75% compared to On-Demand.
- **Use case**: Suitable for predictable workloads (e.g. DBs).
- **Scope:** Regional or Zonal (reserve capacity in AZ)
- **Payment options**:
	- All upfront
	- Partial upfront
	- No upfront
- **Types**:
	- **Standard RI**:
	    - Allows changes to Availability Zone (AZ), instance size (Linux), and networking type.
	    - Uses the `ModifyReservedInstances` API.
	  - **Convertible RI**:
	    - Allows all changes in Standard RI plus changes to instance family, OS, tenancy, and payment options. (less discount)
	    - Uses the `ExchangeReservedInstances` API.
- You can buy and sell instances in RI Marketplace

#### Scheduled Reserved Instances
- **Note**: This option is **deprecated**. Not found in Console or EC2 docs
- **Use case**: Match capacity reservations to recurring schedules.
- **Minimum commitment**: 1200 hours per year.

#### Savings Plans
- **Commitment**: Consistent amount of usage (EC2 + Fargate + Lambda).
- **Pricing**: Pay by $/hour.
- **Types**:
  - **Compute Savings Plan**:
    - Applies to EC2, Fargate, and Lambda.
    - Flexible across regions, instance families, sizes, tenancy, and OS.
  - **EC2 Savings Plan**:
    - Applies only to EC2.
    - Limited to a selected region and instance family, but flexible across sizes, tenancy, and OS.

#### Spot Instances
> **See:** [[aws ec2 spot requests]], [[aws ec2 spot fleet]]
- **Discount**: Up to 90% compared to On-Demand.
- **Risk**: Instances can be terminated at any time.
- **The Spot Contract**
	* **Spot Price:** Fluctuates based on supply and demand per Instance Type per Availability Zone (AZ).
	* **Max Price:** You define the maximum you are willing to pay. 
	    * If **Spot Price <= Max Price**: Instance runs.
	    * If **Spot Price > Max Price**: AWS gives a **2-minute grace period** before stopping or terminating the instance.
* **Interruption Handling:** You can choose the "Interruption Behavior": **Terminate**, **Stop**, or **Hibernate**.
    * **Hibernation:** Saves the RAM state to the EBS root volume so the workload can resume exactly where it left off when capacity returns.
- **Billing Nuances**
	* If **AWS interrupts** the instance: You are **not charged** for the partial hour of usage (on Linux/Unix).
	* If **You terminate** the instance: You **are charged** for the full partial hour.
- **Types**:
	- **Spot Instance**: One or more EC2 instances.
	- **Spot Fleet**: Launches and maintains a specified number of Spot/On-Demand instances to meet target capacity.
	- **EC2 Fleet**: Launches and maintains a specified number of Spot/On-Demand/Reserved instances in a single API call.
	- **Spot Block (deprecated):** Uninterrupted instances for 1–6 hours (30–45% cheaper than On-Demand)

#### Dedicated Instances
- **Isolation**: Physical isolation at the host hardware level.
- **Pricing**: Pay per instance.

#### Dedicated Hosts
- **Isolation**: Physical server dedicated for your use.
- **Features**: Socket/core visibility.
- **Pricing**: Pay per host.
- **Use case**: Ideal for workloads with server-bound software licenses (most expensive option) or compliance needs.

#### Capacity Reservations
- **Features**:
	- Reserve on-demand instance capacity in specific AZ for any duration
	- Can always access EC2 capacity whenever you need it
	- No time commitment, no billing discounts
- **Use case**: Ideal for short-term, uninterrupted workloads that need to be in a specific AZ

![[Pasted image 20260309143735.png]]

##### References
https://youtu.be/cPddsqctOY8