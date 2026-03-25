2026-03-23 22:42
Tags: #cloud/aws/monitoring 
##### Content
CloudWatch Alarms allow you to automate responses based on your metric data. As a Cloud Architect, you should focus on how alarms integrate with other services to build self-healing infrastructures.
#### 1. Alarm States & Evaluation
* **States:**
    * **OK:** Metric is within the defined threshold.
    * **ALARM:** Metric has breached the threshold.
    * **INSUFFICIENT_DATA:** Not enough data points to determine the state (common during the first few minutes of a resource's life).
* **Period:** The length of time (e.g., 60s, 300s) used to evaluate the metric.
    * **High-Resolution Alarms:** Can be set for **10-second** or **30-second** periods (Standard is 60s).

#### 2. Alarm Targets (Actions)
When an alarm changes state, it can trigger:
* **EC2 Actions:** Stop, Terminate, Reboot, or **Recover** an instance.
* **Auto Scaling:** Scale an ASG in or out based on demand.
* **SNS Notifications:** Send messages to humans (Email/SMS) or systems (Lambda/SQS).

#### 3. Composite Alarms
Composite alarms monitor the states of **multiple other alarms** using logical operators (**AND**, **OR**).
* **Benefit:** Reduces "alarm noise." For example, only alert if both "High CPU" AND "High Latency" occur simultaneously, rather than getting two separate alerts.


### SAA Exam "Scenario" Table

| If the requirement is...                                                        | Use This Feature:                            |
| :------------------------------------------------------------------------------ | :------------------------------------------- |
| "Automatically move an EC2 to new hardware if the host fails."                  | **CloudWatch Alarm (Recovery Action)**       |
| "Ensure your website's 'Login' button works every minute."                      | **CloudWatch Synthetics (Canaries)**         |
| "Only notify the team if the entire application (not just one server) is down." | **Composite Alarms**                         |
| "Monitor latency between your local office and your VPC."                       | **CloudWatch Network Monitor**               |
| "Trigger an alarm based on '404' errors found in your access logs."             | **Log Metric Filter** + **CloudWatch Alarm** |

##### References
