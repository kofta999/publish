2026-03-09 14:47
Tags: #cloud/aws/compute 
##### Content
A **Spot Fleet** is a collection of Spot Instances (and optionally On-Demand) that attempts to meet a "Target Capacity."

**Key Features**
* **Launch Pools:** A combination of Instance Type + AZ + OS (e.g., `c5.large` in `us-east-1a`). Defining many pools increases the "fleet's" resilience.
* **Instance Weighting:** You can define how much each instance type "counts" toward your goal.
    * Example: A `c5.2xlarge` could be weighted as **2**, while a `c5.xlarge` is **1**. If your target is 10, the fleet can pick any combination to reach that sum.
* **Rebalance Recommendation:** A signal sent before the 2-minute notice, warning that a pool is at high risk of being reclaimed.
* **EC2 Fleet (The Modern Standard):** A unified API to manage Spot, On-Demand, and Reserved instances. AWS now recommends using EC2 Fleet over the older Spot Fleet for better integration with other services.

**Allocation Strategies**

| **Strategy**               | **Behavior**                                                                        | **Best For...**                                           |
| -------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **lowestPrice**            | Picks the absolute cheapest pool.                                                   | Short-term, cost-sensitive tasks.                         |
| **diversified**            | Spreads instances across all pools.                                                 | High availability (less impact if one pool is reclaimed). |
| **capacityOptimized**      | Picks pools with the most available spare capacity.                                 | Workloads where avoiding interruptions is a priority.     |
| **priceCapacityOptimized** | **(Recommended)** Balances the highest capacity availability with the lowest price. | Most production workloads.                                |
##### References
