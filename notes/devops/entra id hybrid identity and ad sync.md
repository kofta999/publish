2025-12-22 21:25
Tags: #cloud/azure 
##### Content
### Hybrid Identity and Synchronization
Many organizations use a mix of on-premises ADDS and Entra ID. ADDS is usually the source of truth replicated to Entra.

### Synchronization Rules
- One ADDS forest can sync to multiple Entra tenants via one sync server.
- One ADDS forest cannot use multiple sync servers for one Entra tenant.
- Only one Entra tenant can write back to the on-premises ADDS.

### Sync Tools
- Microsoft Entra Connect Sync: Traditional on-premises heavy agent.
- Microsoft Entra Cloud Sync: Lightweight agent, logic resides in the cloud. Better for multi-forest scenarios.

##### References
[[identity]]