2026-03-24 22:50
Tags: #cloud/aws/dr
##### Content
When migrating existing databases to Amazon Aurora, AWS provides specific strategies depending on whether the source database is currently managed by RDS or hosted externally (e.g., on-premises or on EC2).

#### RDS to Aurora Migrations
If your source database is already running on Amazon RDS (MySQL or PostgreSQL), you have two primary options:
*   **Option 1 (DB Snapshot):** Take a DB Snapshot of your existing RDS instance and restore it directly as a new Aurora DB cluster.
*   **Option 2 (Aurora Read Replica):** Create an Aurora Read Replica directly from your existing RDS database. Once the replication lag drops to zero, you promote the replica to become its own standalone Aurora DB cluster. *Note: This method allows for minimal downtime but can take more time and incur additional costs.*

#### External Database to Aurora Migrations
If your source database is hosted externally, the native backup strategies differ slightly by engine:
*   **External MySQL to Aurora MySQL:**
    *   **S3 Backup (Faster):** Use **Percona XtraBackup** to create a file backup, store it in Amazon S3, and restore it directly into a new Aurora MySQL DB cluster.
    *   **Native Tools:** Create a new Aurora DB and use the `mysqldump` utility to migrate the data (note that this is slower than the S3 method).
*   **External PostgreSQL to Aurora PostgreSQL:**
    *   **S3 Backup:** Create a database backup, upload it to Amazon S3, and import it into Aurora using the `aws_s3` Aurora extension.

*   **AWS Database Migration Service (DMS):** For both MySQL and PostgreSQL, you can use AWS DMS to perform the migration and continuous replication, provided both the source and target databases are up and running.

### SAA Exam "Scenario" Table

| If the requirement is...                                                                                   | Use This Strategy:                                                                |
| :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| "Migrate an existing RDS MySQL or PostgreSQL database to Aurora with near-zero downtime."                  | **Create an Aurora Read Replica from the RDS DB, wait for 0 lag, and promote it** |
| "Quickly migrate an external, on-premises MySQL database to Aurora using a backup file."                   | **Use Percona XtraBackup to S3, then restore to Aurora**                          |
| "Migrate an on-premises PostgreSQL database to Aurora using an S3 backup."                                 | **Import the S3 backup using the `aws_s3` Aurora extension**                      |
| "Perform an online, live data migration from an EC2 database to Aurora without taking the source offline." | **AWS DMS (Database Migration Service)**                                          |

##### References
