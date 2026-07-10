2026-03-14 15:14
Tags: #cloud/aws/databases 
##### Content
#### 1. Database Security
* **At-Rest Encryption:**
	* Encrypts the database, backups, and replicas using **AWS KMS**.
	* **Constraint:** Must be enabled at launch. If a DB is unencrypted, you must take a snapshot, copy the snapshot into an encrypted version, and restore it.
	* **Dependency:** If the Master is not encrypted, Read Replicas cannot be encrypted.
* **In-Flight Encryption:** Databases are TLS-ready by default. Use AWS TLS root certificates on the client side to secure the connection.
* **Identity & Access:**
	* **IAM Database Authentication:** Use IAM roles/policies to connect to your DB instead of traditional passwords. Great for managing permissions centrally.
	* **Security Groups:** The primary network "firewall." Controls which CIDR blocks or Security Groups (e.g., your Web Server SG) can talk to the DB port.

* **Visibility & Access:**
	* **Audit Logs:** Can be enabled to track user activity and sent to **CloudWatch Logs** for long-term retention.
	* **No SSH:** You cannot SSH into standard RDS/Aurora instances. **RDS Custom** (for Oracle and SQL Server) is the only exception where you get OS-level access.

#### 2. Amazon RDS Proxy
RDS Proxy is a managed database proxy that sits between your application and your database to handle high-volume, transient connections.

* **Connection Pooling:** Instead of every application instance opening a unique connection, the Proxy pools and shares them. This reduces CPU/RAM stress on the DB and prevents "Too many connections" errors.
* **Faster Failover:** Reduces failover time by up to **66%** because the Proxy maintains the connection to the application while it switches to the new standby/replica behind the scenes.
* **Serverless & HA:** Highly available (Multi-AZ) and scales automatically.
* **Security Integration:** Securely stores credentials in **AWS Secrets Manager** and enforces **IAM Authentication**.
* **Access Rule:** RDS Proxy is **never publicly accessible**; it must be reached from within your VPC.

**Use Case:** Essential for **AWS Lambda** or other serverless functions that scale horizontally and could otherwise overwhelm a database with too many simultaneous connections.

#### 3. Summary of Security & Proxy Features

| Feature             | Primary Benefit           | Key Tool           |
| ------------------- | ------------------------- | ------------------ |
| **KMS Encryption**  | Data Protection (Rest)    | AWS KMS            |
| **IAM Auth**        | Passwordless access       | IAM Policies       |
| **RDS Proxy**       | Performance & Resilience  | Connection Pooling |
| **Secrets Manager** | Secure Credential Storage | RDS Proxy / Lambda |

##### References
