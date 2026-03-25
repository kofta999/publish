2025-02-04 17:16
Tags: #cloud/aws
##### Content
1. AWS Regions
	- It's a **cluster of data centers**
	- Each region is isolated and consists of multiple Availability Zones
	- Named like us-east-1, eu-west-3, etc
	- Most AWS services are region-scoped
	- Choosing a region depends on
		- Compliance: Data stays in region unless explicitly permitted
		- Proximity: minimize latency to customers
		- Service availability: not all services are available in every region
		- Pricing: varies by region

2. AWS Availability Zones
	- Designed to provide **high availability and fault tolerance**
	- Separates data centers physically with independent power, cooling, networking
	- Applications deployed across multiple AZs are resilient to failures
	- Each region consists of multiple AZs (usually 3, min is 3, max is 6)
	- Named like: ap-southeast-2a, ap-southeast-2b, ap-southeast-2c
	- Connected by **high-bandwidth, low-latency networking**

3. AWS Data Centers
	- Managed by AWS staff
	- Restricted Access to authed personnel
	- Compliant with industry standards for security
	- Features
		- **Security**: Equipped with advanced security measures to protect data and infrastructure.
		- **Scalability:** Designed to easily scale resources to meet growing demands.
		- **Redundancy:** Built with redundant power and cooling systems to ensure uptime.
		- **Compliance:** Adhere to strict compliance standards for data privacy and security.
		- **Energy Efficiency:** Utilize green technologies to minimize environmental impact.

4. AWS Points of Presence
	- Amazon has 400+ Points of Presence
		- 400+ Edge Locations & 10+ Regional Caches
		- Spread across 90+ cities in 40+ countries
	- Ensures lower latency for content delivery to end users

##### References
https://app.manara.tech/learning/6/19/classroom