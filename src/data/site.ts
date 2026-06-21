export const navItems = [
  { href: "/", label: "Start" },
  { href: "/dorothea/", label: "Dorothea Spunst" },
  { href: "/ausstellungen/", label: "Ausstellungen" },
  { href: "/events/", label: "Events" },
  { href: "/kuenstler/", label: "Künstler" },
  { href: "/kontakt/", label: "Kontakt" },
];

export const menuItems = [
  { href: "/dorothea/", label: "Dorothea Spunst", description: "Persona, Lebenslauf und akademische Laufbahn" },
  { href: "/ausstellungen/", label: "Vergangene Ausstellungen", description: "Archiv, Texte, Bilder und beteiligte Positionen" },
  { href: "/events/", label: "Events", description: "Vernissagen, Finissagen, Lesungen und Pop-up-Formate" },
  { href: "/kuenstler/", label: "Künstler", description: "Vertretene Künstlerinnen und Künstler" },
  { href: "/kontakt/", label: "Kontakt", description: "Besuch, Anfrage und E-Mail" },
];

export const searchItems = [
  { href: "/", title: "Startseite", text: "Allgemeine Informationen zur Studierenden Galerie Spunst und aktuelle Programmvorschau." },
  { href: "/dorothea/", title: "Dorothea Spunst", text: "Galeristin, Lebenslauf, akademische Laufbahn und kuratorisches Profil." },
  { href: "/ausstellungen/", title: "Vergangene Ausstellungen", text: "Franky Brozek, Eine Tasse Humor bitte, Jonattan Bustos und Klasse Jeremy Shaw." },
  { href: "/events/", title: "Events", text: "Vernissagen, Finissagen, Lesungen, Pop-up-Ausstellungen und Kooperationen." },
  { href: "/kuenstler/", title: "Künstler", text: "Franky Brozek, Jonattan Bustos, Klasse Jeremy Shaw und beteiligte Positionen." },
  { href: "/kontakt/", title: "Kontakt", text: "Kontaktformular, E-Mail, Adresse und Besuchszeiten." },
  { href: "/impressum/", title: "Impressum", text: "Rechtliche Angaben, Kontakt und Anbieterkennzeichnung." },
];

export const artists = [
  {
    name: "Franky Brozek",
    medium: "Zeichnung und Malerei",
    location: "Karlsruhe",
    social: "https://www.instagram.com/frankybrozek/",
    statement: "Präsentiert wurden Zeichnungen, die als Grundlage malerischer Arbeit gelesen werden können.",
  },
  {
    name: "Jonattan Bustos",
    medium: "Malerei und Installation",
    location: "Karlsruhe",
    social: "https://www.instagram.com/bustos_jonattan/",
    statement: "Arbeitet mit Krieg, floralen Körpern und surrealen Bildräumen, die sich collageartig verbinden.",
  },
  {
    name: "Klasse Jeremy Shaw",
    medium: "Klassenprojekt",
    location: "Kunstakademie Karlsruhe",
    social: "https://www.instagram.com/klasse.shaw/",
    statement: "Gemeinsames Ausstellungsformat im Projektraum H2zwei mit Positionen aus der Klasse Jeremy Shaw.",
  },
  {
    name: "Künstler der Kunstakademie Karlsruhe",
    medium: "Pop-up-Ausstellung",
    location: "Café Gazebo, Karlsruhe",
    social: "https://www.instagram.com/gazebo_karlsruhe/",
    statement: "Eine eintagige Ausstellung im Café Gazebo, kuratiert als lockeres Format zwischen Kaffee, Humor und Kunst.",
  },
];

export const exhibitions = [
  {
    slug: "ich-moechte-initiiert-werden",
    title: "Ich möchte initiiert werden",
    category: "Ausstellung",
    dates: "20.02.2026 bis 27.02.2026",
    artist: "Franky Brozek",
    venue: "Edelsheimstraße 6, 76131 Karlsruhe",
    collaboration: "Initiiert von der Studierenden Galerie Spunst",
    image: "assets/exhibitions/franky-brozek.jpg",
    alt: "Flyer der Ausstellung Ich möchte initiiert werden von Franky Brozek",
    instagram: "https://www.instagram.com/frankybrozek/",
    text: "Schwerpunkt der Ausstellung waren zahlreiche Zeichnungen des Künstlers, die bisher der Öffentlichkeit noch nicht zugänglich gemacht wurden und als Grundlage der malerischen Arbeit betrachtet werden können.",
    details: [
      "Die Ausstellung zeigte Zeichnungen von Franky Brozek und rückte Material sichtbar in den Vordergrund, das bisher nicht öffentlich zugänglich war.",
      "Im Rahmen der Vernissage fand um 19:00 Uhr ein Künstlergespräch statt. Zur Finissage wurde die Ausstellung mit Kunst und Musik in einen weiteren Kontext gesetzt.",
    ],
    images: [
      {
        src: "assets/exhibitions/franky-brozek.jpg",
        alt: "Flyer der Ausstellung Ich möchte initiiert werden von Franky Brozek",
        caption: "Ausstellungsflyer",
      },
    ],
  },
  {
    slug: "eine-tasse-humor-bitte",
    title: "Eine Tasse Humor, bitte!",
    category: "Pop-up-Ausstellung",
    dates: "01.04.2026",
    artist: "Künstler der Kunstakademie Karlsruhe",
    venue: "Café Gazebo, Georg-Friedrich-Straße 34, 76131 Karlsruhe",
    collaboration: "In Kooperation mit dem Café Gazebo Karlsruhe",
    image: "assets/exhibitions/eine-tasse-humor.jpg",
    alt: "Flyer der Pop-up-Ausstellung Eine Tasse Humor, bitte im Café Gazebo",
    instagram: "https://www.instagram.com/gazebo_karlsruhe/",
    text: "Eine eintagige Pop-up-Ausstellung im Gazebo: ein Tag voller Lacher, Kaffee und Kunst.",
    details: [
      "Die Pop-up-Ausstellung fand als eintägiges Format im Café Gazebo in Karlsruhe statt.",
      "Das Format verband Café-Situation, Humor und studentische Kunst in einem lockeren, öffentlichen Rahmen.",
    ],
    images: [
      {
        src: "assets/exhibitions/eine-tasse-humor.jpg",
        alt: "Flyer der Pop-up-Ausstellung Eine Tasse Humor, bitte im Café Gazebo",
        caption: "Flyer der Pop-up-Ausstellung",
      },
    ],
  },
  {
    slug: "stich-um-stich",
    title: "Stich um Stich - la historia de un laberinto",
    category: "Ausstellung",
    dates: "07.05.2026 bis 21.05.2026",
    artist: "Jonattan Bustos",
    venue: "H2zwei, DAIVA-Store, Herrenstraße 22, 76133 Karlsruhe",
    collaboration: "In Kooperation mit H2zwei und der Vereinigung der Freunde der Kunstakademie Karlsruhe",
    image: "assets/exhibitions/jonattan-bustos-stich.jpg",
    alt: "Flyer der Ausstellung Stich um Stich von Jonattan Bustos",
    instagram: "https://www.instagram.com/bustos_jonattan/",
    text: "Im Fokus der Ausstellung steht das Zusammenspiel unterschiedlicher Arbeitskontexte des Künstlers. Malereien mit Themen des Kriegs, floralen Körpern und surrealen Gegebenheiten fügen sich zu einem übergreifenden Einblick in die Arbeit von Jonattan Bustos.",
    details: [
      "Die Ausstellung im H2zwei zeigte Arbeiten von Jonattan Bustos im DAIVA-Store in der Herrenstraße.",
      "Die Arbeiten luden in collageartiger Zusammenstellung dazu ein, sich wie in einem Labyrinth zu verlieren. Zur Finissage fand eine Lesung auf Spanisch aus den Herbstmonologen des Künstlers statt.",
    ],
    images: [
      {
        src: "assets/exhibitions/jonattan-bustos-stich.jpg",
        alt: "Flyer der Ausstellung Stich um Stich von Jonattan Bustos",
        caption: "Ausstellungsflyer",
      },
      {
        src: "assets/exhibitions/jonattan-bustos-lesung.jpg",
        alt: "Flyer zur Lesung auf Spanisch im Rahmen von Stich um Stich",
        caption: "Flyer zur Lesung und Finissage",
      },
    ],
  },
  {
    slug: "ueber-daiva-store",
    title: "Über DAIVA Store",
    category: "Klassenprojekt",
    dates: "29.05.2026 bis 11.06.2026",
    artist: "Klasse Jeremy Shaw",
    venue: "H2zwei, DAIVA-Store, Herrenstraße 22, 76133 Karlsruhe",
    collaboration: "In Kooperation mit der Klasse Jeremy Shaw, H2zwei und der Vereinigung der Freunde der Kunstakademie Karlsruhe",
    image: "assets/exhibitions/ueber-daiva-store.jpg",
    alt: "Ausstellungsflyer Über DAIVA Store im Projektraum H2zwei",
    instagram: "https://www.instagram.com/klasse.shaw/",
    text: "Gemeinsames Ausstellungsformat der Klasse Jeremy Shaw im Projektraum H2zwei. Weitere Informationen und vollständige Angaben können später ergänzt werden.",
    details: [
      "Über DAIVA Store entstand als Klassenprojekt der Klasse Jeremy Shaw im Projektraum H2zwei.",
      "Die Ausstellung lief vom 29.05.2026 bis 11.06.2026. Weitere Informationen zu beteiligten Positionen und Bildmaterial können später ergänzt werden.",
    ],
    images: [
      {
        src: "assets/exhibitions/ueber-daiva-store.jpg",
        alt: "Ausstellungsflyer Über DAIVA Store im Projektraum H2zwei",
        caption: "Ausstellungsflyer",
      },
    ],
  },
];

export const events = [
  {
    title: "Künstlergespräch mit Franky Brozek",
    date: "20.02.2026, 19:00 Uhr",
    type: "Künstlergespräch",
    link: "https://www.instagram.com/frankybrozek/",
    image: "assets/exhibitions/franky-brozek.jpg",
    text: "Gespräch im Rahmen der Vernissage zu Ich möchte initiiert werden.",
  },
  {
    title: "Pop-up-Ausstellung im Café Gazebo",
    date: "01.04.2026, ab 14:00 Uhr",
    type: "Pop-up",
    link: "https://www.instagram.com/gazebo_karlsruhe/",
    image: "assets/exhibitions/eine-tasse-humor.jpg",
    text: "Eine Tasse Humor, bitte! war nur an diesem Tag im Café Gazebo zu sehen.",
  },
  {
    title: "Lesung auf Spanisch: Herbstmonologe",
    date: "21.05.2026, 17:00 Uhr",
    type: "Lesung und Finissage",
    link: "https://www.instagram.com/bustos_jonattan/",
    image: "assets/exhibitions/jonattan-bustos-lesung.jpg",
    text: "Zum Abschluss von Stich um Stich las Jonattan Bustos einen Ausschnitt aus den Herbstmonologen in seiner Muttersprache.",
  },
  {
    title: "Eröffnung Über DAIVA Store",
    date: "29.05.2026, 18:00 Uhr",
    type: "Eröffnung",
    link: "https://www.instagram.com/klasse.shaw/",
    image: "assets/exhibitions/ueber-daiva-store.jpg",
    text: "Eröffnung des Klassenprojekts der Klasse Jeremy Shaw im H2zwei.",
  },
];
