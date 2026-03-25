2026-03-25 15:17
Tags: #cloud/aws/networking 
##### Content
### Networking Costs & Data Transfer
In AWS, data transfer costs generally follow a simple rule: bringing data into the cloud is free, but moving data out or across regions costs money.

#### Ingress vs. Egress
*   **Ingress Traffic (Inbound):** Data flowing into AWS from the outside internet is **free**.
*   **Egress Traffic (Outbound):** Data flowing from AWS to the outside internet is charged.
*   **Cost Strategy:** To minimize costs, try to keep as much internet traffic within AWS as possible. If using an on-premises data center, choose a Direct Connect location that is co-located in the same AWS Region to lower your egress network costs.

#### IPs, Availability Zones, and Regions
*   **Maximum Savings:** Traffic between instances in the **same Availability Zone** using **Private IPs** is completely **free**.
*   **Private vs. Public IPs:** Always use Private IPs instead of Public or Elastic IPs when instances communicate with each other to achieve good savings and better network performance. Using a Public/Elastic IP incurs a fee.
*   **Cross-AZ / Cross-Region:** Traffic that crosses Availability Zones (using private IPs) or crosses into different AWS Regions incurs a data transfer fee. 
    *   *Exception:* For **RDS Read Replicas**, asynchronous replication within the **same region** (even across different AZs) is **free**. Cross-Region RDS replication will incur a network cost.

#### S3 Data Transfer Pricing
When transferring data out of Amazon S3, you can optimize costs by leveraging CloudFront.
*   **S3 directly to Internet:** ~$0.09 per GB.
*   **S3 to CloudFront:** **$0.00 per GB (Free)**.
*   **CloudFront to Internet:** ~$0.085 per GB, which is slightly cheaper than routing directly from S3, and provides the added benefit of caching to significantly reduce overall S3 request costs.
*   **S3 Transfer Acceleration:** Incurs an additional $0.04 to $0.08 per GB on top of standard data transfer pricing.
*   **S3 Cross-Region Replication:** ~$0.02 per GB.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Minimize network costs for two EC2 instances that need to communicate heavily." | **Deploy them in the same Availability Zone and use Private IPs (Free)**. |
| "Reduce the high data transfer costs of serving S3 media files to global users." | **Put Amazon CloudFront in front of the S3 bucket** *(S3 to CloudFront data transfer is free)*. |
| "Create an RDS Read Replica for reporting without increasing network data transfer costs." | **Deploy the Read Replica in the same AWS Region**. |
| "Minimize egress traffic costs when querying an AWS database from a corporate data center." | **Use an AWS Direct Connect location co-located in the same AWS Region**. |
| "Speed up global uploads to an S3 bucket and the budget allows for an extra per-GB cost." | **Enable S3 Transfer Acceleration**. |

##### References
