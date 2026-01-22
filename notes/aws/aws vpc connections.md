2025-02-14 17:06
Tags: #cloud/aws/important
##### Content
### VPC Peering
- Allows two VPCs to connect privately using AWS' network (like they're in the same network)
- Requires that VPCs have non-overlapping CIDR blocks
- They're not transitive; means if VPC A is connected with VPC B, and VPC B is connected to VPC C, VPC A isn't connected with VPC C

### VPC Endpoints
- Enables VPC to access AWS services directly, without going to Internet Gateway
- For lower latency and enhanced security
- **Endpoint Gateway:** Used for S3 and DynamoDB
- **Endpoint Interface:** Used for other AWS services

### AWS PrivateLink (VPC Endpoint Services) !service -> VPCs
- Is the most secure and scalable way to expose a service to 1000s of VPCs without requiring VPC peering, internet gateways, NAT devices and route tables
- Requires a [[aws load balancing#L4 ELB|Network Load Balancer]] in the service VPC and an Elastic Network Interface (ENI) in the customer VPC

### Site to Site VPN !on-prem -> AWS but VPN / normal internet
- Connects on-premises VPN to AWS
- Automatically encrypted
- Traffic goes over public internet
- On-prem: Must use a Customer Gateway (CGW)
- AWS: Must use a Virtual Private Gateway (VGW)

### Direct Connect !on-prem -> AWS but dedicated connection / no internet
- Establishes a physical connection between on-prem and AWS
- Private, secure, fast connection
- Traffic goes over a private network
- Takes at least a month to establish

### AWS Client VPN
- Using OpenVPN
- Allows you to connect from your PC to your private network in AWS and on-prem
- Enables you to connect to your EC2 instances over a private IP
- The connection goes over public internet

### Transit Gateway !on-prem -> VPCs
- Provides transitive peering between thousands of VPCs and on-prem networks using hub-and-spoke (star) connection
- Utilizes a single gateway
- Compatible with Direct Connect Gateway and VPN connections

##### References
