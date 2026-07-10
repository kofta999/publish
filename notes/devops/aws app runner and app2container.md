2026-03-21 15:00
Tags: #cloud/aws/compute 
##### Content

#### 1. AWS App Runner
App Runner is the most "hands-off" way to deploy a web application on AWS. It handles the source code, build, deployment, load balancing, and scaling without you ever touching a server or a cluster.

* **Simplicity:** No infrastructure experience required. It’s even higher-level than ECS Fargate.
* **Source Options:**
    * **Source Code:** Connect your GitHub or Bitbucket repository (supports Python, Node.js, Java, etc.).
    * **Container Image:** Point to an image in Amazon ECR.
* **Features:**
    * **Automatic Scaling:** Scales up or down based on incoming request traffic.
    * **Fully Managed:** Includes a built-in Load Balancer and TLS encryption by default.
    * **VPC Connectivity:** Can securely connect to private resources like an RDS database or ElastiCache.
* **Best For:** Fast-moving startups, internal tools, and simple microservices where you don't want to manage an orchestrator like ECS or EKS.

#### 2. AWS App2Container (A2C)
This is a **migration tool** (CLI-based) specifically designed to help you "containerize" existing Java and .NET applications so they can run on AWS.

* **The Problem:** You have a legacy app running on an on-premises VM or bare metal, and you want to move it to the cloud but don't want to rewrite the code.
* **The Solution (A2C):** 
	* **Analyze:** It scans your running applications (Java on Linux or .NET on Windows).
    * **Containerize:** It automatically builds a Docker image and creates a Dockerfile.
    * **Deploy:** It generates **CloudFormation** templates to set up the infrastructure.
* **Destinations:** It can push your newly containerized app to **Amazon ECS**, **Amazon EKS**, or **AWS App Runner**.

### SAA Exam "Modernization" Comparison

| If the requirement is...                                                                 | Use This Service:     |
| :--------------------------------------------------------------------------------------- | :-------------------- |
| "Deploy a web app directly from a GitHub repo with zero infra management."               | **AWS App Runner**    |
| "Migrate a legacy .NET app from a VM to a container without code changes."               | **AWS App2Container** |
| "A serverless container platform that handles scaling and load balancing automatically." | **AWS App Runner**    |
| "Modernize on-premises Java apps into ECS tasks."                                        | **AWS App2Container** |
##### References
