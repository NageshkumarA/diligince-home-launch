import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Your extractNumericCountryCode function might become useful again in IndustryForm,
// or you can get the numeric code from selectedCountry.value.
export function extractNumericCountryCode(fullCountryNameWithValue: string): string | null {
  if (!fullCountryNameWithValue) return null;
  const match = fullCountryNameWithValue.match(/\(\s*(\+\d+)\s*\)/);
  return match ? match[1] : null; // e.g., extracts "+1" from "USA (+1)"
}

// Define and export Country Codes data - THIS STRUCTURE IS GOOD
export const countryCodes = [
  { name: "India (+91)", value: "+91", placeholder: "9876543210", minLength: 10, maxLength: 10 },
  { name: "USA (+1)", value: "+1", placeholder: "2025550123", minLength: 10, maxLength: 10 },
  { name: "Canada (+1)", value: "+1", placeholder: "4165550123", minLength: 10, maxLength: 10 },
  { name: "UK (+44)", value: "+44", placeholder: "7123456789", minLength: 9, maxLength: 10 },
  { name: "Australia (+61)", value: "+61", placeholder: "412345678", minLength: 9, maxLength: 9 },
  { name: "Germany (+49)", value: "+49", placeholder: "1712345678", minLength: 9, maxLength: 11 },
  { name: "France (+33)", value: "+33", placeholder: "612345678", minLength: 9, maxLength: 9 },
  { name: "Brazil (+55)", value: "+55", placeholder: "11912345678", minLength: 10, maxLength: 11 },
  { name: "South Africa (+27)", value: "+27", placeholder: "721234567", minLength: 9, maxLength: 9 },
  { name: "China (+86)", value: "+86", placeholder: "13812345678", minLength: 10, maxLength: 11 },
  { name: "Japan (+81)", value: "+81", placeholder: "9012345678", minLength: 9, maxLength: 10 },
  { name: "Singapore (+65)", value: "+65", placeholder: "91234567", minLength: 8, maxLength: 8 },
  { name: "UAE (+971)", value: "+971", placeholder: "501234567", minLength: 8, maxLength: 9 },
  // ... other countries
].sort((a, b) => a.name.localeCompare(b.name));

interface CountryCodeSelectFieldProps {
  control: Control<any>;
  name: string; // This is the RHF name for this field, e.g., "countryCode"
  label?: string;
  onValueChange?: (value: string) => void; // External handler, will receive country.name
  className?: string;
  triggerPlaceholder?: string;
  disabled?: boolean;
}

export function CountryCodeSelectField({
  control,
  name,
  label,
  onValueChange,
  className,
  triggerPlaceholder = "Code",
  disabled // ✅ make sure this is used!
}: CountryCodeSelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={(selectedValue) => {
              field.onChange(selectedValue);
              if (onValueChange) {
                onValueChange(selectedValue);
              }
            }}
            defaultValue={field.value}
            value={field.value}
            disabled={disabled} // ✅ pass here (may not work for all custom Selects but good practice)
          >
            <FormControl>
              <SelectTrigger disabled={disabled}> {/* ✅ this is the real fix */}
                <SelectValue placeholder={triggerPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}