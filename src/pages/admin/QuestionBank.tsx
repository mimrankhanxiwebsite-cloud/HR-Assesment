import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Search, Code, BookOpen, ChevronDown, ChevronUp, Trash2, Edit } from 'lucide-react'

const MOCK_QUESTIONS = [
  { id: '1', title: 'What is closure in JavaScript?', type: 'mcq', difficulty: 'mid', category: 'Frontend Development', skill: 'JavaScript', points: 10 },
  { id: '2', title: 'Implement a binary search tree', type: 'coding', difficulty: 'senior', category: 'Computer Science', skill: 'Algorithms', points: 50 },
  { id: '3', title: 'React useState hook prevents re-renders', type: 'true_false', difficulty: 'junior', category: 'Frontend Development', skill: 'React', points: 5 },
  { id: '4', title: 'Explain CAP theorem in distributed systems', type: 'scenario', difficulty: 'advanced', category: 'System Design', skill: 'Architecture', points: 30 },
]

export default function QuestionBank() {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS)
  const [search, setSearch] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newQ, setNewQ] = useState({ title: '', type: 'mcq', difficulty: 'mid', category: '', skill: '', points: 10 })

  const filtered = questions.filter(q =>
    `${q.title} ${q.skill} ${q.category}`.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddQuestion = async () => {
    if (!newQ.title) return
    const { data, error } = await supabase.from('questions').insert({
      title: newQ.title,
      type: newQ.type,
      difficulty: newQ.difficulty,
      category: newQ.category,
      points: newQ.points,
      is_active: true,
    }).select().single()
    
    if (!error && data) {
      setQuestions(prev => [data, ...prev])
    } else {
      setQuestions(prev => [{ ...newQ, id: Date.now().toString() }, ...prev])
    }
    setShowAddForm(false)
    setNewQ({ title: '', type: 'mcq', difficulty: 'mid', category: '', skill: '', points: 10 })
  }

  const typeIcon = (type: string) => {
    if (type === 'coding') return <Code className="w-3.5 h-3.5" />
    return <BookOpen className="w-3.5 h-3.5" />
  }

  const difficultyColor: any = {
    junior: 'text-emerald-400 bg-emerald-900/30',
    mid: 'text-blue-400 bg-blue-900/30',
    senior: 'text-amber-400 bg-amber-900/30',
    advanced: 'text-red-400 bg-red-900/30',
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 text-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Question Bank</h1>
          <p className="text-slate-400 mt-1">Manage the master question library across all categories.</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-brand-600 hover:bg-brand-700">
          {showAddForm ? <ChevronUp className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showAddForm ? 'Cancel' : 'Add Question'}
        </Button>
      </div>

      {/* Add Question Form */}
      {showAddForm && (
        <Card className="bg-slate-900 border-slate-700 shadow-brand-md">
          <CardHeader>
            <CardTitle className="text-slate-100">New Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300">Question Title / Prompt</Label>
              <Input
                className="bg-slate-800 border-slate-700 text-slate-100"
                value={newQ.title}
                onChange={e => setNewQ({ ...newQ, title: e.target.value })}
                placeholder="Enter the question text..."
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-300">Type</Label>
                <select className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 text-slate-100 px-3 text-sm" value={newQ.type} onChange={e => setNewQ({ ...newQ, type: e.target.value })}>
                  <option value="mcq">MCQ</option>
                  <option value="true_false">True/False</option>
                  <option value="coding">Coding</option>
                  <option value="scenario">Scenario</option>
                  <option value="fill_blank">Fill-in-the-blank</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Difficulty</Label>
                <select className="w-full h-10 rounded-md border border-slate-700 bg-slate-800 text-slate-100 px-3 text-sm" value={newQ.difficulty} onChange={e => setNewQ({ ...newQ, difficulty: e.target.value })}>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Category</Label>
                <Input className="bg-slate-800 border-slate-700 text-slate-100" value={newQ.category} onChange={e => setNewQ({ ...newQ, category: e.target.value })} placeholder="e.g. Frontend" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-slate-300">Points</Label>
                <Input type="number" className="bg-slate-800 border-slate-700 text-slate-100" value={newQ.points} onChange={e => setNewQ({ ...newQ, points: parseInt(e.target.value) })} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddQuestion} className="bg-emerald-600 hover:bg-emerald-700">Save Question</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              className="pl-9 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              placeholder="Search questions by title, skill, or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr className="text-left">
                  <th className="p-4 font-medium">Question</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Difficulty</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Points</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 max-w-xs">
                      <div className="text-slate-100 font-medium truncate">{q.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{q.skill}</div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded w-fit capitalize">
                        {typeIcon(q.type)} {q.type.replace('_', '/')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${difficultyColor[q.difficulty]}`}>{q.difficulty}</span>
                    </td>
                    <td className="p-4 text-slate-400 text-xs">{q.category}</td>
                    <td className="p-4 text-amber-400 font-bold">{q.points} pts</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 h-7 px-2"><Edit className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 h-7 px-2"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
