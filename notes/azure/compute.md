## VMs

Series and Sizes:
- [VM Sizes](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview)
- Intel, AMD, ARM processors
- (ai note: explain important series and sizes etc)
- B series is burstable, initial CPU is capped (e.g. 30%) and while being below that you store credits, when CPU exceeds 30% it uses credits until its 0 then it goes back to the cap 
- Constrained CPUs: Hides CPU from machines to reduce licences cost
- CoreMark isnt used now, instead try your workload on machines and measure what's better for u
- Copilot actually helps in selecting VM sizes
![[Pasted image 20251228153158.png|500]]


VM Generations
- Gen 1: BIOS, IDE + SCSI
- Gen 2: UEFI + vTPM (secure boot), SCSI
- converting from 1 and 2 isnt easy

VM Building Blocks (ai note: write what's optional and what isnt)
- VM: spot / ssh key
- NIC(s) 
- Public IP linked to IP config to NIC
- NSG (ideally use at subnet)
- OS Disk (managed disk, could be ephemeral)
- Temp disk
- Data Disks
- Extensions
- Automations / tasks
- Infiniband (whats that?), GPU, NVMe
- Availability set, AZ, Proximity placement groups
- managed identity
- on-demand capacity reservation

Supported OS:
- Windows
- Linux
- Large number of images in Azure Marketplace
- Create your own images and make it easily available through azure compute gallery 

Only child optoins:
- Isolated VMs
	- So big it  takes up the whole host
- Deticated Host
	- You get a full host and you can create different VM sizes (but same type) on it
- Azure Local for edge infra
- Azure Arc: Extends Azure control plane and services anywhere (on k8s cluster)
- Bare-metal Infra

Maintenance Considerations
- VMs
	- Planned maintenance
	- Unplanned
	- Unexpected Downtime
- Remember to use Availability sets / AZs to reduce impact
- Use multiple regions in case of region outage
- Maintenance of OS inside VM that may require reboot

Patching in Azure
- Approaches
	- Let guest OS apply (all VMs can apply at same time which would cause a prob)
	- Use a 3rd party tool
	- Do it manually (dont)
- Azure automatic guest patch orchestration
	- Critical and security patches only
	- Off-peak, availability-first principles
 - Azure Update Management

Instance Metadata Service (IMDS)
- endpoint on ip 169.254.169.254
- VMs can query it to get info

IaaS PaaS lite
- Azure automanage takes a lot of IaaS out of IaaS
- Based on certain config profiles key services are used

Compute Gallery
- Enables versioning and replication of resources
	- Images
	- VM apps
- Shared across tenants and subscriptions

Azure VMWare
- Azure runs on hyperv
- first party azure offering  in partnership with azure
- Arch
	- Lives in a region, gets like a private cloud
	- Can create 1~12 clusters
	- a cluster made up of nodes 3~16
	- using esxi, vsan, can connect to azure storage services, nsx for network
	- uses expressroute to connect to other services
	- then can run vcenter on onprem and connect to it using global reach

VMSS
- Horizontal Auto scaling based on workload requirements
- Two modes on operation
	- Flexible (preferred): Optional to have Profile, can mix SKUs and Spot/non-spot
	- Uniform (legacy but still supported): Using Profile for all VMs
- Fault domains and zone balancing
- Rolling update of profile
- Auto image update
- Instance repair
- Scale-in policy
- Termination notification
- Instance Protection

Compute Fleet
- Large-scale workloads
- up to 10k vms
- can distrubte across regions
- option to auto replace eviected spot instances