2026-06-28 15:52
Tags: #terraform #ansible #kubernetes
##### Content

## Tool Categorization Matrix

Understanding where Terraform fits within the broader automation ecosystem dictates its proper usage alongside other tools like Ansible or Kubernetes.

| IaC Category | Primary Purpose | Example Tooling | Target Environment |
| --- | --- | --- | --- |
| **Ad-Hoc Scripts** | One-off automation or glue logic | Bash, Python | Local / CI/CD pipelines |
| **Configuration Management** | OS-level configuration, package installation | Ansible, Puppet, Chef | On-Premise / Long-lived VMs |
| **Server Templating** | Baking static machine images | Packer, AWS AMI | Immutable infrastructure |
| **Orchestration** | Managing container lifecycles and networking | Kubernetes, Docker Swarm | Containerized microservices |
| **Provisioning** | Bootstrapping underlying cloud infrastructure | Terraform, Pulumi, CloudFormation | Cloud APIs (AWS, GCP, Azure) |

Provisioning tools are further split into **Cloud-Specific** (AWS CloudFormation, Azure Resource Manager) and **Cloud-Agnostic** (Terraform, Pulumi). Terraform interacts with almost any API via provider plugins while maintaining a consistent configuration language (HCL).

##### References
