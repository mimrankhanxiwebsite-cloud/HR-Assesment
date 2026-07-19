import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const orgRegisterSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type OrgRegisterFormValues = z.infer<typeof orgRegisterSchema>

export default function RegisterOrg() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const form = useForm<OrgRegisterFormValues>({
    resolver: zodResolver(orgRegisterSchema),
    defaultValues: { companyName: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (data: OrgRegisterFormValues) => {
    setIsLoading(true)
    setError(null)
    
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          role: 'org_admin'
        }
      }
    })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    if (authData.user) {
      // 2. Insert into users table
      const { error: dbError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: data.email,
        role: 'org_admin',
        first_name: data.firstName,
        last_name: data.lastName
      })

      if (!dbError) {
        // 3. Create organization
        const { data: orgData, error: orgError } = await supabase.from('organizations').insert({
          name: data.companyName,
          subscription_status: 'trial'
        }).select().single()

        if (orgData && !orgError) {
          // 4. Link user to organization as org_admin
          await supabase.from('org_members').insert({
            org_id: orgData.id,
            user_id: authData.user.id,
            role: 'org_admin'
          })
        }
      }
    }

    setSuccess(true)
    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4">
        <Card className="w-full max-w-md shadow-brand-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-emerald-600">Organization Created!</CardTitle>
            <CardDescription className="text-center">
              Please check your email to verify your account before logging in.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/login')}>Go to Login</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-50 p-4 py-12">
      <Card className="w-full max-w-xl shadow-brand-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight text-center">Register Your Organization</CardTitle>
          <CardDescription className="text-center">
            Start assessing technical talent with our enterprise platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" {...form.register('companyName')} />
              {form.formState.errors.companyName && (
                <p className="text-sm text-destructive">{form.formState.errors.companyName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Admin First Name</Label>
                <Input id="firstName" {...form.register('firstName')} />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Admin Last Name</Label>
                <Input id="lastName" {...form.register('lastName')} />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="admin@company.com" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...form.register('password')} />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {error && <div className="text-sm font-medium text-destructive">{error}</div>}
            
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Organization..." : "Create Organization Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2 text-sm text-muted-foreground">
          <div>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
          <div>
            Are you a candidate?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
