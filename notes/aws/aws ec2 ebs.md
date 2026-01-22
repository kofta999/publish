2025-02-08 15:59
Tags: #cloud/aws
##### Content
An EBS (Elastic Block Store) Volume is a network drive that can be attached to instances while they run
- Allows instances to persist data after termination
- At Cloud Practitioner level, they can be only mounted to 1 instance at a time
- Bound to a specific AZ
- Free tier included 30GB of SSD or Magnetic storage per month
- May have latency because it's a network drive
- Can be detached and attached to EC2 instances quickly

#### Volumes
- Have a provisioned capacity, measured in GBs and I/O per sec (IOPS)
- Billing is based only on provisioned capacity (can be increased over time)
- By default, root Volume is deleted, and any other volume is not (Delete on Termination Attribute); Controlled by AWS CLI / Console

#### Snapshots
- You can take a snapshot for backup / moving to another AZ. (not necessary to detach it but recommended for consistency)
- Archive: snapshots can be moved to "archive tier" that is 75% cheaper and takes from 24~72 hours for restoring
- Recycle Bin: You can setup rules to retain deleted snapshot for accidental deletion (1d ~ 1y)

##### References
