2025-12-28 18:36
Tags: #azure
##### Content
### VM Sizing: Burstable (B-Series)

B-Series VMs are unique because they do not provide 100% of the CPU performance 100% of the time.

### The Credit System
* **Baseline:** Each B-size has a "Base CPU" percentage (e.g., 10%, 30%). 
* **Accumulation:** When the VM uses *less* than its baseline, it banks **CPU Credits**.
* **Consumption:** When the VM needs more power, it "bursts" to use those credits. It can burst up to 100% of the vCPU.

### The "Credit Zero" Trap
* If the VM runs out of credits, performance is **hard-capped** at the baseline.
* The VM does **not** stop running, but applications will significantly slow down.
* **Monitoring:** Use Azure Monitor to track `CPU Credits Consumed` and `CPU Credits Remaining`.

### Best Use Cases
* Small databases that idle at night but spike during morning login.
* Build servers/code repositories.
* Development/Test environments where usage is intermittent.

##### References
[[compute]]