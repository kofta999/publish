2025-12-29 20:54
Tags: #cloud/azure 
##### Content
### Azure App Service: Plans and Scaling

App Service is a PaaS offering for hosting web applications, REST APIs, and mobile backends.

### The Hierarchy
* **App Service Plan (ASP):** Represents the physical resources (CPU/RAM). Think of this as the "Server Farm."
* **App Service (App):** The actual code/container running. Multiple apps can run in a single ASP and share the same resources.

### Scaling Mechanics
* **Scale Up:** Changing the Pricing Tier (e.g., from Basic to Premium). This provides more CPU, RAM, and features like Slots.
* **Scale Out:** Increasing the number of VM instances. Standard and Premium tiers support **Autoscale** based on metrics (CPU, Memory).

### Deployment Slots
* Available in **Standard** tier and above.
* Allows you to deploy to a "Staging" slot. Once verified, you perform a **Swap**.
* The Swap technically exchanges the Virtual IP (vIP) addresses, so the new code goes live with zero downtime and no cold start.

### App Service Environment (ASE)
* The **Isolated** tier. 
* Deploys directly into your VNet for maximum network isolation.
* Used for high-security workloads or apps that need to scale to very high instance counts.

### Pricing
![[Pasted image 20251230104917.png]]

### App Service: Advanced Details
A deeper look at the administrative features of Azure's primary PaaS offering.

### App Service Environment (ASE)
- **Isolation:** Provides a fully isolated and dedicated environment for running App Service apps at high scale.
- **VNet Injection:** Deploys directly into your subnet. It is the only App Service tier that allows for "Internal Load Balancer" (ILB) configurations, making the app inaccessible from the public internet.

### Runtime and OS
- **Windows vs. Linux:** While both are supported, some runtimes (like .NET Framework) are Windows-only, while others (like Node.js or Python) often perform better on Linux.
- **Custom Containers:** You can deploy your own Docker image to App Service (Web App for Containers), providing a middle ground between ACI and AKS.

### Networking "Click-Paths"
- **VNet Integration (Outbound):** Allows the App Service to reach resources inside a VNet (like a SQL DB or Storage).
- **Private Endpoints (Inbound):** Gives the App Service a Private IP address so it can only be reached from within your network.

![[Pasted image 20251229205702.png]]

##### References
[[modern app services]]