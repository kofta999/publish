2026-03-09 14:45
Tags: #cloud/aws/compute 
##### Content
A Spot Request is the "template" used to ask AWS for capacity.

**Request Types**
* **One-time:** Once the instance is fulfilled and then eventually terminated, the request disappears.
* **Persistent:** If the instance is interrupted, the request stays active and automatically tries to re-launch a new instance once the price drops or capacity is available.
    * **Valid From/Until:** You can set a specific time window for these requests to remain active.

**The Deletion Rule**
To fully get rid of a Spot instance managed by a persistent request:
1. **Cancel the Spot Request first.**
2. **Terminate the Spot Instance second.**
*If you only terminate the instance, the persistent request will simply trigger a new launch to meet the desired capacity.*

![[Pasted image 20260309143646.png]]


##### References
