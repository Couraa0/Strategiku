import { mockStore, MockOpportunity } from '../../database/mockStore.js';

export interface RecommendationResponseItem {
  opportunity_id: string;
  opportunity: MockOpportunity;
  score: number;
  rank: number;
  reason: string[];
}

export class RecommendationService {
  static getRecommendations(businessId: string): RecommendationResponseItem[] {
    const business = mockStore.businesses.find((b) => b.business_id === businessId) || mockStore.businesses[0];
    const opportunities = mockStore.opportunities;

    const scored = opportunities.map((opp) => {
      const { score, reasons } = this.calculateScore(business, opp);
      return {
        opportunity_id: opp.opportunity_id,
        opportunity: opp,
        score,
        reason: reasons,
      };
    });

    const ranked = this.rankOpportunities(scored);
    return ranked;
  }

  static calculateScore(business: any, opportunity: MockOpportunity) {
    let score = 0.5; // base similarity score
    const reasons: string[] = [];

    // Category match check
    if (opportunity.category.toLowerCase().includes('kopi') || opportunity.category.toLowerCase().includes('f&b')) {
      score += 0.25;
      reasons.push('category_match');
    }

    // Location match check (Jawa Barat / Karawang / Bandung)
    if (opportunity.location.toLowerCase().includes('karawang')) {
      score += 0.15;
      reasons.push('location_match');
    } else if (opportunity.location.toLowerCase().includes('bandung') || opportunity.location.toLowerCase().includes('jawa barat')) {
      score += 0.10;
      reasons.push('location_match');
    }

    // Capacity match check
    if (opportunity.capacity_required.toLowerCase().includes('200') || opportunity.capacity_required.toLowerCase().includes('kg')) {
      score += 0.10;
      reasons.push('capacity_match');
    }

    const finalScore = Math.min(0.98, Math.round(score * 100) / 100);
    return { score: finalScore, reasons };
  }

  static rankOpportunities(items: { opportunity_id: string; opportunity: MockOpportunity; score: number; reason: string[] }[]) {
    items.sort((a, b) => b.score - a.score);
    return items.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }
}
