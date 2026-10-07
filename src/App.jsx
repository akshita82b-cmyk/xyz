import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import FleetDetailPage from './pages/FleetDetailPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AdminPage from './pages/AdminPage';
import FareCalculator from './components/FareCalculator';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import StickyMobileBar from './components/StickyMobileBar';
import { TravelDataProvider } from './context/TravelDataContext';

export default function App() {
  const [route, setRoute] = useState({ page: 'home', id: null });
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  // Helper function to parse hash URL into page & id
  const parseHash = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/');

    if (parts[0] === 'admin') {
      return { page: 'admin', id: null };
    }
    if (parts[0] === 'fleet' && parts[1]) {
      return { page: 'fleet-detail', id: parts[1] };
    }
    if (parts[0] === 'fleet') {
      return { page: 'fleet', id: null };
    }
    if (parts[0] === 'tours' && parts[1]) {
      return { page: 'tour-detail', id: parts[1] };
    }
    if (parts[0] === 'tours') {
      return { page: 'tours', id: null };
    }
    if (parts[0] === 'calculator') {
      return { page: 'calculator', id: null };
    }
    if (parts[0] === 'contact') {
      return { page: 'contact', id: null };
    }
    return { page: 'home', id: null };
  };

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      if (parsed.page === 'contact') {
        setRoute({ page: 'home', id: null });
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setRoute(parsed);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Initial load check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // URL Navigation Handlers
  const navigateTo = (urlPath) => {
    window.location.hash = urlPath;
  };

  const handleOpenBooking = (vehicle = null, packageObj = null) => {
    if (vehicle) setSelectedVehicle(vehicle);
    if (packageObj) setSelectedPackage(packageObj);
    setBookingModalOpen(true);
  };

  const handleHeroSelectVehicle = (vehicleObj, searchInfo) => {
    setSelectedVehicle(vehicleObj);
    if (searchInfo) setSearchParams(searchInfo);
    setBookingModalOpen(true);
  };

  return (
    <TravelDataProvider>
      {route.page === 'admin' ? (
        <AdminPage onNavigateHome={() => navigateTo('/')} />
      ) : (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
          
          {/* Header */}
          <Header
            activePage={route.page}
            activeId={route.id}
            onNavigate={(path) => navigateTo(path)}
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* Main Multi-Page Views mapped to dedicated URLs */}
          <main>
            {route.page === 'home' && (
              <HomePage
                onOpenBooking={() => handleOpenBooking()}
                onSelectVehicle={handleHeroSelectVehicle}
                onSelectPackage={(pkg) => handleOpenBooking(null, pkg)}
                onNavigate={(path) => navigateTo(path)}
              />
            )}

            {route.page === 'fleet' && (
              <FleetPage
                onSelectVehicle={(v) => handleOpenBooking(v)}
                onViewDetail={(id) => navigateTo(`/fleet/${id}`)}
                onOpenBooking={() => handleOpenBooking()}
              />
            )}

            {route.page === 'fleet-detail' && (
              <FleetDetailPage
                vehicleId={route.id}
                onBack={() => navigateTo('/fleet')}
                onOpenBooking={(v) => handleOpenBooking(v)}
              />
            )}

            {route.page === 'tours' && (
              <ToursPage
                onSelectPackage={(pkg) => handleOpenBooking(null, pkg)}
                onViewDetail={(id) => navigateTo(`/tours/${id}`)}
              />
            )}

            {route.page === 'tour-detail' && (
              <TourDetailPage
                packageId={route.id}
                onBack={() => navigateTo('/tours')}
                onOpenBooking={(pkg) => handleOpenBooking(null, pkg)}
              />
            )}

            {route.page === 'calculator' && (
              <div className="py-8 bg-slate-50 min-h-screen">
                <FareCalculator onOpenBooking={(v) => handleOpenBooking(v)} />
              </div>
            )}
          </main>

          {/* Footer */}
          <Footer onOpenBooking={() => handleOpenBooking()} onNavigate={(path) => navigateTo(path)} />

          {/* Booking Popup Modal */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => {
              setBookingModalOpen(false);
              setSelectedVehicle(null);
              setSelectedPackage(null);
              setSearchParams(null);
            }}
            initialVehicle={selectedVehicle}
            initialPackage={selectedPackage}
            initialSearch={searchParams}
          />

          {/* Sticky Bottom Bar for Mobile */}
          <StickyMobileBar onOpenBooking={() => handleOpenBooking()} />

        </div>
      )}
    </TravelDataProvider>
  );
}
