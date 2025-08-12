 

import React, { useState } from 'react'
import { updateComment, deleteComment } from '../api'

export default function CommentList({ comments = [], onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');

  const startEdit = (c) => { setEditingId(c._id); setDraft(c.text); }
  const cancel = () => { setEditingId(null); setDraft(''); }

  const save = async (id) => {
    await updateComment(id, { text: draft });
    setEditingId(null); setDraft('');
    if (onRefresh) onRefresh();
  }

  const remove = async (id) => {
    if (!confirm('Delete comment?')) return;
    await deleteComment(id);
    if (onRefresh) onRefresh();
  }

  if (!comments.length)
    return <div className="text-sm text-gray-400 italic text-center py-3">No comments yet</div>

  return (
    <ul className="mt-4 space-y-4">
      {comments.map(c => (
        <li
          key={c._id}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {c.author}
                <span className="ml-2 text-xs text-gray-500">
                  • {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>

              {editingId === c._id ? (
                <div className="mt-3 flex gap-2">
                  <input
                    value={draft}
                    onChange={e => setDraft(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                    placeholder="Edit your comment..."
                  />
                  <button
                    onClick={() => save(c._id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancel}
                    className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">{c.text}</p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 text-sm">
              <button
                onClick={() => startEdit(c)}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => remove(c._id)}
                className="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

 