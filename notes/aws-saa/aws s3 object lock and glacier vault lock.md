2026-03-20 10:55
Tags: #cloud/aws/storage 
##### Content
### S3 Object Lock & Glacier Vault Lock

For the SAA-C03 exam, these features are essential for scenarios involving **Compliance**, **Legal Holds**, and **WORM (Write Once, Read Many)** requirements. They ensure that once data is written, it cannot be deleted or modified for a specific period, even by an administrator.

---

#### 1. S3 Object Lock
Object Lock allows you to store objects using a WORM model. It is applied at the object-version level and requires **Versioning** to be enabled on the bucket.

* **Retention Modes:**
    * **Compliance Mode:** The strictest setting. No one, including the **AWS Root User**, can delete or overwrite the object version. The retention period cannot be shortened.
    * **Governance Mode:** Protects against most users, but specific users with the `s3:BypassGovernanceRetention` permission can still delete the object or alter the lock settings.
* **Retention Period:** Specifies a fixed amount of time (e.g., 7 years) that the object is protected. This period can be extended but not shortened in Compliance mode.
* **Legal Hold:**
    * Provides the same protection as a retention period but has **no expiration date**.
    * It stays in effect until explicitly removed.
    * Any user with the `s3:PutObjectLegalHold` permission can place or remove a legal hold.

---

#### 2. S3 Glacier Vault Lock
While Object Lock is for S3 buckets, Vault Lock is specifically for **S3 Glacier vaults**.

* **WORM Policy:** You define a Vault Lock policy (e.g., "deny delete if the archive is less than 365 days old").
* **The "Locking" Process:** Once you apply and "lock" the policy, it becomes **immutable**. It can no longer be changed or deleted by anyone.
* **Use Case:** Financial records or healthcare data that must be preserved for a specific number of years to meet government regulations.

---

#### SAA Exam "Compliance" Comparison

| Feature | Scope | Key Characteristic |
| :--- | :--- | :--- |
| **S3 Object Lock** | Object Version | Can be **Compliance** (Root can't delete) or **Governance**. |
| **Glacier Vault Lock** | Entire Vault | Policy is **Locked** and cannot be edited ever again. |
| **Legal Hold** | Object Version | **Indefinite** protection; manually added/removed. |

---

#### Summary of S3 Protection Layers
* **Versioning:** Protects against accidental deletes (can still be permanently deleted).
* **MFA Delete:** Requires a hardware/software code to permanently delete (Root account only).
* **Object Lock:** Prevents deletion entirely for a set time (even from the Root account in Compliance mode).

##### References
