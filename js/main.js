/* ==========================================================================
   BHARAT BUS SERVICE - VANILLA JAVASCRIPT LOGIC
   ========================================================================== */

const COMPANY_PHONE = "9814276846";
const COMPANY_WHATSAPP = "919814276846";

// Fleet Data Registry
const FLEET_DATA = {
  "9-seater": {
    name: "9 Seater Luxury Tempo Traveller",
    capacity: "9 Passengers + 1 Driver",
    layout: "1x1 VIP Reclining Seats",
    rate: "₹26",
    minKm: 250,
    batta: 500,
    image: "images/tempo_traveller_interior.jpg",
    badge: "Popular for Small Families",
    desc: "Ideal for small families and VIP travel across Himachal, Uttarakhand, and Punjab with maximum legroom.",
    features: ["100% Pushback Executive Seats", "Heavy-Duty Dual AC", "High-Bass Bluetooth Audio", "Dedicated Rear Luggage Boot", "USB Charging Ports", "LED Reading Lights"]
  },
  "12-seater": {
    name: "12 Seater Executive Tempo Traveller",
    capacity: "12 Passengers + 1 Driver",
    layout: "2x1 Pushback Leather Seats",
    rate: "₹28",
    minKm: 250,
    batta: 500,
    image: "images/hero_tempo_bus.jpg",
    badge: "Best Seller for Hill Tours",
    desc: "Our top choice for group tours to Manali, Shimla, Dharamshala, and Leh Ladakh with smooth mountain suspension.",
    features: ["2x1 Reclining Leather Seats", "Roof Mounted Front & Rear AC", "24-inch LED TV", "Overhead Luggage Racks", "Tinted Windows", "First Aid & Safety Kit"]
  },
  "17-seater": {
    name: "17 Seater Maharaja VIP Tempo Traveller",
    capacity: "17 Passengers + 1 Driver",
    layout: "2x1 Reclining Luxury Seats",
    rate: "₹32",
    minKm: 250,
    batta: 600,
    image: "images/tempo_traveller_interior.jpg",
    badge: "Maharaja VIP Comfort",
    features: ["Ultra Deluxe Reclining Seats", "Ambient Ceiling Mood Lighting", "Teak Wood Flooring", "Individual AC Blowers", "USB Ports at Each Seat", "Huge Luggage Boot"]
  },
  "20-seater": {
    name: "20 Seater Deluxe Tempo Traveller",
    capacity: "20 Passengers + 1 Driver",
    layout: "2x2 Reclining Seating",
    rate: "₹35",
    minKm: 250,
    batta: 600,
    image: "images/hero_tempo_bus.jpg",
    badge: "Great for Medium Groups",
    features: ["Ergonomic High-Back Recliners", "Twin Blowers Heavy Duty AC", "Big Screen TV & Surround Sound", "Panoramic Glass Windows", "Experienced Hill Driver", "Sanitized Vehicle"]
  },
  "22-seater": {
    name: "22 Seater Executive Tempo Traveller",
    capacity: "22 Passengers + 1 Driver",
    layout: "2x2 Comfort Seats",
    rate: "₹38",
    minKm: 250,
    batta: 600,
    image: "images/tempo_traveller_interior.jpg",
    badge: "Spacious Group Coach",
    features: ["Heavy Duty Engine & Air Suspension", "Dual AC Unit for Mountains", "High Headroom & Aisles", "Surround Audio", "Safety Seatbelts", "24/7 GPS Tracking"]
  },
  "24-seater": {
    name: "24 Seater Luxury Tempo Traveller",
    capacity: "24 Passengers + 1 Driver",
    layout: "2x2 Reclining Seats",
    rate: "₹40",
    minKm: 250,
    batta: 700,
    image: "images/hero_tempo_bus.jpg",
    badge: "Maximum Capacity Traveller",
    features: ["Quiet Cabin Insulation", "Separate Luggage Box", "Individual AC Controls", "USB Charging Ports", "Water Bottle Holder", "Hill Specialist Driver"]
  },
  "26-seater": {
    name: "26 Seater Grand Tempo Traveller",
    capacity: "26 Passengers + 1 Driver",
    layout: "2x2 Deluxe Recliners",
    rate: "₹42",
    minKm: 250,
    batta: 700,
    image: "images/tempo_traveller_interior.jpg",
    badge: "Super Capacity Deluxe",
    features: ["Spacious Legroom & Recliners", "Climate Control AC", "HD Display", "Huge Luggage Space", "Uniformed Driver", "All India Tourist Permit"]
  },
  "27-seater": {
    name: "27 Seater Luxury Mini Bus",
    capacity: "27 Passengers + 2 Crew",
    layout: "2x2 Pushback Coach Seats",
    rate: "₹45",
    minKm: 250,
    batta: 700,
    image: "images/hero_tempo_bus.jpg",
    badge: "Mini Bus Specialist",
    features: ["Full Size Air Suspension Mini Bus", "Executive Coach Interiors", "Dual AC", "Under-Floor Luggage Bay", "Audio/Video Player", "GPS Speed Governor"]
  },
  "urbania-vip": {
    name: "Force Urbania VIP Luxury Traveller",
    capacity: "13 / 17 Passengers + 1 Driver",
    layout: "European VIP Seats",
    rate: "₹45",
    minKm: 250,
    batta: 800,
    image: "images/tempo_traveller_interior.jpg",
    badge: "Ultra Luxury Flagship",
    features: ["European Independent Suspension", "Panoramic Double Glass", "Individual AC & USB", "Silent Cabin & Soft Ride", "Ultra Wide Reclining Seats", "VIP Ambient Lighting"]
  },
  "deluxe-bus": {
    name: "35 to 60 Seater Deluxe Buses",
    capacity: "35, 45, 52, 60 Seater Options",
    layout: "2x2 / 3x2 Deluxe Reclining Coach",
    rate: "₹55 - ₹65",
    minKm: 250,
    batta: 800,
    image: "images/hero_tempo_bus.jpg",
    badge: "Luxury Bus Rental Zirakpur",
    features: ["35 to 60 Seater Capacities", "AC & Non-AC Variants", "Huge Under-Floor Luggage", "Pushback Seats & Footrests", "Stereo System & TV", "Experienced Bus Captains"]
  }
};

// Tour Data Registry
const TOUR_DATA = {
  "rajasthan-tour": {
    title: "Rajasthan Heritage & Royal Tour",
    duration: "7 Days / 6 Nights",
    destinations: "Jaipur - Jodhpur - Udaipur - Jaisalmer - Pushkar",
    image: "images/rajasthan_tour.jpg",
    badge: "Royal Heritage Special",
    price: "₹24,999",
    desc: "Explore the pink city Jaipur, majestic blue city Jodhpur, romantic lake city Udaipur, and golden sand dunes of Jaisalmer.",
    highlights: ["Amber Fort & City Palace Jaipur", "Mehrangarh Fort Jodhpur", "Boating at Lake Pichola Udaipur", "Desert Safari & Camping in Jaisalmer", "Brahma Temple Pushkar"],
    itinerary: [
      { day: 1, title: "Chandigarh to Jaipur", desc: "Pickup from Chandigarh/Zirakpur and drive to Jaipur. Evening Chokhi Dhani." },
      { day: 2, title: "Jaipur City Tour", desc: "Visit Amber Fort, Hawa Mahal, Jantar Mantar, City Palace." },
      { day: 3, title: "Jaipur to Jodhpur", desc: "Drive to Jodhpur. Explore Mehrangarh Fort." },
      { day: 4, title: "Jodhpur to Jaisalmer Dunes", desc: "Proceed to Jaisalmer desert camp with camel safari." },
      { day: 5, title: "Jaisalmer to Udaipur", desc: "Visit Jaisalmer Fort and proceed to Lake City Udaipur." },
      { day: 6, title: "Udaipur Sightseeing", desc: "Lake Pichola boat ride and City Palace Udaipur." },
      { day: 7, title: "Return to Chandigarh", desc: "Drive back with royal memories." }
    ]
  },
  "dharamshala-dalhousie": {
    title: "Dharamshala & Dalhousie Hill Retreat",
    duration: "5 Days / 4 Nights",
    destinations: "Dharamshala - McLeod Ganj - Khajjiar - Dalhousie",
    image: "images/dalhousie_dharamshala.jpg",
    badge: "Pine Valley & Snow Peaks",
    price: "₹16,499",
    desc: "Soak in the serene vibes of Dalai Lama's abode McLeod Ganj and Khajjiar Mini Switzerland.",
    highlights: ["His Holiness Dalai Lama Temple McLeod Ganj", "Bhagsunag Waterfall", "Khajjiar Lake & Deodar Forest", "Panchpula Dalhousie", "HPCA Cricket Stadium"],
    itinerary: [
      { day: 1, title: "Chandigarh to Dharamshala", desc: "Morning pickup from Chandigarh/IXC Airport. Drive to Dharamshala." },
      { day: 2, title: "McLeod Ganj Exploration", desc: "Dalai Lama Temple, Bhagsu Falls, HPCA Stadium." },
      { day: 3, title: "Dharamshala to Dalhousie", desc: "Drive to colonial hill town Dalhousie." },
      { day: 4, title: "Khajjiar Mini Switzerland", desc: "Full day tour to Khajjiar pine meadow." },
      { day: 5, title: "Return to Chandigarh", desc: "Visit Panchpula and return to Chandigarh." }
    ]
  },
  "jammu-kashmir": {
    title: "Jammu & Kashmir Paradise Tour",
    duration: "6 Days / 5 Nights",
    destinations: "Srinagar - Gulmarg - Pahalgam - Sonamarg",
    image: "images/kashmir_tour.jpg",
    badge: "Heaven on Earth",
    price: "₹28,500",
    desc: "Experience romantic Shikara rides on Dal Lake, snow skiing in Gulmarg, and Pahalgam saffron fields.",
    highlights: ["Dal Lake Houseboat & Shikara Ride", "Gulmarg Gondola Cable Car", "Betaab & Aru Valley Pahalgam", "Sonamarg Glacier Excursion", "Mughal Gardens"],
    itinerary: [
      { day: 1, title: "Chandigarh to Srinagar", desc: "Transit drive to Srinagar. Houseboat check in." },
      { day: 2, title: "Srinagar Local Sightseeing", desc: "Mughal Gardens & 1-hr Dal Lake Shikara ride." },
      { day: 3, title: "Gulmarg Snow Excursion", desc: "Gondola cable car ride in Gulmarg." },
      { day: 4, title: "Pahalgam Valley", desc: "Drive via Pampore Saffron fields to Pahalgam." },
      { day: 5, title: "Sonamarg Day Trip", desc: "Horse ride to Thajiwas Glacier." },
      { day: 6, title: "Return to Chandigarh", desc: "Depart with Kashmir memories." }
    ]
  },
  "chardham-yatra": {
    title: "Sacred Chardham Yatra Pilgrimage",
    duration: "10 Days / 9 Nights",
    destinations: "Yamunotri - Gangotri - Kedarnath - Badrinath",
    image: "images/chardham_yatra.jpg",
    badge: "Devbhoomi Divine Pilgrimage",
    price: "₹38,999",
    desc: "Complete spiritual pilgrimage covering all four sacred Himalayan shrines in Uttarakhand.",
    highlights: ["Yamunotri Surya Kund", "Gangotri Temple", "Kedarnath Jyotirlinga Darshan", "Badrinath Temple & Mana Village", "Panch Prayag Confluences"],
    itinerary: [
      { day: 1, title: "Chandigarh to Barkot", desc: "Drive to Barkot via Mussoorie." },
      { day: 2, title: "Yamunotri Dham", desc: "Trek to Yamunotri temple, return to Barkot." },
      { day: 3, title: "Barkot to Uttarkashi", desc: "Visit Vishwanath Temple in Uttarkashi." },
      { day: 4, title: "Gangotri Dham", desc: "Drive to Gangotri temple, offer prayers." },
      { day: 5, title: "Uttarkashi to Guptkashi", desc: "Scenic drive along Mandakini river." },
      { day: 6, title: "Kedarnath Temple Darshan", desc: "Trek/Helicopter to Kedarnath Dham." },
      { day: 7, title: "Kedarnath to Guptkashi", desc: "Descend back to Guptkashi." },
      { day: 8, title: "Badrinath Dham", desc: "Drive to Badrinath, Tapt Kund holy dip." },
      { day: 9, title: "Badrinath to Rudraprayag", desc: "Visit Mana Village & drive to Rudraprayag." },
      { day: 10, title: "Rudraprayag to Chandigarh", desc: "Visit Rishikesh Laxman Jhula & return to Chandigarh." }
    ]
  },
  "amritsar-tour": {
    title: "Amritsar Golden Temple & Wagah Border",
    duration: "2 Days / 1 Night",
    destinations: "Golden Temple - Wagah Border - Jallianwala Bagh",
    image: "images/amritsar_golden_temple.jpg",
    badge: "Heritage & Patriotic Special",
    price: "₹6,999",
    desc: "Pay homage at Sri Harmandir Sahib and witness the thrilling Indo-Pak Beating Retreat ceremony.",
    highlights: ["Sri Harmandir Sahib (Golden Temple)", "Jallianwala Bagh Memorial", "Wagah Border Parade Ceremony", "Amritsari Kulcha & Guru ka Langar", "Partition Museum"],
    itinerary: [
      { day: 1, title: "Chandigarh to Amritsar & Wagah Border", desc: "Pickup at 7 AM. Visit Wagah Border for 4:30 PM parade." },
      { day: 2, title: "Golden Temple & Return", desc: "Golden Temple Darshan, Jallianwala Bagh, return to Chandigarh by evening." }
    ]
  },
  "amarnath-yatra": {
    title: "Amarnath Yatra Holy Cave Pilgrimage",
    duration: "6 Days / 5 Nights",
    destinations: "Chandigarh - Katra - Pahalgam / Baltal - Amarnath Cave",
    image: "images/chardham_yatra.jpg",
    badge: "Baba Barfani Sacred Yatra",
    price: "₹29,999",
    desc: "Dedicated transport and logistics support for pilgrims visiting Lord Shiva's ice Shivling at Amarnath Cave.",
    highlights: ["Transport to Baltal/Pahalgam", "Registration & Medical Guidance", "Helicopter or Trek Coordination", "Darshan of Ice Shivling", "Optional Katra Stopover"],
    itinerary: [
      { day: 1, title: "Chandigarh to Katra", desc: "Pickup and transit drive to Katra." },
      { day: 2, title: "Katra to Baltal Base Camp", desc: "Drive to base camp for Amarnath Yatra." },
      { day: 3, title: "Amarnath Holy Cave Darshan", desc: "Helicopter/Trek to Holy Cave." },
      { day: 4, title: "Return to Pahalgam/Srinagar", desc: "Return to base camp." },
      { day: 5, title: "Srinagar Relaxation", desc: "Local Dal Lake relaxation." },
      { day: 6, title: "Return to Chandigarh", desc: "Safe drop-off back in Chandigarh." }
    ]
  }
};

// Ensure Booking Modal exists across all 90 internal pages
function ensureBookingModal() {
  let modal = document.getElementById("bookingModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "bookingModal";
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="closeBookingModal()" type="button" aria-label="Close modal">✕</button>
        <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--color-slate-900);">Book Luxury Vehicle - Reservation</h3>
        <p style="font-size: 0.85rem; color: var(--color-slate-600); margin-bottom: 1.25rem;">Fill out this quick form to receive our lowest guaranteed per-KM tariff quote directly on WhatsApp.</p>
        
        <form onsubmit="handleBookingSubmit(event)" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Full Name *</label>
            <input type="text" id="modalNameInput" required placeholder="Your Name" class="form-input" />
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Mobile Number *</label>
              <input type="tel" id="modalPhoneInput" required placeholder="Phone Number" class="form-input" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Pickup Date *</label>
              <input type="date" id="modalDateInput" required class="form-input" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Pickup City *</label>
              <input type="text" id="modalPickupCityInput" value="Chandigarh / Zirakpur" required class="form-input" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Destination City *</label>
              <input type="text" id="modalDestinationInput" placeholder="e.g. Manali, Shimla, Delhi" required class="form-input" />
            </div>
          </div>

          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--color-slate-700); margin-bottom: 0.25rem; display: block;">Select Vehicle *</label>
            <select id="modalVehicleSelect" class="form-input" style="font-weight: 600;">
              <option value="9-seater">9 Seater Luxury Tempo Traveller (₹26/KM)</option>
              <option value="12-seater">12 Seater Executive Tempo Traveller (₹28/KM)</option>
              <option value="17-seater">17 Seater Maharaja VIP Traveller (₹32/KM)</option>
              <option value="20-seater">20 Seater Deluxe Tempo Traveller (₹35/KM)</option>
              <option value="24-seater">24 Seater Executive Tempo Traveller (₹40/KM)</option>
              <option value="26-seater">26 Seater Grand Tempo Traveller (₹42/KM)</option>
              <option value="27-seater">27 Seater Luxury Mini Bus (₹45/KM)</option>
              <option value="urbania-vip">Force Urbania VIP Traveller (₹45/KM)</option>
              <option value="deluxe-bus">35 to 60 Seater Deluxe Bus (₹55/KM)</option>
            </select>
          </div>

          <button type="submit" class="btn-primary" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 1rem; margin-top: 0.5rem;">
            💬 Send Booking Inquiry on WhatsApp
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    // Close when tapping modal backdrop background
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });
  }
  return modal;
}

// Ensure complete Mobile Navigation Drawer & Bottom Action Bar on every page
function ensureMobileNavigation() {
  // 1. Mobile Menu Backdrop Overlay
  let backdrop = document.getElementById("mobileMenuBackdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "mobileMenuBackdrop";
    backdrop.className = "mobile-menu-backdrop";
    backdrop.addEventListener("click", () => toggleMobileMenu(true));
    document.body.appendChild(backdrop);
  }

  // 2. Mobile Menu Drawer inside Navbar
  let menu = document.getElementById("mobileMenu");
  if (!menu) {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      menu = document.createElement("div");
      menu.id = "mobileMenu";
      menu.className = "mobile-menu hidden";
      menu.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem 0;">
          <a href="about.html" class="mobile-nav-item"><span>🏢 About Us</span></a>
          
          <!-- Bus Rental Accordion -->
          <div>
            <button class="mobile-accordion-btn" type="button" onclick="toggleMobileAccordion('acc-buses')">
              <span>🚌 Bus Rental</span>
              <span>▼</span>
            </button>
            <div id="acc-buses" class="mobile-accordion-content">
              <a href="27-seater-mini-bus-zirakpur.html" class="mobile-sub-link">27 Seater Mini Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">30 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">35 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">40 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">45 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">50 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">55 Seater Bus</a>
              <a href="deluxe-bus-rental-zirakpur.html" class="mobile-sub-link">60 Seater Bus</a>
            </div>
          </div>

          <!-- Tempo Traveller Accordion -->
          <div>
            <button class="mobile-accordion-btn" type="button" onclick="toggleMobileAccordion('acc-tempo')">
              <span>🚐 Tempo Traveller</span>
              <span>▼</span>
            </button>
            <div id="acc-tempo" class="mobile-accordion-content">
              <a href="9-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">8 Seater Tempo Traveller</a>
              <a href="9-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">9 Seater Tempo Traveller</a>
              <a href="12-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">10 Seater Tempo Traveller</a>
              <a href="12-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">12 Seater Tempo Traveller</a>
              <a href="17-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">15 Seater Tempo Traveller</a>
              <a href="17-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">16 Seater Tempo Traveller</a>
              <a href="17-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">18 Seater Tempo Traveller</a>
              <a href="20-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">20 Seater Tempo Traveller</a>
              <a href="24-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">22 Seater Tempo Traveller</a>
              <a href="24-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">24 Seater Tempo Traveller</a>
              <a href="26-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">25 Seater Tempo Traveller</a>
              <a href="26-seater-tempo-traveller-zirakpur.html" class="mobile-sub-link">26 Seater Tempo Traveller</a>
              <a href="27-seater-mini-bus-zirakpur.html" class="mobile-sub-link">27 Seater Tempo Traveller</a>
            </div>
          </div>

          <!-- Urbania Accordion -->
          <div>
            <button class="mobile-accordion-btn" type="button" onclick="toggleMobileAccordion('acc-urbania')">
              <span>🚐 Urbania</span>
              <span>▼</span>
            </button>
            <div id="acc-urbania" class="mobile-accordion-content">
              <a href="force-urbania-luxury-traveller-zirakpur.html" class="mobile-sub-link">Force Urbania Van</a>
              <a href="force-urbania-luxury-traveller-zirakpur.html" class="mobile-sub-link">9 Seater Force Urbania</a>
              <a href="force-urbania-luxury-traveller-zirakpur.html" class="mobile-sub-link">10 Seater Force Urbania</a>
              <a href="force-urbania-luxury-traveller-zirakpur.html" class="mobile-sub-link">12 Seater Force Urbania</a>
              <a href="force-urbania-luxury-traveller-zirakpur.html" class="mobile-sub-link">16 Seater Force Urbania</a>
            </div>
          </div>

          <!-- Taxi Services Accordion -->
          <div>
            <button class="mobile-accordion-btn" type="button" onclick="toggleMobileAccordion('acc-taxis')">
              <span>🚕 Taxi Services</span>
              <span>▼</span>
            </button>
            <div id="acc-taxis" class="mobile-accordion-content">
              <a href="fleets.html" class="mobile-sub-link">Toyota Innova</a>
              <a href="fleets.html" class="mobile-sub-link">Ertiga</a>
              <a href="fleets.html" class="mobile-sub-link">Etios</a>
              <a href="fleets.html" class="mobile-sub-link">Kia</a>
            </div>
          </div>

          <!-- Tour Packages Accordion -->
          <div>
            <button class="mobile-accordion-btn" type="button" onclick="toggleMobileAccordion('acc-tours')">
              <span>🌄 Tour Packages</span>
              <span>▼</span>
            </button>
            <div id="acc-tours" class="mobile-accordion-content">
              <div style="font-weight: 800; color: var(--color-amber-700); font-size: 0.75rem; text-transform: uppercase; margin-top: 0.2rem;">Tour Packages</div>
              <a href="dharamshala-dalhousie-tour-package-from-zirakpur.html" class="mobile-sub-link">Himachal</a>
              <a href="chardham-yatra-package-from-zirakpur.html" class="mobile-sub-link">Uttarakhand</a>
              <a href="amritsar-golden-temple-tour-from-zirakpur.html" class="mobile-sub-link">Punjab</a>
              <a href="tours.html" class="mobile-sub-link">Chandigarh</a>
              <a href="tours.html" class="mobile-sub-link">Industrial</a>
              <a href="kashmir-tour-package-from-zirakpur.html" class="mobile-sub-link">Srinagar & J&K</a>
              <a href="tours.html" class="mobile-sub-link">Leh Ladakh</a>
              <a href="tours.html" class="mobile-sub-link">Offbeat Places</a>
              
              <div style="font-weight: 800; color: var(--color-amber-700); font-size: 0.75rem; text-transform: uppercase; margin-top: 0.5rem;">Pilgrimage Yatras</div>
              <a href="chardham-yatra-package-from-zirakpur.html" class="mobile-sub-link">Char Dham Yatra</a>
              <a href="tours.html" class="mobile-sub-link">Salasar & Balaji Yatra</a>
              <a href="tours.html" class="mobile-sub-link">Mathura & Vrindavan Yatra</a>
              <a href="tours.html" class="mobile-sub-link">Hemkund Yatra</a>
              <a href="tours.html" class="mobile-sub-link">Manimahesh Yatra</a>
              <a href="amarnath-yatra-package-from-zirakpur.html" class="mobile-sub-link">Amarnath Yatra</a>
            </div>
          </div>

          <a href="contact.html" class="mobile-nav-item"><span>📞 Contact Us</span></a>

          <!-- Action Call & Booking Buttons -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
            <a href="tel:+919814276846" class="btn-secondary" style="justify-content: center; text-align: center; background: #ffffff; border-color: var(--color-amber-500); color: var(--color-slate-900);">
              📞 Call Now
            </a>
            <button class="btn-primary" style="justify-content: center;" onclick="openBookingModal()" type="button">
              Book Now
            </button>
          </div>
        </div>
      `;
      navbar.appendChild(menu);
    }
  }

  // 3. Persistent Mobile Action Bar on every page
  let actionBar = document.querySelector(".mobile-action-bar");
  if (!actionBar) {
    actionBar = document.createElement("div");
    actionBar.className = "mobile-action-bar";
    actionBar.innerHTML = `
      <a href="tel:+919814276846" class="btn-call">
        📞 Call Now
      </a>
      <button class="btn-whatsapp" onclick="openBookingModal()" type="button">
        💬 WhatsApp Quote
      </button>
    `;
    document.body.appendChild(actionBar);
  }

  // 4. Highlight active nav link in mobile menu & auto-close on tap
  if (menu) {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    menu.querySelectorAll("a").forEach(link => {
      const href = link.getAttribute("href");
      if (href && href === currentPath) {
        link.classList.add("active");
        const parentAcc = link.closest(".mobile-accordion-content");
        if (parentAcc) {
          parentAcc.classList.add("open");
          parentAcc.style.display = "grid";
        }
      }
      // Tap link closes drawer
      link.addEventListener("click", () => toggleMobileMenu(true));
    });
  }
}

// Toggle Mobile Navigation Drawer
function toggleMobileMenu(forceClose = false) {
  ensureMobileNavigation();
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileMenuBackdrop");
  const btns = document.querySelectorAll(".mobile-menu-btn");
  if (!menu) return;

  const isCurrentlyOpen = !menu.classList.contains("hidden") && menu.style.display !== "none" && getComputedStyle(menu).display !== "none";
  const shouldClose = forceClose || isCurrentlyOpen;

  if (shouldClose) {
    menu.classList.add("hidden");
    menu.style.display = "none";
    if (backdrop) backdrop.classList.remove("open");
    document.body.style.overflow = "";
    btns.forEach(btn => btn.innerHTML = "☰");
  } else {
    menu.classList.remove("hidden");
    menu.style.display = "block";
    if (backdrop) backdrop.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevents body scrolling behind menu
    btns.forEach(btn => btn.innerHTML = "✕");
  }
}

// Toggle Mobile Accordion Submenu
function toggleMobileAccordion(id) {
  let content = null;
  if (typeof id === 'string') {
    content = document.getElementById(id);
  }
  if (!content && id && id.currentTarget) {
    const parent = id.currentTarget.closest("div");
    if (parent) content = parent.querySelector(".mobile-accordion-content");
  }

  if (content) {
    const isOpen = content.classList.contains("open") || content.style.display === "grid";
    if (isOpen) {
      content.classList.remove("open");
      content.style.display = "none";
    } else {
      content.classList.add("open");
      content.style.display = "grid";
    }
  }
}

// Expose globally for inline onclick handlers
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileAccordion = toggleMobileAccordion;

// Global Event Delegation for 100% reliable mobile menu & accordion clicks
document.addEventListener("click", (e) => {
  const menuBtn = e.target.closest(".mobile-menu-btn");
  if (menuBtn) {
    e.preventDefault();
    toggleMobileMenu();
    return;
  }

  const accBtn = e.target.closest(".mobile-accordion-btn");
  if (accBtn) {
    e.preventDefault();
    const parent = accBtn.closest("div");
    if (parent) {
      const content = parent.querySelector(".mobile-accordion-content");
      if (content && content.id) {
        toggleMobileAccordion(content.id);
      }
    }
    return;
  }

  // Backdrop click closes mobile menu
  const backdrop = e.target.closest(".mobile-menu-backdrop");
  if (backdrop) {
    toggleMobileMenu(true);
    return;
  }

  // Modal backdrop click closes modal
  const modalBackdrop = e.target.closest(".modal-backdrop");
  if (modalBackdrop && e.target === modalBackdrop) {
    closeBookingModal();
    return;
  }
});

// Close menu or modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleMobileMenu(true);
    closeBookingModal();
  }
});

// Helper to format city names nicely
function formatCityName(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Open Booking Modal with Smart Route & Vehicle Context Detection
function openBookingModal(vehicleKey = null, packageKey = null) {
  ensureBookingModal();
  const modal = document.getElementById("bookingModal");
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Smart Context Detection from Current URL if arguments omitted
  const path = window.location.pathname.toLowerCase();

  // 1. Vehicle Selection Context
  let targetVehicle = vehicleKey;
  if (!targetVehicle) {
    if (path.includes("9-seater")) targetVehicle = "9-seater";
    else if (path.includes("12-seater")) targetVehicle = "12-seater";
    else if (path.includes("17-seater")) targetVehicle = "17-seater";
    else if (path.includes("20-seater")) targetVehicle = "20-seater";
    else if (path.includes("24-seater")) targetVehicle = "24-seater";
    else if (path.includes("26-seater")) targetVehicle = "26-seater";
    else if (path.includes("27-seater")) targetVehicle = "27-seater";
    else if (path.includes("urbania")) targetVehicle = "urbania-vip";
    else if (path.includes("deluxe-bus")) targetVehicle = "deluxe-bus";
  }
  if (targetVehicle && FLEET_DATA[targetVehicle]) {
    const select = document.getElementById("modalVehicleSelect");
    if (select) select.value = targetVehicle;
  }

  // 2. Destination Context
  let targetDestination = "";
  if (packageKey && TOUR_DATA[packageKey]) {
    targetDestination = TOUR_DATA[packageKey].destinations;
  } else {
    // Route page detection (e.g. zirakpur-to-delhi-bus-hire.html)
    const routeMatch = path.match(/zirakpur-to-(.*?)-bus-hire/);
    if (routeMatch && routeMatch[1]) {
      targetDestination = formatCityName(routeMatch[1]);
    } else if (path.includes("chardham")) {
      targetDestination = "Yamunotri, Gangotri, Kedarnath, Badrinath";
    } else if (path.includes("amritsar")) {
      targetDestination = "Amritsar Golden Temple";
    } else if (path.includes("dharamshala")) {
      targetDestination = "Dharamshala & Dalhousie";
    } else if (path.includes("kashmir")) {
      targetDestination = "Srinagar, Gulmarg, Pahalgam";
    } else if (path.includes("rajasthan")) {
      targetDestination = "Jaipur, Jodhpur, Udaipur, Jaisalmer";
    }
  }
  if (targetDestination) {
    const input = document.getElementById("modalDestinationInput") || document.getElementById("modalDropCityInput");
    if (input) input.value = targetDestination;
  }
}

// Close Booking Modal
function closeBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Home Page Inquiry Form Submit to WhatsApp
function handleHomeInquirySubmit(event) {
  event.preventDefault();
  const name = document.getElementById("homeNameInput")?.value || "";
  const contact = document.getElementById("homeContactInput")?.value || "";
  const email = document.getElementById("homeEmailInput")?.value || "";
  const pickupCity = document.getElementById("homePickupCityInput")?.value || "";
  const dropCity = document.getElementById("homeDropCityInput")?.value || "";
  const date = document.getElementById("homePickupDateInput")?.value || "";
  const vehicle = document.getElementById("homeVehicleSelect")?.value || "Vehicle";

  const text = `🚖 *BHARAT BUS SERVICE - NEW CAB / VEHICLE BOOKING INQUIRY*\n\n` +
               `• *Name:* ${name}\n` +
               `• *Contact:* ${contact}\n` +
               `• *Email:* ${email}\n` +
               `• *Pickup City:* ${pickupCity}\n` +
               `• *Drop-off City:* ${dropCity}\n` +
               `• *Pickup Date:* ${date}\n` +
               `• *Vehicle:* ${vehicle}\n\n` +
               `Please send me the best tariff quote & availability!`;

  window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
}

// Modal Booking Submit to WhatsApp
function handleBookingSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("modalNameInput")?.value || "";
  const phone = document.getElementById("modalPhoneInput")?.value || "";
  const email = document.getElementById("modalEmailInput")?.value || "N/A";
  const pickupCity = document.getElementById("modalPickupCityInput")?.value || "N/A";
  const dropCity = document.getElementById("modalDropCityInput")?.value || document.getElementById("modalDestinationInput")?.value || "N/A";
  const date = document.getElementById("modalDateInput")?.value || "";
  const vehicle = document.getElementById("modalVehicleSelect")?.value || "";

  const text = `🚖 *BHARAT BUS SERVICE - VEHICLE BOOKING RESERVATION*\n\n` +
               `• *Name:* ${name}\n` +
               `• *Contact:* ${phone}\n` +
               `• *Email:* ${email}\n` +
               `• *Pickup City:* ${pickupCity}\n` +
               `• *Drop-off City:* ${dropCity}\n` +
               `• *Pickup Date:* ${date}\n` +
               `• *Vehicle:* ${vehicle}\n\n` +
               `Please share booking confirmation details & lowest tariff offer!`;

  window.open(`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  closeBookingModal();
}

// Live Price Calculator Computation
function calculateLivePrice() {
  const vehicleKey = document.getElementById("calcVehicleSelect")?.value || "12-seater";
  const routeVal = document.getElementById("calcRouteSelect")?.value || "580";
  const customKmVal = document.getElementById("calcCustomKmInput")?.value;
  const daysVal = Number(document.getElementById("calcDaysInput")?.value || 4);

  const vehicleObj = FLEET_DATA[vehicleKey] || FLEET_DATA["12-seater"];

  let distance = Number(routeVal);
  if (customKmVal && Number(customKmVal) > 0) {
    distance = Number(customKmVal);
  }

  const minBilledKm = daysVal * 250;
  const billedKm = Math.max(distance, minBilledKm);

  // Extract numerical rate
  const rateNum = parseInt(vehicleObj.rate.replace(/\D/g, '')) || 28;
  const vehicleCost = billedKm * rateNum;
  const driverCost = daysVal * vehicleObj.batta;
  const totalEst = vehicleCost + driverCost;

  // Update DOM elements
  const elName = document.getElementById("resVehicleName");
  const elRate = document.getElementById("resVehicleRate");
  const elDist = document.getElementById("resBilledKm");
  const elDays = document.getElementById("resDays");
  const elTotal = document.getElementById("resTotalCost");

  if (elName) elName.innerText = vehicleObj.name;
  if (elRate) elRate.innerText = `${vehicleObj.rate} / KM`;
  if (elDist) elDist.innerText = `${billedKm} KM`;
  if (elDays) elDays.innerText = `${daysVal} Days`;
  if (elTotal) elTotal.innerText = `₹${totalEst.toLocaleString()}`;
}

// Perfect Fleet Slider Functions
function slideFleets(direction) {
  const track = document.getElementById("fleetSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".fleet-slider-card");
  if (!cards.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const currentScroll = track.scrollLeft;

  let targetIndex = Math.round(currentScroll / step) + direction;
  if (targetIndex < 0) targetIndex = 0;
  if (targetIndex >= cards.length) targetIndex = cards.length - 1;

  const targetLeft = cards[targetIndex].offsetLeft - cards[0].offsetLeft;
  track.scrollTo({
    left: targetLeft,
    behavior: "smooth"
  });
}

function scrollToFleetSlide(index) {
  const track = document.getElementById("fleetSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".fleet-slider-card");
  if (cards[index]) {
    const targetLeft = cards[index].offsetLeft - cards[0].offsetLeft;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  }
}

function updateFleetSliderDots() {
  const track = document.getElementById("fleetSliderTrack");
  const dotsContainer = document.getElementById("fleetSliderDots");
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll(".fleet-slider-card");
  const dots = dotsContainer.querySelectorAll(".slider-dot");
  if (!cards.length || !dots.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const scrollLeft = track.scrollLeft;
  const activeIndex = Math.min(Math.max(0, Math.round(scrollLeft / step)), dots.length - 1);

  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Perfect Testimonials Slider Functions
function slideTestimonials(direction) {
  const track = document.getElementById("testimonialSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".testimonial-slider-card");
  if (!cards.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const currentScroll = track.scrollLeft;

  let targetIndex = Math.round(currentScroll / step) + direction;
  if (targetIndex < 0) targetIndex = 0;
  if (targetIndex >= cards.length) targetIndex = cards.length - 1;

  const targetLeft = cards[targetIndex].offsetLeft - cards[0].offsetLeft;
  track.scrollTo({
    left: targetLeft,
    behavior: "smooth"
  });
}

function scrollToTestimonialSlide(index) {
  const track = document.getElementById("testimonialSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".testimonial-slider-card");
  if (cards[index]) {
    const targetLeft = cards[index].offsetLeft - cards[0].offsetLeft;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  }
}

function updateTestimonialDots() {
  const track = document.getElementById("testimonialSliderTrack");
  const dotsContainer = document.getElementById("testimonialSliderDots");
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll(".testimonial-slider-card");
  const dots = dotsContainer.querySelectorAll(".slider-dot");
  if (!cards.length || !dots.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const scrollLeft = track.scrollLeft;
  const activeIndex = Math.min(Math.max(0, Math.round(scrollLeft / step)), dots.length - 1);

  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function initMobileUX() {
  ensureMobileNavigation();
  ensureBookingModal();

  const tourTrack = document.getElementById("tourSliderTrack");
  if (tourTrack) {
    tourTrack.addEventListener("scroll", updateTourSliderDots);
  }
  const fleetTrack = document.getElementById("fleetSliderTrack");
  if (fleetTrack) {
    fleetTrack.addEventListener("scroll", updateFleetSliderDots);
  }

  const testimonialTrack = document.getElementById("testimonialSliderTrack");
  if (testimonialTrack) {
    testimonialTrack.addEventListener("scroll", updateTestimonialDots);
  }

  // Auto-bind click handlers for mobile menu & accordions
  document.querySelectorAll(".mobile-menu-btn").forEach(btn => {
    btn.onclick = (e) => {
      if (e) e.preventDefault();
      toggleMobileMenu();
    };
  });

  document.querySelectorAll(".mobile-accordion-btn").forEach(btn => {
    btn.onclick = (e) => {
      if (e) e.preventDefault();
      const parent = btn.closest("div");
      if (parent) {
        const content = parent.querySelector(".mobile-accordion-content");
        if (content && content.id) {
          toggleMobileAccordion(content.id);
        }
      }
    };
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileUX);
} else {
  initMobileUX();
}

// Explicitly bind functions to global window scope for inline onclick handlers
window.toggleMobileMenu = toggleMobileMenu;
window.toggleMobileAccordion = toggleMobileAccordion;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.handleHomeInquirySubmit = handleHomeInquirySubmit;
window.handleBookingSubmit = handleBookingSubmit;
window.calculateLivePrice = calculateLivePrice;
window.slideTours = slideTours;
window.scrollToTourSlide = scrollToTourSlide;
window.slideFleets = slideFleets;
window.slideTestimonials = slideTestimonials;
window.scrollToFleetSlide = scrollToFleetSlide;
window.scrollToTestimonialSlide = scrollToTestimonialSlide;


// Universal Click Delegation for Sliders & Navigation
document.addEventListener("click", (e) => {
  const prevBtn = e.target.closest(".slider-btn-prev");
  if (prevBtn) {
    e.preventDefault();
    if (prevBtn.closest(".tour-slider-container")) {
      slideTours(-1);
    } else if (prevBtn.closest(".fleet-slider-container")) {
      slideFleets(-1);
    } else if (prevBtn.closest(".testimonial-slider-container")) {
      slideTestimonials(-1);
    }
    return;
  }

  const nextBtn = e.target.closest(".slider-btn-next");
  if (nextBtn) {
    e.preventDefault();
    if (nextBtn.closest(".tour-slider-container")) {
      slideTours(1);
    } else if (nextBtn.closest(".fleet-slider-container")) {
      slideFleets(1);
    } else if (nextBtn.closest(".testimonial-slider-container")) {
      slideTestimonials(1);
    }
    return;
  }
});

// Perfect Tour Slider Functions
function slideTours(direction) {
  const track = document.getElementById("tourSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".tour-slider-card");
  if (!cards.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const currentScroll = track.scrollLeft;

  let targetIndex = Math.round(currentScroll / step) + direction;
  if (targetIndex < 0) targetIndex = 0;
  if (targetIndex >= cards.length) targetIndex = cards.length - 1;

  const targetLeft = cards[targetIndex].offsetLeft - cards[0].offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: "smooth" });
}

function scrollToTourSlide(index) {
  const track = document.getElementById("tourSliderTrack");
  if (!track) return;

  const cards = track.querySelectorAll(".tour-slider-card");
  if (cards[index]) {
    const targetLeft = cards[index].offsetLeft - cards[0].offsetLeft;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  }
}

function updateTourSliderDots() {
  const track = document.getElementById("tourSliderTrack");
  const dotsContainer = document.getElementById("tourSliderDots");
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll(".tour-slider-card");
  const dots = dotsContainer.querySelectorAll(".slider-dot");
  if (!cards.length || !dots.length) return;

  const step = cards.length > 1 ? (cards[1].offsetLeft - cards[0].offsetLeft) : cards[0].offsetWidth;
  const scrollLeft = track.scrollLeft;
  const activeIndex = Math.min(Math.max(0, Math.round(scrollLeft / step)), dots.length - 1);

  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}


// About Us Slider Functions
function slideAbout(direction) {
  var track = document.getElementById("aboutSliderTrack");
  if (!track) return;
  var slides = track.querySelectorAll(".about-slider-slide");
  if (!slides.length) return;

  var step = track.offsetWidth;
  var currentScroll = track.scrollLeft;
  var targetIndex = Math.min(Math.max(0, Math.round(currentScroll / step) + direction), slides.length - 1);

  track.scrollTo({ left: targetIndex * step, behavior: "smooth" });
}

function scrollToAboutSlide(index) {
  var track = document.getElementById("aboutSliderTrack");
  if (!track) return;
  var step = track.offsetWidth;
  track.scrollTo({ left: index * step, behavior: "smooth" });
}

function updateAboutSliderDots() {
  var track = document.getElementById("aboutSliderTrack");
  var dotsContainer = document.getElementById("aboutSliderDots");
  if (!track || !dotsContainer) return;

  var slides = track.querySelectorAll(".about-slider-slide");
  var dots = dotsContainer.querySelectorAll(".slider-dot");
  if (!slides.length || !dots.length) return;

  var step = track.offsetWidth;
  var activeIndex = Math.min(Math.max(0, Math.round(track.scrollLeft / step)), dots.length - 1);

  dots.forEach(function(dot, idx) {
    if (idx === activeIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

window.slideAbout = slideAbout;
window.scrollToAboutSlide = scrollToAboutSlide;
window.updateAboutSliderDots = updateAboutSliderDots;

