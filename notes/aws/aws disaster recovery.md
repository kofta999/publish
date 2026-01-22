2025-02-26 13:25
Tags: #cloud/aws
##### Content

## **Backup and Restore**
- **Purpose**: Regularly back up data and applications to prevent data loss.
- **Key Features**:
  - Enables quick restoration of data and applications in case of failure or disaster.
  - Ensures business continuity and data integrity.
- **Use Case**: Cost-effective solution for businesses with lower recovery time objectives (RTOs).

---

## **Pilot Light**
- **Purpose**: Maintain a minimal version of infrastructure (e.g., database, essential services) in standby mode.
- **Key Features**:
  - Enables rapid scaling to full capacity during a disaster.
  - Reduces costs compared to fully active backup infrastructure.
- **Use Case**: Balances cost and recovery time for critical systems.

---

## **Warm Standby**
- **Purpose**: Maintain a partially active secondary site with scaled-down infrastructure.
- **Key Features**:
  - Provides faster recovery times and greater capacity than Pilot Light.
  - Incurs higher costs due to the partially active state.
- **Use Case**: Suitable for businesses requiring faster recovery than Pilot Light but with moderate costs.

---

## **Multi-Site/Hot Site**
- **Purpose**: Maintain a fully redundant and active secondary site in a different geographic location.
- **Key Features**:
  - Offers the highest level of resilience and availability.
  - Provides the quickest recovery times and minimal downtime.
  - Incurs the highest costs.
- **Use Case**: Ideal for mission-critical applications requiring near-zero downtime.

---

## **AWS Elastic Disaster Recovery (DRS)**
- **Purpose**: Rapidly recover servers into AWS in case of data loss or disaster.
- **Key Features**:
  - Protects critical databases and enterprise applications.
  - Uses continuous block-level replication for real-time data protection.
  - Formerly known as "CloudEndure Disaster Recovery."
- **Use Case**: Ensures minimal downtime and data loss for critical workloads.

##### References
