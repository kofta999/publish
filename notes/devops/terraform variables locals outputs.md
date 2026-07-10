2026-06-28 16:09
Tags: #terraform 
##### Content

## Variable Classifications

Terraform utilizes three distinct scoping mechanisms to handle dynamic data.

* **`variable` (Input):** Analogous to function arguments. These are parameters passed into a Terraform module or root configuration at runtime. Referenced via `var.<name>`.
* **`locals` (Internal):** Analogous to standard code variables. Used to execute functions, combine input variables, or eliminate repeating hardcoded strings strictly within the current module. Referenced via `local.<name>`.
* **`output` (Return):** Analogous to function return values. Emits data to the CLI stdout after an apply, or passes data from a child module up to the root calling module.

## Input Resolution Precedence

If an input variable lacks a hardcoded `default` value, Terraform resolves it by searching the following sources. The highest rank overrides all lower ranks.

| Rank          | Source / Flag         | Execution Behavior                                                                                        |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------- |
| `1 (Lowest)`  | Default Value         | `default = "t2.micro"` inside the variable declaration block.                                             |
| `2`           | Environment Variables | Variables prefixed with `TF_VAR_` (e.g., `export TF_VAR_instance_type="t3.small"`).                       |
| `3`           | `terraform.tfvars`    | The default, auto-loaded variable definition file in the working directory.                               |
| `4`           | `*.auto.tfvars`       | Any file matching this pattern is automatically loaded, overriding the standard `tfvars` file.            |
| `5 (Highest)` | CLI Flags             | Explicitly passing `-var="instance_type=t3.large"` or `-var-file="prod.tfvars"` during `plan` or `apply`. |

## Typing Constraints

Terraform employs strict automatic type checking.

* **Primitives:** `string`, `number`, `bool`.
* **Complex/Structural:** `list` (ordered), `set` (unordered, unique), `map` (key-value pairs of the same type), `object` (key-value pairs of differing types), `tuple` (fixed-length arrays of differing types).

Custom validation rules can be enforced inside the variable block to catch invalid inputs during the `plan` phase before API calls are made.


##### References
