2026-03-25 14:26
Tags: #cloud/aws/networking 
##### Content
VPC Endpoints allow you to connect to AWS services using a private network instead of the public internet, completely removing the need for an Internet Gateway (IGW) or NAT Gateway. They are highly redundant and scale horizontally. 

#### Types of VPC Endpoints
*   **Interface Endpoints:**
    *   **How it works:** Powered by AWS PrivateLink, it provisions an Elastic Network Interface (ENI) with a private IP address as an entry point for traffic.
    *   **Security:** You **must attach a Security Group** to the ENI.
    *   **Support:** Supports most AWS services (e.g., SNS, CloudFormation, SSM).
    *   **Cost:** You are billed per hour and per GB of data processed.
*   **Gateway Endpoints:**
    *   **How it works:** Provisions a gateway object. To route traffic, the gateway **must be added as a target in your Route Table**.
    *   **Security:** Does **not** use Security Groups.
    *   **Support:** Only supports two services: **Amazon S3 and Amazon DynamoDB**.
    *   **Cost:** Completely **free**.

#### Gateway vs. Interface Endpoint for S3
For Amazon S3, you generally want to choose the **Gateway Endpoint** because it is free. However, you **must use an Interface Endpoint** for S3 if access is required from an **on-premises** network (via Site-to-Site VPN or Direct Connect), from a different VPC, or from a different region.

#### Troubleshooting VPC Endpoints
If you have created an endpoint but cannot connect to the AWS service, check two things:
1.  **DNS Resolution:** Ensure DNS settings are enabled in your VPC.
2.  **Route Tables:** Ensure the routing is properly configured to target the endpoint.

#### AWS PrivateLink (VPC Endpoint Services)
PrivateLink allows you to securely expose your own services privately to a customer's VPC (or another one of your own VPCs). 
*   **Benefits:** It does not require VPC Peering, NAT Gateways, Route Tables, or the public internet. 
*   **Architecture:** It requires a **Network Load Balancer (NLB)** on the service provider's side and an Interface Endpoint (ENI) on the consumer's side.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Provide private, free access to Amazon S3 or DynamoDB from EC2 instances within a VPC." | **Gateway Endpoint (and update the Route Table)**. |
| "Access an AWS service like Amazon SNS or SSM privately without going over the internet." | **Interface Endpoint (and configure a Security Group)**. |
| "Access Amazon S3 privately from an on-premises data center connected via Direct Connect." | **Interface Endpoint for S3**. |
| "You created a Gateway Endpoint for DynamoDB, but instances still cannot connect." | **Update the Route Table to target the Gateway Endpoint**. |
| "Expose your proprietary application to another company's AWS account securely, without overlapping CIDRs or peering." | **AWS PrivateLink (VPC Endpoint Service) + Network Load Balancer**. |

##### References
