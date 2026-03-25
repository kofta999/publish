2026-03-25 14:24
Tags: #cloud/aws/networking 
##### Content
AWS VPC Peering allows you to privately connect two VPCs using the AWS network, making them behave as if they were in the same network.

#### VPC Peering Rules & Configuration
*   **CIDR Overlap:** The two VPCs you are peering **must not have overlapping CIDRs**.
*   **Non-Transitive:** VPC Peering is **NOT transitive**. If VPC A is peered with VPC B, and VPC B is peered with VPC C, VPC A *cannot* automatically communicate with VPC C. You must explicitly establish a peering connection between A and C for them to communicate.
*   **Route Tables:** Simply creating the connection is not enough. You **must update the Route Tables** in each VPC's subnets to direct the correct traffic to the peering connection.
*   **Cross-Account & Cross-Region:** You can establish peering connections between VPCs that belong to entirely different AWS accounts or are located in different AWS regions.
*   **Security Groups:** You can reference a Security Group from a peered VPC in your own Security Group rules (Note: this specific feature works cross-account, but they must be in the **same region**).


### SAA Exam "Scenario" Table

| If the requirement is... | Use This Strategy: |
| :--- | :--- |
| "Privately connect two VPCs located in different AWS accounts or regions." | **VPC Peering** |
| "Instances in newly peered VPCs cannot communicate with each other." | **Update the Route Tables in both VPC subnets** |
| "VPC A is peered to B, and B is peered to C. VPC A needs to access VPC C." | **Create a new, direct VPC Peering connection between A and C** *(Peering is not transitive)* |
| "Connect two VPCs that both use the `10.0.0.0/16` network." | **Not possible with VPC Peering** *(CIDRs cannot overlap)* |
| "Allow traffic from an EC2 instance in a peered VPC without maintaining lists of IPs." | **Reference the peered VPC's Security Group ID in your inbound rules** *(if in the same region)* |

##### References
