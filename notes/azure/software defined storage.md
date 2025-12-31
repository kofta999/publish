---
share_link: https://share.note.sx/gfrl1bn5#yIbjItvqjmmQaZlV4BkRWxdAlQZawXayY4EL3B9iIrg
share_updated: 2025-12-09T23:19:34+02:00
---
2025-12-09 15:17
Tags: #storage 
##### Content
#### Software Defined Storage (SDS)
Storage infrastructure managed and automated by software, which pools heterogeneous storage resources, and dynamically allocates them based on policies to match application needs.  

Key Attributes
- Storage Abstraction and Pooling
- Automated, policy-driven storage provisioning
- Unified Management
- Self-service: Users self-provision storage services from a service catalog
- Open and extensible: Through APIs, enables integrating multi-vendor storage

The SDS environment is logically divided into two main parts: the **Control Plane** and the **Data Plane**. 
##### 1. Policy-Driven Control Plane
This is the **fundamental component** of the SDS environment. It manages and provisions storage.

* **Implementation:** It is implemented through software called the **"SDS controller"** (sometimes called a "storage engine").
* **Functions of the SDS Controller:**
    * **Abstraction and Pooling:** It manages, abstracts, and pools the physical storage systems into **policy-based virtual storage pools** (e.g., NAS Pool, Block Storage Pool, Object Storage Pool).
    * **Automation & Orchestration:** It enables self-service access to storage resources via a catalog.
    * **Data Services:** It provides **Data Services** (e.g., Performance, Protection, Mobility) that apply to the virtual storage pools.
    * **Provisioning:** Users provision storage using **Data Services** such as Block, File, or Object services.

##### 2. Data Plane (Physical Storage)
These are the physical storage devices that hold the data.

* **Nature:** The physical storage is **not a part of the SDS environment** itself, but it is central to it.
* **Types:** It can be block-based, file-based, or object-based storage systems, or even commodity hardware (like local direct-attached storage (DAS) of x86-based servers).

##### 3. REST API (The Core Interface)
The **REST API** is the core interface to the SDS controller.

* **Purpose:** It makes the SDS environment open and extensible.
* **Integration:** It allows for the integration of **multi-vendor storage** and **external management tools** and applications.
* **Access:** It provides access to all underlying resources managed by the controller, including external cloud/object storage.

![[Pasted image 20251207132514.png|600]]

##### References
