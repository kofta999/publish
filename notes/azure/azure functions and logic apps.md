2025-12-29 20:58
Tags: #azure  
##### Content
### Serverless: Functions and Logic Apps

Comparison of code-based vs. workflow-based serverless compute in Azure.

### Azure Functions (Code-centric)
* **Triggers:** What starts the function (HTTP, Timer, Blob Storage, Cosmos DB).
* **Bindings:** Declarative way to connect to other resources (Input/Output) without writing connection string logic.
* **Hosting Plans:**
    * **Consumption:** True serverless. Pay only for execution time. Scales to zero.
    * **Premium:** Eliminates "cold starts" by keeping pre-warmed instances.
    * **Dedicated:** Runs on an App Service Plan (fixed cost).

### Logic Apps (Workflow-centric)
* **Graphical Interface:** Visual designer for building business logic (similar to n8n or Zapier).
* **Connectors:** Over 1000+ connectors to interact with SaaS (Office 365, Salesforce) and Azure services.
* **Logic:** Uses "Triggers" (When something happens) and "Actions" (Do this).
* **Comparison:** Use Functions for complex math/logic; use Logic Apps for orchestrating services and moving data between systems.

##### References
[[modern app services]]