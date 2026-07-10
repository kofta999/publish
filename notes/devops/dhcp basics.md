2025-08-31 15:23
Tags: #cloud 
##### Content
### DHCP Explained

DHCP (Dynamic Host Configuration Protocol) is the technology that automatically assigns IP addresses to devices on a network [[00:00](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=0)]. There are two ways to assign an IP address to a computer or device on a network:

1.  **Static IP**: A manual process where a user assigns a computer or device with an IP address, subnet mask, default gateway, and DNS server. This method can be time-consuming and prone to errors [[00:34](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=34)].
2.  **Dynamic IP**: An automatic process where a computer gets an IP address from a DHCP server [[01:45](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=105)].

### How DHCP Works
A computer set to obtain an IP address automatically broadcasts a request for an IP address on the network. The DHCP server then assigns an IP address from its pool and delivers it to the computer. The DHCP server can also assign a subnet mask, default gateway, and DNS server [[02:32](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=152)].

### DHCP Scope
A DHCP server assigns IP addresses from a scope, which is a range of IP addresses that a DHCP server can hand out. This range can be customized by the network administrator [[03:43](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=223)].

### IP Address Leasing
DHCP servers assign IP addresses as a lease, meaning the computer doesn't own the IP address. A lease is the amount of time an IP address is assigned to a computer. This is to ensure that the DHCP server does not run out of IP addresses. If a computer is removed from the network, the lease expires, and the IP address can be used for another computer [[04:36](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=276)].

### DHCP Reservations
A reservation ensures that a specific computer or device, identified by its MAC address, will always be given the same IP address. This is typically used for devices like printers, servers, and routers [[08:00](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=480)].

### Where DHCP Runs
DHCP is a service that runs on servers like Microsoft or Linux servers, and also on many routers, including business and home office routers [[09:07](http://www.youtube.com/watch?v=e6-TaH5bkjo&t=547)].

##### References
https://www.youtube.com/watch?v=e6-TaH5bkjo