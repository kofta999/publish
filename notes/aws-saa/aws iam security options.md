2025-02-21 14:01
Tags: #cloud/aws/iam
##### Content
#### Password Policy
- Provided by AWS, enables you to
	- Specify a min length
	- Use different character types
	- Permit all users to change their passwords
	- Enforce password expiration
	- Prevent password reuse

#### Multi-Factor Authentication
- Adds an extra layer of security by using both passwords and a security devices
- Helps if the password is compromised
- Types
	- **Virtual (phone):** Supports multiple tokens on single device
	- **Universal 2nd Factor U2F (e.g. YubiKey):** Supports multiple root and IAM users using a single key

#### Access Keys
- AWS can be accessed in 3 ways
	1. AWS Management Console (password + MFA)
	2. AWS CLI (access keys)
	3. AWS SDK (access keys)
- Access Keys are generated via AWS Management Console
- Are treated as secrets, never share them
- Access Key ID -> username
- Secret Access Key  -> password

#### Service Roles
- Some AWS services require permission to perform actions on your behalf
- Common roles include: EC2 instances, Lambda functions, CloudFormation roles

#### Security Tools
- **IAM Credentials Report (account-level):**
	- Provides a comprehensive list of all users in your AWS account and the status of their various credentials
- **IAM Last Accessed (user-level):**
	- Previously named as **Access Advisor**
	- Displays the service permissions granted to an IAM user and when those services were last accessed
	- Used to revise policies for Principle of Least Privilege 

##### References
