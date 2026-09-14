import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Send, Sparkles, ShieldCheck, BookOpen, User, Bot } from 'lucide-react';
import api from '../../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp?: string;
}

export const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya AI Growth Assistant APH YAH. Saya siap menjawab pertanyaan seputar katalog produk, penawaran harga grosir, Sertifikasi Halal SEHATI Jabar, atau syarat pengajuan bantuan usaha berdasarkan knowledge base resmi usaha.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuestion = input.trim();
    setInput('');
    const newMsg: Message = {
      role: 'user',
      content: userQuestion,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setLoading(true);

    try {
      const res: any = await api.post('/assistant/chat', { question: userQuestion });
      if (res.success && res.data) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: res.data.answer,
            sources: res.data.sources,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Maaf, terjadi masalah saat memproses pertanyaan Anda.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Bagaimana syarat daftar Sertifikasi Halal SEHATI Jabar?',
    'Berapa harga grosir Kopi Arabika Puntang 250g?',
    'Apakah usaha mikro Karawang bisa ajukan Kredit Mesra bjb?',
  ];

  return (
    <AppLayout
      title="AI Growth Assistant"
      subtitle='UX Storytelling: "Bagaimana saya menjalankan aktivitas komunikasi secara lebih efisien?"'
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-170px)]">
        {/* Left Info Panel */}
        <div className="hidden lg:block lg:col-span-1 space-y-4">
          <Card className="space-y-4 border border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <Badge variant="sky" pulse>ACT ENGINE</Badge>
              <span className="text-[10px] font-bold text-slate-500">RAG Architecture</span>
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>Grounded AI Assistant</span>
              </h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                Jawaban dihasilkan berdasarkan penelusuran Retrieval-Augmented Generation dari Knowledge Base resmi usaha.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-extrabold text-sky-700">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>Garansi Anti-Halusinasi</span>
              </div>
              <p className="text-[10px] text-sky-800 font-medium">
                Jika data tidak ditemukan pada Knowledge Base, AI akan merespons secara jujur tanpa mengarang jawaban.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Contoh Pertanyaan:</span>
              <div className="space-y-1.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(p)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-[11px] text-slate-700 hover:text-sky-700 transition-all font-medium leading-tight"
                  >
                    "{p}"
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Chat Interface */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <Card className="flex-1 flex flex-col justify-between border border-slate-200 bg-white overflow-hidden p-0">
            {/* Chat Messages Log */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 max-w-2xl ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                        : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line font-medium ${
                        msg.role === 'user'
                          ? 'bg-sky-500 text-white rounded-tr-none shadow-md shadow-sky-500/20'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Cited Sources Badge */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-[10px] text-sky-900 space-y-1">
                        <div className="flex items-center gap-1 text-sky-700 font-extrabold">
                          <BookOpen className="w-3 h-3" />
                          <span>Sources:</span>
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 font-mono text-[10px] text-sky-800">
                          {msg.sources.map((s, sIdx) => (
                            <li key={sIdx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <span className="text-[9px] text-slate-400 block px-1 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-sky-600 font-bold animate-pulse p-2">
                  <Bot className="w-4 h-4" />
                  <span>AI sedang menelusuri Knowledge Base & memproses jawaban...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 border-t border-slate-200 bg-white">
              <form onSubmit={handleSend} className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tanyakan penawaran harga, spesifikasi produk, atau syarat kemitraan..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className={`px-6 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
                    !input.trim() || loading
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25 active:scale-95'
                  }`}
                >
                  <span>Kirim</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
