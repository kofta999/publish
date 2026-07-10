2025-02-24 12:14
Tags: #cloud/aws
##### Content
## **AWS Pricing Calculator**
- **Purpose**: Free web-based tool for estimating AWS service costs.
- **Use Cases**:
  - Model solutions before implementation.
  - Explore service price points.
  - Plan AWS spending and identify cost-saving opportunities.

---

## **Tracking Costs**
### **Billing Dashboard**
- **Overview**: Provides a monthly view of AWS charges, including estimated charges for open billing periods.
- **Use Case**: Monitor current and historical billing information.

### **AWS Free Tier Dashboard**
- **Purpose**: Tracks usage of AWS free-tier services.
- **Note**: Some services (e.g., Elastic Beanstalk, CloudFormation) are free, but resources created may incur costs.

---

## **Cost Allocation Tags**
- **Purpose**: Track AWS costs at a granular level using tags.
- **Types of Tags**:
  - **AWS-Generated Tags**: Automatically applied (e.g., `aws:createdBy`).
  - **User-Defined Tags**: Custom tags created by users (e.g., `user:Environment`).
- **Use Case**: Organize and categorize costs by resource, team, or environment.

---

## **Tagging and Resource Groups**
- **Purpose**: Organize resources using tags and create resource groups.
- **Common Tags**: Name, Environment, Team.
- **Resource Groups**: Manage collections of resources with shared tags.
- **Tag Editor**: Efficiently manage tags across multiple resources.

---

## **Cost and Usage Reports**
- **Purpose**: Provides detailed insights into AWS costs and usage.
- **Features**:
  - Hourly or daily line items for each service category.
  - Includes metadata on services, pricing, and reservations (e.g., EC2 Reserved Instances).
  - Integrates with Athena, Redshift, or QuickSight for advanced analysis.

---

## **Cost Explorer**
- **Purpose**: Visualize and analyze cost and usage trends.
- **Features**:
  - Custom reports for cost and usage data.
  - Analyze data at total, monthly, or hourly/resource levels.
  - Forecast usage for up to 12 months based on historical data.
  - Identify cost-saving opportunities (e.g., Savings Plans).

---

## **Monitoring Costs**
### **Billing Alarms in CloudWatch**
- **Purpose**: Set alarms for billing metrics.
- **Limitations**:
  - Data stored in `us-east-1` region.
  - Reflects actual costs, not projections.
  - Less robust than AWS Budgets.

### **AWS Budgets**
- **Purpose**: Create budgets and set alarms for cost thresholds.
- **Types of Budgets**: Usage, Cost, Reservation, Savings Plans.
- **Features**:
  - Track Reserved Instance (RI) utilization.
  - Filter by service, account, tag, region, etc.
  - Free for 2 budgets; $0.02/day/budget thereafter.

### **AWS Cost Anomaly Detection**
- **Purpose**: Use machine learning to detect unusual spending patterns.
- **Features**:
  - Monitors services, accounts, tags, and cost categories.
  - Provides root-cause analysis and notifications via SNS.
  - No predefined thresholds required.

### **AWS Service Quotas**
- **Purpose**: Monitor service quota thresholds.
- **Use Case**: Set CloudWatch alarms to notify when nearing limits (e.g., Lambda concurrent executions).
- **Action**: Request quota increases or shut down resources to avoid limits.

---

## **Trusted Advisor**
- **Purpose**: Provides recommendations across six categories:
  - Cost Optimization
  - Performance
  - Security
  - Fault Tolerance
  - Service Limits
  - Operational Excellence
- **Availability**: Full features for Business or Enterprise Support plans.
- **Programmatic Access**: Use AWS Support API for automated checks.
##### References
