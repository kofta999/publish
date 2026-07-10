2026-06-28 16:19
Tags: #terraform 
##### Content
State drift occurs when the physical reality of the cloud provider diverges from the `.tfstate` file and the `.tf` configuration files.

## Resolution Matrix

| Scenario | State File Condition | Terraform Action | Resolution Pipeline |
| :--- | :--- | :--- | :--- |
| **Deleted in Cloud API** | *Still in state file* | `plan` throws a 404 (Resource Not Found) and halts. | Use `terraform state rm <resource>` to untrack it, OR manually recreate it and run `terraform import <id>`. |
| **Deleted in Cloud API** | *Not in state file* | Terraform assumes it never existed. | Terraform will naturally recreate the resource during the next `apply`. |
| **Deleted in TF Config** | *Still in state file* | `plan` detects an orphaned state object. | `apply` will actively execute a `destroy` API call to delete the cloud resource. |
| **Created in Cloud API** | *Not in state file* | Terraform is completely blind to it. | Define an `import` block in config and run `terraform plan -generate-config-out=generated.tf`. |

### The Modern Import Block (v1.5+)

Instead of running imperative CLI commands, you can now define an import block directly in code. This makes the adoption of unmanaged resources declarative and reviewable in PRs.
Terraform

```python
import {
  # The target AWS Resource ID
  id = "i-1234567890abcdef0"
  
  # The Terraform resource address it should map to
  to = aws_instance.web_legacy
}
```
##### References
