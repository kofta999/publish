2026-02-04 11:53
Tags: #containers
##### Content
### 2. Union File Systems (OverlayFS)
Union FS allows multiple directories (layers) to be merged into a single virtual view. This is what allows containers to share base layers while having their own writable space.

**The Layer Mechanics**
* **Immutable Layers:** All "Image" layers are read-only.
* **Copy-on-Write (CoW):** When you modify a file that exists in a lower (read-only) layer:
    1. The OS **copies** the file up to the top writable layer.
    2. The modification happens on this copy.
    3. The original file in the lower layer is "masked" but still consumes disk space.
* **Whiteouts (Deletion):** When you delete a file from a lower layer, the FS creates a "whiteout" file (a hidden character device) in the top layer. This tells the driver not to show the file in the merged view, though it remains physically present in the lower layer.

**OverlayFS Folder Structure**
When you inspect a running container's storage (e.g., in `/var/lib/docker/overlay2`), you see these key directories:
* **`lowerdir`**: The read-only layers (the image).
* **`upperdir` (diff)**: The writable layer. This stores **only** the changes made since the container started.
* **`merged` (overlay)**: The unified view. This is what the container actually "sees" as its root `/` filesystem.
* **`workdir`**: An internal directory used for atomic operations (like moving files) before they are finalized in the `upperdir`.

> **DevOps Tip:** Since deleted or modified files still exist in the lower layers, container images can become bloated if you delete large temporary files in a *separate* `RUN` command. Always delete temp files in the same `RUN` step they were created.

##### References
