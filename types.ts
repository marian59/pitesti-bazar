export type LocationCity = 'Pitești' | 'Mioveni' | 'Curtea de Argeș';

export type AdStatus = 'approved' | 'pending' | 'rejected';

export interface User {
  id: string;
  name: string;
  phone: string;
  password: string;
  city: LocationCity;
  createdAt: string;
  isBlocked: boolean;
  blockReason?: string;
  isVerifiedSeller?: boolean;
}

export interface AdminConfig {
  isConfigured: boolean;
  email: string;
  phone: string;
  password: string;
  promoPrice: number; // e.g. 5 lei
  totalRevenue: number; // in RON
}

export interface AdReport {
  id: string;
  adId: string;
  adTitle: string;
  sellerName: string;
  sellerPhone: string;
  reason: string;
  details?: string;
  reporterPhone?: string;
  createdAt: string;
  isResolved: boolean;
}

export interface BlacklistedPhone {
  phone: string;
  name?: string;
  reason: string;
  blockedAt: string;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'lei' | '€';
  isNegotiable: boolean;
  isFree?: boolean;
  city: LocationCity;
  neighborhood?: string;
  category: string;
  images: string[];
  sellerName: string;
  phone: string;
  userId?: string; // ID of the registered user
  createdAt: string;
  status?: AdStatus; // 'approved' | 'pending' | 'rejected'
  rejectionReason?: string;
  isFeatured?: boolean;
  isPromoted?: boolean;
  viewsCount?: number;
  isUserCreated?: boolean;
  reportsCount?: number;
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc';

export interface DailyStats {
  visitorsToday: number;
  lastVisitDate: string;
}
