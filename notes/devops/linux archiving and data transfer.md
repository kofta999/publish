2026-06-18 14:20
Tags: #linux #redhat 
##### Content

## Tarball Operations

When extracting as a superuser, original permissions are preserved by default (`-p`). For standard users, extraction defaults to applying the current session `umask`.

| Flag    | Algorithm                     | Notes                                                              |
| ------- | ----------------------------- | ------------------------------------------------------------------ |
| `gzip`  | Lempel-Ziv coding (LZ77)      | Standard, fastest execution, wide compatibility.                   |
| `bzip2` | Burrows-Wheeler block sorting | Smaller archives, higher CPU overhead.                             |
| `xz`    | LZMA2                         | Maximum compression ratio, highly utilized in kernel distribution. |

## Secure Transfer Protocols

* **`scp`:** RHEL 10 defaults to the SFTP backend subsystem. Legacy RCP protocol usage (`-O`) is deprecated due to injection vulnerabilities and can be hard-disabled via `/etc/ssh/disable_scp`.
* **`rsync`:** Differential delta-transfer.
	* `-a` (Archive mode): Encompasses recursive (`-r`), links (`-l`), permissions (`-p`), times (`-t`), group (`-g`), owner (`-o`), and devices (`-D`).
* **Path Trailing Slash Constraint:** `rsync -a /src/ /dest` syncs the *contents* of `src`. `rsync -a /src /dest` dumps the `src` directory itself inside `dest`.

##### References
