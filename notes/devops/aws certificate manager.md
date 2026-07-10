2026-03-24 13:47
Tags: #cloud/aws/security 
##### Content
AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing SSL/TLS certificates for your AWS-based websites and applications.

#### Public Certificates: Requesting & Validation
When you request a public certificate from ACM, it is **free**, but you must prove you own the domain.

* **DNS Validation (Recommended):**
    * ACM provides a CNAME record that you must add to your DNS configuration (e.g., Route 53).
    * **Benefit:** Enables **fully automatic renewal**. As long as the DNS record remains, ACM will renew the certificate 60 days before it expires.
* **Email Validation:**
    * AWS sends an approval email to the registered domain owner.
    * **Downside:** Renewal is **manual**. You must click a link in a renewal email sent 45 days before expiration. If you miss it, the certificate expires.


#### Imported Certificates vs. ACM-Issued
You can import certificates purchased from third-party CAs (like DigiCert or GoDaddy) into ACM.

| Feature | ACM-Issued (Public) | Imported Certificates |
| :--- | :--- | :--- |
| **Cost** | **Free** | You pay the 3rd-party CA |
| **Renewal** | **Automatic** (DNS Validation) | **Manual** (Must re-import) |
| **Monitoring** | Managed by AWS | User-managed (EventBridge/Config) |

* **Monitoring Imported Expiry:** Since AWS cannot auto-renew these, you must set up a "Watchdog."
    * **CloudWatch Metrics:** Monitor the `DaysToExpiry` metric.
    * **EventBridge:** Triggers an event (e.g., 45 days before expiry) to notify you via SNS or Lambda.
    * **AWS Config:** Use the `acm-certificate-expiration-check` rule to identify certificates near expiration.


#### API Gateway & Custom Domains
To use a professional URL (e.g., `api.example.com`) instead of the default AWS URL, you must integrate ACM with your API Gateway endpoint.

* **Edge-Optimized (Global):**
    * **How it works:** Leverages the **CloudFront** network to route requests to the nearest edge location.
    * **Certificate Requirement:** The ACM certificate **MUST be in `us-east-1`** (N. Virginia), because that is where CloudFront manages its certificates.
* **Regional:**
    * **How it works:** For clients in the same region as the API. No CloudFront "hop."
    * **Certificate Requirement:** The ACM certificate **must be in the same region** as the API Gateway.
* **Private:**
    * Accessed only via **VPC Interface Endpoints**.
    * Traffic stays within the AWS network and does not use the public internet.



---

### SAA Exam "Scenario" Table

| If the requirement is...                                                  | Use This Strategy:                                                         |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------- |
| "Deploy a public certificate with zero-touch automatic renewal."          | **ACM with DNS Validation**                                                |
| "Load an SSL certificate onto an EC2 instance directly."                  | **Manual Install** (ACM certificates cannot be exported/installed on EC2). |
| "Use a custom domain for a global API with the lowest latency."           | **API Gateway Edge-Optimized (Cert in `us-east-1`)**                       |
| "Ensure an imported 3rd-party certificate is replaced before it expires." | **EventBridge + SNS / AWS Config Rule**                                    |
| "Secure an internal-only API that shouldn't be on the public internet."   | **Private API Gateway + Interface VPC Endpoint**                           |
##### References
