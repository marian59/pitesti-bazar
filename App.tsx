import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';
import { CityFilter } from './components/CityFilter';
import { AdCard } from './components/AdCard';
import { AdDetailModal } from './components/AdDetailModal';
import { AddAdModal } from './components/AddAdModal';
import { AuthModal } from './components/AuthModal';
import { MyAccountModal } from './components/MyAccountModal';
import { EditAdModal } from './components/EditAdModal';
import { AdminPanel } from './components/AdminPanel';
import { ReportModal } from './components/ReportModal';
import { Footer } from './components/Footer';
import { Ad, User, AdminConfig, DailyStats, LocationCity, SortOption, AdReport, BlacklistedPhone } from './types';
import { 
  getStoredAds, 
  saveStoredAds, 
  resetStoredAdsToDefault,
  getStoredUsers,
  saveStoredUsers,
  getCurrentUser,
  setCurrentUser,
  getAdminConfig,
  saveAdminConfig,
  isAdminLoggedIn,
  setAdminLoggedIn,
  getDailyStats,
  incrementVisitors,
  getFavorites, 
  saveFavorites,
  getStoredReports,
  saveStoredReports,
  getBlacklistedPhones,
  saveBlacklistedPhones,
  isUserVerifiedSeller
} from './utils/storage';
import { PlusCircle, SearchX, CheckCircle, Heart, Tag, Sparkles, ShieldAlert, LogIn, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  // --- Persistent State ---
  const [ads, setAds] = useState<Ad[]>(() => getStoredAds());
  const [users, setUsers] = useState<User[]>(() => getStoredUsers());
  const [currentUser, setCurrentUserState] = useState<User | null>(() => getCurrentUser());
  const [adminConfig, setAdminConfigState] = useState<AdminConfig>(() => getAdminConfig());
  const [isAdminActive, setIsAdminActive] = useState<boolean>(() => isAdminLoggedIn());
  const [dailyStats, setDailyStats] = useState<DailyStats>(() => getDailyStats());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [reports, setReports] = useState<AdReport[]>(() => getStoredReports());
  const [blacklistedPhones, setBlacklistedPhones] = useState<BlacklistedPhone[]>(() => getBlacklistedPhones());

  // --- Filtering & Sorting ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<LocationCity | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate categoriile');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);

  // --- Modals State ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authPromptReason, setAuthPromptReason] = useState<string | undefined>(undefined);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [reportingAd, setReportingAd] = useState<Ad | null>(null);

  // Toast notice
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Increment visitor count on initial session & check hash
  useEffect(() => {
    const updatedCount = incrementVisitors();
    setDailyStats((prev) => ({ ...prev, visitorsToday: updatedCount }));

    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname.endsWith('/admin')) {
        setIsAdminPanelOpen(true);
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);
    return () => window.removeEventListener('hashchange', checkAdminHash);
  }, []);

  // REAL-TIME SECURITY CHECK: Revoke active session if user was blocked or blacklisted
  useEffect(() => {
    if (currentUser) {
      const isBlacklisted = blacklistedPhones.some(
        (b) => b.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')
      );
      const dbUser = users.find(
        (u) => u.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')
      );
      if (isBlacklisted || currentUser.isBlocked || (dbUser && dbUser.isBlocked)) {
        setCurrentUser(null);
        setCurrentUserState(null);
        setIsMyAccountOpen(false);
        setIsAddModalOpen(false);
        showToast('Contul tău a fost blocat de administrator pentru anunțuri false.');
      }
    }
  }, [currentUser, users, blacklistedPhones]);

  // Sync favorites
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Sync reports
  const handleUpdateReports = (newReports: AdReport[]) => {
    setReports(newReports);
    saveStoredReports(newReports);
  };

  // Sync blacklist
  const handleUpdateBlacklist = (newList: BlacklistedPhone[]) => {
    setBlacklistedPhones(newList);
    saveBlacklistedPhones(newList);
  };

  // Handle User Log In
  const handleLoginSuccess = (user: User) => {
    setCurrentUserState(user);
    showToast(`Bun venit, ${user.name}!`);
    if (authPromptReason) {
      setIsAddModalOpen(true);
      setAuthPromptReason(undefined);
    }
  };

  // Handle User Log Out
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentUserState(null);
    setIsMyAccountOpen(false);
    showToast('Te-ai deconectat cu succes.');
  };

  // Handle Admin Log In
  const handleAdminLogin = () => {
    setAdminLoggedIn(true);
    setIsAdminActive(true);
    showToast('Autentificat ca Administrator Suprem.');
  };

  // Handle Admin Log Out
  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    setIsAdminActive(false);
    setIsAdminPanelOpen(false);
    showToast('Ai ieșit din modul de administrator.');
  };

  // Update Admin Config
  const handleUpdateAdminConfig = (newConfig: AdminConfig) => {
    setAdminConfigState(newConfig);
    saveAdminConfig(newConfig);
  };

  // Update Users
  const handleUpdateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    saveStoredUsers(newUsers);
  };

  // Update Ads
  const handleUpdateAds = (newAds: Ad[]) => {
    setAds(newAds);
    saveStoredAds(newAds);
  };

  // Toggle favorite
  const handleToggleFavorite = (adId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(adId);
      if (exists) {
        showToast('Anunț eliminat din favorite.');
        return prev.filter((id) => id !== adId);
      } else {
        showToast('Anunț salvat la favorite!');
        return [...prev, adId];
      }
    });
  };

  // Request Add Ad
  const handleRequestAddAd = () => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthPromptReason('Pentru a adăuga un anunț gratis, te rugăm să intri în cont sau să creezi un cont nou verificat prin SMS.');
      setIsAuthModalOpen(true);
    } else {
      const isBlocked = currentUser.isBlocked || blacklistedPhones.some(
        (b) => b.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')
      );
      if (isBlocked) {
        handleLogout();
        showToast('Contul tău a fost blocat de administrator pentru anunțuri false.');
        return;
      }
      setIsAddModalOpen(true);
    }
  };

  // Submit new ad (Requirement 4: Stays in pending status until approved)
  const handleAddAdSubmit = (newAd: Ad) => {
    const updated = [newAd, ...ads];
    handleUpdateAds(updated);
    showToast('Anunțul tău a fost trimis spre aprobare administratorului din Pitești.');
    setIsShowingFavorites(false);
    setSelectedCategory('Toate categoriile');
  };

  // Save edited ad
  const handleSaveEditedAd = (updatedAd: Ad) => {
    const updated = ads.map((a) => (a.id === updatedAd.id ? updatedAd : a));
    handleUpdateAds(updated);
    showToast('Modificările au fost salvate cu succes.');
    if (selectedAd?.id === updatedAd.id) {
      setSelectedAd(updatedAd);
    }
  };

  // Delete ad
  const handleDeleteAd = (adId: string) => {
    const updated = ads.filter((a) => a.id !== adId);
    handleUpdateAds(updated);
    setFavorites((prev) => prev.filter((id) => id !== adId));
    if (selectedAd?.id === adId) {
      setSelectedAd(null);
    }
    showToast('Anunțul a fost șters.');
  };

  // Promote ad
  const handlePromoteAd = (adId: string) => {
    const updated = ads.map((a) => {
      if (a.id === adId) {
        return { ...a, isPromoted: true };
      }
      return a;
    });
    handleUpdateAds(updated);

    const newRevenue = adminConfig.totalRevenue + adminConfig.promoPrice;
    const updatedAdminConfig: AdminConfig = {
      ...adminConfig,
      totalRevenue: newRevenue,
    };
    handleUpdateAdminConfig(updatedAdminConfig);
    showToast(`Anunțul a fost promovat cu succes! (${adminConfig.promoPrice} lei achitați)`);
  };

  // Handle scam report from visitor with Auto-Quarantine feature
  const handleSubmitReport = (report: AdReport) => {
    const updatedReports = [report, ...reports];
    handleUpdateReports(updatedReports);

    // Increment report counter on ad & auto-quarantine if reports >= 2
    let wasQuarantined = false;
    const updatedAds = ads.map((a) => {
      if (a.id === report.adId) {
        const nextReports = (a.reportsCount || 0) + 1;
        const shouldQuarantine = nextReports >= 2;
        if (shouldQuarantine && a.status === 'approved') {
          wasQuarantined = true;
        }
        return { 
          ...a, 
          reportsCount: nextReports,
          status: shouldQuarantine ? ('pending' as const) : a.status
        };
      }
      return a;
    });
    handleUpdateAds(updatedAds);

    if (wasQuarantined) {
      showToast('⚠️ Anunțul a primit multiple sesizări și a fost suspendat automat până la verificarea adminului!');
    } else {
      showToast('Raportul a fost trimis administratorului. Verificăm în cel mult 10 minute!');
    }
  };

  // Reset data to defaults
  const handleResetData = () => {
    if (window.confirm('Vrei să resetezi baza de date la anunțurile inițiale din Argeș?')) {
      const initial = resetStoredAdsToDefault();
      setAds(initial);
      setReports(getStoredReports());
      setBlacklistedPhones([]);
      showToast('Baza de date a fost resetată la starea inițială.');
    }
  };

  // User's own ads
  const userAds = useMemo(() => {
    if (!currentUser) return [];
    return ads.filter(
      (a) => a.userId === currentUser.id || (currentUser.phone && a.phone === currentUser.phone)
    );
  }, [ads, currentUser]);

  // City counts (only counting approved ads for visitors)
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'Pitești': 0,
      'Mioveni': 0,
      'Curtea de Argeș': 0,
    };
    ads.filter((a) => a.status === 'approved').forEach((ad) => {
      if (counts[ad.city] !== undefined) {
        counts[ad.city]++;
      }
    });
    return counts;
  }, [ads]);

  // Search text normalizer
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Filtered & sorted ads for public feed (only 'approved' ads appear to visitors!)
  const filteredAds = useMemo(() => {
    return ads
      .filter((ad) => {
        // Requirement 4: only approved ads are shown to public!
        if (ad.status !== 'approved') {
          return false;
        }

        if (isShowingFavorites && !favorites.includes(ad.id)) {
          return false;
        }

        if (selectedCity !== 'all' && ad.city !== selectedCity) {
          return false;
        }

        if (selectedCategory !== 'Toate categoriile' && ad.category !== selectedCategory) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = normalizeText(searchQuery.trim());
          const inTitle = normalizeText(ad.title).includes(q);
          const inDesc = normalizeText(ad.description).includes(q);
          const inCat = normalizeText(ad.category).includes(q);
          const inNeigh = ad.neighborhood ? normalizeText(ad.neighborhood).includes(q) : false;
          const inCity = normalizeText(ad.city).includes(q);

          if (!inTitle && !inDesc && !inCat && !inNeigh && !inCity) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'newest') {
          if (a.isPromoted && !b.isPromoted) return -1;
          if (!a.isPromoted && b.isPromoted) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortOption === 'price_asc') {
          return a.price - b.price;
        }
        if (sortOption === 'price_desc') {
          return b.price - a.price;
        }
        return 0;
      });
  }, [ads, favorites, isShowingFavorites, selectedCity, selectedCategory, searchQuery, sortOption]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedCategory('Toate categoriile');
    setIsShowingFavorites(false);
    setSortOption('newest');
  };

  const pendingCount = ads.filter((a) => a.status === 'pending').length;
  const reportsCount = reports.filter((r) => !r.isResolved).length;

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#002f34] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-sm font-bold border border-[#23e5db] animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle className="w-5 h-5 text-[#23e5db] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* REQUIREMENT 6: TOP SAFETY NOTICE BANNER */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-4 py-2.5 text-xs sm:text-sm font-bold shadow-md border-b border-emerald-700/50 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#23e5db] shrink-0" />
            <span className="leading-snug">
              🛡️ Toate anunțurile sunt verificate manual de administratorul din Pitești. Raportează orice țeapă și blocăm hoțul în 10 minute.
            </span>
          </div>
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="text-[11px] font-bold text-[#23e5db] hover:underline whitespace-nowrap hidden md:inline cursor-pointer"
          >
            Securitate Garantată • Panou Admin
          </button>
        </div>
      </div>

      {/* Admin banner bar if logged in */}
      {isAdminActive && (
        <div className="bg-amber-400 text-slate-950 px-4 py-2 text-xs font-black flex items-center justify-between border-b border-amber-500 shadow-xs">
          <div className="flex items-center gap-2">
            <span>👑</span>
            <span>Ești conectat ca Administrator Suprem ({adminConfig.email})</span>
            {pendingCount > 0 && (
              <span className="bg-slate-950 text-white px-2 py-0.5 rounded-full text-[10px]">
                {pendingCount} în așteptare
              </span>
            )}
            {reportsCount > 0 && (
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                {reportsCount} sesizări țeapă!
              </span>
            )}
          </div>
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="bg-slate-950 text-white px-3 py-1 rounded-md text-[11px] font-bold hover:bg-slate-800 transition cursor-pointer"
          >
            Deschide Panoul Anti-Țepe
          </button>
        </div>
      )}

      {/* 1. Header with branding, login / my account & big Add Ad button */}
      <Navbar
        currentUser={currentUser}
        onOpenAddModal={handleRequestAddAd}
        onOpenAuthModal={(mode) => {
          setAuthModalMode(mode || 'login');
          setAuthPromptReason(undefined);
          setIsAuthModalOpen(true);
        }}
        onOpenMyAccount={() => setIsMyAccountOpen(true)}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
        isAdminLoggedIn={isAdminActive}
        favoritesCount={favorites.length}
        onShowFavorites={() => setIsShowingFavorites((prev) => !prev)}
        isShowingFavorites={isShowingFavorites}
        onResetFilters={resetAllFilters}
      />

      {/* 2. Big Search Bar ("Ce cauti in Pitesti?") */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        onClear={() => setSearchQuery('')}
        totalResults={filteredAds.length}
      />

      {/* 3. Big Filter Buttons: Toate, Pitesti, Mioveni, Curtea de Arges */}
      <CityFilter
        selectedCity={selectedCity}
        onCitySelect={(city) => {
          setSelectedCity(city);
          setIsShowingFavorites(false);
        }}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        sortOption={sortOption}
        onSortChange={setSortOption}
        cityCounts={cityCounts}
        totalCount={ads.filter((a) => a.status === 'approved').length}
      />

      {/* Main Ads Listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Active Filter Indicators */}
        {(isShowingFavorites || searchQuery || selectedCity !== 'all' || selectedCategory !== 'Toate categoriile') && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-bold text-slate-700">Filtre active:</span>
              
              {isShowingFavorites && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  Doar Favorite ({favorites.length})
                </span>
              )}

              {selectedCity !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs">
                  Oraș: {selectedCity}
                </span>
              )}

              {selectedCategory !== 'Toate categoriile' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs">
                  {selectedCategory}
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-xs">
                  Căutare: "{searchQuery}"
                </span>
              )}
            </div>

            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-slate-500 hover:text-[#002f34] underline transition cursor-pointer"
            >
              Resetează toate filtrele
            </button>
          </div>
        )}

        {/* Section Heading & Result count */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#002f34]">
              {isShowingFavorites
                ? 'Anunțuri salvate la favorite'
                : selectedCity === 'all'
                ? 'Toate anunțurile verificate din Argeș'
                : `Anunțuri verificate în ${selectedCity}`}
            </h2>
          </div>

          <span className="text-sm font-semibold text-slate-500">
            {filteredAds.length} {filteredAds.length === 1 ? 'anunț verificat' : 'anunțuri verificate'}
          </span>
        </div>

        {/* Cards Grid */}
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredAds.map((ad) => {
              const isVerified = isUserVerifiedSeller(ad.userId || ad.phone, ads, users);
              return (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  isFavorite={favorites.includes(ad.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onSelect={(selected) => setSelectedAd(selected)}
                  onReportAd={(reported, e) => {
                    e.stopPropagation();
                    setReportingAd(reported);
                  }}
                  isSellerVerified={isVerified}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Nu am găsit niciun anunț verificat
            </h3>
            
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              {searchQuery
                ? `Nu există anunțuri pentru căutarea "${searchQuery}". Încearcă un alt termen.`
                : isShowingFavorites
                ? 'Nu ai salvat încă niciun anunț la favorite. Apasă pe inimioara oricărui anunț.'
                : `Nu sunt anunțuri în această categorie pentru ${selectedCity === 'all' ? 'județul Argeș' : selectedCity}.`}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {(searchQuery || selectedCategory !== 'Toate categoriile' || isShowingFavorites) && (
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition cursor-pointer"
                >
                  Vezi toate anunțurile
                </button>
              )}

              <button
                onClick={handleRequestAddAd}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-bold text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>Adaugă primul anunț gratis</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#002f34] to-[#00424a] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#23e5db]/20">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#23e5db] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Platformă 100% sigură în Argeș
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Vinde simplu și protejat pe Pitești Bazar!
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Fără comisioane și fără hoți. Toate conturile sunt verificate prin SMS, iar anunțurile sunt verificate manual.
            </p>
          </div>

          <button
            onClick={handleRequestAddAd}
            className="shrink-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#2ecc71] hover:to-[#1ebb5b] text-white font-black text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition cursor-pointer flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Adaugă anunț gratis</span>
          </button>
        </div>

      </main>

      {/* Footer */}
      <Footer
        onSelectCity={(city) => {
          setSelectedCity(city);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResetData={handleResetData}
        onOpenAdmin={() => setIsAdminPanelOpen(true)}
      />

      {/* --- ALL MODALS --- */}
      
      {/* 1. Add Ad Modal */}
      <AddAdModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAd={handleAddAdSubmit}
        currentUser={currentUser}
        defaultCity={selectedCity !== 'all' ? selectedCity : 'Pitești'}
      />

      {/* 2. Auth Modal (Phone + SMS + Anti-Fraud Blacklist) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthPromptReason(undefined);
        }}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        promptReason={authPromptReason}
      />

      {/* 3. My Account Modal */}
      <MyAccountModal
        user={currentUser}
        isOpen={isMyAccountOpen}
        onClose={() => setIsMyAccountOpen(false)}
        onLogout={handleLogout}
        userAds={userAds}
        onOpenAddAd={() => setIsAddModalOpen(true)}
        onEditAd={(ad) => setEditingAd(ad)}
        onDeleteAd={handleDeleteAd}
        onPromoteAd={handlePromoteAd}
        promoPrice={adminConfig.promoPrice}
      />

      {/* 4. Edit Ad Modal */}
      <EditAdModal
        ad={editingAd}
        isOpen={!!editingAd}
        onClose={() => setEditingAd(null)}
        onSave={handleSaveEditedAd}
      />

      {/* 5. Ad Detail Modal with Report Scam Button */}
      <AdDetailModal
        ad={selectedAd}
        onClose={() => setSelectedAd(null)}
        isFavorite={selectedAd ? favorites.includes(selectedAd.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onDeleteAd={
          currentUser && selectedAd && (selectedAd.userId === currentUser.id || selectedAd.phone === currentUser.phone)
            ? handleDeleteAd
            : undefined
        }
        onReportAd={(adToReport) => {
          setSelectedAd(null);
          setReportingAd(adToReport);
        }}
        isSellerVerified={selectedAd ? isUserVerifiedSeller(selectedAd.userId || selectedAd.phone, ads, users) : false}
      />

      {/* 6. Report Scam Modal (⚠️ Raportează anunț fals / Țeapă) */}
      <ReportModal
        ad={reportingAd}
        isOpen={!!reportingAd}
        onClose={() => setReportingAd(null)}
        onSubmitReport={handleSubmitReport}
      />

      {/* 7. Supreme Anti-Scam Admin Panel (/admin) */}
      {isAdminPanelOpen && (
        <AdminPanel
          adminConfig={adminConfig}
          onUpdateAdminConfig={handleUpdateAdminConfig}
          isAdminLoggedIn={isAdminActive}
          onAdminLogin={handleAdminLogin}
          onAdminLogout={handleAdminLogout}
          users={users}
          onUpdateUsers={handleUpdateUsers}
          ads={ads}
          onUpdateAds={handleUpdateAds}
          reports={reports}
          onUpdateReports={handleUpdateReports}
          blacklistedPhones={blacklistedPhones}
          onUpdateBlacklist={handleUpdateBlacklist}
          dailyStats={dailyStats}
          onClose={() => setIsAdminPanelOpen(false)}
          onResetAllData={handleResetData}
        />
      )}

    </div>
  );
}
