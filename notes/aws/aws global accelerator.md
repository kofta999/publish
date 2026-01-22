2025-02-22 13:53
Tags: #cloud/aws
##### Content
Uses AWS's global network to find the best routing path, resulting in ~60% performance improvements

The application gets 2 special anycast IPs, directing traffic through edge locations
Then traffic is routed from edge locations to your app

#### VS [[aws cloudfront]]
- Both uses AWS global network and its edge locations
- Both integrate with AWS Shield
- CF acts as a CDN (best for static content)
- GA does not cache content but proxies packets at the edge in 1 or more regions

##### References
