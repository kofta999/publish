2025-12-23 20:28
Tags: #cloud/azure
##### Content
### Resource Groups and Tagging

Resource Groups (RG) are the fundamental deployment unit in Azure, acting as a container for resources sharing a lifecycle.

### Resource Group Characteristics
- Lives within a [[azure management hierarchy and subscriptions#Subscriptions|subscription]]
- A resource can only exist in one RG at a time.
- RGs cannot be nested.
- **Deployment Location:** The RG has a location (region) for its metadata, but resources within it can reside in different regions.
- **Exam Trap:** Deleting a Resource Group deletes every resource inside it immediately. This is the primary way to manage "Lifecycles" for dev/test environments.
- **Moving Resources:** Most resources can be moved between RGs, but the resource is temporarily locked during the move. You cannot "Rename" an RG; you must create a new one and move resources into it.

### Tagging
- Consists of a Name:Value pair.
- Helps to identify attributes / metadata of a resource.
- Used for search, filtering and billing.
- Value could be a JSON Document
- Limits: Max 50 tags per resource or resource group.
- **Exam Trap:** Tags are NOT inherited from the Resource Group to the Resources. To ensure resources have the same tags as their parent RG, an Azure Policy (specifically "Inherit a tag from the resource group") must be used.
- **Admin Specifics:** Tags are essential for Cost Analysis filtering. If a resource isn't tagged, it is difficult to attribute its cost to a specific department in a shared subscription.

##### References
[[governance]]