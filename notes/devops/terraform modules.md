2026-06-28 16:15
Tags: #terraform 
##### Content
Modules are self-contained packages of Terraform configurations used to abstract complex infrastructure into reusable, logical components.

* **Root Module:** The default execution context. It consists of all the `.tf` files living directly in the current working directory where `terraform apply` is executed.
* **Child Module:** An external module called by the root module to provision specific infrastructure blocks.

## Instantiating a Module

Input variables are passed directly into the `module` block.

```python
module "secure_database" {
  # Source can be a local path, Git repository, S3 bucket, or Terraform Registry URL
  source = "git::https://github.com/my-org/tf-modules.git//rds?ref=v1.2.0"
  
  # Input variables defined in the child module's variables.tf
  db_name       = "production-db"
  instance_size = "db.r5.large"
}
```

## Module Engineering Guidelines

* **Abstraction:** Raise the abstraction layer. Don't write a module that just wraps a single `aws_instance`. Write a module that deploys an auto-scaling web tier (ASG, ALB, Security Groups) together.
* **Customization:** Expose necessary configuration hooks via variables, but provide sensible defaults to keep the module easy to use.
* **Integration:** Return critical IDs and ARNs via `output` blocks so the root calling module can pass them into other resources.

##### References
