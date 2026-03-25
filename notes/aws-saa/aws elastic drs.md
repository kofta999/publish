2026-03-24 22:48
Tags: #cloud/aws/dr 
##### Content
AWS Elastic Disaster Recovery (DRS) (formerly CloudEndure Disaster Recovery) allows you to quickly and easily recover your physical, virtual, and cloud-based servers into AWS. It provides continuous block-level replication for your servers, protecting your critical databases and enterprise apps against data loss from events like ransomware attacks.

#### DRS Architecture
*   **Continuous Replication:** Data is replicated in seconds from your source environment (Corporate Data Center or another cloud) to a staging area in AWS.
*   **Cost-Effective Staging:** The staging area utilizes low-cost EC2 instances and EBS volumes to save money.
*   **Fast Failover:** In the event of a disaster, failover takes only minutes to launch the fully provisioned target EC2 instances and EBS volumes in the production environment. DRS also supports failback to the original source.

![[Pasted image 20260324224824.png]]

##### References
