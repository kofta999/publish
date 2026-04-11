2026-03-22 12:11
Tags: #cloud/aws/compute 
##### Content
#### 1. Core Benefits & Resource Scaling
* **Resource Linkage:** In Lambda, **RAM is the primary lever**. When you increase Memory (up to 10GB), AWS proportionally increases CPU power and network bandwidth. 
* **Scaling:** Lambda is highly elastic. It scales horizontally by creating more "execution environments" (concurrency) to handle incoming requests.
* **Monitoring:** Integrated directly with **CloudWatch Logs** (for `print` or `log` statements) and **CloudWatch Metrics** (for invocation counts, duration, and errors).

#### 2. Execution Limits & Throttling
For the exam, memorizing these specific "hard" and "soft" limits is essential:

* **Timeout:** Maximum execution time is **15 minutes (900s)**. If a task takes longer, you should move it to **ECS or AWS Batch**.
* **Temporary Space:** The `/tmp` directory provides **512MB to 10GB** of ephemeral storage.
* **Deployment Size:** 50MB (compressed) / 250MB (uncompressed). If your code/dependencies are larger, use **Lambda Container Images** (up to 10GB).
* **Concurrency:** The default limit is **1,000 concurrent executions per region**. 
    * **Reserved Concurrency:** Guarantees a set amount of capacity for a specific function (acts as a limit to prevent one function from "starving" others).
    * **Provisioned Concurrency:** Pre-initializes a set number of environments to eliminate "Cold Starts."

#### 3. Performance Optimization: Cold Starts & SnapStart
When a Lambda function hasn't been used for a while, the first request triggers a **Cold Start** (AWS must download the code and start a new container).

* **Provisioned Concurrency:** Solves cold starts by keeping a pool of functions initialized and ready to respond in double-digit milliseconds. 
* **Lambda SnapStart:** A newer feature that specifically helps **Java, Python, and .NET** functions. It takes a "snapshot" of the initialized memory/disk and caches it. When the function is called, it resumes from the snapshot instead of starting from scratch.

#### 4. Asynchronous Invocations & Retries
When Lambda is triggered asynchronously (e.g., by **S3** or **SNS**):
* **Built-in Retry:** Lambda automatically retries failed executions **twice**. 
* **Duration:** It will attempt to re-run the function for up to **6 hours** with exponential backoff.
* **Dead Letter Queue (DLQ):** If all retries fail, you can send the event to an **SQS queue** or **SNS topic** for manual debugging.

### Summary of Pricing
Lambda is often the most cost-effective choice for backend engineers because you only pay for **Requests** ($0.20 per million) and **Duration** (GB-seconds). If your code isn't running, you pay **zero**.

---

### SAA Exam "Scenario" Table

| If the requirement is...                                         | Use This Lambda Feature:                            |
| :--------------------------------------------------------------- | :-------------------------------------------------- |
| "Perform a task that takes 20 minutes to complete."              | **Move to ECS** (Lambda exceeds 15m limit).         |
| "Eliminate latency for the first request of a Java function."    | **SnapStart** or **Provisioned Concurrency**.       |
| "Ensure a critical function always has capacity during a burst." | **Reserved Concurrency**.                           |
| "Process 1,000 small images uploaded to S3 simultaneously."      | **Asynchronous Invocation** (Scales automatically). |
| "Store a 2GB temporary file during processing."                  | **Increase /tmp storage** to 2GB+.                  |


##### References
