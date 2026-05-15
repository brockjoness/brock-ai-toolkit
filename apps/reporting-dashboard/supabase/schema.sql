-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  agency_slug TEXT NOT NULL DEFAULT 'clickflow',
  meta_account_id TEXT,
  google_customer_id TEXT,
  klaviyo_api_key TEXT,
  shopify_store TEXT,
  monthly_budget NUMERIC,
  roas_target NUMERIC,
  cpa_target NUMERIC,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unified metrics table (all platforms normalize here)
CREATE TABLE client_metrics (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('meta', 'google', 'klaviyo', 'shopify')),
  date DATE NOT NULL,
  spend NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions NUMERIC DEFAULT 0,
  roas NUMERIC GENERATED ALWAYS AS (CASE WHEN spend > 0 THEN revenue / spend ELSE 0 END) STORED,
  cpa NUMERIC GENERATED ALWAYS AS (CASE WHEN conversions > 0 THEN spend / conversions ELSE 0 END) STORED,
  ctr NUMERIC GENERATED ALWAYS AS (CASE WHEN impressions > 0 THEN (clicks::NUMERIC / impressions) * 100 ELSE 0 END) STORED,
  cpc NUMERIC GENERATED ALWAYS AS (CASE WHEN clicks > 0 THEN spend / clicks ELSE 0 END) STORED,
  campaign_name TEXT,
  ad_group_name TEXT,
  ad_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id, platform, date, campaign_name, ad_group_name, ad_name)
);

-- Meta-specific data
CREATE TABLE meta_ads (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  campaign_id TEXT,
  campaign_name TEXT,
  adset_id TEXT,
  adset_name TEXT,
  ad_id TEXT,
  ad_name TEXT,
  creative_url TEXT,
  spend NUMERIC DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  frequency NUMERIC,
  reach BIGINT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Google Ads specific data
CREATE TABLE google_ads (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  campaign_id TEXT,
  campaign_name TEXT,
  ad_group_id TEXT,
  ad_group_name TEXT,
  keyword TEXT,
  match_type TEXT,
  search_term TEXT,
  spend NUMERIC DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  conversions NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  quality_score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Klaviyo flow/campaign data
CREATE TABLE klaviyo_metrics (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  type TEXT CHECK (type IN ('flow', 'campaign')),
  name TEXT NOT NULL,
  sent BIGINT DEFAULT 0,
  delivered BIGINT DEFAULT 0,
  opened BIGINT DEFAULT 0,
  clicked BIGINT DEFAULT 0,
  conversions NUMERIC DEFAULT 0,
  revenue NUMERIC DEFAULT 0,
  unsubscribed BIGINT DEFAULT 0,
  bounced BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Shopify order data
CREATE TABLE shopify_metrics (
  id BIGSERIAL PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  order_count INTEGER DEFAULT 0,
  gross_revenue NUMERIC DEFAULT 0,
  net_revenue NUMERIC DEFAULT 0,
  refunds NUMERIC DEFAULT 0,
  average_order_value NUMERIC DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE klaviyo_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopify_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies (clients see only their own data)
CREATE POLICY "Clients see own data" ON client_metrics
  FOR SELECT USING (client_id IN (
    SELECT id FROM clients WHERE id = auth.uid()
  ));

-- Admin policy (for ClickFlow team - full access)
CREATE POLICY "Admin full access" ON client_metrics
  FOR ALL USING (
    auth.jwt() ->> 'role' = 'admin'
  );

-- Repeat for all tables...

-- Indexes for performance
CREATE INDEX idx_metrics_client_date ON client_metrics(client_id, date);
CREATE INDEX idx_metrics_platform ON client_metrics(platform);
CREATE INDEX idx_meta_client_date ON meta_ads(client_id, date);
CREATE INDEX idx_google_client_date ON google_ads(client_id, date);
CREATE INDEX idx_klaviyo_client_date ON klaviyo_metrics(client_id, date);
CREATE INDEX idx_shopify_client_date ON shopify_metrics(client_id, date);
