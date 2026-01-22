2025-02-22 14:16
Tags: #cloud/aws
##### Content
Serverless function service
- Triggers functions in response to events from various AWS services
- Limited by exec time
- Auto scales based on demand
- Charges only for compute time used

##### Benefits
- Simple pricing structure
	- Charges based on each request + compute time used
	- Free Tier offers 1 mil requests and 400,000 GB-seconds of compute time
- Event-Driven Architecture
	- Functions are automatically triggered by AWS as required
- Broad programming Support
- Effortless monitoring (integration with CloudWatch)
- Scalable performance
	- Easily upgrade resources per function, up to 10GB RAM
	- Enhanced RAM boosts both CPU and Network performance

##### Pricing
- Pay per calls
	- First 1 mil requests are free
	- $0.20 per 1 mil requests
- Pay per duration
	- 400,000 GB - seconds free
	- Means 400,000 seconds if the function is 1GB RAM
	- Means 3,200,000 seconds if the function is 128MB RAM
	- After that $1.00 for 600,000 GB - seconds

##### References
