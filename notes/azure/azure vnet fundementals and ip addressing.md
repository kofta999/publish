2025-12-26 21:56
Tags: #azure 
##### Content
### VNet Fundamentals and IP Addressing

A Virtual Network (VNet) is the fundamental building block for your private network in Azure.

### Core Properties
- **Scope:** Cannot span subscriptions or regions. It is a regional resource.
- **Reserved IPs:** Azure reserves 5 IP addresses in every subnet:
    - .0: Network Address
    - .1: Default Gateway
    - .2, .3: Azure DNS (Mapping)
    - .255: Network Broadcast (though Azure doesn't support traditional L2 broadcast).
- **Subnets:** Can span Availability Zones (AZs) but must stay within the VNet's address space.

### VM Networking (NICs)
- **IP Assignment:** IPs are provided via the Azure Fabric (DHCP). You should **never** manually set a static IP inside the Guest OS; instead, "Reserve" the IP in the Azure Portal/ARM.
- **Accelerated Networking:** Uses [SR-IOV](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/6/html/virtualization_host_configuration_and_guest_installation_guide/chap-virtualization_host_configuration_and_guest_installation_guide-sr_iov) to bypass the host's virtual switch. Essential for low latency and high PPS (Packets Per Second).
- **IPv6:** Azure VNets are "Dual Stack." A NIC can have an IPv6 address, but it **must** also have an IPv4 address. IPv6-only NICs are not supported.

### Bring Your Own IP (BYOIP)
- **Custom IP Prefix:** Allows you to bring your own public IPv4/v6 ranges to Azure.
- **Requirements:** - You must own the range (registered with ARIN/RIPE).
    - Minimum range: **/24** (to ensure it can be advertised globally).
    - Maximum range: **/21**.
- **Process:** Validate ownership -> Provision (onboard to Azure) -> Commission (Microsoft starts advertising it via BGP).
- **Exam Trap:** Once a range is onboarded, you create "Public IP Prefixes" from it, then individual "Public IPs."

### Traffic Restrictions
- **Blocked:** Multicast, Broadcast, IP-in-IP, and [GRE](https://www.cloudflare.com/learning/network-layer/what-is-gre-tunneling/) are not supported. 
- **ICMP:** You cannot ping the default gateway (.1), but you can ping between VMs if NSGs allow it.

##### References
[[networking]]