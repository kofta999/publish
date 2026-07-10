2026-03-25 21:50
Tags: #cloud/aws 
##### Content
### High Importance for SAA

#### AWS Elastic Beanstalk
A developer-centric service that simplifies deploying, managing, and scaling web applications.
*   **How it works:** It automatically handles the infrastructure details like capacity provisioning, load balancing, scaling, and application health monitoring. 
*   **Control:** While it manages the underlying resources (EC2, ASG, ELB, etc.), you still retain full control over the configuration and only pay for the resources created.

#### AWS Step Functions
*   **What it does:** Builds serverless visual workflows to orchestrate your Lambda functions and other AWS services.
*   **Features:** It natively supports complex logic like sequences, parallel executions, timeouts, error handling, and manual human approval steps.

#### AWS Outposts
*   **Purpose:** A hybrid cloud solution where AWS installs physical "server racks" directly in your on-premises corporate data center.
*   **Benefits:** It provides the exact same AWS infrastructure, APIs, and tools locally, enabling ultra-low latency access to on-premises systems, local data processing, and strict data residency compliance.

#### Cost Management & Billing Tools
*   **Cost Explorer:** A tool to visualize and analyze detailed current usage. It can also **forecast your usage up to 18 months** based on previous trends and recommend Savings Plans.
*   **Budgets:** Advanced tracking for usage, costs, and Reserved Instances (RI) with custom alerts.
*   **Cost Anomaly Detection:** Continuously monitors your cost and usage using Machine Learning to detect one-time cost spikes or unusual spend patterns without needing manually defined thresholds.
*   **Cost Allocation Tags:** Used to tag specific resources to generate detailed, categorized billing reports.
*   **Cost and Usage Reports:** The most comprehensive, raw billing dataset available in AWS.
*   **Savings Plans:** An easy way to save money based on long-term, committed usage of AWS resources.

<br>

### Medium Importance for SAA

#### End-User Computing
*   **Amazon WorkSpaces:** A fully managed Desktop as a Service (DaaS) solution that provisions full Windows or Linux virtual desktops. It eliminates the need for on-premise Virtual Desktop Infrastructure (VDI) management and is highly scalable.
*   **Amazon AppStream 2.0:** Instead of a full desktop, it streams **individual desktop applications** to any device via a standard web browser. 

#### AWS AppFlow & AWS Amplify
*   **Amazon AppFlow:** A fully managed integration service used to securely transfer data between Software-as-a-Service (SaaS) applications (like Salesforce, Zendesk, or Slack) and AWS (like S3 or Redshift) **without writing any custom code**.
*   **AWS Amplify:** A set of tools designed to help developers quickly build and deploy scalable **full-stack web and mobile applications**. It handles frontend-to-backend connections, authentication, and CI/CD.

#### Developer Tools (CI/CD)
*   **AWS CodeCommit:** A managed source control service that hosts secure, Git-based repositories.
*   **AWS CodeBuild:** A continuous integration service that compiles source code, runs tests, and produces ready-to-deploy software packages.
*   **AWS CodePipeline:** Automates the build, test, and deploy phases of your release process every time a code change occurs.

#### Advanced Edge Networking
*   **AWS Local Zones:** Brings AWS compute, storage, and database services closer to large population, industry, and IT centers for lower latency.
*   **AWS WaveLength:** Brings AWS infrastructure directly to 5G telecommunication networks, enabling ultra-low latency applications specifically for mobile users.

<br>

### Low Importance for SAA

#### Messaging & Communications
*   **Amazon SES (Simple Email Service):** A fully managed service to securely send inbound and outbound transactional or bulk emails globally using APIs or SMTP.
*   **Amazon Pinpoint:** A scalable, 2-way marketing communications service. While SES is just for email, Pinpoint is used to create **highly-targeted audience segments, message templates, and full campaigns** across email, SMS, push notifications, and voice.

#### Niche Dev, Data & IoT Services
*   **AWS AppSync:** A fully managed GraphQL service used for building real-time, data-driven applications.
*   **AWS IoT Core:** Connects IoT devices to the AWS cloud, allowing interaction and data processing even when devices are offline.
*   **AWS Cloud9:** A cloud-based integrated development environment (IDE) that lets you write, run, and debug code directly in a web browser.
*   **AWS CodeArtifact:** A managed artifact repository service to store, share, and manage software packages.
*   **AWS Application Composer:** A visual tool for designing and building serverless application architectures.
*   **AWS Device Farm:** An application testing service that lets you test your apps on real, physical mobile devices hosted by AWS.


### SAA Exam "Scenario" Table

| If the requirement is...                                                                                                | Use This Strategy / Service:   |
| :---------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| "Deploy a web app without worrying about provisioning EC2 instances, configuring ASGs, or managing the load balancer."  | **AWS Elastic Beanstalk**      |
| "Visually orchestrate a serverless workflow across multiple Lambda functions that includes a pause for human approval." | **AWS Step Functions**         |
| "Run AWS services natively inside a corporate data center for single-digit millisecond latency to local mainframes."    | **AWS Outposts**               |
| "Forecast your AWS spending for the next 12 months to prepare an IT budget."                                            | **AWS Cost Explorer**          |
| "Detect unexpected, sudden spikes in your AWS bill using automated Machine Learning."                                   | **AWS Cost Anomaly Detection** |
| "Provide a fully managed, persistent Windows virtual desktop environment to 1,000 remote employees."                    | **Amazon WorkSpaces**          |
| "Stream a heavy CAD application directly to users' web browsers without giving them full virtual desktops."             | **Amazon AppStream 2.0**       |
| "Extract customer data from Salesforce daily and save it to an Amazon S3 bucket without writing integration code."      | **Amazon AppFlow**             |
| "Quickly deploy the frontend and backend of a mobile application, including user authentication."                       | **AWS Amplify**                |
| "Run targeted SMS and email marketing campaigns to highly specific segments of your user base."                         | **Amazon Pinpoint**            |
| "Send massive volumes of automated, transactional order-confirmation emails to customers."                              | **Amazon SES**                 |
| "Deploy an application component on a 5G network to ensure ultra-low latency for mobile devices."                       | **AWS WaveLength**             |

##### References
