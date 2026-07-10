2026-07-05 11:40
Tags: #devops #interview

# DevOps Interview Preparation Index

This index organizes all active notes in the vault related to DevOps, Systems Administration, Infrastructure as Code, Cloud Computing, and Operating Systems.

## 📋 General Prep
- [[DevOps 101 Interview Questions|101 DevOps Interview Questions & Answers]]
- [[HENNGE Interview prep v2|Interview Prep & Project Summaries]]

## ⚓ Kubernetes (k8s) & Container Orchestration
### Core Components & Workloads
- [[k8s cluster components|Kubernetes Cluster Components]]
- [[k8s pods|Pods]] & [[k8s multi container apps|Multi-Container Apps]]
- [[k8s pods health checks probes|Health Checks & Probes (Liveness, Readiness, Startup)]]
- [[k8s pods resources and limits|Pod Resources & Limits]] & [[k8s cpu resource limits|CPU Resource Limits]]
- [[k8s deployment|Deployments]] & [[k8s replicaset|ReplicaSets]]
- [[k8s daemonset|DaemonSets]]
- [[k8s statefulsets|StatefulSets]]
- [[k8s jobs|Jobs]] & [[k8s cron jobs|Cron Jobs]]
- [[k8s static pods|Static Pods]]

### Networking & Ingress
- [[k8s services|Services]] & [[k8s endpoints and endpoint slices|Endpoints & Endpoint Slices]]
- [[k8s ingress|Ingress]] & [[k8s gateway api|Gateway API]]
- [[k8s container network interface cni|Container Network Interface (CNI)]] & [[k8s pod networking|Pod Networking]] & [[k8s service networking and coredns|Service Networking & CoreDNS]]
- [[k8s network policies|Network Policies]]

### Storage
- [[k8s persistent volumes and pvc|Persistent Volumes & PVC]] & [[k8s storage classes|Storage Classes]]

### Configuration & Security
- [[k8s configmaps|ConfigMaps]] & [[k8s secrets|Secrets]]
- [[k8s service accounts|Service Accounts]]
- [[k8s rbac|RBAC (Role-Based Access Control)]] & [[k8s authz mechanisms|Authorization Mechanisms]]
- [[k8s admission controllers|Admission Controllers]]
- [[k8s security contexts|Security Contexts]]
- [[tls in kubernetes|TLS in Kubernetes]]

### Scheduling & Autoscaling
- [[k8s autoscaling hpa vpa|Autoscaling (HPA & VPA)]]
- [[k8s node selectors|Node Selectors]], [[k8s node affinity|Node Affinity]], & [[k8s tains and tolerations|Taints & Tolerations]]
- [[k8s priority classes|Priority Classes]]
- [[k8s multiple schedulers and scheduling framework|Scheduling Framework & Multiple Schedulers]]
- [[k8s manual scheduling|Manual Scheduling]]

### Cluster Administration & Troubleshooting
- [[k8s cluster upgrade guide|Cluster Upgrade Guide]]
- [[k8s backup and restore cluster|Cluster Backup & Restore]]
- [[k8s etcd|etcd Deep Dive]]
- [[journalctl for k8s troubleshooting|Troubleshooting with journalctl]]
- [[k8s three-way merge logic|Three-Way Merge Logic]]
- [[k8s versioning|Kubernetes Versioning]]
- [[k8s command list|Kubernetes Command List]] & [[k8s jsonpath|JSONPath Expressions]]

### Packaging & Templating
- [[k8s helm intro|Helm Introduction]]
- [[kustomize full|Kustomize Guide]]
- [[k8s crds and operators|CRDs & Operators]] & [[custom operator k8s|Custom Operators in K8s]]
- [[generating kubernetes certificates|Generating Certificates]]

---

## 🛠️ Infrastructure as Code (Terraform)
- [[infrastructure as code iac ecosystem|IaC Ecosystem]]
- [[terraform core architecture and execution flow|Core Architecture & Execution Flow]]
- [[terraform variables locals outputs|Variables, Locals, & Outputs]]
- [[terraform data sources block|Data Sources Block]]
- [[terraform meta agruments lifecycles|Meta-Arguments & Lifecycles]]
- [[terraform modules|Modules]]
- [[terraform backend config and state locking|Backend Configuration & State Locking]]
- [[terraform state drift and sync|State Drift & Sync]]
- [[terraform validation and testing|Validation & Testing]]
- [[terraform secret mgmt|Secret Management]]
- [[terraform environments and multi account approach|Environments & Multi-Account Approach]]
- [[terraform expressions and builtin functions|Expressions & Built-in Functions]]

---

## 🤖 Configuration Management (Ansible)
- [[ansible configurations and inventory|Configurations & Inventory]]
- [[ansible common modules|Common Ansible Modules]]
- [[ansible flow control blocks strategy|Flow Control & Blocks Strategy]]
- [[ansible secrets and roles|Secrets & Roles]]

---

## 🔄 CI/CD & GitOps
- [[github actions|GitHub Actions CI/CD]]
- [[iti jenkins|Jenkins CI/CD]]
- [[argocd basics|ArgoCD Basics]]
- [[argocd sync phases and waves|ArgoCD Sync Phases & Waves]]
- [[argocd app of apps and applicationsets|ArgoCD App of Apps & ApplicationSets]]
- [[gitops managing secrets sealedsecrets hashicorp vault|Managing Secrets (SealedSecrets & HashiCorp Vault)]]

---

## 🐧 Linux & Operating System Fundamentals
### Processes & Performance
- [[linux process and job management and targeted termination|Process & Job Management]]
- [[linux performance tuning and nice values|Performance Tuning & Nice Values]]
- [[linux system load and load average|System Load & Load Average]]
- [[linux task scheduling|Task Scheduling (cron & at)]]

### Filesystem & Permissions
- [[linux user and group management|User & Group Management]]
- [[linux file permissions and ownerships|File Permissions & Ownership]]
- [[linux filesystem and mounting operations|Filesystem & Mounting Operations]]
- [[linux partitioning and lvm|Partitioning & LVM]]
- [[linux file search find and locate|File Search (find & locate)]]

### Shell & Utilities
- [[linux shell env and regex|Shell Environment & Regex]]
- [[linux shell navigation expansion and man|Shell Navigation & Expansion]]
- [[linux io redirection pipelineing and tee|IO Redirection & Pipelines]]
- [[linux archiving and data transfer|Archiving & Data Transfer]]

### System Administration & Security
- [[linux basic networking dns and nmcli|Basic Networking, DNS, & nmcli]]
- [[linux network security firewalld|Network Security & firewalld]]
- [[linux nfs and autofs|NFS & autofs]]
- [[linux package management rpm and dnf|Package Management (RPM/DNF)]]
- [[linux systemd target mgmt and boot states|Systemd & Boot States]]
- [[linux boot sequence|Linux Boot Sequence]] & [[linux boot grub fstab recovery|Boot GRUB/fstab Recovery]]
- [[linux time synchro chrony|Time Synchro & chrony]]
- [[linux selinux|SELinux]]

### Container Runtimes & OS Internals
- [[linux namespaces|Linux Namespaces]]
- [[linux control groups v1|Control Groups v1]] & [[linux control groups v2|Control Groups v2]]
- [[open container initiative oci|Open Container Initiative (OCI)]] & [[union file systems and overlayfs|Union File Systems & OverlayFS]]

---

## 🌐 Web Servers & Proxies (Nginx)
- [[nginx intro and uses|Nginx Introduction & Use Cases]]
- [[nginx internal architecture|Internal Architecture]]
- [[nginx as a web server|Nginx as a Web Server]]
- [[nginx as layer 4 proxy|Layer 4 Proxy]] & [[nginx as layer 7 proxy|Layer 7 Proxy]] & [[nginx l4 vs l7 proxying|L4 vs L7 Proxying]]
- [[nginx timeouts|Timeouts]]
- [[nginx tls termination and passthrough|TLS Termination & Passthrough]]
- [[nginx websockets l4 vs l7|Websockets L4 vs L7]]
- [[use https tls 1.3 http 2 in nginx|HTTPS, TLS 1.3, & HTTP/2 in Nginx]]

---

## 📊 Monitoring, Alerting & Observability
- [[prometheus|Prometheus Basics]]
- [[machine cpu use in linux and node exporter|Machine CPU Use & Node Exporter]]

---

## 🔌 Networking & Protocols
- [[tls and public key infrastructure|TLS & Public Key Infrastructure]]
- [[tls 1.2 vs tls 1.3|TLS 1.2 vs TLS 1.3]]
- [[dhcp basics|DHCP Basics]] & [[dhcp dora process|DHCP DORA Process]]
- [[nat translation types|NAT Translation Types]]
- [[vlan access and trunk ports|VLAN Access & Trunk Ports]]

---

## 💾 Storage Systems
- [[block storage disk controller|Disk Controller]] & [[block storage virtualization|Block Storage Virtualization]]
- [[object storage|Object Storage]]
- [[unified storage|Unified Storage]]
- [[storage raid|RAID]]
- [[storage provisioning and luns|Provisioning & LUNs]]
- [[storage nas and nfs|NAS & NFS]]
- [[storage fibre channel san|Fibre Channel SAN]] & [[storage fibre channel architecture|FC Architecture]] & [[storage fc san topologies and zoning|FC Topologies & Zoning]]
- [[storage data replication|Data Replication]]
- [[storage data deduplication|Data Deduplication]]
- [[storage data archiving|Data Archiving]]
- [[storage data migration|Data Migration]]
- [[storage backup and restore|Backup & Restore]] & [[storage continuous data protection|Continuous Data Protection]]
- [[storage file level virtualization|File-Level Virtualization]] & [[storage file level tiering|File-Level Tiering]]

---

## 🏗️ System Design & Distributed Systems
- [[caching|Caching Strategies & Patterns]]
- [[cap theorem|CAP Theorem in Distributed Systems]]
- [[fault tolerance|Fault Tolerance Principles]]
- [[rate limiting algorithms|Rate Limiting Algorithms]]
- [[microservices architecture|Microservices Architecture]]
- [[clean architecture|Clean Architecture]]
- [[solid principles|SOLID Principles]]
- [[domain driven design|Domain-Driven Design (DDD)]]

---

## ☁️ Cloud Indexes
- [[AWS Solutions Architect Associate Knowledge Index|AWS SAA Knowledge Index]]
- [[AWS Cloud Practitioner Knowledge Index|AWS Cloud Practitioner Index]]
- [[Azure Administrator Knowledge Index|Azure Administrator Index]]
