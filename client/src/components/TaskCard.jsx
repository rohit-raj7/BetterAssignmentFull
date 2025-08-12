
import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { getCommentsForTask, createComment } from '../api'

export default function TaskCard({ task }){
  const [commentsData, setCommentsData] = useState({ items: [], total:0 });
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try{
      const res = await getCommentsForTask(task.id, 1, 5);
      // API returns { items, total, page, limit }
      setCommentsData({ items: res.items || res, total: res.total || (res.items?res.items.length:res.length) });
    }catch(e){ console.error(e) }
    setLoading(false);
  }

  useEffect(()=>{ fetch() }, [])

  const handleAdd = async (author, text) => {
    const created = await createComment({ taskId: task.id, author, text });
    setCommentsData(prev => ({ ...prev, items: [created, ...prev.items], total: prev.total + 1 }));
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-medium">{task.title}</h2>
          <p className="text-sm text-slate-500">{task.desc}</p>
        </div>
        <div className="text-xs text-slate-400">{commentsData.total} comments</div>
      </div>

      <div className="mt-4">
        <CommentForm onAdd={handleAdd} />
      </div>

      <div className="mt-4">
        {loading ? <div className="text-sm text-slate-400">Loading...</div> : (
          <CommentList comments={commentsData.items} onRefresh={fetch} />
        )}
      </div>
    </div>
  )
}