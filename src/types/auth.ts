export interface RegistrationData {
  email?: string;
  username?: string;
  password?: string;
  google?: boolean;
  roles?: string[];
  industry?: string | null;
  referral?: string | null;
}