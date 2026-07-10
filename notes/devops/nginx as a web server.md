2026-04-23 12:31
Tags: #nginx 
##### Content
### Configuration Hierarchy: Contexts and Directives
In Nginx, **Directives** (options) are grouped into **Contexts** (scopes).
* **Main Context:** The global scope (outside any braces).
* **`events {}`:** **Mandatory.** Even if empty, it must exist because Nginx uses it to configure the low-level connection processing (like `use epoll;`).
* **`http {}`:** The parent for all web-related configuration.
* **`server {}`:** Defines a virtual host (based on IP, Port, or Domain).
* **`location {}`:** Defines how to handle specific URI paths.

---

### Static File Serving Logic
When Nginx serves a file, it constructs the path on disk by appending the URI to the `root` directive.

* **The `root` Directive:**
    * If `root /var/www/html;` is set and a user requests `/index.html`, Nginx looks for `/var/www/html/index.html`.
    * **Note:** If defined inside `server`, it applies to all locations unless overridden.

* **The `alias` Directive (Alternative):**
    * Unlike `root`, `alias` **replaces** the matched part of the URI.
    * Use case: If `location /test { alias /abc/; }`, a request to `/test/file.txt` maps to `/abc/file.txt` (it drops the `/test`).

---

### Location Matching & Regex
Nginx selects a location block based on the URI.
* **Prefix Match (Default):** `location /test { ... }` matches any URI starting with `/test`.
* **Regex Match (`~`):** Case-sensitive regex.
* **Regex Match (`~*`):** Case-insensitive regex.
* **Exact Match (`=`):** `location = /favicon.ico { ... }` (Highest priority/fastest).

---

### Basic Static Server Configuration
```nginx
events {
    worker_connections 1024; # Mandatory block
}

http {
    include       mime.types; # Ensures browser recognizes CSS/JS/Images
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;

        # Root directory for the entire server
        root /usr/share/nginx/html;

        # Specific path mapping
        location /images/ {
            root /data; # Maps /images/photo.jpg to /data/images/photo.jpg
        }

        # Regex for specific file types
        location ~ \.(mp4|ogg)$ {
            root /media;
        }

        # Manual status return
        location /old-page {
            return 301 /new-page; # Redirect
        }
        
        location /forbidden {
            return 403; # Access Denied
        }
    }
}
```

---

### OS Internals: The `mime.types` Importance
When Nginx serves a static file, it doesn't just send bytes; it must tell the browser what the file is via the `Content-Type` header.
* **Mechanism:** Nginx looks at the file extension and maps it using the `mime.types` file (usually found in `/etc/nginx/`).
* **The `sendfile` interaction:** At the OS level, when `sendfile on;` is enabled, Nginx uses the kernel to copy the file from disk directly to the network buffer. However, the Nginx user-space process still has to send the HTTP headers (including the Mime-Type) before the kernel takes over the heavy lifting of moving the body bytes.

### Directory Indexing
If a user requests a directory (e.g., `/test/`), Nginx looks for an "index" file.
* **`index index.html index.htm;`**: Defines the search order.
* **`autoindex on;`**: If no index file is found, this generates a directory listing (useful for local file servers or "Index of /" mirrors).

##### References
https://wisdom.gitbook.io/gyan/nginx/deep-dive-on-nginx-directives