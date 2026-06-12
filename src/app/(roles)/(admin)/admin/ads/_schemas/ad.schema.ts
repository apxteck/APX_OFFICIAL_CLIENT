import { z } from "zod";

const baseSchema = z.object({
  placement: z.string().min(1, "Placement is required"),
  isActive: z.boolean(),
});

export const adSchema = z.discriminatedUnion("adType", [
  baseSchema.extend({
    adType: z.literal("CLIENT"),
    clientName: z.string().min(1, "Client name is required"),
    targetUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    // For file uploads, we can use z.any() and handle required logic in the form/hook,
    // or we can just leave it out of the strict Zod string schema if we handle it via state/ref.
    // However, if we use RHF, we can register it or manage it externally.
    // Let's use an external state for the File for simplicity, or include it here:
    bannerFile: z.any().optional(),
  }).refine((data) => {
    // If we wanted strict URL validation:
    if (data.targetUrl && !data.targetUrl.startsWith('http')) {
      data.targetUrl = `https://${data.targetUrl}`;
    }
    return true;
  }),
  baseSchema.extend({
    adType: z.literal("GOOGLE"),
    adCode: z.string().min(1, "AdSense code is required"),
  })
]);

export type AdFormData = z.infer<typeof adSchema>;

// Default values generator
export const getDefaultAdFormValues = (targetPage: "LIST" | "POST" = "POST"): AdFormData => ({
  adType: "CLIENT",
  placement: targetPage === "LIST" ? "BLOG_LIST_TOP" : "BLOG_POST_TOP",
  clientName: "",
  targetUrl: "",
  isActive: true,
});
