2026-02-25 12:18
Tags: #kubernetes 
##### Content

`k run <pod-name> --image=<image-name>`
`k apply -f <yaml-file>`
`k get pods -o wide` more details about pods
`k describe pods <pod-name>`: full details (Events is important to check whats going on)
`k logs <pod-name> [-f | -c <container>]`
`k exec <pod-name> [-c <container> | <other-docker-exec-args>]`
`k get pods -L <comma-separated-label-list>` show exact labels
`k get pods -l|--selector <label>[== != ..]<value>` filter by label
`k get pods <pod-name> -o=jsonpath='<json-path>'` get exact info about pod (e.g. owner)
`k scale replicaset <rs-name> --replicates=<n>`
`k delete rs <rs-name> --cascade=orphan` delete ReplicaSet without pods
`k rollout status deployment <dep-name>` Monitor status of deployment
`k rollout undo deployment <dep-name>` Rollback a deployment change (go to prev ReplicaSet)
`k set image delpoyments <dep-name> <container-name>=<image-name>` update an image for a deployment's container
`k rollout history deployments <dep-name> [--revision <rev-name]` get list of all deployment revisions or get a revision details
`k edit <resource>` Edit resource manifest live
`k auth can-i <verb> <resource> --as <user>` test if user (e.g. `system:serviceaccounts:ns:user` can do the action)
`k <command> --as <user>` run command as user
`k scale --replicas=<n> [-f file.yml | replicaset <rs-name>] `
`k config set-context $(k config current-context) --namespace=<ns>` change default namespace
`k expose <resource> <resource-name> [options]` Expose a resource by creating a service matching the resource's labels
`k api-resources` gets a detailed list of all resources 
`k explain <resource>` gets details of a resource (can use `<resource>.spec` for more sub-field details) 
`k taint nodes <node> <key>=<value>:<taint-effect>` Add taint to a node
`k label node <node> <label>=<value>` Label node
`k get events -o wide` gets all events in the current namespace (including scheduling)

##### References
