import type { PolicyUpdate } from '../types';

export const scenarioPolicy: PolicyUpdate = {
  policyId: 'POL-IAM-2026-012',
  title: 'Phishing-Resistant MFA Enforcement for Privileged and High-Risk Access',
  scope: 'group_with_local_override',
  scopeLabel: 'Group Baseline + Northstar Health Accelerated Rollout',
  humanReadable: `**Policy: Phishing-Resistant MFA for Privileged & High-Risk Access**

**Effective:** Immediate (subsidiary), 30-day group rollout

**Scope:** All privileged accounts, service accounts with interactive sign-in capability, and users accessing sensitive or regulated data.

**Requirements:**

1. All privileged and administrative accounts MUST authenticate using phishing-resistant methods (FIDO2 security keys or platform passkeys). Legacy MFA methods (SMS, voice, push-only) are no longer acceptable for these account tiers.

2. Conditional Access policies MUST require a compliant or hybrid Azure AD joined device for access to sensitive applications.

3. OAuth application consent MUST be restricted to admin-approved applications only. User self-service consent is prohibited for all entities.

4. Token lifetime for privileged sessions SHALL NOT exceed 1 hour. Continuous Access Evaluation (CAE) must be enabled.

5. Northstar Health Services SHALL implement these controls within 7 days for all clinical and administrative staff with access to patient data, ahead of the 30-day group baseline schedule.

**Exceptions:** Service accounts used exclusively for non-interactive automation may request a time-limited exception through the Group CISO office.`,

  previousPolicy: `**Policy: Multi-Factor Authentication for Administrative Access**

**Scope:** Administrative accounts only.

**Requirements:**

1. All administrative accounts must use multi-factor authentication.

2. Approved MFA methods include: authenticator app push notifications, SMS one-time codes, and voice callbacks.

3. Conditional Access policies should be applied where feasible.

4. OAuth consent is managed at the tenant level with default settings.`,

  policyAsCode: `{
  "properties": {
    "displayName": "Enforce Phishing-Resistant MFA — Privileged & High-Risk Access",
    "policyType": "Custom",
    "mode": "All",
    "description": "Enforces FIDO2/passkey authentication for privileged accounts, restricts OAuth consent, and mandates compliant device access for sensitive resources.",
    "metadata": {
      "category": "Identity & Access Control",
      "version": "2.0.0",
      "grcControlRef": "ISO27001:2022-A.8.5",
      "riskId": "RSK-2026-0087",
      "scope": "group_with_local_override"
    },
    "parameters": {
      "effect": { "type": "String", "defaultValue": "Deny" },
      "privilegedRoleTier": { "type": "Array", "defaultValue": ["GlobalAdmin", "PrivilegedRoleAdmin", "SecurityAdmin", "ExchangeAdmin"] },
      "maxTokenLifetimeMinutes": { "type": "Integer", "defaultValue": 60 },
      "requireCompliantDevice": { "type": "Boolean", "defaultValue": true },
      "allowLegacyMFA": { "type": "Boolean", "defaultValue": false }
    },
    "policyRule": {
      "if": {
        "anyOf": [
          {
            "field": "identity.role",
            "in": "[parameters('privilegedRoleTier')]"
          },
          {
            "field": "resource.classification",
            "in": ["Confidential", "HighlyConfidential", "RegulatedData"]
          }
        ]
      },
      "then": {
        "effect": "[parameters('effect')]",
        "details": {
          "requiredAuthenticationStrength": "phishingResistant",
          "allowLegacyMFA": "[parameters('allowLegacyMFA')]",
          "requireCompliantDevice": "[parameters('requireCompliantDevice')]",
          "maxTokenLifetimeMinutes": "[parameters('maxTokenLifetimeMinutes')]",
          "oauthConsentPolicy": "adminConsentOnly",
          "continuousAccessEvaluation": true
        }
      }
    }
  },
  "subsidiaryOverrides": {
    "northstar-health": {
      "rolloutTimeline": "7 days",
      "additionalScope": ["ClinicalStaff", "DataCustodian"],
      "enforceOnRegulatedData": true
    }
  }
}`,

  previousPolicyAsCode: `{
  "properties": {
    "displayName": "Require MFA for Admin Accounts",
    "policyType": "Custom",
    "mode": "All",
    "parameters": {
      "effect": { "type": "String", "defaultValue": "Audit" },
      "allowLegacyMFA": { "type": "Boolean", "defaultValue": true }
    },
    "policyRule": {
      "if": {
        "field": "identity.role",
        "in": ["GlobalAdmin", "PrivilegedRoleAdmin"]
      },
      "then": {
        "effect": "[parameters('effect')]",
        "details": {
          "requiredAuthenticationStrength": "mfa",
          "allowLegacyMFA": "[parameters('allowLegacyMFA')]"
        }
      }
    }
  }
}`,

  effectiveDate: '2026-04-16',
  rationale:
    'Critical threat intelligence indicates active exploitation of legacy MFA weaknesses through AI-assisted phishing and AiTM proxy attacks targeting the Nordic region. Immediate uplift of authentication controls required to mitigate identity compromise risk.',
};
