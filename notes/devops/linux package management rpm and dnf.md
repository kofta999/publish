2026-05-31 14:10
Tags: #linux #redhat 
##### Content

### RPM Architecture

RPM packages strictly follow the naming convention: `name-version-release.arch.rpm`

* **Name:** The application identifier (e.g., `coreutils`).
* **Version:** The upstream software version from the developers (e.g., `9.5`).
* **Release:** The packager's build iteration (e.g., `6.el10`).
* **Arch:** The target processor architecture (e.g., `x86_64`, `aarch64`).

### Querying the RPM Database

The `rpm` command interacts with the local database of installed software.

* `rpm -qa`: List all installed packages.
* `rpm -qf <file>`: Determine which specific package provided a binary/file.
* `rpm -qi`, `-ql`, `-qc`, `-qd`: Query Info, List files, Config files, Documentation.
* `rpm -q --scripts`: View the shell scripts that execute automatically before/after installation.
* `rpm -p <file.rpm>`: Query an uninstalled RPM file directly from disk before committing to installation.

### YUM & DNF

DNF is the modern dependency resolver for RPM.

* **Configuration:** Core settings reside in `/etc/yum.conf` and `/etc/dnf/dnf.conf`.
* **Repositories:** Managed via standalone `.repo` files in `/etc/yum.repos.d/`. These files take precedence over directives in `dnf.conf`.
* **RHEL Ecosystem Divisions:**
* `BaseOS`: Core OS components, libraries, and kernel. Lifecycle matches the RHEL major release.
* `AppStream`: User-space applications and language runtimes. Contains shorter, independent lifecycles.

### Example YUM repository
```ini

# Unique identifier for the repository. Must not contain spaces.
[custom-repo]

# A descriptive name that shows up in your terminal when you update software.
name=My Custom Remote Repository

# The web address where the RPM software files are hosted.
# '$basearch' is a variable that automatically swaps in your system type (e.g., x86_64).
baseurl=https://example.com

# Or you can use an offline location

# The folder path on your computer where the software files live. 
# It uses 'file://' followed by the actual system path '/mnt/iso/BaseOS/'.
baseurl=file:///mnt/iso/BaseOS/

# Tells the system to actively use this repository. (1 = Active, 0 = Disabled)
enabled=1

# Forces the system to verify the safety of software before installation. (1 = On, 0 = Off)
gpgcheck=1

# The security key URL used to verify that the downloaded software hasn't been tampered with.
gpgkey=https://example.com
```

##### References
