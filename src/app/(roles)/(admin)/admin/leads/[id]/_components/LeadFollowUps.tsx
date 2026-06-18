import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, Plus, MessageSquare, Clock } from "lucide-react";
import { LeadFollowUp } from "@/app/types/lead.types";

interface LeadFollowUpsProps {
  followUps: LeadFollowUp[];
  onAddFollowUp: (note: string, nextFollowUpAt: string) => void;
}

export function LeadFollowUps({ followUps, onAddFollowUp }: LeadFollowUpsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [note, setNote] = useState("");
  const [nextFollowUpAt, setNextFollowUpAt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note || !nextFollowUpAt) return;
    onAddFollowUp(note, new Date(nextFollowUpAt).toISOString());
    setNote("");
    setNextFollowUpAt("");
    setIsAdding(false);
  };

  return (
    <div className="bg-white dark:bg-[#111111] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar size={20} className="text-indigo-500" /> Follow-Ups
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center min-h-[44px] px-4 gap-1.5 rounded-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={16} /> Add Note
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-[#151515] p-5 rounded-2xl border border-gray-200 dark:border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Note / Conversation Details</label>
            <textarea
              required
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none min-h-[80px]"
              placeholder="What was discussed?"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">Next Follow-Up Date</label>
            <input
              type="datetime-local"
              required
              value={nextFollowUpAt}
              onChange={(e) => setNextFollowUpAt(e.target.value)}
              className="w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="min-h-[44px] px-4 py-2 flex items-center justify-center rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-4 py-2 flex items-center justify-center rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Save Follow-Up
            </button>
          </div>
        </form>
      )}

      {followUps.length > 0 ? (
        <div className="space-y-4">
          {followUps.map((fup) => (
            <div key={fup.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-[#151515] border border-gray-100 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <MessageSquare size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{fup.doneBy?.fullName || "Agent"}</p>
                    <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Clock size={10} /> {format(new Date(fup.followedAt), "MMM dd, yyyy h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 pl-10 border-l-2 border-gray-200 dark:border-white/10 ml-4 pb-2">
                <p className="whitespace-pre-wrap">{fup.note}</p>
                <div className="mt-3 bg-white dark:bg-[#111111] border border-gray-100 dark:border-white/5 rounded-lg p-2.5 inline-block">
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Next Follow-Up: {format(new Date(fup.nextFollowUpAt), "MMM dd, yyyy h:mm a")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
          <Calendar className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">No follow-ups recorded yet.</p>
        </div>
      )}
    </div>
  );
}
