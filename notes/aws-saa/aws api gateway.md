2026-03-22 13:16
Tags: #cloud/aws 
##### Content
AWS API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. It acts as the "front door" for applications to access data, business logic, or functionality from your backend services.

#### 1. Core Capabilities
* **Serverless Compatibility:** Perfectly pairs with **AWS Lambda** for a complete serverless backend.
* **Lifecycle Management:** Supports **Versioning** (v1, v2) and **Stages** (dev, test, prod).
* **Traffic Management:** Handles **Throttling** (rate limiting) and **Caching** of responses to improve performance and protect backend services.
* **Developer Tools:** Can import **OpenAPI (Swagger)** definitions and generate SDKs for your client applications.

#### 2. Backend Integrations
* **Lambda Function:** The most common pattern. Exposes a REST API backed by serverless code.
* **HTTP Endpoints:** Proxies requests to any publicly accessible HTTP backend (e.g., an **Application Load Balancer** or an on-premises server).
* **AWS Services:** Direct integration with AWS APIs. You can trigger a **Step Function**, post a message to **SQS**, or write an item to **Kinesis** without needing a Lambda function in between.

#### 3. Endpoint Types
For the SAA exam, choosing the right endpoint type is a key architectural decision.

| Type               | Best For...                    | Routing                                                                                        |
| :----------------- | :----------------------------- | :--------------------------------------------------------------------------------------------- |
| **Edge-Optimized** | **Global Clients**             | Traffic is routed through **CloudFront Edge Locations** (managed by AWS).                      |
| **Regional**       | Clients in the **same region** | No CloudFront overhead. Use if you want to manually manage your own CloudFront distribution.   |
| **Private**        | **Internal VPC** apps          | Accessible only via an **Interface VPC Endpoint** (ENI). Does not go over the public internet. |

#### 4. Security & Authentication
API Gateway provides multiple layers of security to control who can access your endpoints:

* **IAM Permissions:** Best for internal AWS users/services (uses Signature Version 4).
* **Amazon Cognito:** Best for **external users** (mobile/web apps). Uses User Pools or Identity Pools.
* **Lambda Authorizers:** Use your own custom logic (e.g., validating a **JWT** or calling a 3rd party OAuth provider).
* **SSL/TLS:** Integrates with **AWS Certificate Manager (ACM)**. 
    * *Exam Tip:* For **Edge-Optimized** custom domains, the certificate must be in **us-east-1**. For **Regional**, it must be in the same region as the API.

### SAA Exam "Scenario" Table

| If the requirement is...                                            | Use This Feature/Endpoint:     |
| :------------------------------------------------------------------ | :----------------------------- |
| "Provide the lowest latency for users distributed worldwide."       | **Edge-Optimized Endpoint**    |
| "Expose an internal microservice only to other apps in a VPC."      | **Private Endpoint**           |
| "Protect a backend from a sudden flood of API requests."            | **Throttling (Rate Limiting)** |
| "Authenticate users using their existing Google or Facebook login." | **Cognito User Pools**         |
| "Reduce the cost and load of a read-heavy API."                     | **API Gateway Caching**        |
| "Trigger an SQS queue directly from an HTTP request."               | **AWS Service Integration**    |

##### References
