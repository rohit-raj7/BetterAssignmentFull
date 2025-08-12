
import React, { useState } from 'react'

export default function CommentForm({ onAdd }){
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if(!author || !text) return alert('fill both');
    setLoading(true);
    try{
      await onAdd(author, text);
      setAuthor(''); setText('');
    }catch(e){ console.error(e); alert('Failed') }
    setLoading(false);
  }

  return (
    <form className="flex gap-2" onSubmit={submit}>
      <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name" className="flex-shrink-0 w-28 px-3 py-2 border rounded-lg" />
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Write a comment..." className="flex-1 px-3 py-2 border rounded-lg" />
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" disabled={loading}>{loading ? '...' : 'Add'}</button>
    </form>
  )
}