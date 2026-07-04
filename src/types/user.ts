export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = "customer" | "admin" | "super_admin";

export interface UserProfile {
  userId: string;
  phone?: string;
  dob?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  preferences?: Record<string, unknown>;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface AddressFormData {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}
