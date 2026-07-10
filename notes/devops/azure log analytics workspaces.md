2026-01-01 20:13
Tags: #cloud/azure
##### Content
### Log Analytics Workspaces: Table Tiers and Retention

Log Analytics Workspaces (LAW) use different table plans to balance cost and search capability. Choosing the right tier depends on how long you need the data and how often you query it.

### 1. Analytics Logs (Default)
* **Usage:** High-value data requiring complex troubleshooting or alerting.
* **Retention:** Default 30 or 90 days included; can be extended up to **2 years**.
* **KQL:** Supports full KQL (joins, aggregations) with no query limits or per-query costs.
* **Cost:** Pay for ingestion and retention (after the first 90 days).

### 2. Basic Logs
* **Usage:** High-volume "noise" logs (e.g., firewall logs) used for debugging.
* **Retention:** **30 days** interactive retention.
* **KQL:** Limited KQL (full single-table, lookup only). **Pay per query** based on data scanned.
* **Cost:** Ingestion cost is ~1/5 of the Analytics tier.

### 3. Auxiliary Logs
* **Usage:** Massive-scale logs for compliance or rare lookups. **Only for custom log tables.**
* **Retention:** **30 days** interactive retention.
* **KQL:** Same limited KQL as Basic. **Pay per query**.
* **Constraint:** Cannot be transformed from existing Analytics logs; must be ingested directly into this tier.
* **Cost:** ~1/5 of the cost of Basic logs (highly cost-effective for large datasets).

### 4. Long-Term Retention (Archive)
* **Usage:** Compliance data stored beyond the interactive period.
* **Retention:** Can be kept for up to **12 years**.
* **Accessing Data:**
    * **Search Job (`_SRCH`):** Scans archived data. Results are ingested into a new Analytics table. Max search window is 1 year. Pay for data scanned + results ingested.
    * **Restore (`_RST`):** Makes the data fully interactive in a persistent table. Pay per GB/day for as long as the table exists. Note: **Auxiliary logs cannot be restored.**

### Summary Table: Comparison
| Feature              | Analytics           | Basic         | Auxiliary     |
| :------------------- | :------------------ | :------------ | :------------ |
| **Interactive Days** | Up to 730 (2 years) | 30            | 30            |
| **Max Archive**      | 12 Years            | 12 Years      | 12 Years      |
| **KQL Support**      | Full                | Single-Table  | Single-Table  |
| **Query Cost**       | Included            | Pay-per-scan  | Pay-per-scan  |
| **Alerting**         | Supported           | Not supported | Not supported |

### Summary Rules
A **Summary Rule** runs a KQL query on a fixed cadence (20 mins to 1 day). It typically aggregates data from **Basic** or **Auxiliary** tables and stores the summary in a standard **Analytics (`_CL`)** table. This allows you to have high-speed alerting and dashboards based on massive, low-cost datasets.

##### References
[[logging]]