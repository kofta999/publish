2025-12-23 21:03
Tags: #cloud/azure 
##### Content
### Azure Resource Manager (ARM)

Azure Resource Manager is the deployment and management service for Azure. It provides a management layer that enables you to create, update, and delete resources in your Azure account.

![[Pasted image 20251223210233.png|600]]

### The ARM Layer
- Every request from any tool (Portal, CLI, PowerShell, SDK) goes to the ARM API endpoint (`management.azure.com`).
- ARM authenticates the request (Entra ID) and checks authorization (RBAC) and compliance (Policy) before passing the request to the specific Resource Provider (e.g., `Microsoft.Compute`).
- **Exam Trap:** Because all tools go through ARM, settings like **Resource Locks** or **Policies** are universal; they work regardless of whether you use the Portal or the CLI.

### Declarative vs. Imperative
- **Imperative (How):** Using CLI or PowerShell to give step-by-step commands (e.g., "Create VNet, then create Subnet, then create VM").
- **Declarative (What):** Using ARM Templates or Bicep to define the "Final State" (e.g., "I want a VNet with these properties"). ARM handles the sequencing and dependencies.

### ARM Template Structure (JSON)
- **Parameters:** Input values that change per deployment (e.g., VM Name, Admin Username).
- **Variables:** Values used to simplify the template (e.g., constructing a unique storage account name).
- **Resources:** The actual Azure resources to be deployed (The only mandatory section).
- **Outputs:** Values returned after deployment (e.g., the Public IP address of the new VM).
- **Exam Trap:** Templates are **Idempotent**. If you deploy the same template twice, Azure only makes changes if the current state differs from the template.

### Management Features
- **Orchestration:** ARM deploys interdependent resources in the correct order (e.g., creating a Network Interface *before* the VM).
- **Resource Groups:** ARM uses RGs as logical containers for deployments.
- **Export Template:** You can export the ARM template of any existing resource or Resource Group to replicate it elsewhere.

##### References
[[governance]]