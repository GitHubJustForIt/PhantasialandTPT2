// ════════════════════════════════════════════════════════════
//  SETTINGS.JS – Phantasialand Roblox Configuration
//  ALL changes are made ONLY in this file.
// ════════════════════════════════════════════════════════════

const SETTINGS = {

  // ── General ──────────────────────────────────────────────
  parkName:               "Phantasialand",
  parkTagline:            "The most magical experience on Roblox",
  sessionDurationMinutes: 30,
  webhookUrl:             "https://discordapp.com/api/webhooks/1492608191018831883/p2bKU1brImIrXneIUkJB2UOubZb3p-tnsTMlrSkKOQEVZlPkIbwoKCGqTMRuge24ghxG",
  heroBackgroundUrl:      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",

  // ── Park Status ───────────────────────────────────────────
  //  parkOpen:          true/false  → status banner + hero notice
  //  ticketSalesActive: true/false  → show/hide entire booking UI
  parkOpen:          true,
  ticketSalesActive: true,

  // ── Park Trailer ──────────────────────────────────────────
  //  YouTube watch / share / embed URL. Set "" to hide section.
  trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

  // ── Wait Time Thresholds (minutes) ────────────────────────
  //  0 – waitTimeLow        → green  (short)
  //  waitTimeLow+1 – waitTimeMedium → orange (moderate)
  //  waitTimeMedium+1 – ∞   → red    (long)
  waitTimeLow:    20,
  waitTimeMedium: 45,

  // ── Wait Times ────────────────────────────────────────────
  //  Split into rollercoasters and flatRides.
  //  Format: { name: "Name", minutes: 30 }
  //  Add / remove entries freely. Set [] to hide a category.
  // ─────────────────────────────────────────────────────────
  rollercoasters: [
    { name: "F.L.Y.", minutes: 50 },
    { name: "Voltron Nevera", minutes: 60 },
    { name: "Colossos", minutes: 45 },
    { name: "China Blitz", minutes: 30 },
    { name: "Tikal", minutes: 30 },
  ],

  flatRides: [
     { name: "Talocan", minutes: 0 },
     { name: "Woozys Karussel", minutes: 0 },
    { name: "Woozy Überkopf", minutes: 0 },
    { name: "Wims Teetassen", minutes: 0 },
    { name: "Wims Wippturm", minutes: 0 },
    { name: "Voltra-G", minutes: 0 },
     { name: "Wakobato", minutes: 0 },
    { name: "Wolzis Jet", minutes: 0 },
    { name: "Condor-Drop", minutes: 0 },
     { name: "Wellenflug", minutes: 0 },
    { name: "Der lustige Papagei", minutes: 0 },
    { name: "Sturmflug", minutes: 0 },
     { name: "Bobs Autowerkstatt", minutes: 0 },
  ],

  // ── Booking Dates & Time Slots ────────────────────────────
  //  date:        "YYYY-MM-DD"
  //  slots:
  //    time:        "HH:MM"
  //    maxPlayers:  max players per slot (default 5)
  //    visitorRate: "low" | "medium" | "high"
  // ─────────────────────────────────────────────────────────
  bookingDates: [
    {
      date: "2026-04-18",
      slots: [
        { time: "13:00", maxPlayers: 5, visitorRate: "low"    },
        { time: "13:30", maxPlayers: 5, visitorRate: "low"    },
        { time: "14:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "14:30", maxPlayers: 4, visitorRate: "medium" },
        { time: "15:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "15:30", maxPlayers: 5, visitorRate: "high"   },
      ]
    },
    {
      date: "2026-04-19",
      slots: [
        { time: "11:00", maxPlayers: 5, visitorRate: "low"    },
        { time: "11:30", maxPlayers: 5, visitorRate: "low"    },
        { time: "12:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "13:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "14:00", maxPlayers: 3, visitorRate: "medium" },
      ]
    },
    {
      date: "2026-04-25",
      slots: [
        { time: "14:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "15:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "16:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "16:30", maxPlayers: 5, visitorRate: "low"    },
      ]
    },
    {
      date: "2026-04-26",
      slots: [
        { time: "12:00", maxPlayers: 5, visitorRate: "low"    },
        { time: "13:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "14:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "15:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "16:00", maxPlayers: 4, visitorRate: "medium" },
      ]
    },
    {
      date: "2026-05-02",
      slots: [
        { time: "14:00", maxPlayers: 5, visitorRate: "low"    },
        { time: "14:30", maxPlayers: 5, visitorRate: "low"    },
        { time: "15:00", maxPlayers: 5, visitorRate: "medium" },
      ]
    },
    {
      date: "2026-05-03",
      slots: [
        { time: "11:00", maxPlayers: 5, visitorRate: "low"    },
        { time: "12:00", maxPlayers: 5, visitorRate: "medium" },
        { time: "13:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "14:00", maxPlayers: 5, visitorRate: "high"   },
        { time: "15:00", maxPlayers: 5, visitorRate: "medium" },
      ]
    },
  ],

  // ── Theme Worlds ──────────────────────────────────────────
  //  title, description, imageUrl
  //  Add / remove entries freely.
  // ─────────────────────────────────────────────────────────
  themeWorlds: [
    {
      title:       "Mystery Castle",
      description: "Dare to enter the dark chambers of the mysterious castle and uncover its secrets.",
      imageUrl:    "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=800&q=80"
    },
    {
      title:       "Rookburgh",
      description: "Steampunk adventure at its finest – where steam meets steel and pure adrenaline.",
      imageUrl:    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    },
    {
      title:       "Wuze Town",
      description: "Colourful family fun in the wonderfully chaotic Wuze Town – joy for all ages!",
      imageUrl:    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80"
    },
    {
      title:       "Berlin",
      description: "The roaring twenties come alive again – experience history in an unforgettable way.",
      imageUrl:    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
    },
    {
      title:       "Deep in Africa",
      description: "Dive into the wild and breathtaking nature of Africa with unforgettable attractions.",
      imageUrl:    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"
    },
    {
      title:       "Fantasy",
      description: "A fairy-tale realm full of magic, where every corner reveals a new story to tell.",
      imageUrl:    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80"
    },
  ],

};
