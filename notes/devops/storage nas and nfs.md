---
share_link: https://share.note.sx/yi9n1qpz#cb9IVpVwsUPvTQrHpfe5fq5ToW416RqkjAbqmjHBpWg
share_updated: 2025-12-09T23:27:52+02:00
---
2025-12-09 14:35
Tags: #storage
##### Content
##### Network-Attached Storage (NAS)
An IP-based, dedicated, high-performance file sharing and storage 
device. 
- Enables NAS clients to share files over IP network 
- Uses specialized operating system that is optimized for file I/O 
- Enables both UNIX and Windows users to share data 
- Components:
	- Controller (called NAS Head)
		- Responsible for: RAID set config, creating LUNs, installing file system, and exporting file share on the network
	- Storage Disks

##### NAS Types
-  **Unified NAS**
	Has storage + NAS heads in a single system
	
	![[Pasted image 20251209135647.png|600]]


- **NAS Gateway**
	Acts as a controller in a system that's connected to a SAN storage box
	
	![[Pasted image 20251207113845.png|600]]


##### NFS File Access Methods
- CIFS / SMB
	- Client-Server arch
	- Uses TCP/IP
	- Stateful
- NFS
	- Client-Server arch
	- Uses RPC to provide access to remote fs
- Hadoop DFS (HDFS)
	- Spans multiple nodes in a cluster and enables user data to be stored in files
	- Presents a hierarchical file organization
	- Presents a streaming interface to run any app using MapReduce


##### References
