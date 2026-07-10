2026-05-31 14:34
Tags: #linux #redhat 
##### Content
### Block Device Identification

Before a file system can be mounted, the underlying block device must be identified. Device names (like `/dev/sdb1`) can change between reboots, so UUIDs are preferred for persistent configurations.

* **`lsblk`**: Lists all available block devices in a hierarchical tree format, showing partitions and their current mount points.
* **`blkid`**: Retrieves the Universally Unique Identifier (UUID) and the file system type (e.g., `ext4`, `xfs`) of block devices.
* **`fdisk -l`**: Lists partition tables for all specified devices.

### File System Creation (Formatting)

A raw partition must be formatted with a file system before it can store data.

* **`mkfs` (Make File System):** The frontend utility used to build a Linux file system.
* **Syntax:** `mkfs.<fstype> <device>` (e.g., `mkfs.xfs /dev/sdb1` or `mkfs.ext4 /dev/sdb1`).
* **Warning:** Formatting a partition destructively overwrites the existing file system table and all data on that partition.

### The Mount Command

Mounting is the process of attaching a formatted block device to a specific directory (the mount point) in the Linux directory tree.

* **Standard Mount:** `mount /dev/sdb1 /data` (Mounts the partition to the `/data` directory).
* **Loop Mount:** `mount -o loop image.iso /mnt/cdrom` (Mounts a file, like an ISO, as if it were a physical block device).
* **Remounting:** `mount -o remount,rw /` (Remounts an already mounted file system with new options, commonly used to change a read-only rescue shell to read-write).
* **Unmounting:** `umount /data` or `umount /dev/sdb1`.

### Persistent Mounting (`/etc/fstab`)

The `mount` command is temporary; changes are lost on reboot. For persistent mounts, entries must be added to the File System Table (`/etc/fstab`).

| Column | Name        | Description                                                                 |
| ------ | ----------- | --------------------------------------------------------------------------- |
| **1**  | Device      | The UUID (Recommended: `UUID=xxx-xxx`) or device path (`/dev/sdb1`).        |
| **2**  | Mount Point | The directory where the file system is attached.                            |
| **3**  | FS Type     | The file system format (`xfs`, `ext4`, `vfat`, `nfs`).                      |
| **4**  | Options     | Mount options (`defaults`, `ro`, `noexec`, `_netdev`).                      |
| **5**  | Dump        | Backup utility flag (usually `0` to disable).                               |
| **6**  | Pass (fsck) | File system check order at boot. `0` = skip, `1` = root FS, `2` = other FS. |

> **Validation:** After editing `/etc/fstab`, always run `mount -a`. This attempts to mount all file systems defined in the file. If there is a syntax error, this catches it immediately; otherwise, the system will crash or drop into emergency mode on the next reboot.

### Mount Mechanics & Shadowing

When a block device (file system) is mounted onto a directory that already contains files, those original files are "shadowed." They are hidden from the OS and rendered completely inaccessible until the overlying file system is unmounted.

### Unmount Troubleshooting

If `umount` fails with a "Device is busy" error, it indicates a process holds an open file handle or has its working directory set inside the mount point.

* **`lsof`**: Use the `lsof` command against the mount directory (e.g., `lsof +D /mnt/data`) to list all open files and identify the specific PIDs preventing the unmount operation.
* **`fuser`**: Alternatively, `fuser -mv /mnt/data` shows the processes accessing the mount, and `fuser -kv /mnt/data` can automatically kill those blocking processes.

### Storage Diagnostics & Usage

* **`df -h` (Disk Free):** Displays the total, used, and available space on all mounted file systems in human-readable format (MB/GB).
* **`df -i` (Inode Usage):** Displays index node availability. *Diagnostic Note:* A file system can report "No space left on device" even if `df -h` shows gigabytes of free space if it has run out of inodes (usually caused by millions of tiny files).
* **`du -sh <dir>` (Disk Usage):** Calculates the total size of a specific directory and its subdirectories, useful for finding what is consuming space within a mount point.

##### References
