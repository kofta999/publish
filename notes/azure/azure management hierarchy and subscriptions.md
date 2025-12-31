2025-12-23 20:25
Tags: #azure
##### Content
### Azure Management Hierarchy and Subscriptions

The Azure hierarchy provides a structure for billing, access control, and policy application. 

### Management Groups (MG)
- Max depth: 6 levels below the Root Management Group (not including Root or Subscriptions).
- Max management groups per tenant: 10,000.
- All subscriptions in a tenant are ultimately under the single Root Management Group.
- **Admin Specifics:** Roles and Policies assigned at a higher MG level are inherited by all child MGs and subscriptions.
- **Exam Trap:** You cannot move the Root Management Group. Any new subscription automatically associates with the Root MG by default.

### Subscriptions
- The primary unit of billing and a logical quota boundary.
- **Types:** Free, Pay-As-You-Go, Enterprise Agreement (EA), and Microsoft Customer Agreement (MCA).
- **Exam Trap:** When moving a subscription to a new Management Group, the policies of the new MG apply immediately, which may cause non-compliance for existing resources.
- **Exam Trap:** Moving a subscription to a different Entra ID tenant will delete all RBAC assignments and require manual reconfiguration.

### Subscription Governance
- Usage location: Certain resources can only be deployed in regions allowed by the subscription's location settings.
- Cancelled subscriptions are deleted after a grace period (usually 30–90 days).

##### References
[[governance]]