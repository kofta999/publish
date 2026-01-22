2025-02-12 14:20
Tags: #cloud/aws
##### Content
### Goals
- Scale out (add EC2 instances) to handle increased load
- Scale in (remove EC2 instances) to reduce excess capacity
- Maintain a specified minimum and maximum number of instances
- Automatically register new instances with a load balancer
- Replace unhealthy instances to ensure reliability

### Scaling Strategies
- Manual Scaling
- Dynamic Scaling
	- Simple / Step Scaling: Add or remove # of instances when a CloudWatch alarm is triggered
	- Target Tracking Scaling: Adjust # of instances to maintain a target metric (e.g. 40% ASG CPU)
	- Scheduled Scaling: Plan for scaling actions on known usage patterns
	- Predictive Scaling: Utilizes machine learning to forecast future traffic and provision appropriate # of instances

##### References
