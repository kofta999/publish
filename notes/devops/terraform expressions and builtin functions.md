2026-06-28 16:11
Tags: #terraform 
##### Content
Terraform includes a robust programmatic expression engine to manipulate data on the fly.

* **Template Strings:** `${var.environment}-web-server`
* **Ternary Operators:** `var.is_prod ? "t3.large" : "t2.micro"`
* **Splat Expressions:** Extracting a list of specific attributes from an array of objects. `var.subnets[*].id` extracts only the IDs into a new list.
* **Dynamic Blocks:** Used to programmatically generate nested configuration blocks (like multiple `ingress` rules in a Security Group) from an iterable list/map without duplicating code.

**Function Categories:**
Terraform does not support user-defined functions, but ships with extensive built-in capabilities:

* *Numerics / Strings:* `max()`, `split()`, `join()`, `replace()`
* *Collections:* `length()`, `merge()`, `flatten()`
* *Encoding / Crypto:* `base64encode()`, `md5()`, `rsadecrypt()`
* *Filesystem:* `file()`, `templatefile()`

##### References
