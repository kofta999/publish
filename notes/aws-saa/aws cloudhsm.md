2026-03-24 13:57
Tags: #cloud/aws/security 
##### Content
AWS CloudHSM is a cloud-based hardware security module (HSM) that enables you to easily generate and use your own encryption keys on the AWS Cloud. Unlike KMS, where AWS manages the software layer of the appliance, CloudHSM provides you with **dedicated hardware** that you control entirely.

#### Hardware and Compliance
CloudHSM uses dedicated, single-tenant hardware devices that are tamper-resistant and compliant with **FIPS 140-2 Level 3**. This is a higher level of physical security assurance compared to the multi-tenant software environment of standard KMS. Because the hardware is dedicated to you, there is **no free tier** for this service; you pay an hourly fee for each HSM in your cluster.


#### Management and Connectivity
While AWS manages the health and availability of the hardware (the appliance itself), you are responsible for everything "inside" the box. 
* **Users and Keys:** You create and manage the cryptographic users and the keys. AWS has no visibility into your keys.
* **CloudHSM Client:** To use the service, you must install the CloudHSM Client software on your application instances (EC2) to establish a secure SSL connection to the HSMs in your VPC.
* **Integration:** CloudHSM integrates with services like **Amazon Redshift** for database encryption and can be used for **SSL/TLS acceleration** to offload the cryptographic heavy lifting from your web servers.

#### High Availability and Scalability
CloudHSM is designed for high availability. You typically deploy a **cluster** of HSMs spread across multiple Availability Zones. CloudHSM automatically synchronizes the keys across all HSMs in the cluster. If one HSM fails, the others continue to serve requests, and AWS will automatically provision a replacement to maintain the cluster's health.

#### CloudHSM Custom Key Store for KMS
You can combine the ease of use of KMS with the hardware security of CloudHSM. By setting up a **KMS Custom Key Store**, you can configure KMS to use your CloudHSM cluster as the storage for its backing keys. This allows you to use standard AWS service integrations (like EBS or S3 encryption) while ensuring that the keys are physically stored on your dedicated CloudHSM hardware.

#### KMS vs. CloudHSM Comparison

| Feature            | AWS KMS                       | AWS CloudHSM                                       |
| :----------------- | :---------------------------- | :------------------------------------------------- |
| **Tenancy**        | Multi-tenant                  | **Single-tenant (Dedicated Hardware)**             |
| **Key Ownership**  | Shared management with AWS    | **Full customer control**                          |
| **Authentication** | IAM Policies                  | **Cryptographic Users (managed via HSM software)** |
| **Standard**       | FIPS 140-2 Level 3 (Software) | **FIPS 140-2 Level 3 (Physical Hardware)**         |
| **Connectivity**   | AWS API (Public/Private)      | **VPC-based (via CloudHSM Client)**                |
| **Cost**           | Low (Pay per key/API call)    | **High (Hourly per HSM instance)**                 |

### SAA Exam Scenario Table

| If the requirement is... | Use This Service: |
| :--- | :--- |
| "Meet FIPS 140-2 Level 3 compliance with dedicated hardware." | **AWS CloudHSM** |
| "Manage encryption keys for S3 where AWS has zero access to the keys." | **CloudHSM** or **KMS with Imported Key Material** |
| "Offload SSL/TLS processing from EC2 instances to a dedicated device." | **AWS CloudHSM** |
| "Encrypt 1,000s of small objects in S3 with low cost and high ease of use." | **AWS KMS** |
| "Use dedicated HSM hardware but keep the standard KMS integration for EBS." | **KMS Custom Key Store (backed by CloudHSM)** |

##### References
