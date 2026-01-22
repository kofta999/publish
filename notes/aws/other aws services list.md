2025-02-22 13:56
Tags: #cloud/aws/important
##### Content
**AWS Outposts:** Server racks that enables AWS to run on-prem

**AWS WaveLength:** Brings AWS infra to 5G networks, enabling low latency apps for mobile users

**AWS Local Zones:** Brings AWS services closer to large population, industry and IT centers

**AWS SQS (Simple Queue Service):** Serverless service to decouple apps

**AWS Kinesis:** Managed service for real-time big data streaming

**AWS SNS (Simple Notification Service):** Pub/sub notification service

**AWS MQ:** message broker service (managed service for RabbitMQ, ActiveMQ)

AWS CodeCommit: A managed source control service that hosts secure Git-based repositories, making it easier for teams to collaborate on code.

AWS CodeBuild: A fully managed continuous integration service that compiles source code, runs tests, and produces software packages ready for deployment.

AWS CodePipeline: Automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define.

AWS CodeArtifact: A managed artifact repository service that makes it easy for organizations to store, share, and manage software packages.

AWS Cloud9: A cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser.

THESE 2
#cloud/aws/important

AWS Systems Manager: Offers visibility and control of your infrastructure on AWS, enabling resource management and operational insights.

SSM Parameter Store (part of AWS Systems Manager): Provides secure, hierarchical storage for configuration data management and secrets management, allowing you to keep passwords, database strings, and license codes securely.

**AWS Elastic Beanstalk (ELK):** AWS service that simplifies deploying, managing, and scaling applications by automatically handling infrastructure details like capacity provisioning, load balancing, and application health monitoring.


Pricing Calculator: Cost of services on AWS

Billing Dashboard: High level overview + free tier dashboard

Cost Allocation Tags: Tag resources to create detailed reports

Cost and Usage Reports: Most comprehensive billing dataset

Cost Explorer: View current usage (detailed) and forecast usage

Billing Alarms: In us-east-1 – track overall and per-service billing

Budgets: More advanced – track usage, costs, RI, and get alerts

Savings Plans: Easy way to save based on long-term usage of AWS

Cost Anomaly Detection: Detect unusual spends using Machine Learning

Service Quotas: Notify you when you’re close to service quota threshold

## **Amazon WorkSpaces**
- **Purpose**: Managed Desktop as a Service (DaaS) solution.
- **Key Features**:
  - Provision Windows or Linux desktops quickly.
  - Eliminates the need for on-premise Virtual Desktop Infrastructure (VDI) management.
  - Scalable to thousands of users.
  - Secures data with integration into AWS Key Management Service (KMS).
  - Pay-as-you-go pricing with monthly or hourly rates.
- **Use Case**: Ideal for businesses needing secure, scalable, and managed virtual desktops.

---

## **Amazon AppStream 2.0**
- **Purpose**: Stream desktop applications to any device via a web browser.
- **Key Features**:
  - No need to acquire or provision infrastructure.
  - Applications are delivered within a web browser.
  - Supports configuration of instance types (CPU, RAM, GPU) based on application requirements.
- **Use Case**: Suitable for delivering desktop applications to users without requiring full virtual desktops.

---

## **Amazon WorkSpaces vs. AppStream 2.0**
- **WorkSpaces**:
  - Provides fully managed Virtual Desktop Interface (VDI).
  - Users access a full desktop environment.
  - Supports both on-demand and always-on desktops.
- **AppStream 2.0**:
  - Streams individual applications to web browsers.
  - Works on any device with a web browser.
  - Allows customization of instance types for specific applications.

---

## **AWS IoT Core**
- **Purpose**: Connect and manage IoT devices in the AWS Cloud.
- **Key Features**:
  - Serverless, secure, and scalable to billions of devices.
  - Supports communication with devices even when offline.
  - Integrates with AWS services like Lambda, S3, and SageMaker.
  - Enables data gathering, processing, analysis, and action for IoT applications.
- **Use Case**: Build IoT applications for real-time data processing and device management.

---

## **AWS AppSync**
- **Purpose**: Fully managed GraphQL service for real-time data-driven applications.
- **Key Features**:
  - Uses GraphQL for efficient data querying and manipulation.
  - Automatically generates client code.
  - Integrates with DynamoDB and Lambda.
  - Real-time subscriptions for data updates.
  - Offline data synchronization (replaces Cognito Sync).
  - Fine-grained security controls.
  - Works seamlessly with AWS Amplify for building scalable applications.
- **Use Case**: Ideal for mobile and web apps requiring real-time data synchronization and updates.
## **AWS Amplify**
- **Purpose**: Comprehensive toolkit for building and deploying scalable web and mobile applications.
- **Key Features**:
  - Includes authentication, storage, APIs (REST, GraphQL), CI/CD, PubSub, analytics, AI/ML predictions, and monitoring.
  - Integrates with AWS, GitHub, and other sources for seamless development and deployment.
- **Use Case**: Ideal for developers looking to build and launch full-stack applications quickly and efficiently.

---

## **AWS Application Composer**
- **Purpose**: Visual tool for designing and building serverless applications on AWS.
- **Key Features**:
  - Simplifies deployment of AWS infrastructure code without requiring deep AWS expertise.
  - Configures resource interactions and generates Infrastructure as Code (IaC) using CloudFormation.
  - Supports importing and visualizing existing CloudFormation or SAM templates.
- **Use Case**: Streamlines the creation and management of serverless applications for developers.

---

## **AWS Device Farm**
- **Purpose**: Fully-managed service for testing web and mobile applications on real devices.
- **Key Features**:
  - Tests applications on desktop browsers, real mobile devices, and tablets.
  - Runs tests concurrently on multiple devices to speed up execution.
  - Configures device settings (e.g., GPS, language, Wi-Fi, Bluetooth).
- **Use Case**: Ensures application compatibility and performance across a wide range of devices.

---

## **AWS Backup**
- **Purpose**: Fully managed service for centralized backup management and automation.
- **Key Features**:
  - Offers on-demand and scheduled backups for flexibility.
  - Supports Point-in-Time Recovery (PITR) for precise restoration.
  - Features retention periods, lifecycle management, and customizable backup policies.
  - Facilitates cross-region backup for enhanced data redundancy and disaster recovery.
  - Enables cross-account backup using AWS Organizations for streamlined data protection.
- **Use Case**: Provides comprehensive backup solutions for ensuring data protection and compliance across AWS services.

## **AWS Step Functions**
- **Purpose**: Builds serverless visual workflows to orchestrate AWS services and applications.
- **Key Features**:
  - Supports sequence, parallel execution, conditions, timeouts, and error handling.
  - Integrates with AWS services like EC2, ECS, API Gateway, SQS, and on-premises servers.
  - Enables human approval features within workflows.
- **Use Cases**:
  - Order fulfillment.
  - Data processing.
  - Web applications.
  - Workflow automation.
##### References
