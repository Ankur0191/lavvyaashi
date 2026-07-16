import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const addressSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  line1: z.string().min(5, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormValues) => void;
  defaultValues?: Partial<AddressFormValues>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "India",
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Full Name
          </label>
          <input
            {...register("name")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            {...register("phone")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
          Address Line 1
        </label>
        <input
          {...register("line1")}
          className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
        {errors.line1 && <p className="mt-1 text-xs text-red-500">{errors.line1.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
          Address Line 2 (Optional)
        </label>
        <input
          {...register("line2")}
          className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            City
          </label>
          <input
            {...register("city")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            State
          </label>
          <input
            {...register("state")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            PIN / Zip
          </label>
          <input
            {...register("zip")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip.message}</p>}
        </div>
        <div className="col-span-1">
          <label className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
            Country
          </label>
          <input
            {...register("country")}
            className="w-full bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
          {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          className="w-full bg-text text-bg-primary py-3 rounded-md text-sm font-medium uppercase tracking-widest hover:bg-text-muted transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
