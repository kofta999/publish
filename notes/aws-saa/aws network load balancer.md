2026-03-11 17:19
Tags: #cloud/aws/networking 
##### Content

### Network Load Balancer (NLB)
- Forward TCP / UDP traffic
- Handle millions of reqs/sec
- Support static or elastic (dynamic) IP
- Less latency (~100ms  vs ~400ms for L7 ELB)
- Has **one static IP** per AZ, and supports assigning Elastic IP
- Health Checks support TCP, HTTP, HTTPS
#### Target Groups
- EC2 instances
- IP Addresses (must be private)
- [[aws application load balancer|ALB]] (use ALB features behind a static NLB IP)
##### References
