import { mockStore } from '../../database/mockStore.js';

export class BIService {
  static getDashboard(businessId: string) {
    const transactions = mockStore.transactions;
    const products = mockStore.products;

    const totalRevenue = transactions.reduce((sum, t) => sum + t.total_amount, 0);
    const totalTransactions = transactions.length;

    const uniqueCustomers = new Set(transactions.map((t) => t.customer_name)).size;
    const activeProducts = products.filter((p) => p.is_active).length;

    const insights = this.getInsights(businessId);
    const trends = this.getTrends(businessId);
    const productPerformance = this.getProductPerformance(businessId);

    return {
      business_id: businessId,
      kpi: {
        total_revenue: totalRevenue,
        total_transactions: totalTransactions,
        total_customers: uniqueCustomers,
        active_products: activeProducts,
      },
      insights,
      trends,
      product_performance: productPerformance,
    };
  }

  static getInsights(businessId: string) {
    const transactions = mockStore.transactions;
    const products = mockStore.products;

    if (transactions.length === 0) {
      return [
        {
          type: 'empty_state',
          title: 'Belum Ada Data Transaksi',
          description: 'Upload data bisnis Anda untuk mulai melihat insight pertumbuhan usaha.',
          value: 0,
          period: '2026-02',
        },
      ];
    }

    // Product performance breakdown
    const productSalesMap: Record<string, number> = {};
    let totalSales = 0;

    transactions.forEach((t) => {
      t.items.forEach((item) => {
        productSalesMap[item.product_name] = (productSalesMap[item.product_name] || 0) + item.subtotal;
        totalSales += item.subtotal;
      });
    });

    let topProduct = 'Kopi Arabika Specialty Karawang 250g';
    let maxAmount = 0;

    Object.entries(productSalesMap).forEach(([prod, amt]) => {
      if (amt > maxAmount) {
        maxAmount = amt;
        topProduct = prod;
      }
    });

    const topProductShare = totalSales > 0 ? maxAmount / totalSales : 0.42;

    return [
      {
        type: 'product_performance',
        title: `${topProduct} memiliki kontribusi penjualan tertinggi`,
        description: `Produk ini menyumbangkan ${Math.round(topProductShare * 100)}% dari total omset usaha Anda periode ini.`,
        value: topProductShare,
        period: '2026-02',
      },
      {
        type: 'channel_mix',
        title: 'Channel B2B Direct menghasilkan nilai transaksi terbesar',
        description: 'Pemesanan dari segmen Cafe Wholesale dan Korporat menghasilkan Rata-Rata Nilai Transaksi (AOV) hingga 4x lipat ritel.',
        value: 0.65,
        period: '2026-02',
      },
      {
        type: 'growth_trend',
        title: 'Penjualan meningkat dibanding periode sebelumnya',
        description: 'Terdapat pertumbuhan volume transaksi sebesar 18% dalam kurun waktu 30 hari terakhir.',
        value: 0.18,
        period: '2026-02',
      },
    ];
  }

  static getTrends(businessId: string) {
    return [
      { period: '2025-10', revenue: 4200000, transactions: 12 },
      { period: '2025-11', revenue: 5100000, transactions: 15 },
      { period: '2025-12', revenue: 6800000, transactions: 22 },
      { period: '2026-01', revenue: 7500000, transactions: 25 },
      { period: '2026-02', revenue: 9435000, transactions: 28 },
      { period: '2026-03', revenue: 11200000, transactions: 32 },
    ];
  }

  static getProductPerformance(businessId: string) {
    return [
      { name: 'Kopi Arabika Specialty 250g', revenue: 4550000, units: 70, share: 48 },
      { name: 'Kopi Robusta Blend 250g', revenue: 2880000, units: 64, share: 30 },
      { name: 'Drip Bag Coffee Box', revenue: 3535000, units: 101, share: 37 },
      { name: 'Cold Brew Bottled 250ml', revenue: 1025000, units: 41, share: 11 },
    ];
  }
}
