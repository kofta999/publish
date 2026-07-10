2026-06-28 16:14
Tags: #terraform
##### Content

## Core Concept

A `data` block requests Terraform to read from a given data source and export the result under the given local name. It acts as a read-only API call executed during the `plan` phase, ensuring the configuration has the most up-to-date information before making any changes.

---

## 1. Cloud Environment Introspection

Hardcoding values like AWS Account IDs, current regions, or specific Machine Image IDs makes code brittle and non-portable across environments. Data sources dynamically fetch this context at runtime.

```hcl
# Fetches the active AWS Region the provider is currently executing against
data "aws_region" "current" {}

# Fetches the Account ID, User ID, and ARN of the credentials executing Terraform
data "aws_caller_identity" "current" {}

# Dynamically queries the AWS API to find the latest Amazon Linux 2023 AMI.
# Eliminates the need to constantly update hardcoded AMI IDs when AWS patches them.
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_instance" "web" {
  # References the dynamic AMI lookup and the dynamic Account ID
  ami  = data.aws_ami.amazon_linux.id
  tags = {
    OwnerAccount = data.aws_caller_identity.current.account_id
  }
}

```

---

## 2. Cross-Workspace State Sharing

When you split infrastructure into separate state files (e.g., separating the Networking baseline from the Application layer to reduce blast radius), the Application layer needs a way to know the Networking layer's Subnet IDs.

The `terraform_remote_state` data source reads the state file of an entirely different Terraform configuration and exposes its `output` variables.

```hcl
# Reads the state file of the 'network' workspace stored in an S3 backend
data "terraform_remote_state" "network" {
  backend = "s3"
  
  config = {
    bucket = "my-company-tf-state"
    key    = "core-network/terraform.tfstate"
    region = "us-east-1"
  }
}

resource "aws_instance" "app" {
  ami       = "ami-123456"
  # Pulls the Subnet ID output dynamically from the separate network state
  subnet_id = data.terraform_remote_state.network.outputs.private_subnet_id
}

```

---

## 3. Safe Configuration Generation (JSON)

Writing raw JSON strings inside Terraform (especially for IAM policies) is highly prone to syntax errors (missing commas, quote escaping issues). Provider-specific data sources construct these configurations programmatically.

```hcl
# Constructs an AWS IAM Policy Document safely using HCL blocks.
# Terraform handles all JSON formatting, escaping, and validation automatically.
data "aws_iam_policy_document" "s3_read" {
  statement {
    actions   = ["s3:GetObject", "s3:ListBucket"]
    resources = ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_policy" "example" {
  name   = "s3-read-policy"
  # Renders the data block into a strict, validated JSON string
  policy = data.aws_iam_policy_document.s3_read.json
}

```

---

## 4. External Integrations & HTTP Queries

Data sources can step outside the primary cloud provider to fetch configuration data from external REST APIs, local files, or even custom bash/python scripts.

```hcl
# Reads a local file on the filesystem into a Terraform string
data "local_file" "ssh_key" {
  filename = "${path.module}/keys/id_rsa.pub"
}

# Executes an HTTP GET request to an external API endpoint
data "http" "my_public_ip" {
  url = "https://ipv4.icanhazip.com"
}

# Executes a custom local script and parses its JSON output.
# Used when Terraform lacks a native provider for a specific internal tool.
data "external" "custom_tool" {
  program = ["python3", "${path.module}/fetch_internal_data.py"]
  
  query = {
    environment = var.env
  }
}

resource "aws_security_group_rule" "allow_local_dev" {
  type              = "ingress"
  # Injects the dynamic IP fetched from the HTTP data source
  cidr_blocks       = ["${chomp(data.http.my_public_ip.response_body)}/32"]
}

```

> **Execution Constraint:** Data blocks are evaluated during the `terraform plan` phase. If a data block relies on a resource that hasn't been created yet (e.g., you are trying to query the API of an instance you are spinning up in the same apply), the plan will fail unless you explicitly enforce sequencing using `depends_on`, or implicitly reference the resource attributes directly instead of using a data lookup.

##### References
