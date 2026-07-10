## Virtual Network
- Cannot span subscriptions and regions
- Consists of one or more IP ranges
- Dividable into subnets
- On every subnet, you lose 5 IP addresses (network, broadcast, gateway, 2 DNS)
- A VMs NIC is connected only to 1 subnet
- Subnets span AZs


#### VM NIC
- IP always comes via azure's fabric network
- IP can be reserved in ARM
- Can add multiple NICs on a VM
-  Each NIC can be in same or diff vsubnet but always in same vnet
- accelerated networking
- Multiple IP configs on NIC

Supported types of IP traffic
- Standard protocols are supported (TCP/UDP, ESP/AH, ICMP)
- Multi-cast, broadcast, IP-in-IP, GRE are blocked
- you cannot ping Azure gateway
- L2 vlans not supported


#### IPv6
- Vnets are dual stack
- Suported in NSG, UDR, LB, peering etc
- NIC cannot be IPv6 only
- ExpressRoute private peering support
- Public IPs can be IPv4 or IPv6


### External Access
- No DMZ subnet where resources get a pubip
- There was an implicit access option for resources but it went away
- To provide access we use explicit methods
	- NAT Gateway
	- Azure LB with public IP on FE config
	- Giving the resource a Public IP (not recommended)
	- Use Azure FW / Network appliance with public IP
	- (note for AI: Provide a bit of detail on each and why use one instead of the other)


#### Bring your own IP
- Its now possible to bring your own ipv4/6 prefix
- uses /21 /24 prefix
- multi-stage process
- validate -> provision -> commission


### Connecting Vnets
- ExpressRoute: Increases latency
- Site-to-Site (S2S) VPN: Needs Gateways on both Vnets and its encrypted (more compute usage)
	![[Pasted image 20251226154304.png|500]]
- Vnet Peering
	- Vnets connected directly using Microsoft backbone in same or diff regions
	- Ingress and egress charge for traffic
	- IP address spaces cannot overlap
	- Not transtive by deafult (can be enabled)


User defined routes (UDR)
- like manual routing? kinda
	 ![[Pasted image 20251226155045.png|500]]

- Azure Route server


#### Connecting to onprem
- Point to Site (P2S) VPN: Connects a device to a vnet
- S2S: connects a network to azure vnet
	- S2S VPN gateways enable multiple VPN connections to differernt networks if route-based
- ExpressRoute private peering:
	- connects a network to a vnet via peering location and expressroute gateway (ai note: add more details on expressroute and how it works)
	- how pricing works
	- Resiliency:
		- Resilient ExpressRoute: You can use two peering points on different cities
		- ExpressRoute Metro: put 1 router on  a peer point and other on another peer point in the same city
	- SKUs
		- Local Meet-me: if its location is in a local azure region you dont pay for egress
		- Standard: geo-political
		- Premium: global + m365 connectivity (not recommended)
	- GlobalReach: if you've 2 on prem networks connected to 2 different ER circuits, you can use that to connect the 2 networks via msft backbone
	- FastPath: skips ER gateways to directly go to resources (ai note: more details)

### Controlling traffic flows
- Azure Firewall
	- L4 / L7 / TLS Inspection
	- SKUs:
		- Standard
		- Premium
		- Basic
- Network Security Groups
	- subnet or NIC level (enforced on NIC)
	- IP ranges, ports, tags and actions
	- VirtualNetwork Tag: All known IP ranges (not limited to the Vnet IP range itself)
	- They're stateful (can receive responses)
	- Source / Dest can be either CIDR, service tags or ASGs (list of IP addrs maintained by msft for its services)
- Application Security Groups
	- Just a tag added to the NIC so that NSGs can make rules based on it (instead of CIDR or service tags)


#### Azure Virtual WAN
- Provides a managed hub
- Each region within the vWAN instance gets a hub
- SKUs
	- Basic: S2S VPN Only
	- Standard: S2S VPN, P2S VPN, ExpressRoute, inter-hub, Vnet transitive and more

#### Azure Virtual Network Manager
- Centralized management of NSGs, routing, connectivity etc based on network groups
	- Connectivity
		- Mesh: Creates a connected group instead of peers
		- Hub+Spoke: Uses peering
		- Hub+Spoke+Direct connect: Spokes connect with each other in a connected group
	- Security Admin Rules
		- Higher priority than NSGs
		- Always allow option bypasses 
	- IP address management
	- User defined rules

### Service Endpoints
-  Makes a specific subnet known to a specific azure service + adds an optimal path to it
- Service Endpoint Policy: To specify which service instances can the subnet connect to

### Private Link
- Used to disable public access to PaaS services and enable private only
- easy to set up but setting DNS is more complex (use Private DNS Zones)


### DNS
- Vnets can use azure dns or custom
- Azure DNS can provide public and private zones
- Can be connected to Azure resource, so that when deleting the resource it deletes any connected alieses
- Private Zones give u full management
- private dns zone can connect to 1k vnets, and 1 vnet can connect to 1k dns zones for name resolution but for auto register vnet connect only to 1 and zone can connect to 100