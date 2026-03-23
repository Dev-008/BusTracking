/**
 * Admin Users Configuration
 * List of email addresses that have admin privileges
 */

export const ADMIN_EMAILS = [
  'admin@smartbus.com',
  'admin@example.com',
  'support@smartbus.com'
];

export function isAdminUser(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
