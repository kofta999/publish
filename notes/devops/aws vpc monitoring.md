2025-02-14 22:22
Tags: #cloud/aws
##### Content
### VPC Flow Logs
- Provides info about IP traffic in network interfaces
- Can be used on a single or all ENIs in a VPC
- Publishable to S3 or CloudWatch and analyzed by AWS or Partner solutions
	- For CloudWatch you can use its logs / contributor insights to visualize
	- For S3 you can use Athena + QuickSight or Elastic Search + Kibana

#### Uses
- Visibility into traffic patterns or app dependencies
- Troubleshoot connectivity issues
- Detect security anomalies
- Compliance to regulations


### VPC Traffic Mirroring
- Used for deep packet inspection / inspecting payload
- Uses a dedicated monitoring instance

#### Components
- **Targets:** The destination for mirrored traffic
	- Load balancer or an ENI
	- Works cross VPC or account
- **Filters:** Set of rules that define the traffic to be copied
- **Sessions:** An entity that describes traffic mirroring from source to destination using filters

#### Features
1. Simplified native operation
2. Improve security (cannot be tampered because it copies from ENI itself)
3. Wide range for monitoring options


#### Monitoring Network Performance
- Use CloudWatch Metrics for analyzing network bytes
- EC2 instances has tools for monitoring packet loss, ...  like "ethtool"


### VPC Reachibility Analyzer
Uses:
- To Troubleshoot connectivity issues
- Ensure config matches intent
- Automated validation

##### References
https://youtu.be/Ed09ReWRQXc