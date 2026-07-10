2025-12-26 22:12
Tags: #cloud/azure
##### Content
### Traffic Control: NSGs, ASGs, and UDRs

Controlling the "Flow" of traffic is achieved through rules (Security) and routes (Pathing).

### Network Security Groups (NSG)
- **Function:** L4 Firewall (IP, Port, Protocol).
- **Priority:** 100 to 4096. Lower numbers are processed first.
- **Stateful:** If an inbound request is allowed, the outbound response is automatically allowed, regardless of outbound rules.
- **Service Tags:** Shortcuts for Microsoft services (e.g., `Storage`, `SQL`, `VirtualNetwork`).
- **Exam Trap:** An NSG on a Subnet and an NSG on a NIC are **both** evaluated. For inbound: Subnet first, then NIC. For outbound: NIC first, then Subnet.

### Application Security Groups (ASG)
- **Function:** Grouping VMs by "Function" rather than IP.
- **Example:** Create an ASG called `Web-Servers`. Instead of writing an NSG rule for 10 different IPs, write one rule: "Allow 80 to ASG: Web-Servers."

### User Defined Routes (UDR)
- **Function:** Overrides Azure's default routing (System Routes).
- **Next Hop Types:** - **Virtual Appliance:** Usually an Azure Firewall or 3rd party NVA.
    - **Virtual Network Gateway:** For VPN/ExpressRoute.
    - **None:** To "Blackhole" (drop) traffic.
    - **Internet:** Force traffic out to the web.
- **Exam Trap:** Azure always chooses the **longest prefix match** (most specific route) first. If there is a tie, UDR wins over System Routes.

##### References
[[networking]]