2026-03-11 17:32
Tags: #cloud/aws/networking 
##### Content
### Gateway Load Balancer (GWLB)
- Deploy, scale and manage a fleet of 3rd party NVA in AWS
- Example: Firewalls, IDS / IPS, DPI
- Users Traffic -> NVA TG -> App
- Uses **GENEVE** Protocol on **6081**
- Functions
	- Transparent Network Gateway (single entry / exit for all traffic)
	- Load Balancer (distributes traffic to NVA)
#### Target Groups
- EC2 instances
- IP Addresses (must be private)

![[Pasted image 20260311173210.png|205]]

##### References
