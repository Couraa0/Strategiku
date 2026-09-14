import { mockStore } from '../../database/mockStore.js';

export class BusinessService {
  static getBusiness(businessId: string) {
    const business = mockStore.businesses.find((b) => b.business_id === businessId) || mockStore.businesses[0];
    return business;
  }

  static updateBusiness(businessId: string, updateData: any) {
    let business = mockStore.businesses.find((b) => b.business_id === businessId);
    if (!business) {
      business = mockStore.businesses[0];
    }
    Object.assign(business, updateData);
    return business;
  }

  static getProfile(businessId: string) {
    return {
      profile: mockStore.business_profile,
      goals: mockStore.business_goals,
      capabilities: mockStore.business_capabilities,
    };
  }

  static updateProfile(businessId: string, profileData: any) {
    if (profileData.target_market) mockStore.business_profile.target_market = profileData.target_market;
    if (profileData.business_goal_context) mockStore.business_profile.business_goal_context = profileData.business_goal_context;
    if (profileData.sales_channels) mockStore.business_profile.sales_channels = profileData.sales_channels;
    if (profileData.b2b_experience) mockStore.business_profile.b2b_experience = profileData.b2b_experience;
    if (profileData.capacity_description) mockStore.business_profile.capacity_description = profileData.capacity_description;
    if (profileData.digital_maturity) mockStore.business_profile.digital_maturity = profileData.digital_maturity;

    return mockStore.business_profile;
  }
}
