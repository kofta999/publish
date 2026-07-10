2026-05-31 13:49
Tags: #linux #redhat
##### Content

### Standard Ownership

* `chown`: Modifies the user owner (and optionally the group owner).
* `chgrp`: Modifies the group owner.
* `chmod`: Modifies the read/write/execute bits.

### Deletion Logic

**A user's ability to delete a file is controlled by the write permissions of the *parent directory*, not the permissions of the file itself.** If a user has `w` access to a directory, they can delete any file within it, regardless of who owns it.

### Special Permissions

All special permissions are set on `x` permission on terminal outputs, uppercase means `x` isn't present and lowercase means `x` is present.

> Is set on **user** permissions
* **SetUID (`S`/`s`):** When set on an executable, the process runs with the privileges of the file's owner, not the user executing it (e.g., the `passwd` binary).

> Is set on **group** permissions
* **SetGID (`S`/`s`):**
	* On an executable: Runs with the privileges of the file's group.
	* On a directory: New files created inside automatically inherit the directory's group ownership, rather than the creating user's primary group.

> Is set on **other** permissions
* **Sticky Bit (`T`/`t`):** When set on a shared directory (e.g., `/tmp`), users with write access can only delete or rename files they explicitly own, preventing them from deleting other users' files.

### Default Permissions (`umask`)

The system default creation permission is `0666` for files and `0777` for directories. The `umask` value acts as a filter, subtracting bits from these defaults to determine the final permissions.

##### References
