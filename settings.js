// ════════════════════════════════════════════════════════════
//  SETTINGS.JS – Phantasialand Roblox Configuration
//  ALL changes are made ONLY in this file.
//  The website automatically picks up every change.
// ════════════════════════════════════════════════════════════

const SETTINGS = {

  // ──────────────────────────────────────────────────────────
  //  GENERAL PARK SETTINGS
  // ──────────────────────────────────────────────────────────
  parkName:               "Phantasialand",
  parkTagline:            "The most immersive experience on Roblox",
  sessionDurationMinutes: 30,

  //  Discord Webhook URL – bookings are sent here
  webhookUrl: "https://discordapp.com/api/webhooks/1492608191018831883/p2bKU1brImIrXneIUkJB2UOubZb3p-tnsTMlrSkKOQEVZlPkIbwoKCGqTMRuge24ghxG",

  //  Hero background image (URL or relative path)
  heroBackgroundUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",


  // ──────────────────────────────────────────────────────────
  //  PARK STATUS
  //
  //  parkOpen:          true  = park is shown as OPEN
  //                     false = park is shown as CLOSED
  //  ticketSalesActive: true  = booking section & CTAs visible
  //                     false = all booking UI hidden
  // ──────────────────────────────────────────────────────────
  parkOpen:          false,
  ticketSalesActive: false,


  // ──────────────────────────────────────────────────────────
  //  PARK TRAILER
  //
  //  Paste a YouTube URL (watch, share, or embed link):
  //    "https://www.youtube.com/watch?v=VIDEO_ID"
  //    "https://youtu.be/VIDEO_ID"
  //    "https://www.youtube.com/embed/VIDEO_ID"
  //  Set to "" to hide the trailer section entirely.
  // ──────────────────────────────────────────────────────────
  trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",


  // ──────────────────────────────────────────────────────────
  //  WAIT TIMES
  //
  //  Format: { name: "Attraction Name", minutes: 30 }
  //  Color thresholds (minutes):
  //    0 – waitTimeLow        → green  (short)
  //    waitTimeLow+1 – waitTimeMedium → orange (moderate)
  //    waitTimeMedium+1 – ∞   → red    (long)
  //
  //  Add or remove entries freely – grid updates automatically.
  //  Set waitTimes: [] to hide the section.
  // ──────────────────────────────────────────────────────────
  waitTimeLow:    20,
  waitTimeMedium: 45,

  waitTimes: [
    { name: "F.L.Y.",    minutes: 0 },
    { name: "Voltron Nevera",              minutes: 0 },
    { name: "Colossos",        minutes: 0 },
    { name: "China Blitz",            minutes: 0 },
    { name: "Tikal",         minutes: 0 },
    { name: "Woozys Karussel",          minutes: 0 },
    { name: "Woozy Überkopf",        minutes: 0 },
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
     { name: "Talocan", minutes: 0 },
  ],


  // ──────────────────────────────────────────────────────────
  //  BOOKING DATES & TIME SLOTS
  //
  //  date:        "YYYY-MM-DD"
  //  slots:       array of time slots for that day
  //    time:        "HH:MM"
  //    maxPlayers:  max players per slot (default 5)
  //    visitorRate: estimated crowd level:
  //                 "low"    = few visitors expected
  //                 "medium" = moderate visitors expected
  //                 "high"   = many visitors expected
  // ──────────────────────────────────────────────────────────
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


  // ──────────────────────────────────────────────────────────
  //  THEME WORLDS
  //
  //  title:       World title (displayed above the image)
  //  description: Short description of the world
  //  imageUrl:    Image URL for that area
  //
  //  Add or remove entries – order matches website display.
  // ──────────────────────────────────────────────────────────
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
