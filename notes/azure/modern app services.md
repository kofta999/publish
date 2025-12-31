### Containers
- VMs virtualizes hardware
- Containers virtualizes OS
- Uses namespaces, cgroups, layers
- Container runs a primary process and share a lifecycle
- Created from an immutable image
- containerd is the common high-levle runtime used
- Hyper-V Containers (isolated kernel)

### Azure Container Instances
- Linux or Windows (container as a service)
- Public or private (linux only)
- Can integrate with AKS via virtual kubelet
- useful for burst or very basic scenarios

### Azure Kubernetes Services
- Managed Kubernetes
- SKUs
	- Free
	- Standard (ai note: list features)
- You pay for working nodes which can auto scale
- Special featues
	- Multiple node pools
	- Stop / Start AKS cluster
	- Can connect ACI like an infinite node of pods using a virtual kubelet (for burst scenarios)
	- user node pools can use spot instances
	- auto-healing
	- auto-upgrade
	- managed identity use

### Azure Container Apps
- KEDA: autoscale based on events
- Dapr: distrubuted application runtime
- envoy (ai note: explain these 3 a bit)
- Focus on the app, AKS is hidden

### Azure Spring Apps
- Provides a fully managed Sprint Cloud Environment
- Pricing
	- Basic
	- Standard
	- Enterprise (ai note: details on each)

### App Service
- Original PaaS
- Hosting of web-based apps
- Wide range of runtimes and languages
- Includes Windows and Linux
- Autoscale support from Standard SKU and beyond
- Service plan -> nodes -> apps (each app share the same nodes)
- Service plan:
	- Can scale up and out
	- deployment slots: deploy app to same resources (staging for example) then swap vIP between staging and prod
	- different vnet integrations 
- App Service Environment: Dedicated env to subnet

### Azure Functions
- Serverless compute
- Event driven HTTP, Schedule, event grid
- Binds to additional input / output
- Supports many languages

### Logical Apps
- Graphical based orchesttration of business logic
- runs on functinos
- initated on events
- similar to n8n i guess?
- Has many connectors and template

### Azure Static Web Apps
- ai note: add description
- Integrates with managed functions
- Various SKUs available