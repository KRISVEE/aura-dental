"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useBookingWizard } from "@/contexts/BookingContext"
import { patientDetailsSchema, PatientDetailsFormData } from "@/lib/validations/booking"

export function StepDetails() {
  const { patientDetails, setPatientDetails, nextStep } = useBookingWizard()

  const { register, handleSubmit, formState: { errors } } = useForm<PatientDetailsFormData>({
    resolver: zodResolver(patientDetailsSchema),
    defaultValues: patientDetails || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
    }
  })

  const onSubmit = (data: PatientDetailsFormData) => {
    setPatientDetails(data)
    nextStep()
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-navy mb-2">Your Details</h2>
        <p className="text-charcoal-500">How can we reach you?</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="firstName">First Name</label>
            <Input id="firstName" placeholder="Jane" {...register("firstName")} error={errors.firstName?.message} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="lastName">Last Name</label>
            <Input id="lastName" placeholder="Doe" {...register("lastName")} error={errors.lastName?.message} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="email">Email Address</label>
          <Input id="email" type="email" placeholder="jane@example.com" {...register("email")} error={errors.email?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="phone">Phone Number (UK)</label>
          <Input id="phone" type="tel" placeholder="07123 456789" {...register("phone")} error={errors.phone?.message} />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5" htmlFor="dob">Date of Birth</label>
          <Input id="dob" type="date" {...register("dob")} error={errors.dob?.message} />
        </div>

        <div className="pt-6">
          <Button type="submit" className="w-full">
            Continue to Deposit
          </Button>
        </div>
      </form>
    </div>
  )
}
