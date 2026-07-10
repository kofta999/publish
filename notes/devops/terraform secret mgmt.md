2026-06-28 16:11
Tags: #terraform 
##### Content

## Legacy Approach (`sensitive = true`)

Tagging a variable with `sensitive = true` prevents Terraform from echoing the value to standard output (CLI logs) during `plan` or `apply`.

* **Constraint:** This does **not** encrypt the data. The plaintext secret is still written directly into the `terraform.tfstate` file. If using this, secrets must be injected via `TF_VAR_` environment variables or CI/CD pipelines to keep them out of Git.

## Modern Approach (`ephemeral = true`)

Newer Terraform versions introduce ephemeral variables.

* Tagging a variable or block as `ephemeral = true` instructs Terraform to process the value strictly in memory.
* The secret is **never** written to the `.tfstate` file. This is explicitly designed to integrate with dynamic secret stores like AWS Secrets Manager or HashiCorp Vault.


##### References
