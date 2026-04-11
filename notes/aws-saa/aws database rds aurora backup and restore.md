2026-03-14 15:06
Tags: #cloud/aws/databases 
##### Content
#### 1. RDS & Aurora Backups
Both services offer automated and manual backup options, but they handle retention differently.

**Automated Backups**
* **Mechanism:** A daily full snapshot is taken during a defined backup window. Transaction logs are backed up every **5 minutes**.
* **Point-in-Time Recovery (PITR):** You can restore to any second between the earliest retention point and 5 minutes ago.
* **Retention:**
	* **RDS:** 1 to 35 days (Set to 0 to disable).
	* **Aurora:** 1 to 35 days (**Cannot be disabled**).

**Manual Snapshots**
* **Trigger:** Manually initiated by the user.
* **Retention:** Stored indefinitely (even after the DB instance is deleted).
* **Cost Tip:** A stopped RDS instance still incurs storage costs. For long-term storage of a non-active DB, it is cheaper to **Snapshot & Delete**, then restore later.

#### 2. Restore Options
The most critical rule: **Restoring a backup or snapshot always creates a new Database instance** with a new DNS endpoint.

**Restoring from On-Premises (S3 Integration)**
* **RDS MySQL:** You can upload an on-prem backup file to S3 and restore it directly into a new RDS MySQL instance.
* **Aurora MySQL:** Requires using **Percona XtraBackup** to create the on-prem file. Once uploaded to S3, it can be restored into a new Aurora cluster.

#### 3. Aurora Database Cloning
Cloning is a "Cloud-Native" feature unique to Aurora that is significantly faster and more cost-effective than snapshot-and-restore.
* **Protocol:** Uses **Copy-on-Write (CoW)**.
* **Mechanism:**
	* Initially, the clone points to the **same storage volume** as the source. No data copying happens at the start, making it nearly instantaneous.
	* As data changes in either the source or the clone, Aurora allocates new storage for those specific changed blocks.
* **Use Case:** Perfect for creating a "Staging" or "Dev" environment from live Production data for testing without any performance impact on the production database.

#### 4. Comparison Summary

| Feature             | RDS                        | Aurora                           |
| ------------------- | -------------------------- | -------------------------------- |
| **PITR Interval**   | Every 5 minutes            | Every 5 minutes                  |
| **Disable Backups** | Yes (set to 0 days)        | **No**                           |
| **Cloning Support** | No (Snapshot/Restore only) | **Yes (Copy-on-Write)**          |
| **S3 Restore**      | MySQL supported            | MySQL supported (via XtraBackup) |
##### References
