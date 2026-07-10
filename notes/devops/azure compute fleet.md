2025-12-28 19:11
Tags: #cloud/azure
##### Content
### Azure Compute Fleet

Compute Fleet is a high-scale deployment service designed for massive, often stateless, workloads (up to 10,000 VMs).

### Key Technical Differences from VMSS
* **Scale:** Extends the limit from 1,000 (VMSS) to **10,000** instances.
* **Multi-Size Support:** You can define a list of preferred VM sizes, and the Fleet will pick the most available/cost-effective ones.
* **Spot Management:** Specifically designed to handle "Spot Evictions." It can automatically replace evicted Spot instances with different sizes or shift them to On-Demand instances to maintain capacity.
* **Distribution:** Can be configured to spread instances across multiple regions or availability zones automatically.

##### References
[[compute]]