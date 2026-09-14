import React from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Settings as SettingsIcon, Database, Server } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <AppLayout title="Platform Settings" subtitle="Pengaturan akun, konektivitas database, & intelligence provider">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="space-y-6 border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <SettingsIcon className="w-5 h-5 text-sky-500" />
              <span>Pengaturan Sistem & Integrasi Intelligence</span>
            </h3>
            <Badge variant="indigo">SYSTEM CONFIG</Badge>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Database className="w-4 h-4 text-sky-500" />
                  Supabase PostgreSQL Engine
                </span>
                <Badge variant="sky">ACTIVE CONNECTOR</Badge>
              </div>
              <p className="text-slate-600 font-medium">
                Terhubung dengan Supabase PostgreSQL database layer. Menggunakan fallback in-memory store jika mode terputus.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-500" />
                  RAG & Recommendation Abstraction Service
                </span>
                <Badge variant="indigo">ABSTRACTED PROVIDER</Badge>
              </div>
              <p className="text-slate-600 font-medium">
                Layanan BI, Recommendation, dan RAG Assistant telah diabstraksikan sehingga provider AI (LLM / Embeddings) dapat diganti kapan saja tanpa hard-code.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};
