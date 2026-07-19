import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, MapPin, Award, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function CandidateSearch() {
  const [candidates, setCandidates] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would use pgvector or complex join queries
    // Mocking for UI demonstration based on schema
    setCandidates([
      { id: '1', name: 'Ahmed Khan', role: 'Senior React Developer', score: 98, location: 'Remote', skills: ['React', 'TypeScript', 'Node.js'] },
      { id: '2', name: 'Sarah Jenkins', role: 'Full Stack Engineer', score: 96, location: 'New York, NY', skills: ['PostgreSQL', 'React', 'Docker'] },
      { id: '3', name: 'David Chen', role: 'Backend Dev', score: 94, location: 'San Francisco, CA', skills: ['Python', 'AWS', 'System Design'] },
      { id: '4', name: 'Elena Rodriguez', role: 'UI/UX Engineer', score: 91, location: 'Remote', skills: ['Figma', 'CSS', 'React'] },
    ])
    setIsLoading(false)
  }, [])

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills.some((s: string) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-950">Talent Search & Ranking</h1>
          <p className="text-muted-foreground mt-2">Find and benchmark candidates across the platform.</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="shadow-brand-sm">
        <CardContent className="p-4 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, role, or skills..." 
              className="pl-9 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-12 px-6">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate, i) => (
          <Card key={candidate.id} className={`shadow-sm transition-all hover:shadow-md ${candidate.name === 'Ahmed Khan' ? 'border-amber-400 bg-amber-50/10' : ''}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xl font-bold">
                    {candidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{candidate.name}</h3>
                      {candidate.name === 'Ahmed Khan' && (
                        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Award className="w-3 h-3" /> Top Ranked
                        </span>
                      )}
                    </div>
                    <p className="text-brand-600 font-medium">{candidate.role}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {candidate.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-md w-full">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {candidate.skills.map((skill: string) => (
                      <span key={skill} className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[120px]">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">{candidate.score}</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Composite Score</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Compare</Button>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No candidates found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
