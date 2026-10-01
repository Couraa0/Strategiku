import { mockStore, MockOpportunity } from '../../database/mockStore.js';

export class OpportunityService {
  static getOpportunities(filters: { category?: string; location?: string; status?: string }) {
    let list = mockStore.opportunities;

    if (filters.category) {
      list = list.filter((o) => o.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters.location) {
      list = list.filter((o) => o.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    if (filters.status) {
      list = list.filter((o) => o.status.toLowerCase() === filters.status!.toLowerCase());
    }

    return list;
  }

  static getOpportunityById(id: string) {
    const opp = mockStore.opportunities.find((o) => o.opportunity_id === id);
    if (!opp) {
      throw new Error('Peluang tidak ditemukan');
    }
    return opp;
  }

  static createOpportunity(data: Partial<MockOpportunity>) {
    const newOpp: MockOpportunity = {
      opportunity_id: `OPP-${Date.now()}`,
      ranking: mockStore.opportunities.length + 1,
      title: data.title || 'Peluang Baru',
      organization_name: data.organization_name || 'Instansi Terkait',
      location: data.location || 'Jawa Barat',
      category: data.category || 'Umum',
      match_score: data.match_score || 0.85,
      match_reasons: data.match_reasons || ['Sesuai kategori pilihan admin'],
      quantity_unit: data.quantity_unit || '100 Pcs',
      periode: data.periode || '2026',
      status: data.status || 'Aktif',
      source_url: data.source_url || 'https://umkmhub.jabarprov.go.id',
      description: data.description || 'Peluang baru yang ditambahkan oleh Admin UMKM Hub',
      requirement: data.requirement || 'Persyaratan standar UMKM',
      created_at: new Date().toISOString(),
    };

    mockStore.opportunities.unshift(newOpp);
    return newOpp;
  }
}
