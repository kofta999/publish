Log analytics workspaces
- analytics logs
	- 31 / 90 d, up to 2y
	- full KQL no cost or limit
	- pay for ingestion and retention (after 90d)
	- can do alerting
- Basic Logs
	- 8d only -> 30d interactive currently
	- limited set of KQL (full single-table KQL, lookup), pay for queries
	- cost much less for ingestion ~1/5
	- designed for debugging / troubleshooting
- Analytics is the default, then you change table type to basic if needed
- Long Term Retention (Archive Logs, previously)
	- up to 7y -> 12y currently
	- pay for retention
	- can search through adding it to a higher tier as a table (\_SRCH), you pay for data scanned and result ingestion. max 1y window
	- can restore to a table (\_RST), doesn't have retention. you pay until deletion or archive log expires
- Auxiliary Logs
	- 30d interactive
	- ~1/5 cost of basic
	- full single table KQL, lookup, pay for queries
	- only for custom log tables
	- cannot get transformed to from analytics logs
	- can search from long term retention but cannot restore
- Note: Search tables can come from long term retention, basic and auxiliary logs (all stored in analytics logs)

Summary Rules
- Run a KQL query on a cadence (20mins - 1d) mostly done on basic and auxiliary then stored in analytics logs (\_CL table)