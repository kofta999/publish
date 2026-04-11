2025-02-08 14:48
Tags: #cloud/aws
##### Content
Security in EC2 is managed using:
#### Security Groups
- Manages inbound and outbound traffic (serves as a "firewall" for EC2)
- Regulates
	- Access to Ports
	- Authorized IP ranges
	- Inbound and outbound network control
- **Rules** can specify permissions by IP or referencing other Security Groups
- Can be attached to multiple instances
- Restricted to a specific **region / VPC** combination
- Operates externally to EC2; blocked traffic does not reach instance
- By default, all inbound traffic is **blocked**, and all outbound traffic is **allowed**
- If your app is not accessible (timeout), then it's probably a Security Group issue
- Security groups can be referenced by other groups (enable secure internal comms)

**Note:** It's advisable to maintain a separate security group for SSH access
##### References
