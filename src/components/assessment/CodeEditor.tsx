import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useAssessmentStore } from '@/store/assessmentStore'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Play, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface CodeEditorProps {
  questionId: string
  initialCode: string
  expectedOutput?: string
}

export default function CodeEditor({ questionId, initialCode, expectedOutput }: CodeEditorProps) {
  const { setAnswer } = useAssessmentStore()
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState<string | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
      setAnswer(questionId, value)
    }
  }

  const runCode = async () => {
    setIsExecuting(true)
    setOutput(null)
    setTestResults(null)
    
    try {
      // Call our Supabase Edge Function which securely invokes the Piston API
      const { data, error } = await supabase.functions.invoke('code-executor', {
        body: { code, language, expected_output: expectedOutput },
      })

      if (error) throw new Error(error.message)

      setOutput(data.output || data.stderr || 'No output')
      setTestResults({ passed: data.passed ? 1 : 0, total: 1, executionTime: data.executionTime })
    } catch (err: any) {
      setOutput(`Execution error: ${err.message}`)
      setTestResults({ passed: 0, total: 1 })
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-50">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between p-2 bg-slate-950 border-b border-slate-800">
        <select 
          className="bg-slate-800 text-sm border-none rounded px-2 py-1 text-slate-200 outline-none"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        
        <Button 
          size="sm" 
          variant="secondary"
          onClick={runCode}
          disabled={isExecuting}
          className="bg-brand-600 hover:bg-brand-700 text-white border-none h-8"
        >
          {isExecuting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
          Run Code
        </Button>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",
            automaticLayout: true,
            padding: { top: 16 }
          }}
        />
      </div>

      {/* Output / Test Case Panel */}
      <div className="h-[200px] border-t border-slate-800 bg-slate-950 p-4 overflow-y-auto font-mono text-sm">
        <h3 className="text-slate-400 font-semibold mb-2 flex items-center gap-2 text-xs uppercase tracking-wider">
          Console Output
        </h3>
        
        {isExecuting ? (
          <div className="text-slate-500 animate-pulse">Executing code in sandbox...</div>
        ) : output ? (
          <div>
            <pre className="text-slate-300 whitespace-pre-wrap">{output}</pre>
            {testResults && (
              <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle className="w-5 h-5" />
                {testResults.passed} / {testResults.total} Test Cases Passed
              </div>
            )}
          </div>
        ) : (
          <div className="text-slate-600 italic">Run your code to see the output here.</div>
        )}
      </div>
    </div>
  )
}
