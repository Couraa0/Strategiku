import { mockStore, MockOpportunity } from '../../database/mockStore.js';

export interface RecommendationResponseItem {
  recommendation_id: string;
  opportunity_id: string;
  opportunity: MockOpportunity;
  score: number;
  rank: number;
  reason: string[];
}

export class RecommendationService {
  static getRecommendations(businessId?: string): RecommendationResponseItem[] {
    const profile = mockStore.business_profile;
    const opportunities = mockStore.opportunities;

    const scored = opportunities.map((opp, index) => {
      const { score, reasons } = this.calculateScore(profile, opp);
      return {
        recommendation_id: `REC-${opp.opportunity_id}`,
        opportunity_id: opp.opportunity_id,
        opportunity: {
          ...opp,
          match_score: score,
          match_reasons: reasons,
        },
        score,
        rank: opp.ranking || index + 1,
        reason: reasons,
      };
    });

    return this.rankOpportunities(scored);
  }

  static calculateScore(profile: any, opportunity: MockOpportunity) {
    let score = 0.65;
    const reasons: string[] = [];

    if (opportunity.category.toLowerCase().includes('kopi') || opportunity.category.toLowerCase().includes('f&b')) {
      score += 0.15;
      reasons.push('Kategori & Bidang Usaha Sesuai');
    }

    if (opportunity.location.toLowerCase().includes('karawang') || opportunity.location.toLowerCase().includes('bandung')) {
      score += 0.10;
      reasons.push('Wilayah & Lokasi Sangat Tepat');
    }

    if (profile.legalitas_usaha && profile.legalitas_usaha.toLowerCase().includes('halal')) {
      score += 0.05;
      reasons.push('Legalitas NIB & Halal Terverifikasi');
    }

    const finalScore = Math.min(0.98, Math.round(score * 100) / 100);
    return { score: finalScore, reasons: reasons.length > 0 ? reasons : (opportunity.match_reasons || ['Peluang Potensial']) };
  }

  static rankOpportunities(items: any[]) {
    items.sort((a, b) => b.score - a.score);
    return items.map((item, index) => ({
      ...item,
      rank: index + 1,
      opportunity: {
        ...item.opportunity,
        ranking: index + 1,
      },
    }));
  }
}
