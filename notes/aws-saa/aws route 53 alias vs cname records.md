2026-03-13 19:14
Tags: #cloud/aws/networking 
##### Content
In AWS, you often need to map your friendly domain name (e.g., `example.com`) to an AWS-provided DNS name (e.g., `lb-123.elb.amazonaws.com`). While both CNAME and Alias records can do this, they have critical differences in capability and cost.

#### 1. CNAME Records
A standard DNS record that points one hostname to another.
* **Target:** Can point to **any** other hostname (e.g., `google.com`, `another-app.net`).
* **Restriction:** **Cannot** be used for the **Zone Apex** (the root domain, e.g., `example.com`). It only works for subdomains (e.g., `www.example.com`).
* **Cost:** Standard Route 53 query charges apply.

#### 2. Alias Records
An AWS-specific extension to DNS that acts like a "smart" pointer to AWS resources.
* **Target:** Points specifically to **AWS Resources** (ALB, CloudFront, S3, etc.).
* **Apex Support:** **Can** be used for the **Zone Apex** (`example.com`). This is the primary reason for using them.
* **Type:** Always presented as an **A** or **AAAA** record (it resolves directly to the resource's IP), even though it tracks a hostname.
* **Self-Healing:** Automatically recognizes changes in the underlying resource’s IP addresses.
* **Cost:** **Free of charge** for queries to AWS resources.

#### 3. Alias Record Targets
You can create Alias records for the following AWS services:
* **Elastic Load Balancers (ALB/NLB)**
* **CloudFront Distributions**
* **S3 Buckets** configured as static websites
* **API Gateway**
* **Elastic Beanstalk** environments
* **VPC Interface Endpoints**
* **Global Accelerator**
* **Another Route 53 record** in the same hosted zone (to create a "shortcut")

> **Important Restriction:** You **cannot** set an Alias record for a raw **EC2 DNS name**. For EC2, you typically use a standard A record or put the instance behind a Load Balancer.

#### 4. Comparison Summary

| Feature               | CNAME                | Alias                        |
| --------------------- | -------------------- | ---------------------------- |
| **Zone Apex Support** | No (Subdomains only) | **Yes** (Root domain ok)     |
| **Target Type**       | Any hostname         | Specific AWS Resources       |
| **Cost**              | Paid per query       | **Free** (for AWS resources) |
| **TTL**               | Required/Manual      | Managed by AWS (Cannot set)  |
| **Health Checks**     | Manual               | Native/Automatic             |

##### References
