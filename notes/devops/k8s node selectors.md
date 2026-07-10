2026-04-02 10:01
Tags: #kubernetes 
##### Content
## Node Selectors

### Summary/Purpose
Node Selectors are the simplest form of node selection constraint. They allow you to label a Node (e.g., `size=Large`) and then tell a Pod to only schedule on nodes with that specific label. 

### Core Logic/Mechanism
* **Label-Based:** It uses a simple key-value pair match. 
* **Limitation:** It is an "all or nothing" approach. It cannot handle complex logic like "OR" (match label A or B) or "NOT" (match anything except label C). For those scenarios, you must use **[[k8s node affinity|Node Affinity]]**.

### Key Parameters: Labeling
To use a selector, you must first label the node via the CLI:
`kubectl label nodes <node-name> <key>=<value>`
*Example:* `kubectl label nodes node-1 size=Large`

##### References
