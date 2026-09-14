import { mockStore, MockOpportunity } from '../../database/mockStore.js';

export class OpportunityService {
  static getOpportunities(filters: { category?: string; location?: string; type?: string; status?: string }) {
    let list = mockStore.opportunities;

    if (filters.category) {
      list = list.filter((o) => o.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters.location) {
      list = list.filter((o) => o.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    if (filters.type) {
      list = list.filter((o) => o.opportunity_type.toLowerCase().includes(filters.type!.toLowerCase()));
    }
    if (filters.status) {
      list = list.filter((o) => o.status.toLowerCase() === filters.status!.toLowerCase());
    }

    return list;
  }

  static getOpportunityById(id: string) {
    const opp = mockStore.opportunities.find((o) => o.opportunity_id === id);
    if (!opp) {
      throw new Error('Opportunity tidak ditemukan');
    }
    return opp;
  }
}
