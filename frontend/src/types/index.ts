export interface User {
  user_id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN';
  business_id?: string;
}

export interface Business {
  business_id: string;
  name: string;
  type: string;
  description: string;
  province: string;
  city_regency: string;
  district: string;
  employee_count: number;
  years_operating: number;
  phone: string;
  email: string;
  website: string;
}

export interface BusinessProfile {
  target_market: string;
  business_goal_context: string;
  sales_channels: string[];
  b2b_experience: string;
  capacity_description: string;
  digital_maturity: string;
}

export interface Product {
  product_id: string;
  business_id: string;
  product_name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  capacity: number;
  is_active: boolean;
}

export interface TransactionItem {
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Transaction {
  transaction_id: string;
  business_id: string;
  customer_name: string;
  customer_type: string;
  transaction_date: string;
  channel: string;
  total_amount: number;
  items: TransactionItem[];
}

export interface Insight {
  type: string;
  title: string;
  description: string;
  value: number;
  period: string;
}

export interface Opportunity {
  opportunity_id: string;
  title: string;
  organization_name: string;
  opportunity_type: string;
  category: string;
  description: string;
  location: string;
  requirement: string;
  capacity_required: string;
  source: string;
  source_url: string;
  source_date: string;
  status: string;
}

export interface Recommendation {
  recommendation_id: string;
  business_id: string;
  opportunity_id: string;
  opportunity: Opportunity;
  score: number;
  rank: number;
  reason: string[];
}

export interface KnowledgeDocument {
  document_id: string;
  business_id: string;
  document_type: string;
  title: string;
  content: string;
  source: string;
  version: string;
  created_at: string;
}
