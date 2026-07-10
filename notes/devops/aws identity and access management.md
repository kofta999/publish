2025-02-21 13:29
Tags: #cloud/aws
##### Content
IAM allows you to specify who or what can access services and resources in AWS.

Main parts
- Users: physical persons, can be in multiple groups
- Groups: group of users
- Roles: for internal usage within AWS resources

Policies are JSON documents to define all above
AWS follows least privilege principle

- One IAM per physical person
- One IAM role per app
- IAM creds should never be shared /  put in code
- Never use IAM root account except for initial setup

##### References
https://youtu.be/TH-0rEFHe-0