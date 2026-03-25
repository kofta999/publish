2025-02-21 15:01
Tags: #cloud/aws
##### Content
## **Amazon CloudWatch**
- **Metrics**: Tracks variables like CPU utilization, network traffic, etc., with timestamps. Dashboards visualize metrics for monitoring.
- **Alarms**: Sends notifications based on metrics. Actions include Auto Scaling, EC2 actions (stop, terminate, restart), and SNS notifications. Alarm states: OK, INSUFFICIENT_DATA, ALARM.
- **Logs**: Collects logs from Elastic Beanstalk, ECS, Lambda, CloudTrail, Route53, and on-premises servers via CloudWatch agents. Real-time monitoring with adjustable retention.

## **Amazon EventBridge**
- Serverless event bus for real-time data streaming.
- Routes events from AWS services, custom apps, and SaaS to 90+ AWS targets (e.g., Lambda, SQS, SNS).
- Key use cases: Application orchestration, real-time data processing.
- Best practices: Efficient event filtering, robust error handling.

## **AWS CloudTrail**
- Tracks and records AWS account activity (API calls, console actions, SDKs, CLI). 
- Enabled by default; logs can be integrated with CloudWatch or stored in S3.
- Monitors all regions by default or specific regions.
- Essential for governance, compliance, and auditing.

## **AWS X-Ray**
- Visual analysis tool for troubleshooting performance and understanding microservice dependencies.
- Identifies bottlenecks, errors, and exceptions.
- Helps debug distributed systems by providing a unified view of the architecture.

## **Amazon CodeGuru**
- **CodeGuru Reviewer**: Automated code reviews for Java and Python. Identifies security vulnerabilities, bugs, and best practices.
- **CodeGuru Profiler**: Monitors runtime behavior, identifies inefficiencies (e.g., high CPU usage), and reduces compute costs. Supports AWS and on-premise applications.

## **AWS Health Dashboard**
- **Service History**: Displays health of all regions and services with historical data. Offers RSS feed for updates.
- **Your Account**: Shows AWS outages and their impact on your resources. Provides alerts and remediation details.

##### References
