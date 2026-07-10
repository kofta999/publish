2026-03-23 22:27
Tags: #cloud/aws/monitoring 
##### Content
CloudWatch Metrics provide the quantitative, time-series data needed to monitor the performance and health of your AWS resources. For the SAA-C03 exam, focus on the differences between standard vs. custom metrics, resolution levels, and data streaming.

#### 1. Metric Fundamentals
* **Namespace:** A container for metrics (e.g., `AWS/EC2`, `AWS/S3`). This prevents naming conflicts.
* **Metric:** A variable to monitor (e.g., `CPUUtilization`).
* **Dimension:** A name/value pair that uniquely identifies a metric (e.g., `InstanceId=i-12345`). You can have up to **30 dimensions** per metric.
* **Timestamp:** Every data point must have a timestamp.
* **Resolution:**
    * **Standard Resolution:** Data is available in **1-minute** granularity.
    * **High Resolution:** Data is available in **1-second** granularity. High-resolution metrics are only for **Custom Metrics**.

#### 2. Monitoring Levels
* **Basic Monitoring (Default):** Free. Metrics are sent every **5 minutes**.
* **Detailed Monitoring:** Paid. Metrics are sent every **1 minute**. 
    * *Exam Tip:* Enable this if you need faster response times for **Auto Scaling** or finer-grained performance analysis.

#### 3. Custom Metrics
You can publish your own metrics using the AWS CLI or SDK (`PutMetricData` API).
* **Common Use Case:** Monitoring **RAM/Memory Usage** on EC2 (AWS does not provide this by default because it's an OS-level metric).
* **Standard vs. High Resolution:** You can define a custom metric with a resolution as fine as 1 second.
* **Metric Math:** Allows you to query multiple metrics and use math expressions to create new time series (e.g., calculating the percentage of errors relative to total requests).

#### 4. Metric Retention (Data Rollup)
CloudWatch automatically "rolls up" (aggregates) older data into less granular points to manage storage.
* **< 60 seconds (High-Res):** Kept for **3 hours**.
* **1-minute data:** Kept for **15 days**.
* **5-minute data:** Kept for **63 days**.
* **1-hour data:** Kept for **455 days (15 months)**.

#### 5. CloudWatch Metric Streams
A push-based feature that continuously sends metrics to a destination with near-real-time delivery (2–3 minute latency).
* **Destinations:** 
	* **Amazon S3:** For long-term storage and data lake analysis.
	* **Kinesis Data Firehose:** To deliver to Redshift, OpenSearch, or custom HTTP endpoints.
	* **Third-Party Providers:** Datadog, New Relic, Splunk, Dynatrace, etc.
* **Benefits:** Eliminates the need for "Polling" (constantly calling the `GetMetricData` API), which is more complex and can be more expensive at scale.

#### 6. CloudWatch Metric Insights
A fast, SQL-based query engine that allows you to aggregate and group millions of metrics in real-time. 
* **Use Case:** "Identify which 10 EC2 instances have the highest CPU utilization across my entire fleet."

| Requirement                                                              | Use This Feature:                        |
| :----------------------------------------------------------------------- | :--------------------------------------- |
| "Monitor Memory/RAM usage on an EC2 instance."                           | **Custom Metric (via CloudWatch Agent)** |
| "React to a CPU spike in 1 minute instead of 5."                         | **Detailed Monitoring**                  |
| "Export all account metrics to an S3 data lake in real-time."            | **CloudWatch Metric Streams**            |
| "Trigger an alarm based on 1-second data spikes."                        | **High-Resolution Custom Metric**        |
| "Calculate 'Available Storage %' by dividing Free space by Total space." | **Metric Math**                          |

##### References
