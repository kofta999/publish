2026-03-25 14:12
Tags: #cloud/aws/networking 
##### Content
### Security Groups
Security Groups act as a fundamental firewall to control inbound and outbound traffic, operating directly at the **EC2 instance level**.

*   **Statefulness:** Security Groups are **stateful**. This means if you allow an incoming request, the return traffic is automatically allowed out, regardless of any outbound rules.
*   **Default Behavior:** By default, **all inbound traffic is blocked** and **all outbound traffic is authorized**.
*   **Rules:** They only contain **allow rules** (you cannot explicitly deny a specific IP using a Security Group). You can reference specific IP ranges (CIDR) or even **other Security Groups** in your rules. 
*   **Evaluation:** When deciding whether to allow traffic, a Security Group evaluates **all rules**.
*   **Troubleshooting:** If an application is inaccessible and you receive a **"time out"** error, it is a Security Group issue. If you get a "connection refused" error, the traffic made it past the Security Group, but there is an application error or the service is not running.


### Network Access Control Lists (NACLs)
NACLs act as a firewall that controls traffic from and to **subnets**. 

*   **Statefulness:** NACLs are **stateless**. This means return traffic must be explicitly allowed by the rules. For example, if a client connects to a web server on port 443, the response must be allowed out on an **Ephemeral Port** (a high port range like 1024-65535, depending on the OS).
*   **Default vs. Custom:** Every subnet must have one NACL. The **Default NACL** allows all inbound and outbound traffic. However, a **newly created custom NACL** will deny everything by default. 
*   **Rules & Evaluation:** NACLs support both **allow and deny rules**. Rules are numbered (1-32766) and evaluated in order from lowest to highest. The **first rule match wins** and drives the decision. The last rule is always an asterisk (`*`) that denies the request if no previous rules matched.
*   **Use Case:** Because they support explicit deny rules, NACLs are a great way to **block specific IP addresses** at the subnet level before the traffic ever reaches your EC2 instances.


### Troubleshooting NACLs vs. Security Groups using VPC Flow Logs
You can use VPC Flow Logs to determine if a NACL or a Security Group is blocking your traffic by looking at the `action` field.
*   **Inbound REJECT:** Could be blocked by either the NACL or the Security Group.
*   **Inbound ACCEPT, Outbound REJECT:** The traffic made it in, but the response was blocked on the way out. Because Security Groups are stateful, this means the block occurred at the **NACL** (likely missing an ephemeral port allow rule).


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Block a specific, known malicious IP address from accessing your network." | **NACL (using an explicit DENY rule)** |
| "Allow EC2 instances in a Web Tier to exclusively communicate with a DB Tier." | **Security Groups (reference the Web Tier SG ID as the source in the DB Tier SG)** |
| "You opened port 80 inbound on a subnet, but clients are not receiving HTTP responses." | **Add an outbound NACL rule for Ephemeral Ports** |
| "Users are getting a 'connection timeout' error when trying to reach an EC2 instance." | **Check the inbound rules on the EC2 Security Group** |
| "Ensure return traffic from an allowed inbound request is automatically allowed back out." | **Security Group (because it is stateful)** |

##### References
