import {z} from "zod";


const emailSchema = z.string().email("Enter a valid email");

const phoneSchema = z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number");

export const loginSchema = z.object({
  identifier: z.union([emailSchema, phoneSchema]),
  password: z
    .string()
    .min(6, "Enter password (minimum 6 characters)"),
});



export const guardOnboardingSchema = z.object({
  name: z.string().min(2, "Name is required"),

  age: z.coerce
    .number()
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65"),

  gender: z.enum(["male", "female", "other"], {
    message: "Select a gender",
  }),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  email: z.string().email("Enter a valid email"),

  experience: z.coerce
  .number()
  .min(1, "Experience is required"),
  base: z.string().min(2, "Operating location is required"),

  role: z.enum([ "Normal bodyguard",
  "Pistol trained",
  "Rifle trained"], {
    message: "Select a role",
  }),

  aadhaar: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}$/, "Enter a valid 12-digit Aadhaar"),

  armedLicense: z.string().optional(),

  drivingLicense: z.any().optional(),

  educationCertificate: z.instanceof(File, {
  message: "Education certificate is required",
}),

  hasTrainingCert: z.boolean().optional(),

  trainingCertificate: z.any().optional(),

  note: z.string().min(10, "Please add a brief note"),
});

export type OnboardingFormData = z.input<typeof guardOnboardingSchema>;



export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Minimum 2 characters required"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),

  preferredGuard: z
    .string()
    .optional(),

  serviceType: z
    .string()
    .min(1, "Service type is required"),

  city: z
    .string()
    .min(1, "City is required"),

  startDate: z
    .string()
    .min(1, "Start date is required"),

  duration: z
    .string()
    .min(1, "Duration is required"),

  brief: z
    .string()
    .min(10, "Brief must be at least 10 characters"),
});

export type enquiryData = z.input<typeof enquirySchema>;
