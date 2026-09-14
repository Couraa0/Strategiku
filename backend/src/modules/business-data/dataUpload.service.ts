import { parse } from 'csv-parse/sync';
import { mockStore, MockTransaction } from '../../database/mockStore.js';

export interface CSVRowError {
  row: number;
  field: string;
  message: string;
}

export class DataUploadService {
  static processCSVUpload(fileBuffer: Buffer, businessId: string) {
    const csvContent = fileBuffer.toString('utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    const errors: CSVRowError[] = [];
    const validTransactions: MockTransaction[] = [];

    records.forEach((record: any, index: number) => {
      const rowNum = index + 2; // header is line 1

      if (!record.customer_name) {
        errors.push({ row: rowNum, field: 'customer_name', message: 'nama pelanggan tidak boleh kosong.' });
      }

      if (!record.transaction_date) {
        errors.push({ row: rowNum, field: 'transaction_date', message: 'tanggal transaksi wajib diisi.' });
      }

      const amount = parseFloat(record.total_amount);
      if (isNaN(amount) || amount <= 0) {
        errors.push({ row: rowNum, field: 'total_amount', message: 'total_amount harus berupa angka positif.' });
      }

      if (!record.product_name) {
        errors.push({ row: rowNum, field: 'product_name', message: 'product_name wajib diisi.' });
      }

      if (errors.filter((e) => e.row === rowNum).length === 0) {
        validTransactions.push({
          transaction_id: `TRX-CSV-${Date.now()}-${rowNum}`,
          business_id: businessId,
          customer_name: record.customer_name || 'Pelanggan Umum',
          customer_type: record.customer_type || 'Retail',
          transaction_date: new Date(record.transaction_date || Date.now()).toISOString(),
          channel: record.channel || 'Offline Store',
          total_amount: amount,
          items: [
            {
              product_name: record.product_name,
              quantity: parseInt(record.quantity) || 1,
              unit_price: parseFloat(record.unit_price) || amount,
              subtotal: amount,
            },
          ],
        });
      }
    });

    if (errors.length > 0) {
      return {
        success: false,
        total_rows: records.length,
        processed_rows: 0,
        errors,
      };
    }

    // Save ingested transactions into shared store
    validTransactions.forEach((trx) => mockStore.transactions.unshift(trx));

    return {
      success: true,
      total_rows: records.length,
      processed_rows: validTransactions.length,
      errors: [],
      sample_imported: validTransactions.slice(0, 3),
    };
  }

  static getCSVTemplate() {
    return `customer_name,customer_type,transaction_date,channel,product_name,quantity,unit_price,total_amount
Cafe Kopi Kita,Cafe Wholesale,2026-03-10,B2B Direct,Kopi Arabika Specialty Karawang 250g,10,65000,650000
Budi Utomo,Retail,2026-03-11,Offline Store,Drip Bag Coffee Box (Isi 5 Sachet),2,35000,70000
Reseller Bandung,Reseller,2026-03-12,E-Commerce,Kopi Robusta Blend Karawang 250g,20,45000,900000`;
  }
}
