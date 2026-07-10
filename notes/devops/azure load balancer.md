2025-12-28 11:42
Tags: #cloud/azure
##### Content
### Azure Load Balancer

The Azure Load Balancer operates at **Layer 4 (TCP/UDP)** of the OSI model. It is a high-performance, low-latency service designed to scale to millions of requests.

### Core Components
1. **Frontend IP:** The entry point (Public IP or Private IP).
2. **Backend Pool:** The set of VMs or VMSS instances receiving the traffic.
3. **Health Probes:** Determines which instances are healthy. If a probe fails, traffic stops being sent to that instance.
4. **Load Balancing Rules:** Maps a specific Frontend port/protocol to a Backend port/protocol.

### SKU Comparison (Crucial for Exam)
| Feature                | Basic (Retired/Legacy) | Standard (Current)                   |
| :--------------------- | :--------------------- | :----------------------------------- |
| **Backend Pool Size**  | 300 instances          | 1000 instances                       |
| **Availability Zones** | Not supported          | **Zone-redundant** & Zonal           |
| **HA Ports**           | Not available          | Available for Internal LB            |
| **Security**           | Open by default        | **Secure by default** (Requires NSG) |
| **Diagnostics**        | Basic metrics          | Azure Monitor (Multi-dimensional)    |
| **SLA**                | None                   | 99.99%                               |

### Key Features
- **Session Persistence:**
	- *None:* Any VM can handle the next request.
    - *Client IP:* Same VM for the same client IP.
    - *Client IP and Protocol:* Same VM for the same IP + Protocol.
- **HA Ports:** A Standard Internal Load Balancer feature that allows you to load balance **all** TCP/UDP ports simultaneously. Essential for NVA high availability.
- **Floating IP (DSR):** Used primarily for SQL Server "Always On" availability groups. The backend VM responds directly to the client using the LB's IP.

##### References
