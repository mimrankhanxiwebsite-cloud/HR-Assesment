import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, Download, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const CERTIFICATIONS = [
  { title: 'React & TypeScript Certified', level: 'Senior', date: '2026-06-15', score: 92, badge: '⚛️', id: 'cert-001' },
  { title: 'Node.js Backend Specialist', level: 'Mid-Level', date: '2026-04-10', score: 88, badge: '⚙️', id: 'cert-002' },
]

const SKILLS = [
  { name: 'React', level: 95, endorsements: 12 },
  { name: 'TypeScript', level: 90, endorsements: 9 },
  { name: 'Node.js', level: 82, endorsements: 7 },
  { name: 'PostgreSQL', level: 75, endorsements: 5 },
  { name: 'System Design', level: 68, endorsements: 3 },
  { name: 'Docker', level: 60, endorsements: 2 },
]

export default function Certifications() {
  const { user } = useAuthStore()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-950">Certifications & Skills</h1>
        <p className="text-muted-foreground mt-2">Your verified competencies and earned certifications.</p>
      </div>

      {/* Earned Certifications */}
      <div>
        <h2 className="text-xl font-bold mb-4">Earned Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <Card key={cert.id} className="relative overflow-hidden shadow-brand-md border-t-4 border-t-amber-400">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full -translate-y-8 translate-x-8" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl mb-2">{cert.badge}</div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded">{cert.level}</span>
                      <span className="text-sm text-muted-foreground">Issued {cert.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">{cert.score}%</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex gap-3">
                <Button variant="outline" className="flex-1" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Unlock more card */}
          <Card className="border-dashed border-2 border-muted flex items-center justify-center min-h-[200px]">
            <div className="text-center p-6">
              <Award className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm font-medium text-muted-foreground">Complete assessments to earn more certifications</p>
              <Link to="/candidate/assessments">
                <Button variant="outline" size="sm" className="mt-3">Browse Assessments</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Skills Benchmarking */}
      <div>
        <h2 className="text-xl font-bold mb-4">Verified Skills</h2>
        <Card className="shadow-brand-sm">
          <CardContent className="p-6 space-y-5">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold">{skill.name}</span>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs">
                    <span>{skill.endorsements} endorsements</span>
                    <span className="font-bold text-brand-700">{skill.level}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
