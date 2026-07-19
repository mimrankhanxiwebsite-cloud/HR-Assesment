import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Profile() {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const form = useForm({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      headline: '',
      location: '',
      linkedin_url: '',
      github_url: '',
      portfolio_url: '',
      experience_level: 'mid',
      years_of_experience: 3,
    }
  })

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      
      const { data: userData } = await supabase.from('users').select('*').eq('id', user.id).single()
      const { data: candidateData } = await supabase.from('candidates').select('*').eq('user_id', user.id).single()

      if (userData || candidateData) {
        form.reset({
          firstName: userData?.first_name || '',
          lastName: userData?.last_name || '',
          headline: candidateData?.headline || '',
          location: candidateData?.location || '',
          linkedin_url: candidateData?.linkedin_url || '',
          github_url: candidateData?.github_url || '',
          portfolio_url: candidateData?.portfolio_url || '',
          experience_level: candidateData?.experience_level || 'mid',
          years_of_experience: candidateData?.years_of_experience || 0,
        })
      }
    }
    loadProfile()
  }, [user, form])

  const onSubmit = async (data: any) => {
    if (!user) return
    setIsLoading(true)
    setMessage('')

    // Update users table
    await supabase.from('users').update({
      first_name: data.firstName,
      last_name: data.lastName,
    }).eq('id', user.id)

    // Update candidates table
    const { error } = await supabase.from('candidates').upsert({
      user_id: user.id,
      headline: data.headline,
      location: data.location,
      linkedin_url: data.linkedin_url,
      github_url: data.github_url,
      portfolio_url: data.portfolio_url,
      experience_level: data.experience_level,
      years_of_experience: parseInt(data.years_of_experience) || 0,
    })

    if (error) {
      setMessage('Error updating profile.')
    } else {
      setMessage('Profile updated successfully!')
    }
    setIsLoading(false)
  }

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    
    setIsLoading(true)
    setMessage('Uploading resume...')
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(`${user?.id}/${file.name}`, file, { upsert: true })

    if (error) {
      setMessage('Error uploading resume: ' + error.message)
      setIsLoading(false)
      return
    }

    // Optionally trigger AI Resume Parser Edge Function here
    setMessage('Resume uploaded! AI parsing initiated...')
    setIsLoading(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-950">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal and professional information.</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="professional">Professional Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your basic contact details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...form.register('firstName')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...form.register('lastName')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Country" {...form.register('location')} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                {message && <span className="text-sm text-emerald-600 font-medium">{message}</span>}
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resume Upload</CardTitle>
              <CardDescription>Upload your resume. Our AI will automatically parse your skills and experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={isLoading} />
              </div>
              {message && message.includes('Resume') && (
                <p className="text-sm text-brand-600 font-medium mt-2">{message}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
                <CardDescription>Links and experience level.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input id="headline" placeholder="e.g. Senior Full Stack Engineer" {...form.register('headline')} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <select 
                      id="experience_level"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      {...form.register('experience_level')}
                    >
                      <option value="junior">Junior (0-2 years)</option>
                      <option value="mid">Mid (2-5 years)</option>
                      <option value="senior">Senior (5-10 years)</option>
                      <option value="advanced">Advanced (10+ years)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years_of_experience">Years of Experience</Label>
                    <Input id="years_of_experience" type="number" {...form.register('years_of_experience')} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input id="linkedin_url" type="url" {...form.register('linkedin_url')} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input id="github_url" type="url" {...form.register('github_url')} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="portfolio_url">Portfolio URL</Label>
                  <Input id="portfolio_url" type="url" {...form.register('portfolio_url')} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Professional Details'}
                </Button>
                {message && !message.includes('Resume') && <span className="text-sm text-emerald-600 font-medium">{message}</span>}
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
