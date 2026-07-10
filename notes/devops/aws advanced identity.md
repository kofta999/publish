2025-02-26 12:52
Tags: #cloud/aws
##### Content
## AWS STS (Security Token Service)
- **Purpose**: Generates temporary, limited-privilege credentials for users or services.
- **Key Features**:
  - Short-term credentials with configurable expiration.
  - Use cases:
    - Identity federation.
    - IAM roles for cross/same account access.
    - EC2 instance access.
- **Benefit**: Enhances security by minimizing the use of long-term credentials.

---

## Amazon Cognito
- **Purpose**: Provides authentication, authorization, and user management for web and mobile apps.
- **Key Features**:
  - Scalable solution for millions of users.
  - Eliminates the need to create IAM users for app authentication.
  - Supports social identity providers (e.g., Google, Facebook) and enterprise identity providers (e.g., SAML).
- **Use Case**: Simplifies user sign-up, sign-in, and access control for applications.

---

## Microsoft Active Directory (AD)
- **Purpose**: Centralized security management for Windows workloads.
- **Key Features**:
  - Database of objects (e.g., user accounts, computers, printers, security groups).
  - Enables centralized account creation and permission assignment.
- **Integration with AWS**: Seamlessly manage access for hybrid cloud environments.

---

## AWS Directory Services
- **Purpose**: Simplifies setup and management of directory services (e.g., AD, LDAP).
- **Options**:
  - **AWS Managed Microsoft AD**:
    - Create and manage AD in AWS.
    - Supports MFA and trust connections with on-premise AD.
  - **AD Connector**:
    - Acts as a proxy to redirect to on-premise AD.
    - Supports MFA; users managed on-premise.
  - **Simple AD**:
    - AD-compatible managed directory in AWS.
    - Cannot join with on-premise AD.
- **Use Case**: Ideal for hybrid cloud environments requiring directory services.

---

## AWS IAM Identity Center (formerly AWS Single Sign-On)
- **Purpose**: Centralized identity management across AWS accounts and applications.
- **Key Features**:
  - Single sign-on (SSO) for:
    - AWS accounts in AWS Organizations.
    - Business cloud applications (e.g., Salesforce, Microsoft 365).
    - SAML 2.0-enabled applications.
  - Supports logging into EC2 Windows instances.
  - Integrates with:
    - Built-in identity store.
    - Third-party identity providers (e.g., Active Directory, Okta, OneLogin).
- **Benefit**: Simplifies access management and improves security.

##### References
