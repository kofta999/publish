## Governance
It's about enforcement of rules and ensuring proper functioning to standards
- On-prem: app owners consult ops team for resource provisining (ops can enforce rules)
- Cloud: app owners directly provision for themselves (so no one enforces rules)

Purview Portal is used to track compliance

Management Groups
- Every tenant has a root management group
- others are childs of root (max root + 6 levels)
- MGs can be used to organize by geological location, Business units, env
- Subscriptions are assigned to MGs
- Max is 10k per tenant

Subscriptions
- Basic block for creating anything in azure (billing, etc)
- You can control if a subscription can join / leave a tenant (from manage policies in subscriptions)
- Create subs as what makes sense (depends on business)

Resource Groups
- Lives within a subscription
- Cannot be nested
- Used to add resources that share a lifecycle
- Resources can be moved between resource groups
- Cannot be renamed (craete  new then move resources)

Naming Standards
- Important
- Docs have naming recommendations
- Make it consistent for cloud and on-prem

Tagging:
- name value pair (very powerful)
- helps to identify attrs / metadata of a resource
- Docs have tagging recommendations
- Can be enfoced using policies
- used for search, filter and billing
- value can be a json document
- Tags are not inherited by default, can be enabled to get copied from policy definitions

**Note:** Permissions are inherited **down**

What can we do to ensure governance:
- RBAC: who
- Policy: what
- Budget: how much
- Locking (sub / RG / resources)

Locking:
- Applies only to the control plane (cannot delete storage / but can delete data within it)
- Read-only: cant change attrs or delete
- Cannot delete: cant delete
- must be owner for the scope to remove lock


Azure Resource Manager
- Azure made of many resoruces
	- Offer resources
		- Offer attrs and actions
- Helpful in creating templates

RBAC
- can be used on control plane at all  levels (not recommened on resources though)
- inherited
- some services support it through data plane
- roles consist of actions that are assigned to a security principal (user / group /service account) at a scope
- you can create custom roles (do it for least privilege) max is 5k per tenant
- grant to groups not users
- leverage PIM

ABAC (attribuate based)
- adds conditions to role assignments based on resource / pricnipal attributes
- limited but growing support

Azure Policy
- Sits on top on ARM and any control plan op has to pass thru it
- can be used for enforcement and aduit
- audit then enforce
- a policy is a set of conditions built around resource attr aliases and an effect
	- If attrs meet a value; then do an action (effect)
- can be grouped into initiatives (to check if all of them meets compliance for ex)

Cost Management
- Provides insight control of Azure (and AWS) spend
	- Cost analysis
	- Cost anomaly alerts
	- Budgets (based on actual spend + forecast % of budget)
- Cost Allocation
	- Splitting costs between a resource provider and other account that uses them
- API available with PowerBI reports
- Pricing Calculator

Optimizing Costs (similar to [[aws ec2 pricing]])
- Pick right sizes, types or services, autoscale, serverless shutdown
- Azure reservations (commitment to a resource) (you don't actually reserve the resource, you only commit to pay x money in x time)
- Savings plan (bunch of services for certain duration + big discount)
- Hybrid Benefit: use my own licences for windows / SQL server
- On-Demand capacity reservation
