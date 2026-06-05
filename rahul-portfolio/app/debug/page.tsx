'use client'
import { useEffect, useState } from 'react'
import { client } from '@/app/lib/sanity.client'

export default function Debug() {
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // SIMPLEST POSSIBLE QUERY
    client.fetch(`*[_type == "project"]{_id, title}`).then(
      (data) => {
        setResult(data)
        setError('')
      },
      (err) => setError(err.message)
    )
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">🔍 SANITY DEBUG</h1>
      
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <strong>Status:</strong> {error || result ? '✅ Connected' : '❌ No data'}
      </div>
      
      {error && (
        <pre className="p-4 bg-red-100 rounded text-red-800">{error}</pre>
      )}
      
      {result && (
        <pre className="p-6 bg-green-100 border border-green-400 rounded max-h-96 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      
      {!result && !error && (
        <div className="p-6 bg-yellow-100 border border-yellow-400 rounded">
          Waiting for data...
        </div>
      )}
    </div>
  )
}
