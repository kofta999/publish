2026-03-11 16:54
Tags: #cloud/aws/networking 
##### Content
### Application Load Balancer (ALB)
- Balances to multiple HTTP apps across machines (target groups)
- Balances to multiple apps on the same machine (Docker / ECS)
- Routing tables based on
	- **Path** (`example.com/users` `example.com/posts`)
	- **Hostname** (`one.example.com` `two.example.com`)
	- **Query String, Headers** (`example.com/users?id=123&order=false`)
- Great for microservices and container-based apps
- Has port mapping (redirect to dynamic ports, sticky sessions)
- Supports redirects (e.g. HTTP to HTTPS)
- Stickiness and health checks can be enabled at target group level (managed)
- App doesn't see client IP directly, `X-forwarded-[For | Port | Proto]` headers

#### Target Groups
- EC2 Instances (managed by [[aws auto scaling groups|ASG]])
- ECS tasks (managed by [[aws ecs fargate and ecr#Elastic Container Service (ECS)|ECS]])
- [[aws lambda|Lambda]] Functions (HTTP requests translated into JSON events)
- IP Addresses - must be private IPs

##### References
