2026-06-28 16:17
Tags: #terraform 
##### Content
Before deploying infrastructure, configurations should be passed through static analysis pipelines to catch syntax errors, deprecated functions, and security vulnerabilities.

## Built-in Terraform Tools

* **`terraform fmt`:** Automatically rewrites configuration files to a canonical format and style. Standard practice in pre-commit hooks.
* **`terraform validate`:** Checks whether the configuration is syntactically valid and internally consistent (e.g., ensuring referenced variables actually exist), without accessing remote state or APIs.
* **`terraform plan`:** The ultimate dry-run. Validates the configuration against the actual cloud provider API constraints.

## Third-Party & Enterprise Security Tools

* **`tflint`:** A Terraform linter focused on finding provider-specific errors (e.g., requesting an EC2 instance type that is not available in the target AWS region) before the `apply` phase.
* **`tfsec (now inside trivy)` / `checkov` / `terrascan`:** Security scanners that parse HCL code against cloud security benchmarks. They block CI/CD pipelines if misconfigurations (like an unencrypted S3 bucket or open SSH port) are detected.
* **Terraform Sentinel:** HashiCorp's enterprise Policy-as-Code framework. Enforces strict organizational guardrails (e.g., "Instances can only be deployed between 9 AM and 5 PM" or "Max spend cannot exceed $500").

---

# Native Testing Frameworks

Historically, testing Terraform required heavy external tools like `terratest` written in Go, or brittle bash scripts executing `curl` commands against deployed load balancers. Terraform now supports robust native testing.

## `.tftest.hcl` Files

Terraform allows you to write integration and unit tests using standard HCL syntax. These tests execute temporary infrastructure, run assertions, and then destroy the resources automatically.

* **Unit Testing:** Validates that complex variable calculations or dynamic blocks render correctly.
* **Integration Testing:** Provisions real infrastructure to verify outputs.
* **Cloud Mocking:** Terraform can mock cloud provider responses natively, allowing `.tftest.hcl` tests to execute in milliseconds without making real API calls or incurring cloud costs.

## Continuous Assertion (`check` blocks)

The `check` block defines assertions that Terraform validates continuously during every `plan` and `apply` operation.

Unlike standard `lifecycle` validation (which only validates data types), `check` blocks can reach out and verify real-world conditions.

```python
check "health_check" {
  # Validates that the deployed load balancer is actually returning a 200 OK
  # before considering the Terraform apply completely successful.
  
  data "http" "website" {
    url = aws_lb.front_end.dns_name
  }

  assert {
    condition     = data.http.website.status_code == 200
    error_message = "The website responded with an HTTP error status."
  }
}

```

##### References
