2025-02-21 13:52
Tags: #cloud/aws
##### Content
Policies consist of a header and an array of statements

```json
{
	"Version": "2012-10-17", // Latest policy version, always set
	"Id": "", // Optional identifier
	"Statement": [
		{
		"Sid": "", // Optional identifier
		"Effect": "Allow | Deny",
		"Principal": "", // Target account, user or role
		"Action": [], // List of actions the policy will "Effect" on
		"Resource": [], // List of resources the policy will "Effect" on
		"Condition": [], // Optional conditions to apply the policy
		},
		...
	]
}
```

##### References
