2026-03-22 12:52
Tags: #cloud/aws/compute 
##### Content
When you need to run code closer to the user to reduce latency, AWS offers two "Serverless at the Edge" solutions. 
### CloudFront Functions
* **Best for:** High-scale, simple JavaScript transformations (millions of requests/sec).
* **Execution Time:** Under **1 ms** (extremely lightweight).
* **Triggers:** Only **Viewer** Request and **Viewer** Response.
* **Constraints:** No network access, no file system access, and cannot access the HTTP request body.
* **Use Cases:** URL redirects, header manipulation, and cache key normalization.

### Lambda@Edge
* **Best for:** Complex logic requiring external libraries or AWS SDK access.
* **Execution Time:** 5–10 seconds.
* **Triggers:** Viewer Request/Response **AND** Origin Request/Response.
* **Capabilities:** Full access to the network, file system, and HTTP request body.
* **Use Cases:** A/B testing, user authentication (via external DB), and image resizing on the fly.


---

### SAA Exam "Cheat Sheet" Summary

| If the requirement is...                                  | Use This Service/Feature:   |
| :-------------------------------------------------------- | :-------------------------- |
| "Redirect users based on a cookie at the lowest cost."    | **CloudFront Functions**    |
| "Authenticate users against an external API at the Edge." | **Lambda@Edge**             |
| "Connect Lambda to a private Aurora cluster."             | **VPC Configuration + ENI** |
| "Prevent Lambda from exhausting DB connections."          | **RDS Proxy**               |
| "Trigger a Lambda whenever a DB snapshot is completed."   | **RDS Event Notifications** |

##### References
