import React, { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { UploadCloud, Download, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import api from '../../lib/api';

export const BusinessDataPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorDetails, setErrorDetails] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setErrorDetails([]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setResult(null);
    setErrorDetails([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res: any = await api.post('/business-data/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.success && res.data) {
        setResult(res.data);
      }
    } catch (err: any) {
      if (err.errors) {
        setErrorDetails(err.errors);
      } else {
        setErrorDetails([{ row: '-', field: 'file', message: err.message || 'Gagal mengunggah CSV' }]);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    window.location.href = 'http://localhost:5000/api/business-data/template';
  };

  return (
    <AppLayout
      title="Business Data Ingestion"
      subtitle="Impor data transaksi usaha via CSV & validasi standar shared data layer"
    >
      {/* Ingestion Pipeline Concept Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="sky">SHARED DATA LAYER</Badge>
            <span className="text-xs text-slate-500 font-medium">Data Standardization Pipeline</span>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-bold border border-slate-200 hover:border-sky-300 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Download className="w-4 h-4 text-sky-500" />
            <span>Download CSV Template</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center pt-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-extrabold text-slate-800 mb-1">1. INGESTION</div>
            <div className="text-[10px] text-slate-500 font-medium">CSV Parsing</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-extrabold text-slate-800 mb-1">2. VALIDATION</div>
            <div className="text-[10px] text-slate-500 font-medium">Row-by-Row Checks</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-extrabold text-slate-800 mb-1">3. STANDARDIZATION</div>
            <div className="text-[10px] text-slate-500 font-medium">Schema Normalization</div>
          </div>
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs">
            <div className="font-extrabold text-sky-800 mb-1">4. SHARED DATA</div>
            <div className="text-[10px] text-sky-600 font-medium">BI & Opportunity Sync</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Form Card */}
        <Card className="space-y-5 bg-white border border-slate-200">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-sky-500" />
              <span>Unggah File Transaksi (.CSV)</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">Pilih file CSV berformat sesuai template standar Strategiku</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="border-2 border-dashed border-sky-200 hover:border-sky-400 rounded-2xl p-8 text-center bg-sky-50/50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileText className="w-10 h-10 text-sky-400 mx-auto mb-2" />
              {file ? (
                <div className="space-y-1">
                  <p className="text-xs font-black text-sky-700">{file.name}</p>
                  <p className="text-[10px] text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Klik atau seret file CSV ke sini</p>
                  <p className="text-[10px] text-slate-400 font-medium">Maksimal ukuran file 5 MB</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || uploading}
              className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                !file || uploading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/25 active:scale-95'
              }`}
            >
              {uploading ? (
                <span>Memproses Ingesting & Validasi...</span>
              ) : (
                <>
                  <span>Proses Impor Data</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </Card>

        {/* Validation Output Display */}
        <Card className="space-y-4 bg-white border border-slate-200">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">Hasil Validasi & Standarisasi</h3>
            <Badge variant={result?.success ? 'sky' : errorDetails.length > 0 ? 'rose' : 'slate'}>
              {result?.success ? 'VALID & IMPORTED' : errorDetails.length > 0 ? 'INVALID' : 'READY'}
            </Badge>
          </div>

          {result?.success && (
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-900 space-y-2">
              <div className="flex items-center gap-2 font-black text-sm text-sky-700">
                <CheckCircle2 className="w-5 h-5 text-sky-500" />
                <span>Impor Berhasil Diselesaikan!</span>
              </div>
              <p>Total Baris Diproses: <span className="font-extrabold">{result.total_rows}</span> baris transaksi.</p>
              <p className="text-[11px] text-sky-800 font-medium">Data telah secara otomatis disinkronisasikan ke BI Dashboard & Recommendation Engine.</p>
            </div>
          )}

          {errorDetails.length > 0 && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Ditemukan kesalahan validasi pada data CSV:</span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {errorDetails.map((err, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800">
                    <span className="text-rose-600 font-bold">Baris {err.row}:</span> Field <span className="text-amber-600 font-bold">{err.field}</span> — {err.message}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result && errorDetails.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-xs font-medium">
              Unggah file CSV untuk melihat laporan validasi per-baris secara real-time.
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
};
