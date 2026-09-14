import { mockStore } from '../../database/mockStore.js';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp?: string;
}

export class AssistantService {
  static async processChat(businessId: string, question: string): Promise<{ answer: string; sources: string[] }> {
    const docs = mockStore.knowledge_documents.filter((d) => d.business_id === businessId || d.business_id === 'UMKM001');
    const q = question.toLowerCase();

    const matchedSources: string[] = [];
    let relevantChunks: string[] = [];

    docs.forEach((doc) => {
      const contentLower = doc.content.toLowerCase();
      const titleLower = doc.title.toLowerCase();

      const keywords = q.split(' ').filter((w) => w.length > 3);
      const isMatch = keywords.some((kw) => contentLower.includes(kw) || titleLower.includes(kw));

      if (isMatch || q.includes('kopi') || q.includes('harga') || q.includes('grosir') || q.includes('syarat') || q.includes('hampers') || q.includes('alamat') || q.includes('jam')) {
        matchedSources.push(doc.title);
        relevantChunks.push(doc.content);
      }
    });

    if (matchedSources.length === 0 && !q.includes('halo') && !q.includes('siapa')) {
      return {
        answer: 'Maaf, informasi tersebut belum tersedia pada knowledge base bisnis.',
        sources: [],
      };
    }

    // Generate grounded contextual response
    let answer = '';
    if (q.includes('harga') || q.includes('katalog') || q.includes('produk')) {
      answer = 'Berdasarkan Katalog Produk Resmi Kopi Karawang:\n- Kopi Arabika Specialty 250g: Rp 65.000 (grosir >20 pouch: Rp 55.000)\n- Kopi Robusta Blend 250g: Rp 45.000 (grosir >20 pouch: Rp 38.000)\n- Cold Brew Bottled 250ml: Rp 25.000\n- Drip Bag Coffee Box (5 sachet): Rp 35.000 (grosir >50 box: Rp 28.000).';
    } else if (q.includes('grosir') || q.includes('b2b') || q.includes('syarat') || q.includes('hampers')) {
      answer = 'Ketentuan Pembelian Grosir & Kemitraan:\n- Minimal order grosir B2B adalah 10 pouch atau 20 box Drip Bag Coffee.\n- Kami menyediakan paket hampers korporat custom logo instansi (minimal order 50 paket).\n- Seluruh produk memiliki sertifikat P-IRT dan Sertifikasi Halal.';
    } else if (q.includes('jam') || q.includes('buka') || q.includes('alamat') || q.includes('kontak') || q.includes('lokasi')) {
      answer = 'Rumah Sangrai & Galeri Kopi Karawang buka Senin - Sabtu pukul 08.00 - 20.00 WIB di Jl. Raya Karawang Barat No. 45, Kabupaten Karawang, Jawa Barat. Pengiriman grosir melayani seluruh Jawa Barat & Jabodetabek via ekspedisi cargo.';
    } else if (q.includes('halo') || q.includes('hai')) {
      answer = 'Halo! Saya AI Customer Assistant Kopi Karawang. Saya siap membantu menjawab pertanyaan seputar katalog produk, penawaran harga grosir, atau kebijakan usaha berdasarkan knowledge base kami.';
    } else {
      answer = `Berdasarkan dokumen internal (${matchedSources.slice(0, 2).join(', ')}):\n${relevantChunks[0]?.slice(0, 250) || 'Informasi siap digunakan.'}`;
    }

    const uniqueSources = Array.from(new Set(matchedSources));

    // Save to history
    mockStore.assistant_history.push(
      { role: 'user', content: question, timestamp: new Date().toISOString() },
      { role: 'assistant', content: answer, sources: uniqueSources, timestamp: new Date().toISOString() }
    );

    return {
      answer,
      sources: uniqueSources,
    };
  }

  static getHistory() {
    return mockStore.assistant_history;
  }
}
