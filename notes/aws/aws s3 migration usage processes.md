2025-02-16 13:56
Tags: #cloud/aws
##### Content

### **S3 Migration**
- **Process**: Involves planning, data transfer, and validation.
- **Steps**:
  - Assess storage needs and plan migration strategies.
  - Choose methods based on data volume, speed, and security.
  - Monitor and validate data transfer for integrity and completeness.

---

### **AWS Snow Family**
- **Usage Process**:
  1. Request Snowball devices via AWS Management Console.
  2. Install Snowball client or AWS OpsHub.
  3. Connect Snowball to servers and copy files.
  4. Return the device to AWS for data transfer to S3.
  5. AWS wipes the device for security.
- **AWS OpsHub**:
  - Simplifies Snow Family device management.
  - Enables file transfers, device monitoring, and launching AWS services (e.g., EC2, DataSync).

---

### **Snowball Pricing**
- **Storage Optimized**:
  - Service fee: $300–$500 per job (10-day usage).
  - Data transfer: Free import to S3; export costs vary by region.
  - Shipping and damage fees apply.
- **Compute Optimized**:
  - On-demand: $70/day (30-day minimum).
  - Commitment pricing: $29,200 (1-year) or $60,225 (3-year).
  - Data transfer and shipping fees similar to Storage Optimized.

---

### **Hybrid Cloud for Storage**
- **Hybrid Cloud Model**:
  - Combines on-premises and cloud infrastructure.
  - Useful for long migrations, security, compliance, or IT strategy.
- **S3 Integration**:
  - **AWS Storage Gateway** connects on-premises systems to S3.
  - **Use Cases**:
    - Disaster recovery, backup & restore, tiered storage.
  - **Gateway Types**:
    - File Gateway, Volume Gateway, Tape Gateway.

---

### **Key Takeaways**
- **S3 Migration**: Plan carefully, validate data, and ensure secure transfers.
- **Snow Family**: Use Snowball devices for large data transfers; OpsHub simplifies management.
- **Pricing**: Snowball costs vary by device type, usage, and region.
- **Hybrid Cloud**: Storage Gateway bridges on-premises and S3 for seamless integration.

##### References
