2026-03-25 14:46
Tags: #cloud/aws/networking 
##### Content
VPC Flow Logs capture information about IP traffic going to and from network interfaces in your VPC. They are crucial for monitoring network usage, analyzing patterns, and troubleshooting connectivity issues.

#### Configuration & Destinations
*   **Scope:** You can enable Flow Logs at three distinct levels: the **VPC level**, the **Subnet level**, or the individual **Elastic Network Interface (ENI) level**.
*   **Destinations:** Flow log data can be published to **Amazon S3**, **Amazon CloudWatch Logs**, and **Amazon Kinesis Data Firehose**.
*   **Permissions:** To successfully send logs to CloudWatch Logs, you must attach an IAM Service Role with the necessary permissions (e.g., `logs:CreateLogGroup`, `logs:CreateLogStream`, and `logs:PutLogEvents`).
*   **AWS Managed Services:** Flow Logs aren't just for EC2; they also capture network traffic from AWS-managed interfaces, including ELBs, RDS, ElastiCache, Redshift, WorkSpaces, NAT Gateways, and Transit Gateways.

#### Analyzing Flow Logs
VPC Flow Logs contain specific fields like `srcaddr` (source IP), `dstaddr`, `srcport`, `dstport`, and `action` (which records the success or failure of the request).
*   **Querying:** You can analyze flow log records using **Amazon Athena** (if the logs are stored in S3) or **CloudWatch Logs Insights** (if they are stored in CloudWatch Logs).
*   **Top Contributors:** You can integrate flow logs with **CloudWatch Contributor Insights** to automatically identify the "top 10 IP addresses" or the heaviest network users.

![[Pasted image 20260325144749.png]]

#### Troubleshooting Security Groups & NACLs
You can use the `action` field in a flow log to determine whether a Security Group (SG) or a Network ACL (NACL) is blocking your traffic. Remember that SGs are stateful and NACLs are stateless.

*   **Incoming Requests:**
    *   **Inbound REJECT:** The incoming traffic was blocked by either the NACL or the Security Group.
    *   **Inbound ACCEPT, Outbound REJECT:** The traffic reached the instance, but the response was blocked on the way out. Because Security Groups automatically allow return traffic, this means the block occurred at the **NACL**.
*   **Outgoing Requests:**
    *   **Outbound REJECT:** The outgoing traffic was blocked by either the NACL or the Security Group.
    *   **Outbound ACCEPT, Inbound REJECT:** The outbound request worked, but the server's response was blocked on the way back in. Again, because Security Groups are stateful, the block is at the **NACL**.


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Troubleshoot dropped network traffic or identify malicious IP addresses hitting your EC2 instances." | **Enable VPC Flow Logs**. |
| "Analyze VPC Flow Logs stored in an S3 bucket using standard SQL queries." | **Amazon Athena**. |
| "Identify the top 10 IP addresses generating the most network traffic in your VPC." | **CloudWatch Contributor Insights**. |
| "VPC Flow Logs show `ACCEPT` for an inbound request but `REJECT` for the outbound return traffic." | **Check the outbound NACL rules** *(likely missing ephemeral ports)*. |
| "You configured VPC Flow Logs to go to CloudWatch Logs, but no logs are appearing." | **Ensure the associated IAM Service Role has `logs:PutLogEvents` permissions**. |

##### References
