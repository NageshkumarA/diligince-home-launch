

# Remove Trust Indicators from CTA Section

## Overview

Remove the "No credit card required", "14-day free trial", and "Cancel anytime" trust indicators from the CTA section on the homepage.

---

## Current State

The CTA section at the bottom of the homepage contains three trust indicator items:
- No credit card required
- 14-day free trial  
- Cancel anytime

---

## Change Required

**File:** `src/pages/Index.tsx`

**Location:** Lines 799-813

Remove the entire trust indicators div:

```tsx
{/* Trust Indicators */}
<div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-[#828282] text-sm">
  <div className="flex items-center space-x-2">
    <CheckCircle className="w-5 h-5 text-[#153b60]" />
    <span className="font-medium">No credit card required</span>
  </div>
  <div className="flex items-center space-x-2">
    <CheckCircle className="w-5 h-5 text-[#153b60]" />
    <span className="font-medium">14-day free trial</span>
  </div>
  <div className="flex items-center space-x-2">
    <CheckCircle className="w-5 h-5 text-[#153b60]" />
    <span className="font-medium">Cancel anytime</span>
  </div>
</div>
```

---

## Result

After removal, the CTA section will end with the "Sign In" and "Schedule Demo" buttons, providing a cleaner look without the promotional trust indicators.

