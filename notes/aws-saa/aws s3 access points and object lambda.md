2026-03-20 10:51
Tags: #cloud/aws/storage 
##### Content
### S3 Access Points & Object Lambda

As your S3 buckets grow and serve multiple teams (Finance, Sales, Analytics), managing one massive, complex bucket policy becomes risky and difficult to audit. **Access Points** provide a way to decompose that security into smaller, manageable chunks.

---

#### 1. S3 Access Points
An Access Point is a named network endpoint with a specific access policy that is attached to a bucket.

* **DNS Name:** Each Access Point has its own unique DNS name.
* **Access Point Policy:** You define a mini-policy for that specific endpoint (e.g., "Allow the Finance team R/W access to the `/finance` prefix").
* **Simplified Security:** Instead of one 20KB bucket policy, you have separate, smaller policies for each use case.
* **Internet vs. VPC:** Access Points can be made public or restricted to a specific **VPC**.

---

#### 2. Access Points via VPC Origin
For maximum security, you can restrict an Access Point so it is only reachable from within your private network.

* **Requirement:** To connect from a VPC, you must use an **S3 VPC Endpoint** (either Interface or Gateway).
* **The Policy Chain:** The VPC Endpoint policy must allow access to both the **Access Point** and the underlying **S3 Bucket**.

---
#### 3. S3 Object Lambda
S3 Object Lambda allows you to add your own code to S3 `GET` requests to process data before it is returned to an application.

* **How it works:** 1. The application calls the **Object Lambda Access Point**.
    2. S3 automatically invokes a **Lambda function**.
    3. The function retrieves the original object from S3, transforms it, and returns the result to the app.
* **Key Use Cases for the SAA Exam:**
    * **Data Redaction:** Removing PII (Personally Identifiable Information) on the fly for an analytics team while keeping the original file intact.
    * **Format Conversion:** Converting a legacy XML file to JSON for a modern web app.
    * **Dynamic Resizing:** Watermarking or resizing images based on the specific user requesting them.

---

#### SAA Exam "Scenario" Table

| Requirement | Use This Feature |
| :--- | :--- |
| "Manage security for dozens of teams with different prefix requirements." | **S3 Access Points** |
| "Users need to see the data, but sensitive SSNs must be masked." | **S3 Object Lambda** |
| "Restrict bucket access strictly to an internal corporate network." | **Access Point with VPC Origin** |
| "A single bucket needs to serve different versions of the same file." | **S3 Object Lambda** |

##### References
