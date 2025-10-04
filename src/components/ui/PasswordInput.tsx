import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// The props interface remains the same.
type PasswordInputProps = {
  field: {
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    name: string;
    ref: React.Ref<any>;
  };
};

export function PasswordInput({ field }: PasswordInputProps) {
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State for showing the validation checklist (your original logic)
  const [isFocused, setIsFocused] = useState(false);
  const [showPasswordValidations, setShowPasswordValidations] = useState(false);

  // --- YOUR ORIGINAL VALIDATION LOGIC (UNCHANGED) ---
  const password = field.value ?? "";
  const passwordLength = password.length;

  const passwordValidations = [
    { valid: passwordLength >= 8, message: "At least 8 characters" },
    { valid: /[A-Z]/.test(password), message: "At least one uppercase letter" },
    { valid: /[a-z]/.test(password), message: "At least one lowercase letter" },
    { valid: /[0-9]/.test(password), message: "At least one number" },
    { valid: /[@$!%?&#*^]/.test(password), message: "At least one special character" },
  ];

  const allPasswordValid = passwordValidations.every((rule) => rule.valid);

  useEffect(() => {
    // This effect hides the validation list automatically when all rules pass and the input loses focus.
    if (allPasswordValid && !isFocused) {
      const timer = setTimeout(() => setShowPasswordValidations(false), 500);
      return () => clearTimeout(timer);
    }
  }, [allPasswordValid, isFocused]);
  // --- END OF ORIGINAL VALIDATION LOGIC ---


  return (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="pl-10"
            {...field}
            onFocus={(e) => {
              setIsFocused(true);
              setShowPasswordValidations(true);
              // You can optionally call field.onFocus(e) if needed by react-hook-form for some advanced cases, but it's often not necessary.
            }}
            onBlur={(e) => {
              setIsFocused(false);
              // Don't hide validations immediately on blur, let the useEffect handle it.
              field.onBlur(e);
            }}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </FormControl>
      {/* This will still show the Zod error message, e.g., "Password must be at least 8 characters" */}
      <FormMessage />

      {/* --- ADDED FEATURE: BINDING DISPLAY --- */}
      {/* This block shows the actual password text only when the eye icon is open. */}
      {/* {showPassword && password && (
        <div className="mt-2 p-2 border border-dashed border-input rounded-md bg-secondary/30 animate-fade-in">
          <p className="text-xs text-muted-foreground break-all">
            Password: <span className="font-medium text-foreground">{password}</span>
          </p>
        </div>
      )} */}

      {/* --- ORIGINAL FEATURE: VALIDATION CHECKLIST --- */}
      {/* This block shows the validation rules when the input is focused. */}
      {showPasswordValidations && (
        <div className="mt-2 text-sm space-y-1 animate-fade-in">
          <p className="text-xs text-muted-foreground font-semibold mb-1">Password must contain:</p>
          {passwordValidations.map((rule, index) => (
            <div key={index} className="flex items-center text-xs">
              <span className={`mr-2 ${rule.valid ? "text-green-500" : "text-muted-foreground"}`}>
                {rule.valid ? "✓" : "•"}
              </span>
              <span className={`${rule.valid ? "text-foreground" : "text-muted-foreground"}`}>
                {rule.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </FormItem>
  );
}