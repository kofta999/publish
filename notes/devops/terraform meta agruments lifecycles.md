2026-06-28 16:12
Tags: #terraform 
##### Content

## Meta-Argument Engineering

Meta-arguments modify the core behavior of how Terraform provisions resources, bypassing standard dependency graphs or triggering loops.

* **`depends_on`:** Terraform normally infers execution order automatically (e.g., if an EC2 instance references a VPC ID, the VPC is created first). `depends_on` forces an explicit sequence when no direct reference exists in the code (e.g., an application running on an EC2 instance requires an S3 bucket to exist before booting).
* **`count`:** Creates identical copies of a resource. Access the current iteration index via `count.index` to differentiate names (e.g., `name = "web-${count.index}"`).
* **`for_each`:** Creates multiple resource copies based on an iterable `map` or `set` (lists must be cast to sets). Preferred over `count` because removing an item from the middle of a map doesn't trigger a cascading rebuild of all subsequent resources.

### Lifecycle Overrides

The `lifecycle` block intercepts Terraform's default provisioning behavior.

```python
lifecycle {
  # Provisions the replacement resource entirely before terminating the old one.
  # Critical for zero-downtime load-balancer deployments.
  create_before_destroy = true
  
  # Instructs Terraform to ignore specific manual changes made via the AWS Console 
  # or auto-generated metadata (like dynamic tags) so they aren't overwritten on apply.
  ignore_changes = [tags]
  
  # Hard-rejects any terraform plan that attempts to destroy this specific resource.
  prevent_destroy = true
}
```

##### References
