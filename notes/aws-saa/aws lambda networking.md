2026-03-22 12:52
Tags: #cloud/aws/compute #cloud/aws/networking 
##### Content
## 2. Lambda Networking & VPC Integration
By default, Lambda runs in an **AWS-managed VPC**. To access private resources, you must explicitly configure it.

### Accessing Private Resources (RDS, ElastiCache)
* **Configuration:** You must provide the **VPC ID**, **Private Subnets**, and **Security Groups**.
* **Mechanism:** Lambda creates an **ENI (Elastic Network Interface)** in your subnet to communicate with your resources.
* **Internet Access:** A Lambda in a VPC **cannot** access the public internet unless the subnet has a route to a **NAT Gateway**.

### Lambda & RDS Proxy
Directly connecting Lambda to RDS is risky because Lambda's rapid scaling can overwhelm the DB with too many open connections.
* **Solution:** **RDS Proxy** pools and shares DB connections.
* **Benefits:** Reduces failover time by 66% and enhances security via **Secrets Manager** and **IAM Auth**.
* **Requirement:** Lambda must be in the same VPC as the RDS Proxy.

##### References
