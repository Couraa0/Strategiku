import React, { useEffect, useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Search, Filter } from 'lucide-react';
import api from '../../lib/api';

export const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState('');

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res: any = await api.get('/transactions', {
        params: { search, channel: channelFilter },
      });
      if (res.success && res.data) {
        setTransactions(res.data.transactions);
        setSummary(res.data.summary);
      }
    } catch (err) {
      console.error('Failed to load transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [search, channelFilter]);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <AppLayout
      title="Transaction Management"
      subtitle="Buku besar transaksi & ledger historis data penjualan usaha"
    >
      {/* Summary Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-l-4 border-l-sky-500 bg-white">
          <span className="text-xs text-slate-500 font-bold">Total Volume Penjualan</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {formatIDR(summary?.total_revenue || 0)}
          </div>
          <span className="text-[11px] text-sky-600 font-bold">Akumulasi Seluruh Channel</span>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white">
          <span className="text-xs text-slate-500 font-bold">Jumlah Transaksi (Volume)</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {summary?.total_transactions || 0} <span className="text-xs text-slate-400 font-normal">transaksi</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Total catatan ledger</span>
        </Card>

        <Card className="border-l-4 border-l-indigo-500 bg-white">
          <span className="text-xs text-slate-500 font-bold">Rata-Rata Nilai Transaksi (AOV)</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {formatIDR(summary?.avg_transaction_value || 0)}
          </div>
          <span className="text-[11px] text-indigo-600 font-bold">Average Order Value</span>
        </Card>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="space-y-4 bg-white border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pelanggan atau produk..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-sky-500"
            >
              <option value="">Semua Saluran Penjualan</option>
              <option value="Offline Store">Offline Store</option>
              <option value="B2B Direct">B2B Direct</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
        </div>

        {/* Transactions Data Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">ID Transaksi</th>
                <th className="py-3.5 px-4">Tanggal</th>
                <th className="py-3.5 px-4">Pelanggan</th>
                <th className="py-3.5 px-4">Saluran</th>
                <th className="py-3.5 px-4">Detail Items</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {transactions.map((trx: any) => (
                <tr key={trx.transaction_id} className="hover:bg-sky-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-sky-600">
                    {trx.transaction_id}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {new Date(trx.transaction_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{trx.customer_name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{trx.customer_type}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={trx.channel === 'B2B Direct' ? 'indigo' : 'sky'}>
                      {trx.channel}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 max-w-xs font-medium">
                      {trx.items?.map((item: any, idx: number) => (
                        <div key={idx} className="text-[11px] text-slate-700 truncate">
                          {item.quantity}x {item.product_name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-slate-900">
                    {formatIDR(trx.total_amount)}
                  </td>
                </tr>
              ))}

              {transactions.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    Tidak ada catatan transaksi yang sesuai dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </AppLayout>
  );
};
