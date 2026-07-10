2025-06-23 11:16
Tags: #web
##### Content
- A protocol for real-time communication
- Used in browsers, mobile and IoT
- Has a standard, simple API for browsers
- Depends on UDP, uses peer-to-peer connection

### How it works
- Consider A and B devices
- Both collect info about themselves (security params, supported media types, etc)
- Then, by whatever method, A and B exchange this data (commonly a WebSocket server) (called signaling)
- Then they find an optimal path to communicate
- Then data exchange happens

### STUN (Session Traversal Utilities for NAT)
- Makes the host know its public IP through NAT
- Works for all [[nat translation types]] except symmetric
- STUN server ports are 3478 and 5349 for TLS
- Cheap to maintain

### TURN (Traversal Using Relays around NAT)
- Used in case we have Symmetric NAT
- It's just a server that relays (forwards) packets between A and B
- TURN server ports are 3478 and 5349 for TLS (same as STUN)
- Expensive to maintain and run

### ICE (Interactive Connectivity Establishment)
- Collects all available connection candidates (local IP addresses, reflexive addresses (STUN) and relayed addresses (TURN)) and are called ICE candidates
- Then all the collected info are sent to the remote peer (B) via SDP

### SDP (Session Description Protocol)
- Describes ICE candidates, networking options, media options, security options etc
- It's more like a format than a "protocol"
- The goal is to take the generated SDP and send it "somehow" to the other party

### Signaling
- Sending the SDP that we generated to the other party
- Can be done with whatever means (tweet, QR, WebSockets, HTTP Requests)


### Pros and Cons
- Pros
	- P2P = low latency for high bandwidth content
	- Standardized API
- Cons
	- Maintaining STUN and TURN servers
	- P2P falls apart in case of multiple participants


##### References
https://www.youtube.com/watch?v=FExZvpVvYxA
