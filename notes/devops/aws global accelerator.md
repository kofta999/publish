2026-03-20 15:18
Tags: #cloud/aws/networking 
##### Content

### AWS Global Accelerator
AWS Global Accelerator is a networking service that improves the availability and performance of your applications by using the **AWS internal global network**.

#### 1. How it Works (Anycast IP)
* **Static Anycast IPs:** It provides you with **2 static Anycast IP addresses**. 
* **Edge Routing:** When a user sends traffic to these IPs, they are routed to the nearest **AWS Edge Location**.
* **Internal Fast Lane:** From the Edge Location, the traffic travels over the optimized AWS private fiber network directly to your application endpoints in any AWS Region.
* **Deterministic Routing:** Because the IPs never change, there are no issues with client-side DNS caching (unlike standard DNS failover).

---

#### 2. Key Features for the SAA Exam
* **Supported Endpoints:** Works with Application Load Balancers (**ALB**), Network Load Balancers (**NLB**), **EC2 Instances**, and **Elastic IPs**.
* **Disaster Recovery:** It performs continuous **Health Checks**. If an application in one region becomes unhealthy, it automatically reroutes traffic to the next closest healthy region in **less than 1 minute**.
* **Security:**
	* Provides **DDoS protection** via AWS Shield.
    * Simplifies firewall management because you only need to whitelist **two static IPs** for your entire global infrastructure.
* **Performance:** Minimizes "hops" over the public internet, reducing latency and jitter.

---

#### 3. Global Accelerator vs. CloudFront
This is a classic SAA-C03 comparison. The choice usually comes down to the **protocol** and the **caching** requirement.

| Feature          | **CloudFront**                  | **Global Accelerator**              |
| :--------------- | :------------------------------ | :---------------------------------- |
| **Primary Goal** | **Content Caching** & Delivery. | **Network Path Optimization**.      |
| **Layer**        | Layer 7 (HTTP/HTTPS).           | Layer 4 (TCP/UDP) & Layer 7.        |
| **Caching**      | Caches content at the Edge.     | **No Caching** (Proxies traffic).   |
| **Best For**     | Static assets, Video, APIs.     | **Gaming (UDP)**, VoIP, IoT (MQTT). |
| **IP Address**   | Dynamic/Multiple IPs.           | **2 Static Anycast IPs**.           |

---

#### SAA Exam Scenario Guide

| If the requirement is...                                             | Use This Service       |
| :------------------------------------------------------------------- | :--------------------- |
| "Optimize a global **gaming** application using **UDP**."            | **Global Accelerator** |
| "Cache high-definition **video** files for global users."            | **CloudFront**         |
| "Provide a single entry point with **static IPs** for a global app." | **Global Accelerator** |
| "Speed up a **REST API** while reducing load on the origin."         | **CloudFront**         |
| "Enable **instant regional failover** for a non-HTTP app."           | **Global Accelerator** |

##### References
