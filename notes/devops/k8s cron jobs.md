2026-03-02 13:34
Tags: #kubernetes 
##### Content
A **CronJob** manages Jobs on a time-based schedule. It is essentially a wrapper that creates a standard Job object at specific intervals.

### Scheduling Syntax

Uses the standard Unix cron format: `* * * * *` (Minute, Hour, Day of Month, Month, Day of Week).

* **Special Strings:** `@hourly`, `@daily`, `@weekly`, `@monthly`.
* **Time Zones:** Since K8s 1.27, you can set `spec.timeZone` (e.g., `Etc/UTC` or `America/New_York`).

### Key Parameters

* **`concurrencyPolicy`:** Defines what happens if a new Job is scheduled while the previous one is still running.
	> **Note:** This is critical for preventing "overlapping" tasks that might corrupt data or exhaust cluster resources.
	
	* `Allow` (Default): Both run simultaneously.
	* `Forbid`: Skips the new Job; the current one continues.
	* `Replace`: Kills the current Job and starts the new one.


* **`startingDeadlineSeconds`:** If a Job misses its scheduled time (e.g., cluster was down), this is the "grace period" to still start it. If missed by more than this limit, the execution is skipped.
* **History Limits:**
	* `successfulJobsHistoryLimit`: How many successful Jobs to keep in the API for debugging (Default: 3).
	* `failedJobsHistoryLimit`: How many failed Jobs to keep (Default: 1).
	
* **`suspend`:** If set to `true`, all subsequent executions are paused without deleting the CronJob.

### Example CronJob Manifest

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: nightly-backup
spec:
  schedule: "0 2 * * *"  # Every day at 2 AM
  concurrencyPolicy: Forbid # Won't start a new job if the old one is still running
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup-agent
            image: rsync:latest
          restartPolicy: OnFailure

```

##### References
