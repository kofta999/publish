2025-12-28 19:04
Tags: #azure 
##### Content
### Azure Compute Gallery

Azure Compute Gallery (formerly Shared Image Gallery) is the enterprise-grade repository for managing, versioning, and sharing custom images and application packages.

### Core Features
* **Global Replication:** Automatically replicate your images to multiple Azure regions to speed up regional VM deployments.
* **Versioning:** Keep multiple versions of an image (e.g., `1.0.0`, `1.1.0`). You can target a "Latest" version in your deployment scripts.
* **Sharing:** Share images across different Subscriptions and even different Entra ID Tenants (using RBAC).
* **VM Apps:** A sub-feature that allows you to package application installers (e.g., `.msi`, `.exe`, or scripts) and deploy them to VMs without rebuilding the whole image.

### Scaling and Performance
* **Replicas:** You can create multiple replicas of an image version *per region* to prevent the storage account from becoming a bottleneck during massive parallel deployments (e.g., 1000+ VMs at once).
* **Storage Tiers:** Supports Premium LRS and Zone-Redundant Storage (ZRS) for higher availability.

##### References
[[compute]]