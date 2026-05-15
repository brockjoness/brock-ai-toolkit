// Database row types
export interface Client {
  id: string
  name: string
  slug: string
  agency_slug: string
  meta_account_id: string | null
  google_customer_id: string | null
  klaviyo_api_key: string | null
  shopify_store: string | null
  monthly_budget: number | null
  roas_target: number | null
  cpa_target: number | null
  status: string
  pipeline_stage?: string
  health_score?: number | null
  last_activity_at?: string | null
  mrr?: number
  created_at: string
}

export interface ClientUser {
  id: string
  user_id: string
  client_id: string | null
  role: 'client' | 'admin'
  created_at: string
}

export interface MetricRow {
  date: string
  platform: string
  spend: number
  revenue: number
  impressions: number
  clicks: number
  conversions: number
  roas: number
  cpa: number
  ctr: number
  cpc: number
  campaign_name: string | null
  ad_group_name: string | null
  ad_name: string | null
}

export interface MetricSummary {
  spend: number
  revenue: number
  impressions: number
  clicks: number
  conversions: number
  roas: number
  cpa: number
  ctr: number
}

export interface DailyMetric {
  date: string
  spend: number
  revenue: number
  impressions: number
  clicks: number
  conversions: number
}

export interface PlatformSummary {
  platform: string
  spend: number
  revenue: number
  conversions: number
  roas: number
}

export interface Campaign {
  campaign_name: string
  platform: string
  spend: number
  revenue: number
  impressions: number
  clicks: number
  conversions: number
  roas: number
  cpa: number
  trend: number[]  // 7-day spend trend
  status: 'scaling' | 'stable' | 'active' | 'monitor' | 'declining'
}

export interface KlaviyoFlow {
  name: string
  type: string
  sent: number
  delivered: number
  opened: number
  clicked: number
  revenue: number
  open_rate: number
  click_rate: number
}

export interface ShopifyOverview {
  order_count: number
  gross_revenue: number
  net_revenue: number
  refunds: number
  average_order_value: number
  new_customers: number
  returning_customers: number
  conversion_rate: number
}

export interface BudgetPacing {
  platform: string
  spent: number
  budget: number
  days_elapsed: number
  days_in_month: number
  pct_spent: number
  pct_elapsed: number
  projected_spend: number
  status: 'on_track' | 'ahead' | 'behind' | 'critical'
  variance_pct: number
}

export interface DateRange {
  from: string
  to: string
  label: string
}

export interface OnboardingSubmission {
  id: string
  company_name: string
  website: string | null
  industry: string | null
  contact_name: string
  contact_email: string
  contact_phone: string | null
  monthly_budget: number | null
  roas_target: number | null
  primary_kpis: string[] | null
  goals: string | null
  platforms: string[] | null
  competitor_urls: string[] | null
  brand_voice: string | null
  target_audience: string | null
  additional_notes: string | null
  meta_account_id: string | null
  google_customer_id: string | null
  klaviyo_api_key: string | null
  shopify_store: string | null
  status: string
  client_id: string | null
  submitted_by: string | null
  created_at: string
  updated_at: string
}

export interface ClientRequest {
  id: string
  client_id: string
  submitted_by: string
  type: 'creative_brief' | 'strategy_change' | 'budget_change' | 'question' | 'other'
  title: string
  description: string | null
  status: 'open' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  slack_thread_id: string | null
  created_at: string
  updated_at: string
}

export interface AgencyTheme {
  slug: string
  name: string
  domain: string
  logo: string
  fontFamily: string
  fontHeading: string
  colors: {
    background: string
    foreground: string
    accent: string
    accentForeground: string
    card: string
    cardBorder: string
    sidebar: string
    sidebarText: string
  }
}
