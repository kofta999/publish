2026-03-25 14:09
Tags: #cloud/aws/networking 
##### Content
Both NAT Instances and NAT Gateways allow EC2 instances located in a private subnet to connect to the public Internet, but their architecture and management overhead differ significantly.

#### NAT Instance
An older, user-managed EC2 instance configured to route traffic. While outdated (reached the end of standard support in December 2020), it still appears on the exam.

*   **Setup:** Must be launched in a public subnet and have an Elastic IP (EIP) attached.
*   **Crucial Configuration:** You **must disable the "Source / destination Check"** setting on the EC2 instance.
*   **Performance:** Internet traffic bandwidth is limited by the underlying EC2 instance type.
*   **Security:** You must manually manage its Security Groups (e.g., allowing inbound HTTP/HTTPS from your private subnets, and outbound to the internet).
*   **High Availability:** Not highly available out of the box. You must manage failover manually or use an Auto Scaling Group (ASG) in a multi-AZ setup with a resilient user-data script.

#### NAT Gateway
An AWS-managed service providing scalable, highly available network address translation with no administrative overhead.

*   **Setup:** Created in a specific Availability Zone and requires an Elastic IP. It also requires an Internet Gateway (IGW) attached to the VPC to function.
*   **Usage Rule:** A NAT Gateway **cannot** be used by an EC2 instance in the *same* subnet; it only routes traffic for instances in *other* (private) subnets.
*   **Performance:** Provides 5 Gbps of bandwidth natively and automatically scales up to **100 Gbps**.
*   **Security:** There are **no Security Groups** to manage.
*   **Cost:** Billed per hour of usage and per amount of data processed/transferred.

#### NAT Gateway High Availability Architecture
*   A single NAT Gateway is only highly available **within its specific Availability Zone**.
*   To achieve cross-AZ fault tolerance, you must create **multiple NAT Gateways across multiple AZs**. (Note: Cross-AZ failover isn't necessary because if an entire AZ goes down, the instances in that AZ that would need the NAT are also down).

### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Provide internet access to private subnets with zero administrative maintenance and high bandwidth." | **NAT Gateway** |
| "You deployed a custom EC2 instance to act as a NAT, but instances in the private subnet cannot reach the internet." | **Disable the 'Source / destination Check' on the NAT instance** |
| "Design a fault-tolerant architecture for private instances needing internet access across three Availability Zones." | **Deploy three NAT Gateways (one in each AZ)** |
| "You need to associate specific Security Group rules to your NAT traffic routing." | **NAT Instance** *(NAT Gateways do not support Security Groups)* |
| "Your application in a private subnet requires up to 40 Gbps of outbound internet bandwidth." | **NAT Gateway** *(automatically scales up to 100 Gbps)* |

##### References
