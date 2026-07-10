2026-03-20 10:48
Tags: #cloud/aws/storage 
##### Content
#### 1. Cross-Origin Resource Sharing (CORS)
CORS is a browser-based security mechanism that prevents a web page from making requests to a different domain than the one that served the web page.
* **Definition of an Origin:** An origin is the combination of **Protocol + Host + Port**.
    * *Same Origin:* `https://example.com/page1` and `https://example.com/page2`
    * *Different Origin:* `http://example.com` vs `https://example.com` (different protocol) or `https://app.example.com` vs `https://api.example.com` (different host).
	
* **The S3 Use Case:** If you host a static website on one S3 bucket and that website needs to pull assets (like web fonts or API data) from another S3 bucket, the browser will block the request unless CORS is configured on the **target** bucket.
* **The Fix:** You must add a CORS configuration (in JSON) to the target S3 bucket to allow the specific origin of your website.
    * Example Header: `Access-Control-Allow-Origin: https://www.yourwebsite.com`


---

#### 2. S3 MFA Delete
MFA Delete adds an extra layer of security to prevent the accidental or malicious permanent deletion of data.

* **Requirements:**
    * **Versioning** must be enabled on the bucket.
    * Only the **Bucket Owner (Root Account)** can enable or disable MFA Delete.
* **When MFA is Required:**
    * **Permanently deleting** an object version.
    * **Suspending versioning** on the bucket.
* **When MFA is NOT Required:**
    * Enabling versioning for the first time.
    * Listing deleted versions.
    * Putting a "Delete Marker" on an object (standard deletion).

---

#### SAA Exam "Cheat Sheet" Summary

| Feature        | Exam Scenario / Keyword                                                      | Core Action                                                               |
| :------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **CORS**       | "Web browser console error," "Font/Script blocked from another bucket."      | Enable CORS on the **destination** bucket.                                |
| **MFA Delete** | "Protect against accidental permanent deletion," "Root account requirement." | Enable MFA Delete via CLI (requires Versioning).                          |
| **Versioning** | "Recover from unintended overwrites or deletes."                             | Keep all versions of an object; only delete markers are added by default. |

##### References
