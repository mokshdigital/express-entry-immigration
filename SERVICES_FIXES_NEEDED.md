# Services Module - Critical Fixes Needed

## Issue 1: Service Pages Not Working

**Problem**: TypeScript errors in service detail page due to incorrect field names in ACF types.

**Root Cause**: The `Service` type definition doesn't match the actual ACF field structure from WordPress.

**Fix Required**: Update `@/types/wordpress.ts` Service interface:

```typescript
// Current (WRONG):
acf: {
    service_child_of: number;
    requirements: string;
    process_description: string;  // WRONG
    processing_time: string;
}

// Should be (CORRECT):
acf: {
    service_child_of: number;
    requirements: string;
    application_process_description: string;  // CORRECT
    application_process_steps?: Array<{
        step_title: string;
        step_description: string;
        estimated_duration?: string;
    }>;
    processing_time: string;
}
```

Also need to add:
- `featured_image_url?: string;` to Service interface
- Fix `service_category` type (should be array of category objects with slug, not just numbers)

## Issue 2: Contact Form Yellow Color

**Files to Update**:
1. `src/components/forms/ContactForm.tsx` - Lines 187, 201
   - Change `text-brand-gold` to `text-brand-red`
   - Change `bg-brand-gold` to `bg-brand-red`

## Issue 3: Mega Menu Not Showing Services

**Status**: Should be working after navigation.ts fix. Need to verify the Header is fetching categories correctly.

**Check**: Ensure `getServiceCategories()` is returning data and `buildNavigation()` is being called in Header.tsx

---

## Quick Fix Steps:

1. Update Service type definition in `types/wordpress.ts`
2. Fix contact form colors (2 lines)
3. Verify mega menu data flow
