2025-12-23 20:48
Tags: #cloud/azure
##### Content
### Cost Management and Optimization

Azure Cost Management provides tools to monitor, allocate, and reduce cloud spend.

### Monitoring and Allocation
- Budgets: Set spending limits based on actual cost or forecasted cost.
- Alerts: Triggered at specific percentages of the budget (e.g., 50%, 80%, 100%).
- Cost Allocation: Used to split costs of shared services (like a shared ExpressRoute) between different departments.

### Optimization Strategies (AWS Comparison)
- Right-sizing: Shutting down idle VMs or downsizing over-provisioned ones.
- Azure Reservations: Similar to AWS Reserved Instances. Commit to a 1 or 3-year term for up to 72% savings.
- Savings Plans: More flexible than Reservations; applies a discount across different resource types (VMs, Functions, etc.) based on a hourly spend commitment.
- Azure Hybrid Benefit (AHB): Use existing on-premises Windows Server or SQL Server licenses to reduce the hourly rate of Azure VMs. (Significant exam topic).
- Spot Instances: Use unused Azure capacity at a massive discount (up to 90%), but resources can be evicted if Azure needs the capacity back.

### Pricing Tools
- Pricing Calculator: Estimate costs *before* deployment.
- TCO Calculator: Compare the cost of On-Premises vs. Azure over time.

##### References
[[governance]]