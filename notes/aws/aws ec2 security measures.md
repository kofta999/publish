2025-02-08 14:48
Tags: #cloud/aws
##### Content
Security in EC2 is managed using:
#### Security Groups
- Manages inbound and outbound traffic (serves as a "firewall" for EC2)
- **Rules** can specify permissions by IP or referencing other Security Groups
- Can be attached to multiple instances
- Restricted to a specific region and VPC combination
- Operates externally to EC2; blocked traffic does not reach instance
- By default, all inbound traffic is blocked, and all outbound traffic is allowed


Note. It's advisable to maintain a separate security group for SSH access


##### References
