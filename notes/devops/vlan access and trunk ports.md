2025-09-02 10:47
Tags: #cloud
##### Content
* **VLANs (Virtual LANs)**: VLANs allow a single physical switch to be divided into multiple virtual switches, each with its own broadcast domain. This helps to segment a network, reduce traffic, and improve security. Devices in different VLANs cannot communicate without a router.

* **Access vs. Trunk Ports**:
    * **Access Ports**: These ports belong to a single VLAN and are used to connect to end devices like computers or printers.
    * **Trunk Ports**: These ports can carry traffic for multiple VLANs and are used to connect switches to each other. They use the **802.1Q protocol** to "tag" frames with VLAN information.

* **Native VLAN**: The video also introduces the concept of a native VLAN, which is a special VLAN on a trunk link that sends traffic untagged. Both switches on the link must agree on this VLAN to prevent communication issues.

##### References
https://youtu.be/ox1mii0Ox8I?list=PLZmPGUyBFvUrvoa-NYzcUWFpxoZR11id_