2026-03-02 13:23
Tags: #kubernetes 
##### Content
A **Job** creates one or more Pods and ensures that a specified number of them successfully terminate. Unlike a Deployment (which maintains a running state), a Job is meant for tasks that **start, work, and exit**.

### Core Logic
* **Success Tracking:** The Job controller tracks successful completions. When the specified number of completions is reached, the Job is complete.
* **Retries:** If a container fails (non-zero exit code), the Job will recreate the Pod based on the `backoffLimit` (default is 6).
* **`restartPolicy`:** Must be either `OnFailure` (restarts container in same Pod) or `Never` (creates a brand new Pod). It **cannot** be `Always`.

### Common Patterns

| Pattern              | Configuration                                 | Description                                                                                                                                                    |
| :------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **One-off Task**     | `completions: 1`, `parallelism: 1`            | A single Pod runs to completion (e.g., a DB migration).                                                                                                        |
| **Fixed Completion** | `completions: 1`, `parallelism: N`            | Multiple Pods run until one succeeds (e.g., a DB backup from multiple read replicas).                                                                          |
| **Parallel Batch**   | `completions: N`, `parallelism: M`            | Runs up to M Pods at once until N total successes are reached.                                                                                                 |
| **Work Queue**       | `completions: 1` (omitted), `parallelism: >1` | Multiple Pods coordinate via an external queue (e.g., RabbitMQ). The Job is complete when **any one Pod** exits with success, signaling the queue is empty. \| |
| **Indexed Job**      | `completionMode: Indexed`                     | Each Pod gets a unique index ($0$ to $N-1$) via the `JOB_COMPLETION_INDEX` env var. Great for sharding data.                                                   |


### Example Job Manifest
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: data-processor
spec:
  completions: 5       # Total number of successful pods needed
  parallelism: 2       # How many pods to run at the same time
  backoffLimit: 4      # Number of retries before marking as failed
  template:
    spec:
      containers:
      - name: processor
        image: alpine
        command: ["/bin/sh", "-c", "echo Processing data... && sleep 5"]
      restartPolicy: OnFailure

```
##### References
