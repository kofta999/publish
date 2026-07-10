2025-12-28 18:37
Tags: #cloud/azure 
##### Content
### VM Generations (Gen 1 vs. Gen 2)

Azure supports two generations of Virtual Machine architecture. The choice is made at creation and is difficult to change later.

### Comparison Table
| Feature               | Generation 1          | Generation 2                        |
| :-------------------- | :-------------------- | :---------------------------------- |
| **Boot Architecture** | BIOS                  | UEFI                                |
| **Disk Interface**    | IDE (OS), SCSI (Data) | SCSI (All)                          |
| **OS Disk Limit**     | 2 TB                  | 64 TB                               |
| **Security**          | Standard              | Trusted Launch (vTPM + Secure Boot) |
| **Performance**       | Standard              | Faster boot and provisioning times  |

### Technical Constraints
* **Conversion:** You cannot easily "convert" a VM from Gen 1 to Gen 2. It requires creating a new VM and migrating data.
* **Compatibility:** Some older Linux distros or legacy Windows versions only support Gen 1. 
* **vTPM:** Required for features like BitLocker or Windows 11. This is exclusive to Gen 2.

##### References
[[compute]]