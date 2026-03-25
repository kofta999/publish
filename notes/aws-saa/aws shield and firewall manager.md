2026-03-24 14:53
Tags: #cloud/aws/security 
##### Content
AWS Shield and AWS Firewall Manager work together with AWS WAF to provide comprehensive security against DDoS attacks and centralize rule management.

#### AWS Shield (DDoS Protection)
Protects against **Distributed Denial of Service (DDoS)** attacks, which occur when an application is maliciously overwhelmed with simultaneous requests.

*   **Shield Standard:**
    *   **Free** and automatically activated for every AWS customer.
    *   Protects against common **Layer 3 and Layer 4** attacks (e.g., SYN/UDP Floods, Reflection attacks).
*   **Shield Advanced:**
    *   **Paid service** ($3,000 per month per organization).
    *   Protects **EC2, ELB, CloudFront, Global Accelerator, and Route 53** against more sophisticated attacks.
    *   Grants 24/7 access to the **Shield Response Team (SRT / DRP)**.
    *   **Cost Protection:** Protects against higher AWS fees caused by resource usage spikes during a DDoS attack.
    *   **Layer 7 Mitigation:** Automatically evaluates, creates, and deploys **AWS WAF rules** to mitigate application-layer DDoS attacks.

#### AWS Firewall Manager
A security management service that allows you to centrally configure and manage firewall rules across all accounts in your **AWS Organization**.

*   **Security Policies:** You create a common set of security rules applied at the **Region level**.
*   **Supported Protections:**
    *   AWS WAF rules (ALB, API Gateways, CloudFront)
    *   AWS Shield Advanced (ALB, CLB, NLB, Elastic IP, CloudFront)
    *   Security Groups (EC2, ALB, and ENI resources in VPC)
    *   AWS Network Firewall (VPC Level)
    *   Amazon Route 53 Resolver DNS Firewall
*   **Automated Compliance:** Rules are automatically applied to **new resources and future accounts** as they are created, ensuring a consistent security posture.

#### WAF vs. Shield vs. Firewall Manager
These services are designed to be used together for comprehensive protection.
*   **AWS WAF alone:** Best for granular protection of specific resources against Layer 7 web exploits.
*   **Shield Advanced:** Choose this if you are prone to frequent DDoS attacks and need dedicated support (SRT) or advanced reporting.
*   **Firewall Manager + WAF:** Choose this if you need to enforce AWS WAF rules **across multiple accounts**, accelerate configuration, or automate the protection of new resources.

---

### SAA Exam "Scenario" Table

| If the requirement is...                                                                        | Use This Strategy:                               |
| :---------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| "Protect an application against basic Layer 3/Layer 4 SYN/UDP floods at no additional cost."    | **AWS Shield Standard**                          |
| "Get 24/7 expert support during a severe DDoS attack and avoid unexpected scaling charges."     | **AWS Shield Advanced**                          |
| "Apply a standard set of WAF rules to every new Load Balancer created across all AWS accounts." | **AWS Firewall Manager**                         |
| "Protect a specific API Gateway from SQL Injection and Cross-Site Scripting."                   | **AWS WAF**                                      |
| "Automatically block sophisticated Layer 7 DDoS attacks without manually writing rules."        | **AWS Shield Advanced (auto-deploys WAF rules)** |

##### References
