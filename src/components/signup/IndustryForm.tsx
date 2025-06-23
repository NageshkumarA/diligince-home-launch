import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  sendVerificationOtp, 
  confirmVerificationOtp,
  registerIndustryUser 
} from '@/services/AuthServices';
import { countryCodes, CountryCodeSelectField } from "@/components/ui/CountryCodeSelect";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { industries } from "@/constants/Types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// UPDATED: Added Check icon for verification success
import { Phone, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { PasswordInput } from "@/components/ui/PasswordInput";
import axios from 'axios';
import { otppayload } from '@/services/AuthServices';


const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  otp: z.string()
    .min(4, { message: "OTP must be exactly 4 digits" })
    .max(4, { message: "OTP must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
  countryCode: z.string().min(1, { message: "Please select a country code" }),
  phone: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d*$/, { message: "Phone number must contain digits only" }),
  industryType: z.string().min(1, { message: "Industry type is required" }),
  customIndustryType: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((v) => v === true, { message: "You must accept the terms and conditions" }),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})
.refine(
  (data) => data.industryType !== "Others" || (data.customIndustryType && data.customIndustryType.trim().length > 0),
  { message: "Please specify your industry type", path: ["customIndustryType"] }
)
.superRefine((data, ctx) => {
  if (data.countryCode && data.phone.trim() !== "") {
    const selectedCountry = countryCodes.find(cc => cc.name === data.countryCode);
    if (!selectedCountry) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid country selected.", path: ["countryCode"] });
      return;
    }
    const fullPhone = `${selectedCountry.value}${data.phone}`;
    try {
      const phoneNumber = parsePhoneNumberFromString(fullPhone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone number for the selected country.", path: ["phone"] });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Phone number parsing error.", path: ["phone"] });
    }
  }
});

export function IndustryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  // NEW: State to manage OTP verification loading state
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: JSON.parse(localStorage.getItem("industryForm") || "null") || {
      companyName: "",
      email: "",
      otp: "",
      countryCode: "",
      phone: "",
      industryType: "",
      customIndustryType: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const companyNameValue = form.watch("companyName");
  const emailValue = form.watch("email");
  const selectedCountry = countryCodes.find(
    (cc) => cc.name === form.watch("countryCode")
  );
  const showCustomIndustryField = form.watch("industryType") === "Others";

  useEffect(() => {
    const sub = form.watch((values) => {
      localStorage.setItem("industryForm", JSON.stringify(values));
    });
    return () => sub.unsubscribe();
  }, [form]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = async () => {
    const email = form.getValues("email");
    const isEmailValid = await form.trigger("email");
    
    if (!isEmailValid) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (otpTimer > 0) {
      toast.warning(`Please wait ${otpTimer} seconds before requesting a new OTP`);
      return;
    }
    
    setIsSendingOtp(true);
    try {
      const otpPayload: otppayload = { email: email };
      await sendVerificationOtp(otpPayload);
      
      setOtpSent(true);
      setOtpVerified(false); // Reset verification status
      setOtpTimer(60);
      toast.success(`OTP sent to ${email}`);
      form.setFocus("otp");
    } catch (error) {
      let errorMessage = "Failed to send OTP";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsSendingOtp(false);
    }
  };

  // UPDATED: Renamed to handleVerifyOtp and added loading state + form error handling
  const handleVerifyOtp = async () => {
    const isOtpValid = await form.trigger("otp");
    if (!isOtpValid) return;

    const email = form.getValues("email");
    const otp = form.getValues("otp");
    
    setIsVerifyingOtp(true);
    try {
      await confirmVerificationOtp(email, otp);
      setOtpVerified(true);
      toast.success('Email verified successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Invalid or expired OTP.";
      setOtpVerified(false);
      toast.error("Verification Failed", { description: errorMessage });
      form.setError("otp", { type: "manual", message: errorMessage });
    } finally {
        setIsVerifyingOtp(false);
    }
  };

  // NEW: Function to allow user to edit email
  const handleEditEmail = () => {
  setOtpSent(false);
  setOtpVerified(false);
  setOtpTimer(0);
  form.setValue("otp", "");
  form.clearErrors("otp");
  form.setFocus("email");
};

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!otpVerified) {
      toast.error('Please verify your email first');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const effectiveIndustryType = values.industryType === "Others" 
        ? values.customIndustryType?.trim() 
        : values.industryType;
      const country = countryCodes.find(cc => cc.name === values.countryCode);
      const fullPhone = `${country?.value || ""}${values.phone}`;

      await registerIndustryUser({
        companyname: values.companyName,
        email: values.email,
        phonenumber: fullPhone,
        industrytype: effectiveIndustryType!,
        password: values.password,
      });
      
      localStorage.removeItem("industryForm");
      toast.success("Registration successful! Welcome to our platform");
      navigate("/signin?role=industry");
    } catch (error) {
      toast.error("Registration failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCountryCodeSelectionChange = () => {
    form.setValue("phone", "");
    form.clearErrors("phone");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Steel Industries Ltd." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {companyNameValue?.trim() !== "" && (
          <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
            <p className="text-xs text-muted-foreground">
              Company Name: <span className="font-medium text-foreground">{companyNameValue}</span>
            </p>
          </div>
        )}

        {/* === UPDATED EMAIL AND OTP SECTION === */}
{/* Email Field */}
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <div className="flex items-center gap-2">
        <FormControl>
          <Input 
            placeholder="your@company.com" 
            {...field} 
            disabled={otpSent} // Disable immediately after OTP is sent
          />
        </FormControl>
        
        {!otpSent ? (
          <Button
            type="button"
            variant="secondary"
            onClick={handleSendOtp}
            disabled={isSendingOtp || !emailValue.trim()}
            className="flex-shrink-0"
          >
            {isSendingOtp ? "Sending..." : "Send Code"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="link"
              className="p-1 h-auto flex-shrink-0 text-sm"
              onClick={handleEditEmail}
            >
              Change
            </Button>
            {otpVerified && (
              <span className="flex items-center text-sm font-medium text-green-600">
                <Check className="h-4 w-4 mr-1" />
                Verified
              </span>
            )}
          </div>
        )}
      </div>
      
      {emailValue.trim() !== "" && (
        <div className="mt-1 p-2 border border-dashed border-input rounded-md bg-secondary/30">
          <p className="text-xs text-muted-foreground">
            Email: <span className="font-medium text-foreground">{emailValue}</span>
          </p>
        </div>
      )}
      
      {otpTimer > 0 && (
        <p className="text-xs text-muted-foreground mt-2">
          Resend code in {otpTimer}s
        </p>
      )}
      {/* OTP Input - shown only after OTP is sent */}
      {otpSent && (
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="animate-fade-in">
              <FormLabel>Verification Code</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Enter 4-digit code"
                    maxLength={4}
                    {...field}
                    onChange={(e) => {
                      const otp = e.target.value.replace(/\D/g, '').slice(0, 4);
                      field.onChange(otp);
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isVerifyingOtp}
                  className="flex-shrink-0"
                >
                  {isVerifyingOtp ? "Verifying..." : "Verify"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormMessage />
    </FormItem>
  )}
/>
        {/* === END OF UPDATED SECTION === */}

        {/* Phone Number */}
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <div className="flex items-start space-x-2">
            <CountryCodeSelectField
              control={form.control}
              name="countryCode"
              onValueChange={handleCountryCodeSelectionChange}
              className="w-1/3 min-w-[120px]"
              triggerPlaceholder="Code"
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={selectedCountry ? selectedCountry.placeholder : "e.g. 9876543210"}
                        type="tel"
                        className="pl-10"
                        maxLength={selectedCountry?.maxLength}
                        {...field}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/\D/g, '');
                          const maxLength = selectedCountry?.maxLength;
                          field.onChange(maxLength && numericValue.length > maxLength ? numericValue.slice(0, maxLength) : numericValue);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormItem>

        {/* Industry Type */}
        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value !== "Others") {
                    form.setValue("customIndustryType", "");
                    form.clearErrors("customIndustryType");
                  }
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Custom Industry if Others */}
        {showCustomIndustryField && (
          <FormField
            control={form.control}
            name="customIndustryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specify Industry Type</FormLabel>
                <FormControl>
                  <Input placeholder="Please specify your industry type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput field={field} />
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    {...field}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Accept Terms */}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="acceptTerms"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="acceptTerms">
                  I accept the
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    terms and conditions
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150"
          disabled={isSubmitting || !otpVerified}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        {!otpVerified && (
          <p className="text-center text-sm text-muted-foreground">
            Please verify your email to create an account.
          </p>
        )}
      </form>
    </Form>
  );
}