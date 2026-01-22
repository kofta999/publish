2025-02-12 13:25
Tags: #cloud/aws
##### Content
They're servers that redirect forward internet traffic to multiple servers (EC2) instances

### Uses
- Spread load across multiple machines
- Expose a single point of access to your app
- Seamlessly handle instance failures
- Do regular health checks to instances
- Provide SSL termination
- Enforce instance stickiness with cookies
- High availability across zones
- Separate public traffic from private one

### Why ELB
- It's managed (AWS guarantees it's working, will take care of upgrades, simple config)
- More expensive than your own LB but less effort
- Integrated with many AWS services

### Types
- Classic (v1 - 2009) (deprecated in 2023, supported L4 and L7)
- Application (v2 - 2016) (Layer 7 - HTTP)
- Network (v2 - 2017) (Layer 4 - TCP)
- Gateway (Layer 3)

#### L7 ELB
- Balances to multiple HTTP apps across machines (target groups)
- Balances to multiple apps on the same machine (Docker / ECS)
- Balances based on route / hostname in URL
- Has port mapping (redirect to dynamic ports, sticky sessions)
- Stickiness can be enabled at target group level (managed
- App doesn't see client IP directly, `X-forwarded-[For | Port | Proto]` headers

#### L4 ELB
- Forward TCP traffic
- Handle millions of reqs/sec
- Support static or elastic (dynamic) IP
- Less latency (~100ms  vs ~400ms for L7 ELB)

##### Notes
- All LBs have a static host name
- LBs can scale but not instantaneously, contact AWS for a "warm-up"

##### References
https://youtu.be/qpHLRc4Qt1E