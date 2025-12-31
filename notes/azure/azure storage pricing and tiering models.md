2025-12-24 18:39
Tags: #azure
##### Content
### Storage Pricing and Tiering Models

Understanding how you are billed is a major part of the AZ-104. Azure uses two distinct models: **Consumption** and **Provisioned**.

### Block Blob Tiering (Consumption-Based)
You pay for what you store.
- **Premium:** Best for high transaction rates/low latency.
- **Hot:** High storage cost, lowest access cost.
- **Cool/Cold/Archive:** Storage cost decreases as you go down, but **Data Access (Egress) and Transaction costs** increase significantly.
- **Rehydration:** Moving data from Archive back to Hot/Cool. "Standard" priority takes up to 15 hours; "High" priority takes minutes but is very expensive.

### Azure Files Tiering
- **Standard (Consumption):** Pay for space used + transactions.
    - *Tiers:* Transaction Optimized, Hot, Cool.
- **Premium (Provisioned):** You pay for the **Provisioned Capacity** (GiB). Performance (IOPS/Throughput) scales automatically with the GiB size you buy.

### Provisioned V2 (Standard Provisioning)
- Available for some services (like Page Blobs/Files). 
- Allows you to set a baseline capacity but adjust **IOPS and Throughput** independently for better cost control.

![[Pasted image 20251224184138.png]]
##### References
[[storage]]