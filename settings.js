// ═══════════════════════════════════════════════════════════
//  PHANTASIALAND-ROBLOX  —  PARK SETTINGS
//  Edit this file to manage bookings, capacity, appearance
// ═══════════════════════════════════════════════════════════

const parkSettings = {

  name:    "Phantasialand-Roblox",
  tagline: "Where Magic Meets the Metaverse",

  // Hero image URL (leave "" for gradient fallback)
  heroImage: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1920&q=80",

  // Discord webhook
  discordWebhook: "https://discordapp.com/api/webhooks/1473284499931533438/eZnWVr5ohWSBWLMsGSRNtWC5x3EPGHVnl9HsTjZf7pO9Ayhz-OjH7dNiacpB1ZMhauNS",

  // Booking limits
  maxAdvanceDays:    14,
  maxBookingsPerDay: 4,

  // Park rules
  parkRules: [
    "Be respectful to all guests and staff at all times.",
    "No exploiting, cheating, or use of unauthorised scripts.",
    "Follow all park staff instructions without question.",
    "Only one booking per person per day is permitted.",
    "Harassment of any kind results in immediate removal.",
    "Keep all chat clean and appropriate for all ages.",
    "Respect queue systems — do not cut in line.",
    "Report bugs or issues directly to park staff.",
    "Roblox Community Guidelines apply at all times."
  ],

  // Owner-managed bookings — dates with >= maxBookingsPerDay entries = Fully Booked
  // Format: "YYYY-MM-DD": ["Username1", "Username2"]
  bookings: {
    "2026-03-14": ["User1", "User2", "User3", "User4"],
    "2026-03-15": ["User1", "User2"],
    "2026-03-18": ["User1", "User2", "User3"],
    "2026-03-20": ["User1"],
    "2026-03-22": ["User1", "User2", "User3", "User4"],
    "2026-03-25": ["User1", "User2", "User3"]
  }
};

// ── Status helper (do not edit) ─────────────────────────────
function getDateStatus(dateStr) {
  const ownerCount  = (parkSettings.bookings[dateStr] || []).length;
  const allBookings = JSON.parse(localStorage.getItem("pl_bookings") || "{}");
  let userCount = 0;
  Object.values(allBookings).forEach(arr => {
    if (Array.isArray(arr) && arr.find(b => b.date === dateStr)) userCount++;
  });
  const total = ownerCount + userCount;
  const max   = parkSettings.maxBookingsPerDay;
  if (total >= max)     return { status: "full",   spots: 0,          total };
  if (total >= max - 1) return { status: "almost", spots: max - total, total };
  return                       { status: "open",   spots: max - total, total };
}
