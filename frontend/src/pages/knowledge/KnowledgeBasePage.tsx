import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Plus, Trash2, FileText, X } from 'lucide-react';
import api from '../../lib/api';

export const KnowledgeBasePage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('Catalog & Pricing');
  const [content, setContent] = useState('');
  const [source, setSource] = useState('Internal Manual Input');
  const [version, setVersion] = useState('1.0');

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res: any = await api.get('/knowledge');
      if (res.success && res.data) {
        setDocuments(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res: any = await api.post('/knowledge', {
        title,
        document_type: documentType,
        content,
        source,
        version,
      });
      if (res.success) {
        setShowModal(false);
        setTitle('');
        setContent('');
        fetchDocs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus dokumen knowledge base ini?')) {
      try {
        await api.delete(`/knowledge/${id}`);
        fetchDocs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AppLayout
      title="Knowledge Base Manager"
      subtitle="Basis data dokumen resmi usaha pendukung grounding RAG AI Assistant"
    >
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="sky">RAG DATA STORE</Badge>
            <span className="text-xs text-slate-500 font-medium">Knowledge Document Repository</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">Dokumen Pengetahuan Usaha</h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl font-medium">
            AI Assistant akan secara ketat menggunakan dokumen ini sebagai sumber jawaban terkonfirmasi tanpa melakukan halusinasi data.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-extrabold shadow-lg shadow-sky-500/25 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dokumen Baru</span>
        </button>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <Card key={doc.document_id} hoverable className="space-y-4 border border-slate-200 bg-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="sky">{doc.document_type}</Badge>
                <span className="text-[10px] text-slate-400 font-mono font-bold">v{doc.version}</span>
              </div>

              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" />
                <span>{doc.title}</span>
              </h3>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium whitespace-pre-line leading-relaxed max-h-40 overflow-y-auto">
                {doc.content}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] font-medium">Sumber: {doc.source}</span>
              <button
                onClick={() => handleDelete(doc.document_id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Dialog for Adding Document */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-3xl border border-slate-200 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900">Tambah Dokumen Knowledge Base</h3>

            <form onSubmit={handleAddDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Dokumen</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Katalog Harga Resmi 2026"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tipe Dokumen</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                >
                  <option value="Catalog & Pricing">Catalog & Pricing</option>
                  <option value="FAQ & Syarat Pemesanan">FAQ & Syarat Pemesanan</option>
                  <option value="Jam Operasional & Pengiriman">Jam Operasional & Pengiriman</option>
                  <option value="Kebijakan Mutu & Garansi">Kebijakan Mutu & Garansi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Isi Dokumen Pengetahuan</label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan daftar harga, FAQ, atau informasi resmi usaha..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 active:scale-95"
                >
                  Simpan & Indeks Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
};
