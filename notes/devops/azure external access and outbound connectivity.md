2025-12-26 22:01
Tags: #cloud/azure 
##### Content
### External Access and Outbound Connectivity

Providing internet access to resources requires explicit methods. Implicit (default) outbound access is being retired (September 2025).

### Explicit Outbound Methods
1. **NAT Gateway (Recommended):**
   - **Why:** Prevents SNAT port exhaustion. Dynamically allocates ports across the entire subnet rather than fixed amounts per VM.
   - **Limit:** Outbound only. Cannot be used for inbound traffic.
1. **Standard Load Balancer (Outbound Rules):**
   - **Why:** Used when you already have a Load Balancer for inbound traffic.
   - **Trap:** As soon as a VM is in a Standard LB backend pool, it loses "Default Outbound" access and must use an explicit rule.
3. **Instance-Level Public IP (PIP):**
   - **Why:** Simplest for single-server setups. 
   - **Trap:** Not recommended for production due to security (direct exposure) and management overhead.
1. **Azure Firewall / Network Virtual Appliance (NVA):**
   - **Why:** Centralized logging, TLS inspection, and L7 filtering (FQDNs). 
   - **Trap:** Requires a User Defined Route (UDR) to force traffic to the Firewall's private IP (Next Hop).

### Summary Comparison Table
| Feature | NAT Gateway | Load Balancer | Public IP | Azure Firewall |
| :--- | :--- | :--- | :--- | :--- |
| **Direction** | Outbound only | Inbound + Outbound | Inbound + Outbound | Both + Filtering |
| **Port Scaling** | Dynamic (64k/IP) | Fixed per VM | Limited to 1 IP | High |
| **Security** | Private by default | Basic (NSG) | Exposed | IDPS/L7 Rules |

##### References
[[networking]]