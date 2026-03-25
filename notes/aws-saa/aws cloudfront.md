2026-03-20 15:16
Tags: #cloud/aws/networking 
##### Content
### Amazon CloudFront
Amazon CloudFront is a fast Content Delivery Network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds.

---
#### 1. Core Concepts
* **Edge Locations:** Hundreds of Points of Presence (PoPs) globally that cache content closer to users.
* **Origins:** The source of your content.
    * **S3 Bucket:** For static files. Secured using **Origin Access Control (OAC)** to ensure users can't bypass CloudFront to access the bucket directly.
    * **VPC Origin:** For private resources (ALB, NLB, EC2) in **private subnets**. This allows you to serve content without exposing your backend to the public internet.
    * **Custom Origin:** Any public HTTP endpoint (e.g., an S3 static website or a non-AWS web server).
* **DDoS Protection:** Inherently provides protection due to its global scale; integrates deeply with **AWS Shield** and **AWS WAF**.

---

#### 2. CloudFront vs. S3 Cross-Region Replication (CRR)
For the SAA exam, choose based on the number of regions and the nature of the content.

| Feature          | CloudFront                                     | S3 CRR                                            |
| :--------------- | :--------------------------------------------- | :------------------------------------------------ |
| **Network**      | Global Edge Network (Hundreds of PoPs).        | Specific AWS Regions (few).                       |
| **Caching**      | Files cached based on **TTL**.                 | Files replicated in near real-time.               |
| **Content Type** | Best for **Static Content** needed everywhere. | Best for **Dynamic Content** in specific regions. |

---

#### 3. Advanced Features
* **Geo Restriction:** Control access based on the user's country (Allowlist or Blocklist). Used for copyright compliance or licensing.
* **Cache Invalidations:** If you update a file at the origin, CloudFront won't see it until the TTL expires. You can perform an **Invalidation** (e.g., `/images/*`) to force CloudFront to fetch the fresh version immediately. 
    * *Note:* You can also use **Object Versioning** (e.g., `style.v2.css`) to avoid invalidation costs.
* **Field-Level Encryption:** Adds an extra layer of security by encrypting specific data fields (like credit card numbers) at the edge before they are forwarded to your origin.

---

#### 4. SAA Exam Scenario: Minimizing Latency
**Scenario:** You have global users accessing an application over the public internet, resulting in high latency due to many "hops."
**Solution:** Use CloudFront to route traffic over the **AWS Private Network**. Users connect to the nearest Edge Location, and from there, the request travels over optimized AWS fiber to your origin, bypassing much of the "noisy" public internet.

---

#### Summary Table: CloudFront Security & Origins

| Requirement                              | Use This Feature                |
| :--------------------------------------- | :------------------------------ |
| "Restrict S3 access to only CloudFront." | **Origin Access Control (OAC)** |
| "Deliver content from a private ALB."    | **VPC Origin**                  |
| "Block specific countries from access."  | **Geo Restriction**             |
| "Update content before the TTL expires." | **Cache Invalidation**          |

##### References
