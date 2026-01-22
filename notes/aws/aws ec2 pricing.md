2025-02-08 13:49
Tags: #cloud/aws 
##### Content
#### On-Demand Instances
- **Standard rate**: No discounts or commitments.
- **Use case**: Ideal for development/testing or unpredictable workloads.

#### Reserved Instances (RI)
- **Commitment**: 1 or 3 years.
- **Discount**: Up to 75% compared to On-Demand.
- **Use case**: Suitable for predictable workloads.
- **Payment options**:
  - All upfront
  - Partial upfront
  - No upfront
- **Types**:
  - **Standard RI**:
    - Allows changes to Availability Zone (AZ), instance size (Linux), and networking type.
    - Uses the `ModifyReservedInstances` API.
  - **Convertible RI**:
    - Allows all changes in Standard RI plus changes to instance family, OS, tenancy, and payment options.
    - Uses the `ExchangeReservedInstances` API.

#### Scheduled Reserved Instances
- **Use case**: Match capacity reservations to recurring schedules.
- **Minimum commitment**: 1200 hours per year.
- **Note**: This option will be deprecated.

#### Spot Instances
- **Discount**: Up to 90% compared to On-Demand.
- **Risk**: Instances can be terminated at any time.
- **Types**:
  - **Spot Instance**: One or more EC2 instances.
  - **Spot Fleet**: Launches and maintains a specified number of Spot/On-Demand instances to meet target capacity.
  - **EC2 Fleet**: Launches and maintains a specified number of Spot/On-Demand/Reserved instances in a single API call.
  - **Spot Block**: Uninterrupted instances for 1–6 hours (30–45% cheaper than On-Demand).

#### Dedicated Instances
- **Isolation**: Physical isolation at the host hardware level.
- **Pricing**: Pay per instance.

#### Dedicated Hosts
- **Isolation**: Physical server dedicated for your use.
- **Features**: Socket/core visibility.
- **Pricing**: Pay per host.
- **Use case**: Ideal for workloads with server-bound software licenses (most expensive option).

#### Savings Plans
- **Commitment**: Consistent amount of usage (EC2 + Fargate + Lambda).
- **Pricing**: Pay by $/hour.
- **Types**:
  - **Compute Savings Plan**:
    - Applies to EC2, Fargate, and Lambda.
    - Flexible across regions, instance families, sizes, tenancy, and OS.
  - **EC2 Savings Plan**:
    - Applies only to EC2.
    - Limited to a selected region and instance family, but flexible across sizes, tenancy, and OS.

#### Billing Details
- **Per-second billing**:
  - Minimum of 1 minute.
  - Applies to Amazon Linux, Ubuntu, and On-Demand/Reserved/Spot instances + volumes.
- **Per-hour billing**:
  - Applies to commercial Linux distros and Windows.

![[Pasted image 20250208140005.png]]
##### References
https://youtu.be/cPddsqctOY8