
import React, { useEffect, useState } from 'react'
import { createComment, getCommentsForTask, updateComment, deleteComment } from './api'
import TaskCard from './components/TaskCard'
  
const demoTasks = [
  { id: '64a1f1a1f1a1f1a1f1a1f101', title: 'Design Landing Page', desc: 'Make it responsive and modern' },
  { id: '64a1f1a1f1a1f1a1f1a1f102', title: 'Fix Comments by user', desc: 'Investigate token refresh' }
]


export default function App(){
  const [tasks] = useState(demoTasks);
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-2">Tasks & Comments</h1>
    
      </header>

      <main className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} />
        ))}
      </main>
    </div>
  )
}