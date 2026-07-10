2026-03-22 12:53
Tags: #cloud/aws/compute #cloud/aws/messeging 
##### Content
You can trigger Lambda workflows based on database activity using two distinct methods:
### Invoking Lambda *from* RDS/Aurora
* **The Goal:** Trigger code based on **data changes** (e.g., a new row inserted in a table).
* **Supported:** Aurora MySQL and RDS PostgreSQL.
* **Setup:** The DB instance needs a **Resource-based Policy** and an **IAM Policy** to allow the `lambda:InvokeFunction` call.

### RDS Event Notifications
* **The Goal:** Monitor the **infrastructure** state (e.g., "DB Instance Created," "Failover Started").
* **Mechanism:** RDS sends events to **SNS** or **EventBridge**.
* **Note:** This does **not** provide information about the data inside the tables; it only tracks management events.

##### References
