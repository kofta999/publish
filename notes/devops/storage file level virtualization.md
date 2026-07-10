---
share_link: https://share.note.sx/059vystz#HEowCwI9WXkQ6V1Ez1DR2WvOxXGYjXzIYwt+ZkZyQRw
share_updated: 2025-12-09T23:28:12+02:00
---
2025-12-09 14:36
Tags: #storage 
##### Content

File-level virtualization addresses the complexity and disruption caused by moving files between storage devices due to performance or capacity needs.

- **Goal:** To eliminate the dependency between the file's access path and its physical storage location.
- **Mechanism:** It uses a **global namespace** that maps a **logical path** (what users/applications see) to the file's **physical path** (where the file is actually stored).   

- **Key Benefit:** It provides **non-disruptive file mobility**. Files can be moved across different file servers or NAS devices _while clients continue to access them_ using the same logical path, without needing to reconfigure hosts or applications.   

![[Pasted image 20251209140958.png|500]]
##### References
