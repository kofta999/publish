2026-06-19 16:39
Tags: #linux #redhat 
##### Content

## File System & `/etc/fstab` Failures

If `/etc/fstab` contains an invalid entry (e.g., wrong UUID or unmountable network share), systemd aborts the boot process and dumps the user into the `emergency.target` shell.

1. **Mount State Verification:** In the emergency shell, the root file system is often mounted strictly as read-only (`ro`), blocking edits to `/etc/fstab`.
2. **Remount Procedure:**

```bash
mount -o remount,rw /
```

3. **File System Repair:** Do not use the high-level `fsck.xfs`. Use `xfs_repair` directly. For `ext4`, use `fsck.ext4` (or `e2fsck`).
	 **Constraint:** Never execute repair binaries on an actively mounted file system; you must unmount it to allow journal replays.
4. **The `nofail` Parameter:** Appending `nofail` to the fourth column (options) in `/etc/fstab` instructs systemd to proceed with the boot even if the device fails to mount. Use strictly for non-critical secondary storage.

## Root Password Recovery Pipelines

Depending on access, recovering a lost root password requires interrupting the bootloader to inject kernel parameters.

**Method 1: `rd.break` (initramfs Interruption)**

1. In the GRUB menu, edit the `linux` line and append `rd.break`. (Interrupts right before the pivot to the physical root).
2. `mount -o remount,rw /sysroot`
3. `chroot /sysroot`
4. `passwd root`
5. `touch /.autorelabel`

**Method 2: `init=/bin/bash` (Direct Shell Injection)**

1. In the GRUB menu, remove any `console=` arguments and append `init=/bin/bash`.
2. `mount -o remount,rw /`
3. `passwd root`
4. `touch /.autorelabel`
5. Execute `exec /sbin/init` to resume the boot cycle without rebooting.

> [!important] Important
>  Why is `/.autorelabel` absolutely mandatory? When bypassing standard boot initialization via `rd.break` or `init=/bin/bash`, the SELinux daemon is not loaded. Consequently, when `passwd` writes the new hash to `/etc/shadow`, the file loses its SELinux context. Without the `/.autorelabel` trigger (which forces the kernel to pause on the next boot and rewrite context labels for the entire file system), SELinux will permanently block the login manager from reading the shadow file, locking you out of the system.

## GRUB2 Access Controls
To prevent unauthorized users from appending `rd.break` to the kernel arguments, lock the GRUB bootloader.

* **Apply Password:** Execute `grub2-setpassword`. Hashes are stored in `/boot/grub2/user.cfg`.
* **Reset Password:** Boot into a Live Linux ISO, mount the physical boot partition, and delete `/boot/grub2/user.cfg`. (Since you are altering the boot partition from a Live CD, no SELinux relabeling is required).


##### References
