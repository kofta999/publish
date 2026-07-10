2025-08-31 15:25
Tags: #cloud
##### Content
The DHCP **DORA** process is a four-step sequence of messages exchanged between a DHCP client and a DHCP server to lease an IP address and other network configuration information. DORA is an acronym for **D**iscover, **O**ffer, **R**equest, and **A**cknowledge.

---

### Discover (DHCPDISCOVER)

This is the first step where a client, which doesn't have an IP address yet, broadcasts a **DHCP Discover** message to the network. The client's source IP address is 0.0.0.0 and the destination is the broadcast address 255.255.255.255. The purpose is to find any available DHCP server on the local network.

---

### Offer (DHCPOFFER)

Any DHCP server that receives the Discover message and has an available IP address will send a **DHCP Offer** message back to the client. This message proposes an IP address and other configuration details like the subnet mask, default gateway, and DNS server addresses. If multiple DHCP servers exist on the network, the client may receive multiple offers.

---

### Request (DHCPREQUEST)

After receiving one or more offers, the client selects an offer and sends a **DHCP Request** message to the network. This message is a broadcast to inform all servers which offer it has accepted. This is important so that other servers can retract their offers and return the proposed IP addresses to their available pools.

---

### Acknowledge (DHCPACK)

The chosen DHCP server receives the Request message and sends a final **DHCP Acknowledge** message to the client. This message confirms the IP address assignment, the lease duration, and all other configuration parameters. Once the client receives this acknowledgment, it can begin using its newly assigned IP address to communicate on the network.

##### References
https://youtu.be/kS42C3vqFco