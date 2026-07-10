2026-07-05 11:45
Tags: #interview #devops #cicd #kubernetes #linux #terraform #networking

# 101 DevOps Interview Questions & Answers

This document lists the 101 most commonly asked, tricky, or hard-to-remember general DevOps interview questions grouped by topic. Use this as a cheat-sheet during interview preparation.

---

## 📂 Table of Contents
1. [DevOps & CI/CD Fundamentals (#1 - #15)](#devops--cicd-fundamentals-1---15)
2. [Containerization & Docker (#16 - #30)](#containerization--docker-16---30)
3. [Container Orchestration & Kubernetes (#31 - #50)](#container-orchestration--kubernetes-31---50)
4. [Infrastructure as Code & Terraform (#51 - #65)](#infrastructure-as-code--terraform-51---65)
5. [Configuration Management & Ansible (#66 - #75)](#configuration-management--ansible-66---75)
6. [Linux, OS & Scripting Internals (#76 - #85)](#linux-os--scripting-internals-76---85)
7. [Networking & Security (#86 - #93)](#networking--security-86---93)
8. [Monitoring, Logging & Observability (#94 - #101)](#monitoring-logging--observability-94---101)

---

## 🚀 DevOps & CI/CD Fundamentals (#1 - #15)

### 1. What is DevOps?
DevOps is a cultural and professional movement that stresses communication, collaboration, integration, and automation between Software Developers (Dev) and IT Operations professionals (Ops) to deliver high-quality software faster and more reliably.

### 2. What are the key benefits of DevOps?
- **Velocity:** Faster time-to-market.
- **Reliability:** Automated testing and monitoring ensure high quality.
- **Scale:** Infrastructure-as-code simplifies managing scale.
- **Improved Collaboration:** Aligned incentives between Dev and Ops.
- **Security:** Integrated security policies (DevSecOps) with automated compliance.

### 3. What is SRE (Site Reliability Engineering) and how does it differ from DevOps?
- **DevOps** is a set of principles and practices focused on breaking down silos between development and operations.
- **SRE** is a concrete implementation of DevOps (often summarized as: *`class SRE implements DevOps`*). SRE applies software engineering principles to operations tasks, focusing heavily on reliability, automation, SLOs/SLAs, and error budgets.

### 4. What is CI (Continuous Integration)?
CI is the practice of merging all developer working copies of code to a shared mainline (repository) multiple times a day. Each merge triggers an automated build and test sequence to detect integration errors as early as possible.

### 5. What is CD (Continuous Delivery) vs. CD (Continuous Deployment)?
- **Continuous Delivery:** Code changes are automatically built, tested, and prepared for release to production. However, deployment to production requires manual approval.
- **Continuous Deployment:** Every code change that passes all stages of the automated pipeline is deployed directly to production without human intervention.

```
[Commit] -> [Build & Test] -> [Deploy to Staging] --(Manual Approval)--> [Continuous Delivery (Prod)]
[Commit] -> [Build & Test] -> [Deploy to Staging] ------------------------> [Continuous Deployment (Prod)]
```

### 6. What is GitOps?
GitOps is an operational framework that takes DevOps best practices (version control, collaboration, compliance, CI/CD) and applies them to infrastructure automation. In GitOps, **Git** is the single source of truth for the desired state of the system, and software agents (like ArgoCD) automatically pull changes to reconcile differences.

### 7. What is DevSecOps?
DevSecOps is the practice of integrating security practices and tools into every stage of the software development lifecycle (SDLC)—from planning to production operations—rather than treating security as an afterthought or a final gate.

### 8. What is the "Shift Left" concept?
"Shift Left" means moving tasks (especially testing, security verification, and performance evaluation) to an earlier phase in the software development lifecycle. Finding defects early is significantly cheaper than resolving them in production.

### 9. Explain Git Rebase vs. Git Merge. When do you use which?
- **Git Merge:** Combines branches and creates a new "merge commit". It preserves the chronological history of commits across both branches but can make history messy.
- **Git Rebase:** Re-writes history by applying commits from one branch on top of another. It creates a linear history but can be dangerous if applied to public/shared branches since it modifies commit SHA hashes.
- *Rule of thumb:* Rebase local changes to keep your branch clean; merge when pulling branches into main/production lines.

### 10. What is the difference between `git reset --soft`, `--mixed`, and `--hard`?
- `--soft`: Moves `HEAD` to the target commit, but leaves your staging area (index) and working directory untouched.
- `--mixed` (default): Moves `HEAD` and resets the staging area, but leaves the working directory untouched.
- `--hard`: Moves `HEAD`, resets the staging area, and overwrites all changes in your working directory (destructive).

### 11. What is `git revert` vs. `git reset`?
- `git reset`: Moves the current branch pointer backward in time. It deletes/rewrites history and is unsafe for shared branches.
- `git revert`: Creates a *new* commit that is the exact inverse of a targeted commit. It is safe for shared/public branches because it does not alter historical commits.

### 12. What is `git cherry-pick`?
`git cherry-pick` allows you to select a specific commit from one branch and apply it as a new commit onto your current branch.

### 13. What is a trunk-based development workflow vs. GitFlow?
- **Trunk-Based:** Developers merge small, frequent commits into a single central branch ("trunk" or "main"). Feature flags are used to hide incomplete features. This avoids long-lived branches and merge hell.
- **GitFlow:** A structured branching model with long-lived branches (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`). It is slower but provides strict control over release cycles.

### 14. What are build artifacts in a CI/CD pipeline?
Build artifacts are the files generated during the build step of a pipeline (e.g., compiled binaries, ZIP files, JARs, Docker images) that are later deployed or archived.

### 15. What are the common deployment strategies?
- **Rolling:** Gradually replaces instances of the old version with the new version.
- **Canary:** Deploys the new version to a small subset of servers or users first, monitors metrics, and rolls out to everyone if stable.
- **Blue-Green:** Keeps two identical environments. Blue is live; Green is deployed with the new version. Traffic is cut over instantly via router/DNS load balancer.
- **Recreate:** Terminates all old version instances before starting the new version (causes downtime, but prevents version skew).

---

## 🐳 Containerization & Docker (#16 - #30)

### 16. What is containerization and how does it differ from virtualization?
- **Virtualization:** Hypervisors virtualize physical hardware. Each VM runs a full copy of an operating system, virtual hardware, and application code. VMs are heavy and slow to boot.
- **Containerization:** Virtualizes the Operating System kernel. Containers share the host OS kernel and isolate user space using Linux namespaces and cgroups. They are lightweight, fast, and highly portable.

### 17. What is the Open Container Initiative (OCI)?
The OCI is a governance structure established in 2015 to create open industry standards around container formats and runtimes (e.g., `image-spec` and `runtime-spec`), ensuring images built with Docker run on Kubernetes, Podman, etc.

### 18. Explain the difference between a Docker image and a Docker container.
- **Docker Image:** A read-only template containing the application code, libraries, dependencies, and environment files needed to run the app. It is composed of stacked filesystem layers.
- **Docker Container:** A running instance of a Docker image. It adds a thin, read-write layer (container layer) on top of the read-only image layers.

### 19. What is the purpose of the Dockerfile `CMD` vs. `ENTRYPOINT` directives?
- `ENTRYPOINT`: Defines the command/executable that runs when the container starts. It is not easily overridden.
- `CMD`: Provides default arguments for the `ENTRYPOINT`. If no `ENTRYPOINT` is defined, it runs as the default command. `CMD` is easily overridden by passing arguments to `docker run`.

### 20. Explain the difference between `COPY` and `ADD` in a Dockerfile.
- `COPY`: Copies local files or directories from the build context to the container destination.
- `ADD`: Does everything `COPY` does, plus supports fetching files from remote URLs and automatically extracts local tar archives into the destination.
- *Best practice:* Use `COPY` unless you explicitly need `ADD`'s extra features.

### 21. What is Docker image layer caching, and how do you optimize Dockerfiles for it?
Docker builds images layer-by-layer based on instructions in the Dockerfile. If a layer's instructions and inputs haven't changed, Docker reuses the cached layer.
- *Optimization:* Order instructions from least frequently changed to most frequently changed. E.g., copy package manager files (like `package.json` or `requirements.txt`) and run dependencies installation *before* copying the application source code.

### 22. What is a multi-stage build in Docker, and why is it used?
Multi-stage builds use multiple `FROM` instructions in a single Dockerfile. You can compile your code in a large build environment stage, and then copy *only* the compiled binaries or assets to a tiny final runtime stage. This keeps the production container image size extremely small and secure.

### 23. What are Union File Systems (UnionFS) and overlayfs?
UnionFS allows files and directories from separate filesystems (layers) to be transparently overlaid, forming a single coherent file system. `overlayfs` (specifically `overlay2` in modern Docker) is the storage driver implementing this, stacking read-only layers with a top read-write layer using copy-on-write (CoW) mechanics.

### 24. What is the difference between Docker volume and bind mount?
- **Bind Mount:** Maps a file or directory from any arbitrary location on the host machine to a container. It is dependent on the host directory structure.
- **Volume:** Created and managed entirely by Docker in a dedicated directory (`/var/lib/docker/volumes/` on Linux). It isolates storage management from host directory structures.

### 25. How do you secure a Docker image?
- Use trusted minimal base images (e.g., Alpine or Distroless).
- Run as a non-root user (`USER node` or create a custom system user).
- Multi-stage builds to remove build compilers/debug tools.
- Scan images for vulnerabilities using tools like Trivy or Clair.
- Do not store secrets or API keys in the Dockerfile (use build arguments or runtime environment variables/volumes).

### 26. What is a dangling image vs. an unused image in Docker?
- **Dangling Image:** An image that is no longer associated with any tagged image (shown as `<none>:<none>`). Usually occurs when building a new version of an image with the same tag.
- **Unused Image:** A tagged image that is not associated with any running or stopped container.

### 27. How does a container process communicate with the host network?
Docker provides network drivers:
- **Bridge** (default): Creates a private internal network on the host; containers get internal IPs and communicate via NAT.
- **Host**: Disables network isolation; container uses the host IP and port space directly.
- **None**: Disables all container networking.
- **Overlay**: Connects multiple Docker daemons across hosts (Docker Swarm).

### 28. What is the difference between virtualization hypervisors (Type 1 vs. Type 2)?
- **Type 1 (Bare-Metal):** Runs directly on the host machine's physical hardware (e.g., VMware ESXi, KVM). Highly performant.
- **Type 2 (Hosted):** Runs as an application on top of an existing host Operating System (e.g., VirtualBox, VMware Workstation). Slower due to OS overhead.

### 29. How does Docker daemon communicate with the CLI?
The Docker CLI communicates with the Docker Daemon (`dockerd`) via a REST API over a UNIX socket (`/var/run/docker.sock`) locally, or over TCP remotely.

### 30. What is container escape, and how can it be mitigated?
Container escape is a security vulnerability where a malicious process inside a container breaches isolation boundaries to execute arbitrary code on the host OS.
- *Mitigation:* Never run containers as root, do not run with the `--privileged` flag, restrict Linux kernel capabilities (e.g., drop unused capabilities), and use read-only root filesystems.

---

## ☸️ Container Orchestration & Kubernetes (#31 - #50)

### 31. What is Kubernetes, and what are its master vs. worker node components?
Kubernetes (K8s) is an open-source container orchestration platform.
- **Control Plane (Master Node) Components:**
  - `kube-apiserver`: Exposes the K8s API (gateway for commands).
  - `etcd`: Consistent, highly-available key-value store containing cluster state data.
  - `kube-scheduler`: Assigns newly created pods to worker nodes.
  - `kube-controller-manager`: Runs controller processes (Node, Replication, Endpoints controllers).
  - `cloud-controller-manager`: Integrates with cloud provider APIs.
- **Worker Node Components:**
  - `kubelet`: Agent running on each node ensuring containers are running in pods.
  - `kube-proxy`: Maintains network rules on nodes to allow communication.
  - `container-runtime`: Software running the containers (e.g., `containerd`, Docker).

### 32. What is a Pod in Kubernetes? Why doesn't K8s run containers directly?
A Pod is the smallest deployable unit in Kubernetes. It represents a single instance of a running process and can contain one or more containers that share:
- Network namespaces (sharing IP and port space via localhost).
- Storage volumes.
- Container cgroup limits.
*Why not run containers directly?* Running a Pod abstraction allows multiple helper containers (like sidecars, logging agents, or service mesh proxies) to share resources and behave as a single cohesive unit.

### 33. What is Kubelet, and what is its role?
Kubelet is a node-level daemon that acts as the primary "node agent." It receives PodSpecs (primarily from the `kube-apiserver`) and ensures that the containers described in those specs are running, healthy, and reporting status back to the control plane.

### 34. What is Kube-Proxy, and what are its modes?
Kube-proxy is a network proxy that runs on each node. It maintains network rules that enable communication to Kubernetes Services from inside or outside the cluster. Modes include:
- **IPTables** (default in many setups): Uses Linux iptables rules to load-balance traffic to service pods. Slows down with thousands of services.
- **IPVS (IP Virtual Server):** Uses IPVS netfilter hooks to load-balance traffic. Highly scalable and faster than iptables for large clusters.
- **Userspace** (obsolete): Proxying done in user space; slow due to context switches.

### 35. What is the role of etcd in a Kubernetes cluster?
`etcd` is a distributed, consistent key-value store that acts as the single source of truth for the entire cluster state. Any configuration or state change (e.g., spinning up a new pod) must be committed to `etcd` through the `kube-apiserver`.

### 36. What is the difference between a Deployment, a ReplicaSet, and a Pod?
- **Pod:** The actual running containers.
- **ReplicaSet:** Declares and maintains a stable set of identical replica Pods running at any given time.
- **Deployment:** A higher-level resource that manages ReplicaSets, enabling declarative updates to Pods (e.g., rolling updates, rollbacks).

### 37. Explain the difference between a StatefulSet and a Deployment.
- **Deployment:** Designed for stateless applications. Pods are interchangeable and get random unique suffixes (e.g., `web-ab12cd`). Storage volumes are typically shared or ephemeral.
- **StatefulSet:** Designed for stateful applications (databases, clustered storage). Pods get sticky, persistent identities starting from zero (e.g., `db-0`, `db-1`). When scaling or rescheduling, pods are created/deleted sequentially, and storage volumes map uniquely to each pod ordinal index.

### 38. What is a DaemonSet and when would you use it?
A DaemonSet ensures that all (or some) nodes run a single copy of a Pod. As nodes are added to the cluster, Pods are automatically scheduled on them.
- *Use cases:* Log collectors (e.g., Fluentd, Logstash), monitoring agents (e.g., Prometheus Node Exporter), or network plugins (e.g., Calico).

### 39. Explain the Kubernetes Service types.
- **ClusterIP** (default): Exposes the service on a cluster-internal IP. Accessible only within the cluster.
- **NodePort:** Exposes the service on each node’s IP at a static port (typically `30000-32767`). Redirects traffic to the ClusterIP.
- **LoadBalancer:** Exposes the service externally using a cloud provider's load balancer. Automatically creates NodePort and ClusterIP routing.
- **ExternalName:** Maps the service to a DNS name (using a `CNAME` record) without proxying traffic.

### 40. What is a Headless Service and when is it used?
A Headless Service is a ClusterIP service with `.spec.clusterIP` set to `"None"`. Instead of creating a single proxy IP for load balancing, it configures DNS to return a list of A-records pointing directly to the IPs of the backing Pods.
- *Use cases:* Peer-to-peer discovery (e.g., Eureka, Elasticsearch clustering) or mapping stable DNS names directly to StatefulSet replicas (`db-0.db-service`).

### 41. What is an Ingress Controller vs. Ingress Resources?
- **Ingress Resource:** A configuration rule containing a set of HTTP/HTTPS path routing rules pointing to Kubernetes services.
- **Ingress Controller:** The actual application running in the cluster (e.g., NGINX Ingress, Traefik, HAProxy) that reads the Ingress Resources and proxies external traffic accordingly.

### 42. Explain the Gateway API and how it differs from Ingress.
Gateway API is a newer collection of resources (GatewayClass, Gateway, HTTPRoute) designed to evolve Ingress. It splits API management routing into distinct role-oriented resources (Infrastructure operator configures the Gateway, App Developer configures HTTPRoutes), supporting richer routing features, header manipulation, and multi-tenant isolation out-of-the-box.

### 43. What are Liveness, Readiness, and Startup probes?
- **Startup Probe:** Checks if the application inside the container has started up. All other probes are disabled until the startup probe succeeds.
- **Readiness Probe:** Checks if the container is ready to accept traffic. If it fails, the container's IP is removed from all Service endpoints.
- **Liveness Probe:** Checks if the container is still alive. If it fails, the Kubelet kills the container and triggers its restart policy.

### 44. How does K8s manage secrets? How do they differ from ConfigMaps?
- Both store key-value pairs mounted as environment variables or files in a volume.
- **ConfigMaps** are for non-sensitive configuration data stored in plaintext.
- **Secrets** are for sensitive data (API keys, certificates). They are Base64 encoded (not encrypted by default in standard configurations, but stored in tmpfs memory in Pods).
- *Best practice:* Enable Encryption at Rest in etcd to properly secure secrets.

### 45. What is a PersistentVolume (PV), a PersistentVolumeClaim (PVC), and a StorageClass?
- **PersistentVolume (PV):** A piece of storage provisioned in the cluster (manually by an admin or dynamically by a StorageClass).
- **PersistentVolumeClaim (PVC):** A request for storage by a user (specifying size and access modes). It binds to a matching PV.
- **StorageClass:** Defines the "template" or provisioner (e.g., AWS EBS, Azure Disk) to dynamically create PVs when a PVC requests them.

### 46. What is the difference between NodeSelector, NodeAffinity, and Taints/Tolerations?
- `nodeSelector`: Simple key-value matching to pin a Pod to a specific node.
- `nodeAffinity`: Hard/Soft rules (e.g., "preferred" vs "required") with logical operators to attract Pods to specific nodes.
- **Taints & Tolerations:** Taints are applied to *nodes* to repel pods. Tolerations are applied to *pods* to allow them to schedule on tainted nodes (e.g., reserving GPU nodes only for machine learning pods).

### 47. What is K8s RBAC?
Role-Based Access Control regulates access to Kubernetes API resources.
- **Role / ClusterRole:** Defines *what* permissions can be performed (e.g., GET, LIST pods). `Role` is namespaced; `ClusterRole` is cluster-wide.
- **RoleBinding / ClusterRoleBinding:** Grants those permissions by binding the Role/ClusterRole to a **Subject** (User, Group, or ServiceAccount).

### 48. What are Admission Controllers?
Admission controllers intercept API requests to the `kube-apiserver` *after* authentication and authorization, but *before* object persistence in etcd.
- **Mutating Controllers:** Modify the incoming object (e.g., inject sidecars like Istio link-proxy).
- **Validating Controllers:** Validate the object and reject requests if policies are violated (e.g., enforce that all pods have resource limits).

### 49. What is Pod Disruption Budget (PDB)?
A PDB limits the number of Pods of a replicated application that are down simultaneously due to voluntary disruptions (e.g., node drains for upgrades). It guarantees a minimum number of running replicas.

### 50. What is the difference between HPA and VPA?
- **HPA (Horizontal Pod Autoscaler):** Scales the number of Pod replicas up or down based on CPU/Memory usage or custom metrics.
- **VPA (Vertical Pod Autoscaler):** Automatically adjusts the CPU and Memory resource limits/requests of existing Pod containers (requires pod restart in current implementations).
- *Caution:* Do not run HPA and VPA together on the same resource based on the same metrics (like CPU/Mem), as they will fight each other.

---

## 🏗️ Infrastructure as Code & Terraform (#51 - #65)

### 51. What is Infrastructure as Code (IaC) and what are its benefits?
IaC is the managing and provisioning of infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools.
- *Benefits:* Consistency (prevents configuration drift), Speed, Auditability/Version Control, and Reusability.

### 52. What is Terraform, and how does it differ from Ansible?
- **Terraform:** Declarative, orchestration tool focused on provisioning infrastructure (resources, networks, virtual machines) across cloud providers. It tracks state.
- **Ansible:** Procedural/hybrid, configuration management tool focused on installing software and configuring OS settings inside already provisioned machines. It does not track state.

### 53. Why is the Terraform State file critical, and how do you secure it?
The state file (`terraform.tfstate`) maps real-world infrastructure resources to your configuration file, tracks metadata, and manages dependency resolution.
- *Security:* State files contain sensitive data (passwords, keys in plaintext). Secure it by storing it in a remote backend (like S3 or HashiCorp Consul) with encryption at rest enabled and access restricted via IAM.

### 54. Explain Terraform State Locking.
State locking prevents multiple team members from running Terraform operations simultaneously on the same configuration, which could overwrite changes or corrupt the state file.
- *Implementation:* Remote backends like S3 use DynamoDB to acquire a lease/lock before executing any plan/apply phase.

### 55. What is the difference between `terraform plan` and `terraform apply`?
- `terraform plan`: Dry-run execution. Compares configuration to state and shows what changes (create, update, destroy) will be performed.
- `terraform apply`: Executes the changes specified in the configuration, updating the target infrastructure and writing the new state file.

### 56. What is Terraform Drift, and how does Terraform handle it?
Drift is when resources are modified directly in the cloud console or API, making them out of sync with the Terraform state.
- *Resolution:* Running `terraform plan` (or `terraform plan -refresh-only` in v1.1+) automatically queries the cloud provider to update the state file representation of the actual infrastructure, displaying differences to reconcile.

### 57. Explain the difference between `count` and `for_each` in Terraform.
- `count`: Loops over resource creation based on an integer count. Accesses resources via index array (`aws_instance.web[0]`). If you delete an item in the middle of the array, all subsequent resources are re-indexed and recreated.
- `for_each`: Loops over resource creation using a set or map of strings. Accesses resources by key (`aws_instance.web["db_server"]`). Removing an item from the map only destroys that specific resource without affecting others.

### 58. What are Terraform Modules and why do we use them?
Modules are containers for multiple resources that are used together. They act like functions in programming, allowing you to package and reuse infrastructure code across multiple environments (Dev, Staging, Prod).

### 59. What is the difference between Terraform variables, locals, and outputs?
- **Variables (Input Variables):** Serve as parameters for a module or workspace, allowing customization without modifying the source code.
- **Locals (Local Values):** Temporary internal variables within a module (similar to local variables in programming). Useful for dry calculations or reducing code duplication.
- **Outputs:** Return values from a module or configuration, making data available to command lines or other configurations.

### 60. What is a Terraform Data Source block?
A Data Source block allows Terraform to read information from resources defined outside of Terraform, or defined in a separate Terraform workspace (e.g., fetching the latest AMI ID or referencing an existing VPC ID).

### 61. What are Terraform Lifecycles?
Nested blocks within a resource block that change how Terraform treats resource lifecycle events:
- `create_before_destroy`: Creates the new replacement resource before deleting the old one (minimizes downtime).
- `prevent_destroy`: Rejects plans that would destroy the resource (useful for critical databases).
- `ignore_changes`: Prevents Terraform from reverting manual changes to specific attributes.

### 62. How do you import existing infrastructure into Terraform?
- **V1.5+:** Use the `import` block in your code:
  ```hcl
  import {
    to = aws_instance.web
    id = "i-1234567890abcdef0"
  }
  ```
- **CLI Method:** Run `terraform import <resource_address> <physical_id>`. This updates the state file, but you must manually write the matching HCL code blocks.

### 63. What is the difference between `terraform state rm` and `terraform destroy`?
- `terraform state rm`: Removes the resource tracking from the Terraform state file, leaving the actual physical resource intact in the cloud (it becomes untracked).
- `terraform destroy`: Actively deletes/tears down all resources tracked by the state file from the cloud environment.

### 64. How do you handle secrets in Terraform?
- Never hardcode secrets in `.tf` files.
- Use input variables passed via environment variables (prefixed with `TF_VAR_`).
- Retrieve secrets dynamically at runtime using providers (e.g., AWS Secrets Manager, HashiCorp Vault).
- Keep in mind that secrets retrieved via data sources *will* still be stored in plaintext inside the `.tfstate` file, highlighting the need for remote state encryption.

### 65. What is the difference between Terraform Workspaces and a multi-account state structure?
- **Workspaces:** Allow multiple state files associated with a single configuration directory. Best for managing different stages of the *same* environment (e.g., local testing).
- **Multi-account state structure:** Using separate Git folders and distinct backend configurations for production vs non-production environments. This is the industry standard for production due to isolation and access control.

---

## 🤖 Configuration Management & Ansible (#66 - #75)

### 66. What is Ansible, and how does its architecture differ from Puppet or Chef?
Ansible is an agentless configuration management and automation tool.
- **Agentless (Push Model):** Connects to target nodes via SSH (Linux) or WinRM (Windows) to execute modules and python code, then deletes it. No agent installation is required on target hosts.
- **Agent-based (Pull Model - Chef/Puppet):** Requires installing a daemon agent on target nodes that periodically polls a master server to pull configurations.

### 67. What is an Ansible Playbook vs. an Ansible Role?
- **Playbook:** A YAML file containing one or more "plays" mapping hosts to tasks.
- **Role:** A structured template directory format for organizing playbooks, variables, files, templates, and handlers into reusable modular components.

### 68. What is the difference between an Ansible Task and a Handler?
- **Task:** An action executed sequentially during a run (e.g., "Install nginx").
- **Handler:** A task that is only executed if triggered ("notified") by another task *and* that triggering task actually made a state change (e.g., restarting nginx only if its configuration file was modified). Handlers run once at the end of the play.

### 69. What is a dynamic inventory in Ansible?
A dynamic inventory is a script or plugin that queries an external source (like AWS EC2, Azure, or NetBox API) to dynamically generate the list of target hosts at runtime rather than relying on a static inventory text file.

### 70. How does Ansible connect to target nodes, and what is privilege escalation (`become`)?
Ansible connects via standard SSH. If tasks require admin/root privileges, the playbook uses `become: yes` along with `become_method: sudo` to elevate credentials dynamically.

### 71. What is Ansible Vault?
Ansible Vault is a feature that allows encrypting files (such as host variables or roles containing passwords, keys, and credentials) using AES-256 encryption. The file is decrypted on-the-fly during execution using a vault password file or command prompt.

### 72. What is the difference between Ansible `command`, `shell`, and `raw` modules?
- `command` (default): Runs a command on the target host. It is secure because it does not execute via a shell, meaning shell features (like pipes `|`, wildcards `*`, redirections `>`, environment variables) will not work.
- `shell`: Executes the command through a shell shell (e.g., `/bin/sh`), allowing piping, variable interpolation, and redirection.
- `raw`: Bypasses the module subsystem and runs commands directly over SSH. Useful for bootstrap actions on minimal systems lacking python.

### 73. Explain Ansible Idempotency.
An operation is idempotent if executing it multiple times yields the exact same system state without errors or changes. Most Ansible modules are idempotent: they check the current state and only perform work if the actual state differs from the desired state.

### 74. How does Ansible handle blocks and error handling?
Ansible allows grouping tasks using `block`. Similar to try-catch blocks in programming, `block` executes a set of tasks, `rescue` runs tasks if a failure occurs in the block, and `always` executes regardless of success or failure.

### 75. What is the play recap in Ansible, and what do the states mean?
At the end of a run, Ansible prints a summary:
- `ok`: Target was already in the desired state.
- `changed`: Task performed modifications to target.
- `failed`: Task encountered errors.
- `unreachable`: Target host was not connectable via SSH.

---

## 🐧 Linux, OS & Scripting Internals (#76 - #85)

### 76. What is Load Average in Linux, and what do the three values represent?
Load average measures the average system load over 1, 5, and 15-minute intervals. It represents the number of processes in a **Runnable** state (using CPU or waiting for CPU) plus processes in an **Uninterruptible sleep** state (waiting for Disk I/O).
- *Interpretation:* A load average of 4 on a 4-CPU system means the CPU is at 100% capacity; higher than 4 indicates queueing.

### 77. What is an inode, and what happens if a filesystem runs out of inodes?
An **inode** (index node) is a data structure on a Linux filesystem containing metadata about a file (permissions, owner, size, physical disk block locations) but *not* the file content or name.
- *Issue:* If a filesystem runs out of inodes, you cannot create new files even if there is plenty of gigabytes of free physical disk space left (common with systems hosting millions of tiny files).

### 78. What is the difference between a Hard Link and a Soft (Symbolic) Link?
- **Hard Link:** A new directory entry pointing to the exact same underlying inode. You cannot create hard links across different filesystems or directories. Deleting the source file does not affect the link.
- **Soft Link (Symlink):** A separate file that contains a reference path to the target file. It can cross filesystems. Deleting the source file turns the symlink into a broken/dangling link.

### 79. What is a Zombie Process vs. an Orphan Process?
- **Zombie Process:** A process that has finished execution but still has an entry in the process table. It occurs when a child process exits and its parent has not yet read its exit status via the `wait()` system call.
- **Orphan Process:** A running child process whose parent process has died. It is automatically adopted by the system init process (PID 1), which reaps its exit status when it finishes.

### 80. Explain the Linux Boot Process.
1. **BIOS/UEFI:** Performs POST (Power-On Self-Test) and loads the bootloader from the MBR/EFI system partition.
2. **GRUB (Bootloader):** Allows OS selection and loads the selected kernel and initial RAM disk (`initramfs`) into memory.
3. **Kernel Phase:** Initializes hardware devices and mounts the root filesystem.
4. **Init Phase:** Spawns the init system (usually `systemd` with PID 1), which starts services and targets defined in boot state configurations.

### 81. What is the difference between Systemd and SysVinit?
- **SysVinit:** Older init system executing startup scripts sequentially (`/etc/init.d/`). Slow and lacks dependency management.
- **Systemd:** Modern system manager. Spawns processes in parallel using socket activation and D-Bus interfaces, maintains control groups (cgroups) for processes, and monitors service states dynamically.

### 82. What is `/dev/null` and how does redirection (`2>&1`) work?
- `/dev/null` is a special virtual device file (the "black hole") that discards all data written to it and returns EOF when read.
- `2>&1`: Redirects file descriptor 2 (Stderr) to the location of file descriptor 1 (Stdout). Typically used to silence commands: `command > /dev/null 2>&1`.

### 83. What are cgroups (control groups) and namespaces in Linux?
- **Namespaces:** Provide **isolation** by virtualizing system resources (e.g., Process IDs `pid`, Network configurations `net`, Mount paths `mnt`, User IDs `user`). A container runs in its own namespaces.
- **Cgroups (Control Groups):** Provide **resource limitation** and accounting (e.g., restricting memory, CPU shares, Disk I/O speed) for a group of processes.

### 84. How do you search for files containing a specific string recursively in a directory using bash?
Using `grep`:
```bash
grep -rnw '/path/to/search' -e "pattern"
```
- `-r`: Recursive.
- `-n`: Print line numbers.
- `-w`: Match whole words.

### 85. What are the common exit codes in Bash, and what do they signify?
- `0`: Success.
- `1`: Catchall for general errors.
- `126`: Command invoked cannot execute (permission error).
- `127`: Command not found.
- `130`: Script terminated by Control-C (`128 + 2`).
- `137`: Command terminated by SIGKILL (`128 + 9`, e.g., Out-Of-Memory killer).

---

## 🌐 Networking & Security (#86 - #93)

### 86. Describe the TCP 3-way handshake.
The process used to establish a reliable TCP/IP connection:
1. **SYN:** Client sends a Synchronization packet (random sequence number `x`) to server.
2. **SYN-ACK:** Server responds with SYN-ACK packet containing its own sequence number (`y`) and acknowledges client's sequence (`x + 1`).
3. **ACK:** Client sends Acknowledgment packet (`y + 1`) back to server. Connection is established.

### 87. What is the difference between the TLS 1.2 and TLS 1.3 handshakes?
- **TLS 1.2 Handshake:** Requires **2 Round Trips (2-RTT)** of communication to complete negotiations, authenticate, and exchange keys.
- **TLS 1.3 Handshake:** Redesigned to require only **1 Round Trip (1-RTT)** by combining key exchange and handshake parameters in the first message. It also supports "Zero Round Trip" (0-RTT) resumption for returning clients.

### 88. How does DNS resolution work?
When resolving `example.com`:
1. **Recursive Resolver:** Checks local cache. If missing, queries root server.
2. **Root Name Server (`.`):** Directs resolver to Top-Level Domain (TLD) server (e.g., `.com`).
3. **TLD Name Server:** Directs resolver to the Authoritative Name Server hosting records for `example.com`.
4. **Authoritative Name Server:** Returns the matching IP address (A record) to the recursive resolver, which caches it and returns it to the client.

### 89. What is the difference between SNAT and DNAT?
- **SNAT (Source NAT):** Rewrites the source IP of packets exiting a private network into a public IP. Used to allow internal private hosts to access the public internet.
- **DNAT (Destination NAT):** Rewrites the destination IP of incoming packets. Used to forward incoming public traffic to a specific private host (e.g., port forwarding).

### 90. What is a VLAN, and what is the difference between an access port and a trunk port?
A VLAN (Virtual Local Area Network) partitions a physical network switch into separate virtual broadcast domains.
- **Access Port:** Belongs to a single specific VLAN. Typically connects to end-user devices (PCs, printers).
- **Trunk Port:** Carries traffic for multiple VLANs simultaneously, tagging frames (usually using 802.1Q) to identify VLAN membership between switches.

### 91. What is CIDR notation? How many hosts are available in a `/24` network?
CIDR (Classless Inter-Domain Routing) notations specify an IP address and its associated routing prefix (subnet mask).
- A `/24` prefix has 8 bits host space ($2^8 = 256$ total addresses).
- **254 hosts** are usable because the first address is reserved for Network ID and the last address is reserved for Broadcast ID.

### 92. What is the difference between Symmetric and Asymmetric Encryption?
- **Symmetric Encryption:** Uses the exact same secret key to encrypt and decrypt the message. Fast, but key distribution is a security challenge (e.g., AES).
- **Asymmetric Encryption:** Uses a mathematically linked key pair: a Public Key (to encrypt) and a Private Key (to decrypt). Secure for key sharing, but computationally slower (e.g., RSA, ECC).

### 93. What is a Reverse Proxy vs. a Forward Proxy?
- **Forward Proxy:** Acts on behalf of the **client** to access resources on the internet (e.g., bypassing geo-blocks, monitoring employee internet usage).
- **Reverse Proxy:** Acts on behalf of the **server** to receive incoming client requests from the internet (e.g., NGINX load balancing, caching, SSL/TLS termination).

---

## 📊 Monitoring, Logging & Observability (#94 - #101)

### 94. What is the difference between Monitoring, Logging, and Observability?
- **Monitoring:** Tells you *when* a system fails. It gathers predefined metrics to alert you if something goes outside boundaries (passive).
- **Logging:** Records discrete events containing timestamps and context (records of *what* happened).
- **Observability:** Measures how well the internal states of a system can be inferred from its external outputs (telemetry). It tells you *why* a system failed, even for unknown-unknown issues.

### 95. What are the Three Pillars of Observability?
- **Metrics:** Numeric aggregates of data over time (e.g., CPU load, memory usage). Lightweight and fast to alert on.
- **Logs:** Structured or unstructured text statements of events (e.g., stack traces, query records). High cardinality, heavy storage.
- **Traces:** A complete record of the path a single request takes across a distributed system (microservices), showing latency spans.

### 96. Describe the Prometheus pull-based model. When would you use a Pushgateway?
Prometheus dynamically queries ("pulls") metrics endpoints via HTTP GET requests at configured scrape intervals.
- *Pushgateway:* Needed for short-lived, transient batch jobs (ephemeral tasks) that terminate before Prometheus can scrape them. The batch job pushes its metrics to the Pushgateway, which caches them for Prometheus to scrape later.

### 97. Explain the four Prometheus metric types.
- **Counter:** A cumulative metric that only increases or resets to 0 (e.g., total requests count).
- **Gauge:** A single numerical value that can go up and down (e.g., memory usage, temperature).
- **Histogram:** Samples observations (usually things like request durations) and counts them in configurable buckets. Also provides a sum.
- **Summary:** Similar to a Histogram, but calculates configurable quantiles (e.g., p95, p99) over a sliding time window on the client side.

### 98. What is the difference between SLO, SLA, and SLI?
- **SLI (Service Level Indicator):** A quantitative measure of a service's performance in real-time (e.g., "HTTP request latency is <200ms").
- **SLO (Service Level Objective):** The target reliability level agreed upon internally (e.g., "99% of HTTP requests must meet the SLI latency target over a 30-day window").
- **SLA (Service Level Agreement):** The legal commitment made to customers. Violating the SLA usually triggers financial penalties (e.g., "We guarantee 99% uptime, or we refund 10% of fees").

### 99. What are the "Four Golden Signals" of monitoring?
From the Google SRE handbook:
1. **Latency:** Time taken to service a request.
2. **Traffic:** Demand/load on the system (e.g., HTTP requests per second).
3. **Errors:** Rate of requests that fail.
4. **Saturation:** Measure of how full the system resources are (e.g., disk queue length, memory consumption).

### 100. What is centralized logging, and what is the ELK/EFK stack?
Centralized logging aggregates log streams from all servers/containers into a single searchable index database.
- **E:** Elasticsearch (Distributed search and analytics engine).
- **L / F:** Logstash or Fluentd (Log collectors, parsers, and forwarders).
- **K:** Kibana (Data visualization dashboard for Elasticsearch).

### 101. What is Log Rotation and why is it critical?
Log rotation is the automated process of archiving, compressing, or deleting old log files on a server.
- *Criticality:* Without log rotation, active log files will grow indefinitely until they consume all available space on the disk partition, causing services to crash or fail to write new data.
