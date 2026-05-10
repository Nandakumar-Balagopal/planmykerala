export interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export interface Itinerary {
  id: string;
  name: string;
  items: ItineraryItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Destination {
  id: number;
  name: string;
  slug?: string;
  region?: string;
  lat?: number;
  lng?: number;
  min_nights?: number;
  description?: string;
}

export interface PlannedDay {
  day: number;
  destination_id: number;
  destination_name: string;
  destination_region?: string;
  destination_description?: string;
  hotel_id?: number | null;
  hotel_name?: string | null;
  hotel_star?: number | null;
  hotel_thumbnail_url?: string | null;
  drive_minutes?: number | null;
  drive_km?: number | null;
  notes?: string | null;
  activities: string[];
  activity_options?: Array<{
    id: number;
    name: string;
    duration_hours?: number | null;
    price_per_person?: number | null;
  }>;
  cost_per_day?: number;
}

export interface OptimizationInsight {
  title: string;
  description: string;
  metric?: string;
  icon?: string;
}

export interface RouteOptimization {
  total_km: number;
  drive_hours: number;
  total_days: number;
  avg_km_per_day: number;
  destinations_count: number;
  distribution?: Array<{
    destination: string;
    nights: number;
  }>;
}

export interface PlanResponse {
  days: PlannedDay[];
  total_price: number;
  hotel_price: number;
  vehicle_price: number;
  activity_price: number;
  cost_per_day: number;
  warnings: string[];
  optimization_insights: OptimizationInsight[];
  route_optimization?: RouteOptimization;
}