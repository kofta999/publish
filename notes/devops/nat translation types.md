2025-06-23 11:38
Tags: #web
##### Content
**Definition:** A method used by routers/firewalls to map private IP addresses inside a LAN to a single or limited set of public IP addresses.

**Types:**
- Static NAT: One-to-one mapping between private and public IP.
- Dynamic NAT: Uses a pool of public IPs, maps private IPs to any available public IP dynamically.
- PAT (Port Address Translation / NAT Overload): Multiple private IPs share a single public IP, distinguished by port numbers. (Most common type in home routers).


Types down below are defined by the [[webrtc#STUN (Session Traversal Utilities for NAT)|STUN]] protocol:

![[Pasted image 20250901185116.png|600]]
Consider a situation where ^ this is the NAT Table on the router, and there's a couple of IP:Port pairs representing the sender. Possible NAT Types are:

#### 1. One to One (Full-cone)
- Packets to external IP:Port on the router **always** maps to internal IP:Port without exceptions
- Whatever is sent to `5.5.5.5:*` and whoever it may be, it'll reach `10.0.0.2:8992`
#### 2. Address Restricted
- Packets to external IP:Port on the router maps to internal IP:Port as long **as the source address from the packet matches the NAT Table**
- Allows if we communicated with this host before
- Whatever is sent to `5.5.5.5:*` and the sender has exactly the address `4.4.4.4:*`, it'll reach `10.0.0.2:8992`
#### 3. Port Restricted
- Packets to external IP:Port on the router maps to internal IP:Port as long **as the source address and port from the packet matches the NAT Table**
- Allows if we communicated with this host:port before
- Whatever is sent to `5.5.5.5:*` and the sender has exactly the address `4.4.4.4:80`, it'll reach `10.0.0.2:8992`
#### 3. Symmetric
- Packets to external IP:Port on the router maps to internal IP:Port as long **as the source address and port from the packet matches the NAT Table and the router IP:Port**
- Only allows if the full table pair matches
- Whatever is sent to `5.5.5.5:3333` and the sender has exactly the address `4.4.4.4:80`, it'll reach `10.0.0.2:8992`

##### References
 https://www.youtube.com/watch?v=FExZvpVvYxA