2026-03-22 13:22
Tags: #cloud/aws/iam 
##### Content
Amazon Cognito provides authentication, authorization, and user management for your web and mobile apps. For the SAA-C03 exam, the most critical task is distinguishing between **User Pools** and **Identity Pools**.

#### 1. Cognito User Pools (CUP) – "Who are you?"
User Pools are a **user directory** in Amazon Cognito. They provide a serverless database to manage sign-up and sign-in for your application users.

* **Authentication:** Handles usernames, passwords, MFA, and password resets.
* **Social/SAML Federation:** Allows users to sign in using external providers like **Google, Facebook, Apple**, or corporate **SAML/OIDC** systems.
* **Integrations:**
    * **API Gateway:** Uses a "Cognito Authorizer" to protect REST APIs.
    * **Application Load Balancer (ALB):** Authenticates users at the load balancer level before they reach your web server.
* **Keywords:** "User directory," "Social Login," "Sign-in/Sign-up."
#### 2. Cognito Identity Pools – "What can you access?"
Identity Pools (Federated Identities) provide **temporary AWS credentials** to your users so they can access AWS services directly.

* **Authorization:** It swaps a login token (from a User Pool or Social Provider) for temporary IAM credentials (STSs).
* **Direct Access:** Allows a mobile app to upload a file directly to **Amazon S3** or write to **DynamoDB** without going through a backend server.
* **Guest Access:** Supports "Unauthenticated identities" for guest users who haven't logged in yet.
* **Keywords:** "Temporary AWS credentials," "Access S3/DynamoDB directly," "Federated Identities."

#### 3. Cognito vs. IAM
This is a frequent architectural decision on the exam:
* **Use IAM if:** You have a small, known number of **internal employees** (e.g., your DevOps team) needing access to the AWS Console or CLI.
* **Use Cognito if:** You have **millions of external users** (e.g., customers of a mobile game or web app) who need to authenticate to your application.

### SAA Exam "Scenario" Table

| If the requirement is...                                           | Use This Cognito Feature:                   |
| :----------------------------------------------------------------- | :------------------------------------------ |
| "Provide a sign-in/sign-up page for a web application."            | **User Pools (CUP)**                        |
| "Allow users to log in with their Facebook account."               | **User Pools (CUP)**                        |
| "Let mobile users upload photos directly to a private S3 bucket."  | **Identity Pools**                          |
| "Authenticate users at the ALB before they reach an EC2 instance." | **User Pools + ALB Integration**            |
| "Grant guest users read-only access to a specific DynamoDB table." | **Identity Pools (Unauthenticated access)** |

### Summary Workflow
1.  User logs in via **User Pool** (or Google/Facebook).
2.  User receives a **Token**.
3.  User exchanges that Token at the **Identity Pool**.
4.  Identity Pool returns **Temporary AWS Credentials** (IAM Role).
5.  User accesses **S3 / DynamoDB** using those credentials.

![[Pasted image 20260322132259.png]]
##### References
