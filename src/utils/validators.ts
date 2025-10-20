/**
 * Validation Layer - Form Validators
 * 
 * Centralized validation logic for all forms in the application.
 * Separates validation rules from components for better maintainability.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRule<T = unknown> {
  validate: (value: T) => boolean;
  message: string;
}

/**
 * Common validation rules
 */
export const ValidationRules = {
  required: (fieldName: string): ValidationRule<string> => ({
    validate: (value) => Boolean(value && value.trim()),
    message: `${fieldName} is required`
  }),

  email: (): ValidationRule<string> => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  }),

  phone: (): ValidationRule<string> => ({
    validate: (value) => /^[+]?[\d\s-()]+$/.test(value) && value.replace(/\D/g, '').length >= 10,
    message: 'Please enter a valid phone number (minimum 10 digits)'
  }),

  minLength: (min: number, fieldName: string): ValidationRule<string> => ({
    validate: (value) => value.length >= min,
    message: `${fieldName} must be at least ${min} characters`
  }),

  maxLength: (max: number, fieldName: string): ValidationRule<string> => ({
    validate: (value) => value.length <= max,
    message: `${fieldName} must not exceed ${max} characters`
  }),

  arrayNotEmpty: (fieldName: string): ValidationRule<unknown[]> => ({
    validate: (value) => Array.isArray(value) && value.length > 0,
    message: `Please select at least one ${fieldName}`
  })
};

/**
 * Validate a single field against multiple rules
 */
export function validateField<T>(value: T, rules: ValidationRule<T>[]): string | null {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
}

/**
 * Contact Form Validator
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Name validation
  const nameError = validateField(data.name, [
    ValidationRules.required('Name'),
    ValidationRules.minLength(2, 'Name')
  ]);
  if (nameError) errors.name = nameError;

  // Email validation
  const emailError = validateField(data.email, [
    ValidationRules.required('Email'),
    ValidationRules.email()
  ]);
  if (emailError) errors.email = emailError;

  // Subject validation
  const subjectError = validateField(data.subject, [
    ValidationRules.required('Subject'),
    ValidationRules.minLength(3, 'Subject')
  ]);
  if (subjectError) errors.subject = subjectError;

  // Phone validation
  const phoneError = validateField(data.phone, [
    ValidationRules.required('Phone'),
    ValidationRules.phone()
  ]);
  if (phoneError) errors.phone = phoneError;

  // Message validation
  const messageError = validateField(data.message, [
    ValidationRules.required('Message'),
    ValidationRules.minLength(10, 'Message')
  ]);
  if (messageError) errors.message = messageError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Export Inquiry Form Validator
 */
export function validateExportInquiryForm(data: {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  businessType: string;
  productsInterested: string[];
  orderQuantity: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Company name validation
  const companyError = validateField(data.companyName, [
    ValidationRules.required('Company name')
  ]);
  if (companyError) errors.companyName = companyError;

  // Contact person validation
  const contactError = validateField(data.contactPerson, [
    ValidationRules.required('Contact person')
  ]);
  if (contactError) errors.contactPerson = contactError;

  // Email validation
  const emailError = validateField(data.email, [
    ValidationRules.required('Email'),
    ValidationRules.email()
  ]);
  if (emailError) errors.email = emailError;

  // Phone validation
  const phoneError = validateField(data.phone, [
    ValidationRules.required('Phone'),
    ValidationRules.phone()
  ]);
  if (phoneError) errors.phone = phoneError;

  // Country validation
  const countryError = validateField(data.country, [
    ValidationRules.required('Country')
  ]);
  if (countryError) errors.country = countryError;

  // Business type validation
  const businessTypeError = validateField(data.businessType, [
    ValidationRules.required('Business type')
  ]);
  if (businessTypeError) errors.businessType = businessTypeError;

  // Products interested validation
  const productsError = validateField(data.productsInterested, [
    ValidationRules.arrayNotEmpty('product')
  ]);
  if (productsError) errors.productsInterested = productsError;

  // Order quantity validation
  const quantityError = validateField(data.orderQuantity, [
    ValidationRules.required('Order quantity')
  ]);
  if (quantityError) errors.orderQuantity = quantityError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Shipping Address Validator
 */
export function validateShippingAddress(data: {
  full_name: string;
  phone: string;
  address_line_1: string;
  city: string;
  state: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Full name validation
  const nameError = validateField(data.full_name, [
    ValidationRules.required('Full name'),
    ValidationRules.minLength(2, 'Full name')
  ]);
  if (nameError) errors.full_name = nameError;

  // Phone validation
  const phoneError = validateField(data.phone, [
    ValidationRules.required('Phone number'),
    ValidationRules.phone()
  ]);
  if (phoneError) errors.phone = phoneError;

  // Address validation
  const addressError = validateField(data.address_line_1, [
    ValidationRules.required('Address'),
    ValidationRules.minLength(5, 'Address')
  ]);
  if (addressError) errors.address_line_1 = addressError;

  // City validation
  const cityError = validateField(data.city, [
    ValidationRules.required('City')
  ]);
  if (cityError) errors.city = cityError;

  // State validation
  const stateError = validateField(data.state, [
    ValidationRules.required('State')
  ]);
  if (stateError) errors.state = stateError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generic form validator
 * Can be used for any form by defining custom rules
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ValidationRule<T[keyof T]>[]>
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    const error = validateField(data[field], fieldRules as ValidationRule<unknown>[]);
    if (error) {
      errors[field as string] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
