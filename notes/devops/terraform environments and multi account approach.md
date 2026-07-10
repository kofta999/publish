2026-06-28 16:16
Tags: #terraform 
##### Content
Managing multiple deployment environments (Dev, Staging, Prod) requires strict isolation to prevent accidental cross-contamination.

## Strategy 1: Terraform Workspaces

Workspaces allow multiple named state sections to exist within a single remote backend definition. Executed via `terraform workspace select prod`.

* **Pros:** Highly convenient. Minimal code duplication. You can use `terraform.workspace` natively in expressions (e.g., `name = "app-${terraform.workspace}"`).
* **Cons:** High risk of human error. Executing an apply in the wrong workspace is a frequent cause of outages. The state files are stored in the exact same backend bucket, meaning a compromised backend compromises all environments.

## Strategy 2: File Structure Isolation (Recommended)

Each environment gets its own dedicated directory layout, utilizing its own discrete backend configuration and root module. Code reuse is achieved by calling shared child modules.

* **Pros:** Absolute isolation. `prod` and `staging` state files can live in entirely different AWS accounts with separate IAM permissions. The codebase visually represents the physical deployment.
* **Cons:** Requires running `apply` in multiple directories. Slightly more code duplication (the `main.tf` in `prod` and `staging` might look very similar).

### Terragrunt Integration

**Terragrunt** is a thin wrapper designed to solve the duplication issues of File Structure isolation. It allows you to keep infrastructure DRY (Don't Repeat Yourself) by defining remote state and module inputs once in an `hcl` file, and dynamically generating the Terraform configurations across hundreds of directories.


## Multi-Account Architectures

Deploying different environments into entirely separate cloud accounts is the enterprise standard.

* **Blast Radius Isolation:** If the Development account is compromised or hits API rate limits, the Production account is entirely unaffected.
* **IAM Simplification:** You do not need to build complex IAM policies denying `DevRole` from touching `ProdVPC`. The environments are physically separated at the billing/account boundary.
* **Naming Conflicts:** Eliminates the need to suffix every resource with `-prod` or `-dev` to avoid global namespace collisions (like S3 bucket names).

##### References
