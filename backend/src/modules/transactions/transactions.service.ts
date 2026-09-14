import { mockStore, MockTransaction } from '../../database/mockStore.js';

export class TransactionsService {
  static getTransactions(businessId: string, filters: { channel?: string; customer_type?: string; search?: string }) {
    let list = mockStore.transactions.filter((t) => t.business_id === businessId || t.business_id === 'UMKM001');

    if (filters.channel) {
      list = list.filter((t) => t.channel.toLowerCase() === filters.channel?.toLowerCase());
    }

    if (filters.customer_type) {
      list = list.filter((t) => t.customer_type.toLowerCase() === filters.customer_type?.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (t) =>
          t.customer_name.toLowerCase().includes(q) ||
          t.items.some((i) => i.product_name.toLowerCase().includes(q)) ||
          t.transaction_id.toLowerCase().includes(q)
      );
    }

    const totalRevenue = list.reduce((sum, t) => sum + t.total_amount, 0);
    const totalTransactions = list.length;
    const avgTransactionValue = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    return {
      summary: {
        total_revenue: totalRevenue,
        total_transactions: totalTransactions,
        avg_transaction_value: avgTransactionValue,
      },
      transactions: list,
    };
  }

  static getTransactionById(transactionId: string) {
    const trx = mockStore.transactions.find((t) => t.transaction_id === transactionId);
    if (!trx) {
      throw new Error('Transaksi tidak ditemukan');
    }
    return trx;
  }

  static createTransaction(businessId: string, data: Omit<MockTransaction, 'transaction_id' | 'business_id'>) {
    const newTrx: MockTransaction = {
      transaction_id: `TRX-${Date.now()}`,
      business_id: businessId,
      ...data,
    };
    mockStore.transactions.unshift(newTrx);
    return newTrx;
  }
}
