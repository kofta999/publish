2026-06-28 16:01
Tags: #terraform 
##### Content

## The State File (`.tfstate`)

The state file is a JSON map of the deployed infrastructure. It maps the HCL configuration blocks to real-world cloud resource IDs.

* **Security Constraint:** The state file records all provider outputs in plain text, including sensitive variables, generated passwords, and private keys.

## Local vs. Remote Backends

* **Local Backend:** The default. Stores `terraform.tfstate` directly on the local disk. It is uncollaborative, manual, and poses a severe security risk if committed to version control.
* **Remote Backend:** Stores the state in object storage (e.g., S3) or Terraform Cloud. It encrypts sensitive data at rest, enables CI/CD automation, and allows team collaboration through state locking (preventing simultaneous `apply` executions).

## Remote Backend Implementations

### Terraform Cloud Backend

Free for small teams (up to 5 users). Handles state locking and execution environments natively.

```python
terraform {
  backend "remote" {
    # The Terraform Cloud organization identifier
    organization = "my-org-name"
    
    workspaces {
      # The specific workspace mapping to this state
      name = "production-network-workspace"
    }
  }
}

```

### AWS S3 Backend & The Evolution of Native Locking

Historically, S3 backends required a DynamoDB table to handle locking because S3 operated under **[[Eventual Consistency]]**. In December 2020, AWS introduced strong read-after-write consistency for S3. Later, in August 2024, AWS introduced conditional writes using the `If-None-Match: *` header. This header instructs the S3 API to reject a PUT request if the file already exists. Starting in Terraform v1.10, enabling `use_lockfile = true` leverages this API feature to write a `.tflock` file directly to the bucket. If the file exists (meaning another engineer is running `apply`), the API rejects the write, natively locking the state without the architectural overhead of DynamoDB.

```python
terraform {
  backend "s3" {
    # The target S3 bucket to house the state file
    bucket = "my-company-tf-state"
    
    # The file path inside the bucket
    key    = "networking/prod/terraform.tfstate"
    
    # Target AWS region
    region = "us-east-1"
    
    # Forces S3 to encrypt the state file at rest
    encrypt = true

    # LEGACY LOCKING (Pre-v1.10): Points to a DynamoDB table for lock leases
    dynamodb_table = "terraform-state-lock"

    # MODERN LOCKING (v1.10+): Bypasses DynamoDB to lock directly via S3 metadata
    use_lockfile = true
  }
}
```


##### References
