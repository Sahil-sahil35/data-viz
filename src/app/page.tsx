'use client'

import CodeEditor from '@/components/CodeEditor'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Moon,
  Sun,
  Play,
  RotateCcw,
  CheckCircle2,
  Circle,
  ChevronRight,
  BookOpen,
  Code2,
  Lightbulb,
  AlertCircle,
  Loader2,
  Menu,
  X,
  Trophy,
  BarChart3,
  GraduationCap
} from 'lucide-react'
import { lessons, type Lesson } from '@/data/lessons'

// Iris dataset embedded as JSON
const irisData = {
  sepal_length: [5.1, 4.9, 4.7, 4.6, 5, 5.4, 4.6, 5, 4.4, 4.9, 5.4, 4.8, 4.8, 4.3, 5.8, 5.7, 5.4, 5.1, 5.7, 5.1, 5.4, 5.1, 4.6, 5.1, 4.8, 5, 5, 5.2, 5.2, 4.7, 4.8, 5.4, 5.2, 5.5, 4.9, 5, 5.5, 4.9, 4.4, 5.1, 5, 4.5, 4.4, 5, 5.1, 4.8, 5.1, 4.6, 5.3, 5, 7, 6.4, 6.9, 5.5, 6.5, 5.7, 6.3, 4.9, 6.6, 5.2, 5, 5.9, 6, 6.1, 5.6, 6.7, 5.6, 5.8, 6.2, 5.6, 5.9, 6.1, 6.3, 6.1, 6.4, 6.6, 6.8, 6.7, 6, 5.7, 5.5, 5.5, 5.8, 6, 5.4, 6, 6.7, 6.3, 5.6, 5.5, 5.5, 6.1, 5.8, 5, 5.6, 5.7, 5.7, 6.2, 5.1, 5.7, 6.3, 5.8, 7.1, 6.3, 6.5, 7.6, 4.9, 7.3, 6.7, 7.2, 6.5, 6.4, 6.8, 5.7, 5.8, 6.4, 6.5, 7.7, 7.7, 6, 6.9, 5.6, 7.7, 6.3, 6.7, 7.2, 6.2, 6.1, 6.4, 7.2, 7.4, 7.9, 6.4, 6.3, 6.1, 7.7, 6.3, 6.4, 6, 6.9, 6.7, 6.9, 5.8, 6.8, 6.7, 6.7, 6.3, 6.5, 6.2, 5.9],
  sepal_width: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3],
  petal_length: [1.4, 1.4, 1.3, 1.5, 1.4, 1.7, 1.4, 1.5, 1.4, 1.5, 1.5, 1.6, 1.4, 1.1, 1.2, 1.5, 1.3, 1.4, 1.7, 1.5, 1.7, 1.5, 1, 1.7, 1.9, 1.6, 1.6, 1.5, 1.4, 1.6, 1.6, 1.5, 1.5, 1.4, 1.5, 1.2, 1.3, 1.4, 1.3, 1.5, 1.3, 1.3, 1.3, 1.6, 1.9, 1.4, 1.6, 1.4, 1.5, 1.4, 4.7, 4.5, 4.9, 4, 4.6, 4.5, 4.7, 3.3, 4.6, 3.9, 3.5, 4.2, 4, 4.7, 3.6, 4.4, 4.5, 4.1, 4.5, 3.9, 4.8, 4, 4.9, 4.7, 4.3, 4.4, 4.8, 5, 4.5, 3.5, 3.8, 3.7, 3.9, 5.1, 4.5, 4.5, 4.7, 4.4, 4.1, 4, 4.4, 4.6, 4, 3.3, 4.2, 4.2, 4.2, 4.3, 3, 4.1, 6, 5.1, 5.9, 5.6, 5.8, 6.6, 4.5, 6.3, 5.8, 6.1, 5.1, 5.3, 5.5, 5, 5.1, 5.3, 5.5, 6.7, 6.9, 5, 5.7, 4.9, 6.7, 4.9, 5.7, 6, 4.8, 4.9, 5.6, 5.8, 6.1, 6.4, 5.6, 5.1, 5.6, 6.1, 5.6, 5.5, 4.8, 5.4, 5.6, 5.1, 5.1, 5.9, 5.7, 5.2, 5, 5.2, 5.4, 5.1],
  petal_width: [0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2, 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1, 1.3, 1.4, 1, 1.5, 1, 1.4, 1.3, 1.4, 1.5, 1, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1, 1.1, 1, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3, 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2, 1.9, 2.1, 2, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2, 2, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2, 2.3, 1.8],
  species: ['setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'setosa', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'versicolor', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica', 'virginica']
}

// Pyodide interface
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<string>
  globals: {
    set: (name: string, value: unknown) => void
    get: (name: string) => unknown
  }
  loadPackage: (packages: string[]) => Promise<void>
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>
  }
}

function OutputDisplay({
  output,
  error,
  isLoading,
  isDark
}: {
  output: string
  error: string
  isLoading: boolean
  isDark: boolean
}) {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-48 rounded-lg ${isDark ? 'bg-[#1e1e2e]' : 'bg-gray-100'}`}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          <span className={`text-sm ${isDark ? 'text-purple-300' : 'text-gray-600'}`}>Executing Python code...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-4 rounded-lg border ${isDark ? 'bg-red-950/50 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className={`font-semibold mb-1 ${isDark ? 'text-red-400' : 'text-red-700'}`}>Error</h4>
            <pre className={`text-sm whitespace-pre-wrap ${isDark ? 'text-red-300' : 'text-red-600'}`}>{error}</pre>
          </div>
        </div>
      </div>
    )
  }

  if (output.startsWith('data:image/png;base64,')) {
    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e2e]' : 'bg-gray-50'}`}>
        <img
          src={output}
          alt="Plot output"
          className="max-w-full h-auto mx-auto rounded shadow-lg"
          style={{ maxHeight: '500px' }}
        />
      </div>
    )
  }

  if (output) {
    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-[#1e1e2e]' : 'bg-gray-50'}`}>
        <pre className={`text-sm whitespace-pre-wrap font-mono ${isDark ? 'text-green-400' : 'text-gray-700'}`}>{output}</pre>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center h-48 rounded-lg ${isDark ? 'bg-[#1e1e2e] text-purple-400' : 'bg-gray-100 text-gray-400'}`}>
      <span className="text-sm">Run the code to see the output</span>
    </div>
  )
}


// Syntax Reference Component
function SyntaxReference({ syntax }: { syntax: string; isDark: boolean }) {
  // Calculate height based on number of lines
  // Base height (padding) + line height * lines
  const lineCount = syntax.split('\n').length
  const height = `${Math.max(100, lineCount * 24 + 40)}px`

  return (
    <CodeEditor
      code={syntax}
      onChange={() => { }}
      language="python"
      height={height}
    />
  )
}
// Main Component
export default function DataVisualizationCourse() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentLesson, setCurrentLesson] = useState(0)
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null)
  const [pyodideLoading, setPyodideLoading] = useState(true)
  const [pyodideError, setPyodideError] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'example' | 'practice' | 'challenge'>('example')

  const isDark = theme === 'dark'


  // Mount effect
  useEffect(() => {
    setMounted(true)

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('viz-course-progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Load Pyodide with all required packages
  useEffect(() => {
    const loadPyodideInstance = async () => {
      try {
        setPyodideLoading(true)

        // Load Pyodide script
        if (typeof window !== 'undefined' && !window.loadPyodide) {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
          document.head.appendChild(script)

          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Pyodide'))
          })
        }

        // Initialize Pyodide
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
          stdout: (text: string) => {
            // We'll handle stdout in the runCode function by capturing it
            // but we can also log it here for debugging
            console.log('Python stdout:', text)
          },
          stderr: (text: string) => console.error('Python stderr:', text)
        } as any)

        // Load all required packages including micropip for seaborn
        await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib', 'scipy', 'micropip'])

        // Install seaborn using micropip
        await pyodideInstance.runPythonAsync(`
          import micropip
          await micropip.install('seaborn')
        `)

        // Set iris data in Python
        // Convert the JS object to a Python dictionary to avoid "DataFrame constructor not properly called" error
        // We first set it as a proxy, then convert it in Python
        pyodideInstance.globals.set('iris_data_proxy', irisData)
        await pyodideInstance.runPythonAsync(`
          import js
          # Convert the proxy to a python dict
          iris_data = iris_data_proxy.to_py()
        `)

        setPyodide(pyodideInstance)
        setPyodideError(null)
      } catch (err) {
        console.error('Failed to load Pyodide:', err)
        setPyodideError('Failed to load Python environment. Please refresh the page.')
      } finally {
        setPyodideLoading(false)
      }
    }

    loadPyodideInstance()
  }, [])

  // Update code when lesson changes
  useEffect(() => {
    const lesson = lessons[currentLesson]
    setCode(lesson.content.codeExample)
    setOutput('')
    setError('')
    setActiveTab('example')
  }, [currentLesson])

  // Run Python code
  const runCode = useCallback(async () => {
    if (!pyodide) {
      setError('Python environment is not ready. Please wait...')
      return
    }

    setIsRunning(true)
    setError('')
    setOutput('')

    try {
      // Redirect stdout to a string buffer
      pyodide.globals.set('print_output', '')

      await pyodide.runPythonAsync(`
        import sys
        import io
        
        # Create a string buffer
        class CaptureStdout(list):
            def __enter__(self):
                self._stdout = sys.stdout
                sys.stdout = self._stringio = io.StringIO()
                return self
                
            def __exit__(self, *args):
                self.extend(self._stringio.getvalue().splitlines())
                del self._stringio    # free up some memory
                sys.stdout = self._stdout

        # Redirect stdout
        sys.stdout = io.StringIO()
      `)

      // Run the code
      const result = await pyodide.runPythonAsync(code)

      // Get the captured stdout
      const capturedStdout = await pyodide.runPythonAsync(`sys.stdout.getvalue()`)

      // Reset stdout
      await pyodide.runPythonAsync(`sys.stdout = sys.__stdout__`)

      if (capturedStdout) {
        setOutput(capturedStdout + (result ? '\\n' + result : ''))
      } else if (result) {
        setOutput(result)
      } else {
        setOutput('Code executed successfully (no output)')
      }

      // Mark lesson as completed
      const lessonId = lessons[currentLesson].id
      setProgress(prev => {
        const newProgress = { ...prev, [lessonId]: true }
        localStorage.setItem('viz-course-progress', JSON.stringify(newProgress))
        return newProgress
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
    } finally {
      setIsRunning(false)
    }
  }, [pyodide, code, currentLesson])

  // Reset code to example
  const resetCode = useCallback(() => {
    const lesson = lessons[currentLesson]
    if (activeTab === 'example') {
      setCode(lesson.content.codeExample)
    } else if (activeTab === 'practice') {
      setCode(lesson.content.practice.starterCode)
    } else if (activeTab === 'challenge' && lesson.content.miniChallenge) {
      setCode(lesson.content.miniChallenge.starterCode)
    }
    setOutput('')
    setError('')
  }, [currentLesson, activeTab])

  // Mark lesson as complete
  const markComplete = useCallback(() => {
    const lessonId = lessons[currentLesson].id
    setProgress(prev => {
      const newProgress = { ...prev, [lessonId]: true }
      localStorage.setItem('viz-course-progress', JSON.stringify(newProgress))
      return newProgress
    })
  }, [currentLesson])

  // Calculate progress percentage
  const completedCount = Object.values(progress).filter(Boolean).length
  const totalLessons = lessons.length
  const progressPercent = Math.round((completedCount / totalLessons) * 100)

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark')
  }, [isDark, setTheme])

  // Current lesson
  const lesson = lessons[currentLesson]

  // Update code when tab changes
  useEffect(() => {
    if (activeTab === 'example') {
      setCode(lesson.content.codeExample)
    } else if (activeTab === 'practice') {
      setCode(lesson.content.practice.starterCode)
    } else if (activeTab === 'challenge' && lesson.content.miniChallenge) {
      setCode(lesson.content.miniChallenge.starterCode)
    }
    setOutput('')
    setError('')
  }, [activeTab, lesson])

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0f0f17] text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b ${isDark ? 'bg-[#0f0f17] border-purple-500/20' : 'bg-white border-gray-200'}`}>
        <button
          onClick={() => setSidebarOpen(true)}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#1e1e2e]' : 'hover:bg-gray-100'}`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-500" />
          <span className="font-bold">Python Viz Course</span>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${isDark ? 'hover:bg-[#1e1e2e]' : 'hover:bg-gray-100'}`}
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-72 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDark ? 'bg-[#0f0f17] border-r border-purple-500/20' : 'bg-white border-r border-gray-200'}`}>
        {/* Logo */}
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-purple-500/20' : 'border-gray-200'}`}>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Python Viz Course</h1>
              <p className={`text-xs ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>Interactive Learning</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isDark ? 'text-purple-300' : 'text-gray-600'}`}>Your Progress</span>
            <span className={`text-sm font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <p className={`text-xs mt-1 ${isDark ? 'text-purple-400' : 'text-gray-500'}`}>{completedCount} of {totalLessons} lessons completed</p>
        </div>

        <Separator className={isDark ? 'bg-purple-500/20' : ''} />

        {/* Navigation */}
        <ScrollArea className="flex-1 h-[calc(100vh-14rem)]">
          <nav className="p-2">
            {lessons.map((l, index) => (
              <button
                key={l.id}
                onClick={() => {
                  setCurrentLesson(index)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all mb-1 ${currentLesson === index
                  ? isDark
                    ? 'bg-purple-500/20 text-purple-300 border-l-2 border-purple-500'
                    : 'bg-purple-100 text-purple-700 border-l-2 border-purple-500'
                  : isDark
                    ? 'hover:bg-[#1e1e2e] text-gray-400 hover:text-gray-200'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
              >
                <div className={`flex-shrink-0 p-1.5 rounded-md ${progress[l.id]
                  ? 'bg-green-500/20 text-green-400'
                  : currentLesson === index
                    ? isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-200 text-purple-600'
                    : isDark ? 'bg-[#1e1e2e] text-gray-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                  {progress[l.id] ? <CheckCircle2 className="w-4 h-4" /> : l.icon}
                </div>
                <span className="flex-1 text-sm font-medium truncate">{l.title}</span>
                {currentLesson === index && (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
              </button>
            ))}
          </nav>
        </ScrollArea>

        {/* Theme toggle (desktop) */}
        <div className={`hidden lg:flex items-center justify-between p-4 border-t ${isDark ? 'border-purple-500/20' : 'border-gray-200'}`}>
          <span className={`text-sm ${isDark ? 'text-purple-300' : 'text-gray-600'}`}>Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-[#1e1e2e] hover:bg-purple-500/20' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
          {/* Pyodide loading banner */}
          {pyodideLoading && (
            <Card className={`mb-6 ${isDark ? 'bg-purple-950/30 border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
                <div>
                  <p className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Loading Python Environment</p>
                  <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Installing numpy, pandas, matplotlib, seaborn... This may take 30-60 seconds on first load.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pyodide error banner */}
          {pyodideError && (
            <Card className={`mb-6 ${isDark ? 'bg-red-950/30 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
              <CardContent className="flex items-center gap-3 p-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div>
                  <p className={`font-medium ${isDark ? 'text-red-300' : 'text-red-700'}`}>Environment Error</p>
                  <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{pyodideError}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lesson header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={isDark ? 'secondary' : 'outline'} className={`text-xs ${isDark ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : ''}`}>
                Lesson {currentLesson + 1} of {totalLessons}
              </Badge>
              {progress[lesson.id] && (
                <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </Badge>
              )}
            </div>
            <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {lesson.title}
            </h1>
            <p className={`text-base ${isDark ? 'text-purple-300' : 'text-gray-600'}`}>{lesson.description}</p>
          </div>

          {/* Content tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'example' | 'practice' | 'challenge')} className="mb-6">
            <TabsList className={`grid w-full grid-cols-3 ${isDark ? 'bg-[#1e1e2e]' : 'bg-gray-100'}`}>
              <TabsTrigger value="example" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Code2 className="w-4 h-4" /> Example
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Lightbulb className="w-4 h-4" /> Practice
              </TabsTrigger>
              <TabsTrigger value="challenge" className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <Trophy className="w-4 h-4" /> Challenge
              </TabsTrigger>
            </TabsList>

            <TabsContent value="example" className="mt-4 space-y-6">
              {/* Concept explanation */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-purple-500" /> Concept Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`leading-relaxed text-base whitespace-pre-line ${isDark ? 'text-purple-100' : 'text-gray-700'}`}>
                    {lesson.content.concept}
                  </p>
                </CardContent>
              </Card>

              {/* When to use */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> When to Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`leading-relaxed text-base whitespace-pre-line ${isDark ? 'text-purple-100' : 'text-gray-700'}`}>
                    {lesson.content.whenToUse}
                  </p>
                </CardContent>
              </Card>

              {/* Syntax reference */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code2 className="w-5 h-5 text-blue-500" /> Syntax Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SyntaxReference syntax={lesson.content.syntax} isDark={isDark} />
                </CardContent>
              </Card>

              {/* Code editor */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code2 className="w-5 h-5 text-green-500" /> Interactive Code Editor
                  </CardTitle>
                  <CardDescription className={isDark ? 'text-purple-400' : ''}>
                    Edit the code below and click Run to execute
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={runCode}
                      disabled={pyodideLoading || isRunning}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {isRunning ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" /> Run Code
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetCode}
                      disabled={isRunning}
                      className={isDark ? 'border-purple-500/30 hover:bg-purple-500/10' : ''}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={markComplete}
                      disabled={progress[lesson.id]}
                      className={isDark ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30' : ''}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      {progress[lesson.id] ? 'Completed' : 'Mark Complete'}
                    </Button>
                  </div>

                  <CodeEditor
                    code={code}
                    onChange={(newCode) => setCode(newCode || '')}
                    language="python"
                    height="400px"
                  />

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>Output:</h4>
                    <OutputDisplay
                      output={output}
                      error={error}
                      isLoading={isRunning}
                      isDark={isDark}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="mt-4 space-y-6">
              {/* Practice task */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Practice Exercise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`mb-4 leading-relaxed text-base ${isDark ? 'text-purple-100' : 'text-gray-700'}`}>
                    {lesson.content.practice.task}
                  </p>

                  <div className={`p-4 rounded-lg ${isDark ? 'bg-[#0f0f17]' : 'bg-gray-100'}`}>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>Hints:</h4>
                    <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-purple-400' : 'text-gray-600'}`}>
                      {lesson.content.practice.hints.map((hint, i) => (
                        <li key={i} className="text-sm">{hint}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Practice code editor */}
              <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Code2 className="w-5 h-5 text-green-500" /> Your Solution
                  </CardTitle>
                  <CardDescription className={isDark ? 'text-purple-400' : ''}>
                    Complete the practice exercise below
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      onClick={runCode}
                      disabled={pyodideLoading || isRunning}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      {isRunning ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" /> Run Code
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={resetCode}
                      disabled={isRunning}
                      className={isDark ? 'border-purple-500/30 hover:bg-purple-500/10' : ''}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                  </div>

                  <CodeEditor
                    code={code}
                    onChange={(newCode) => setCode(newCode || '')}
                    language="python"
                    height="400px"
                  />

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>Output:</h4>
                    <OutputDisplay
                      output={output}
                      error={error}
                      isLoading={isRunning}
                      isDark={isDark}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenge" className="mt-4 space-y-6">
              {lesson.content.miniChallenge ? (
                <>
                  <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="w-5 h-5 text-orange-500" /> {lesson.content.miniChallenge.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={`mb-4 leading-relaxed text-base font-medium ${isDark ? 'text-purple-100' : 'text-gray-700'}`}>
                        {lesson.content.miniChallenge.description}
                      </p>

                      <div className={`p-4 rounded-lg border-l-4 border-orange-500 ${isDark ? 'bg-[#0f0f17]' : 'bg-orange-50'}`}>
                        <h4 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-800'}`}>Goal Output:</h4>
                        <pre className={`text-sm whitespace-pre-wrap font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {lesson.content.miniChallenge.expectedOutput}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={`${isDark ? 'bg-[#1e1e2e] border-purple-500/20' : ''}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Code2 className="w-5 h-5 text-green-500" /> Challenge Editor
                      </CardTitle>
                      <CardDescription className={isDark ? 'text-purple-400' : ''}>
                        Solve the challenge without hints!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={runCode}
                          disabled={pyodideLoading || isRunning}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          {isRunning ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Running...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" /> Run Solution
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetCode}
                          disabled={isRunning}
                          className={isDark ? 'border-purple-500/30 hover:bg-purple-500/10' : ''}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" /> Reset
                        </Button>
                      </div>

                      <CodeEditor
                        code={code}
                        onChange={(newCode) => setCode(newCode || '')}
                        language="python"
                        height="400px"
                      />

                      <div>
                        <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-gray-700'}`}>Output:</h4>
                        <OutputDisplay
                          output={output}
                          error={error}
                          isLoading={isRunning}
                          isDark={isDark}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-10 opacity-50">
                  <Trophy className="w-12 h-12 mx-auto mb-2" />
                  <p>No challenge for this lesson yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-purple-500/20">
            <Button
              variant="outline"
              disabled={currentLesson === 0}
              onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
              className={isDark ? 'border-purple-500/30 hover:bg-purple-500/10' : ''}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Previous
            </Button>

            <div className="flex items-center gap-2">
              {lessons.map((_, i) => (
                <Circle
                  key={i}
                  className={`w-2.5 h-2.5 cursor-pointer transition-colors ${i === currentLesson
                    ? 'fill-purple-500 text-purple-500'
                    : progress[lessons[i].id]
                      ? 'fill-green-500 text-green-500'
                      : isDark ? 'fill-purple-900 text-purple-900' : 'fill-gray-300 text-gray-300'
                    }`}
                  onClick={() => setCurrentLesson(i)}
                />
              ))}
            </div>

            <Button
              disabled={currentLesson === lessons.length - 1}
              onClick={() => setCurrentLesson(Math.min(lessons.length - 1, currentLesson + 1))}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
