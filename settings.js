// ============================================================
//  PHANTASIALAND-ROBLOX — SETTINGS & CONFIGURATION
//  Edit bookedDates to block/manage park availability
// ============================================================

const PARK_CONFIG = {
  name: "Phantasialand-Roblox",
  tagline: "Where Magic Meets the Metaverse",
  maxAdvanceDays: 14,          // How many days ahead users can book
  discordWebhook: "https://discordapp.com/api/webhooks/1473284499931533438/eZnWVr5ohWSBWLMsGSRNtWC5x3EPGHVnl9HsTjZf7pO9Ayhz-OjH7dNiacpB1ZMhauNS",
  parkRules: [
    "Be respectful to all guests and staff at all times.",
    "No exploiting, cheating, or use of unauthorized scripts.",
    "Follow all park staff instructions without question.",
    "Only one booking per person per day is allowed.",
    "Harassment of any kind will result in immediate removal.",
    "Keep chat clean and appropriate for all ages.",
    "Respect queue systems and do not cut in line.",
    "Report any bugs or issues to park staff directly."
  ]
};

// ============================================================
//  BOOKED DATES — Owner controlled
//  Format: "YYYY-MM-DD": "Status"
//  Status options: "Booked" | "Pending" | "Available"
//  Dates not listed are treated as Available
// ============================================================

const bookedDates = {
  "2026-03-14": "Booked",
  "2026-03-15": "Booked",
  "2026-03-18": "Pending",
  "2026-03-20": "Booked",
  "2026-03-22": "Booked",
  "2026-03-25": "Pending"
};

// Export for use in other files
if (typeof module !== "undefined") {
  module.exports = { PARK_CONFIG, bookedDates };
}
