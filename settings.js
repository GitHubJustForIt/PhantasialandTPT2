// ══════════════════════════════════════════════════════════════
//  PHANTASIALAND-ROBLOX — PARK SETTINGS
//  Edit this file to control bookings, capacity, and appearance
// ══════════════════════════════════════════════════════════════

const parkSettings = {

  // ── Park Identity ──────────────────────────────────────────
  name:    "Phantasialand-Roblox",
  tagline: "Where Magic Meets the Metaverse",

  // ── Hero Image ─────────────────────────────────────────────
  // Set a custom full-width hero image URL here.
  // Recommended: 1920x1080 or wider. Leave empty ("") for gradient fallback.
  heroImage: "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1920&q=80",

  // ── Discord Webhook ────────────────────────────────────────
  discordWebhook: "https://discordapp.com/api/webhooks/1473284499931533438/eZnWVr5ohWSBWLMsGSRNtWC5x3EPGHVnl9HsTjZf7pO9Ayhz-OjH7dNiacpB1ZMhauNS",

  // ── Booking Rules ──────────────────────────────────────────
  maxAdvanceDays:    14,
  maxBookingsPerDay: 4,

  // ── Park Rules (shown in booking step 2) ──────────────────
  parkRules: [
    "Be respectful to all guests and staff at all times.",
    "No exploiting, cheating, or use of unauthorised scripts.",
    "Follow all park staff instructions without question.",
    "Only one booking per person per day is allowed.",
    "Harassment of any kind will result in immediate removal.",
    "Keep chat clean and appropriate for all ages.",
    "Respect queue systems — do not cut in line.",
    "Report any bugs or issues to park staff directly.",
    "Roblox Community Guidelines apply at all times."
  ],

  // ── Owner-Managed Bookings ─────────────────────────────────
  // Dates with >= maxBookingsPerDay entries become Fully Booked.
  // Format: "YYYY-MM-DD": ["Username1", "Username2", ...]
  bookings: {
    "2026-03-14": ["User1", "User2", "User3", "User4"],
    "2026-03-15": ["User1", "User2"],
    "2026-03-18": ["User1", "User2", "User3"],
    "2026-03-20": ["User1"],
    "2026-03-22": ["User1", "User2", "User3", "User4"],
    "2026-03-25": ["User1", "User2", "User3"]
  }
};

// ── Status Helper (do not edit) ────────────────────────────────
function getDateStatus(dateStr) {
  const ownerCount = (parkSettings.bookings[dateStr] || []).length;
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
