2026-02-04 11:51
Tags: #containers
##### Content
### OCI (Open Container Initiative) & Image Structure
The OCI is the industry standard for container formats. It ensures that an image created in Docker can run in Podman, Kubernetes, or any other OCI-compliant runtime.

**Image Folder Structure**
An OCI image is not a single file, but a directory of content-addressed components:
* **`index.json`**: The entry point. It lists the available manifests (e.g., different versions for ARM64 vs. AMD64).
* **`blobs/`**: The heart of the image. This folder contains:
    * **Layer Tarballs**: The actual files and directories of the filesystem.
    * **Image Config**: A JSON file describing env variables, entrypoints, and the layer history.
* **`oci-layout`**: A small file indicating the version of the OCI layout specification.
* **`manifest.json`**: Links the image configuration to its specific filesystem layers.

**Content Addressability**
Every file in the `blobs/` directory is named after its **SHA-256 hash**. 
* **Benefit:** If two different images both use the same `ubuntu:22.04` base layer, the host only stores that layer **once**, saving massive amounts of disk space.

##### References
