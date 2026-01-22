2025-02-06 15:55
Tags: #cloud #cloud/aws 
##### Content
It's a set of guidelines to run heavy workloads in cloud.
Describes key concepts, design principles, and architectural best practices for designing and running heavy workloads in the cloud

Made to:
1. Avoid common pitfalls
2. Decrease risk
3. Make sure that apps are well architectured in cloud

Consists of 6 main pillars:

1. **Operational excellence**
	- Focuses on running and monitoring systems
	- Continually improving processes and procedures 
	- Performing operations as code (IaC) where workload is a piece of software
	- Use frequent, small reversible changes instead of big ones
	- Anticipate and learn from failures

2. **Security**
	- Protecting data, systems, assets
	- Ensures confidentiality of data
	- Identity and access management
	- Controls to detect threats
	- Encryption in transit and at rest

3. **Reliability**
	- Recovery from disruptions
	- Auto recovery from failure
	- Using automation for recovery
	- Test recovery procedures by simulating failure
	- Horizontally scale by spreading workload across multiple resources
	- Stop guessing capacity and use exact resourced we need
	- Automation of infrastructure changes

4. **Performance Efficiency**
	- Focuses on structured and streamlined allocation of IT and computing resources
	- Pick the right tool for the job
	- Go global in minutes
	- Key topics:
		- Selecting resource types and sizes optimized for workload requirements
		- Monitoring performance
		- Maintaining efficiency as business needs evolve

5. **Cost Optimization**
	- Cloud financial management
	- Avoiding unnecessary costs
	- Using the right type of resources
	- Making cost-effective decisions
	- Measure efficiency (ex. 50~80% CPU util)
	- Analyze and attribute expenditures (ex. an account for each app in a big org)

6. **Sustainability**
	- Minimizing environmental impact of running cloud workloads
		- Key topics:
			- Shared responsibility model for sustainability
			- Understanding impact
			- Maximizing utilization to minimize required resources and reduce downstream impacts

##### References
[[aws well adopted fw]]
https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc&wa-guidance-whitepapers.sort-by=item.additionalFields.sortDate&wa-guidance-whitepapers.sort-order=desc
https://youtu.be/5odtVlORq_w