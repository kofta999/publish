2025-02-08 16:08
Tags: #cloud/aws/compute 
##### Content
Amazon Machine Image (AMI) is a customized EC2 instance
#### Features
- Can add your own software, OS, configs
- Faster boot / config time because its pre-packaged
- Built for a **specific region** (can be copied across regions)
- Can be launched from
	- **Public AMI:** AWS provided
	- **Your own AMI**: you make and maintain them yourself
	- **AWS Marketplace AMI:** Made by others

##### How to use
1. Start an EC2 instance
2. Customize it to your needs
3. Stop it to ensure data integrity
4. Build an AMI from the stopped instance (will also create EBS snapshots)
5. Launch new instances using the custom AMI

#### EC2 Image builder
- Used to automate creation of VMs and container images
- Automates creation, maintenance, validation and testing
- Can be scheduled
- Free service, charges only for underlying resources used

##### References
