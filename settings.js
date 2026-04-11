// ════════════════════════════════════════════════════════════
//  SETTINGS.JS – Phantasialand Roblox Konfiguration
//  Alle Anpassungen NUR in dieser Datei vornehmen.
//  Die Website übernimmt alle Änderungen automatisch.
// ════════════════════════════════════════════════════════════

const SETTINGS = {

  // ──────────────────────────────────────────────────────────
  //  ALLGEMEINE PARK-EINSTELLUNGEN
  // ──────────────────────────────────────────────────────────
  parkName:              "Phantasialand",
  parkTagline:           "The most immersive park",
  sessionDurationMinutes: 30,

  //  Discord Webhook URL – Buchungen werden hierhin gesendet
  webhookUrl: "https://discordapp.com/api/webhooks/1492608191018831883/p2bKU1brImIrXneIUkJB2UOubZb3p-tnsTMlrSkKOQEVZlPkIbwoKCGqTMRuge24ghxG",

  //  Hintergrundbild der Hero-Sektion (URL oder relativer Pfad)
  heroBackgroundUrl: "https://cdn.discordapp.com/attachments/1472624902153703567/1492613218269401230/Screenshot_299.png?ex=69dbf7e2&is=69daa662&hm=0c040e00876abd7417b719c241d6c30c1d054504b88157a1df5391b2c49edbb0&",


  // ──────────────────────────────────────────────────────────
  //  BUCHUNGSDATEN & ZEITSLOTS
  //
  //  date:       Datum im Format "YYYY-MM-DD"
  //  slots:      Array aus Zeitslots für diesen Tag
  //    time:       Uhrzeit im Format "HH:MM"
  //    maxPlayers: Max. Spieleranzahl für diesen Slot (Standard: 5)
  //
  //  Zum Hinzufügen: Neuen Eintrag in bookingDates einfügen.
  //  Zum Entfernen:  Eintrag löschen.
  //  Zum Ändern:     Wert direkt anpassen.
  // ──────────────────────────────────────────────────────────
  bookingDates: [
    {
      date: "2026-04-18",
      slots: [
        { time: "13:00", maxPlayers: 5 },
        { time: "13:30", maxPlayers: 5 },
        { time: "14:00", maxPlayers: 5 },
        { time: "14:30", maxPlayers: 4 },
        { time: "15:00", maxPlayers: 5 },
        { time: "15:30", maxPlayers: 5 },
      ]
    },
    {
      date: "2026-04-19",
      slots: [
        { time: "11:00", maxPlayers: 5 },
        { time: "11:30", maxPlayers: 5 },
        { time: "12:00", maxPlayers: 5 },
        { time: "13:00", maxPlayers: 5 },
        { time: "14:00", maxPlayers: 3 },
      ]
    },
    {
      date: "2026-04-25",
      slots: [
        { time: "14:00", maxPlayers: 5 },
        { time: "15:00", maxPlayers: 5 },
        { time: "16:00", maxPlayers: 5 },
        { time: "16:30", maxPlayers: 5 },
      ]
    },
    {
      date: "2026-04-26",
      slots: [
        { time: "12:00", maxPlayers: 5 },
        { time: "13:00", maxPlayers: 5 },
        { time: "14:00", maxPlayers: 5 },
        { time: "15:00", maxPlayers: 5 },
        { time: "16:00", maxPlayers: 4 },
      ]
    },
    {
      date: "2026-05-02",
      slots: [
        { time: "14:00", maxPlayers: 5 },
        { time: "14:30", maxPlayers: 5 },
        { time: "15:00", maxPlayers: 5 },
      ]
    },
    {
      date: "2026-05-03",
      slots: [
        { time: "11:00", maxPlayers: 5 },
        { time: "12:00", maxPlayers: 5 },
        { time: "13:00", maxPlayers: 5 },
        { time: "14:00", maxPlayers: 5 },
        { time: "15:00", maxPlayers: 5 },
      ]
    },
  ],


  // ──────────────────────────────────────────────────────────
  //  THEMENWELTEN
  //
  //  title:       Titel der Welt (wird über dem Bild angezeigt)
  //  description: Kurze Beschreibung der Welt
  //  imageUrl:    URL zum Bild dieser Themenwelt
  //
  //  Reihenfolge entspricht der Anzeige auf der Website.
  //  Zum Hinzufügen: Neuen Eintrag einfügen.
  //  Zum Entfernen:  Eintrag löschen.
  // ──────────────────────────────────────────────────────────
  themeWorlds: [
    {
      title: "",
      description: "Stone connected with steam - the most immersive flight.",
      imageUrl: "https://cdn.discordapp.com/attachments/1472624902153703567/1492613217820741662/Screenshot_298.png?ex=69dbf7e2&is=69daa662&hm=a6b3385fc2f8efe77ef3db672c63fd12c2e1331afe8881112cd8dedd60746952&"
    },
    {
      title: "Rookburgh",
      description: "Steampunk-Abenteuer auf höchstem Niveau – hier treffen Dampf und Stahl auf pure Adrenalin.",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
    },
    {
      title: "Wuze Town",
      description: "Farbenfrohes Abenteuer für die ganze Familie – willkommen in der verrückten Wuze Town!",
      imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80"
    },
    {
      title: "Berlin",
      description: "Die goldenen Zwanziger erwachen wieder zum Leben – erlebe Geschichte hautnah.",
      imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
    },
    {
      title: "Deep in Africa",
      description: "Tauche ein in die wilde und atemberaubende Natur Afrikas mit unvergesslichen Attraktionen.",
      imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80"
    },
    {
      title: "Fantasy",
      description: "Ein märchenhaftes Reich voller Magie, wo jede Ecke eine neue Geschichte erzählt.",
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80"
    },
  ],

};
