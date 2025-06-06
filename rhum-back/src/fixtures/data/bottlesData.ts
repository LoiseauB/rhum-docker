export const rumBottles = [
  // Blanc
  {
    name: "Rhum Bologne Blanc",
    description:
      "Un rhum blanc agricole de Guadeloupe, idéal pour les cocktails grâce à ses notes fraîches et fruitées de canne à sucre et d'agrumes.",
    country: "Guadeloupe",
    categoryId: 1, // "Blanc"
  },
  {
    name: "La Favorite Cœur de Canne",
    description:
      "Un rhum blanc agricole de Martinique, distillé à partir de pur jus de canne. Il offre des arômes floraux et herbacés.",
    country: "Martinique",
    categoryId: 1, // "Blanc"
  },

  // Ambré
  {
    name: "Rhum Damoiseau Ambré",
    description:
      "Un rhum ambré de Guadeloupe, vieilli pendant 12 mois en fûts de chêne, avec des notes de vanille, de bois et de fruits secs.",
    country: "Guadeloupe",
    categoryId: 2, // "Ambré"
  },
  {
    name: "Rhum Clément Select Barrel",
    description:
      "Un rhum ambré de Martinique, vieilli en fûts de chêne américain, offrant des arômes de caramel, d'épices et de fruits tropicaux.",
    country: "Martinique",
    categoryId: 2, // "Ambré"
  },

  // Vieux
  {
    name: "Rhum Clément V.S.O.P.",
    description:
      "Un rhum agricole vieilli pendant un minimum de quatre ans en fûts de chêne. Il offre des arômes de vanille, de fruits secs et une touche de cannelle.",
    country: "Martinique",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Diplomático Reserva Exclusiva",
    description:
      "Un rhum vénézuélien premium, vieilli jusqu'à 12 ans. Il présente des notes de fruits confits, de caramel, et de chocolat noir.",
    country: "Venezuela",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Pyrat XO Reserve",
    description:
      "Un rhum blend vieilli, avec des saveurs d'orange, de miel, et d'épices. Il est fabriqué à partir d'un mélange de rhums de diverses Caraïbes.",
    country: "Caraïbes",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Santa Teresa 1796",
    description:
      "Un rhum vénézuélien vieilli en utilisant la méthode solera. Il offre des notes de fruits secs, de chêne et une légère touche de vanille.",
    country: "Venezuela",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Rhum J.M XO",
    description:
      "Un rhum agricole de Martinique, vieilli pendant au moins 6 ans en fûts de chêne. Il présente des arômes de fruits tropicaux, de vanille et de caramel.",
    country: "Martinique",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Brugal 1888 Gran Reserva Familiar",
    description:
      "Un rhum dominicain vieilli en double maturation, en fûts de bourbon et de sherry. Il offre des saveurs complexes de chocolat, de café et de fruits rouges.",
    country: "République Dominicaine",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Ron Zacapa Centenario 23",
    description:
      "Un rhum guatémaltèque élaboré avec le système solera et vieilli jusqu'à 23 ans. Il présente des notes de miel, de caramel et de chêne fumé.",
    country: "Guatemala",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Angostura 1824",
    description:
      "Un rhum trinidadien vieilli pendant un minimum de 12 ans. Il offre des arômes de miel, de vanille et d'épices avec une finition douce et longue.",
    country: "Trinité-et-Tobago",
    categoryId: 3, // Assuming "Vieux" category has an ID of 3
  },
  {
    name: "Appleton Estate 12 Year Old",
    description:
      "Un rhum vieilli premium fabriqué à partir de jus de canne à sucre et de mélasse. Il offre un profil de saveur riche et complexe avec des notes de chêne, de vanille et de caramel.",
    country: "Jamaïque",
    categoryId: 3, // "Vieux"
  },
  {
    name: "Havana Club Añejo 7 Años",
    description:
      "Un rhum cubain vieilli pendant un minimum de sept ans, caractérisé par sa douceur et sa complexité. Il présente des saveurs de tabac, de cacao et de fruits tropicaux.",
    country: "Cuba",
    categoryId: 3, // "Vieux"
  },

  // Hors d'âge
  {
    name: "El Dorado 21 Year Old Special Reserve",
    description:
      "Un rhum exceptionnel de Guyane, vieilli pendant 21 ans. Il offre des saveurs profondes de toffee, de café et d'épices.",
    country: "Guyane",
    categoryId: 4, // "Hors d'âge"
  },
  {
    name: "Mount Gay 1703 Master Select",
    description:
      "Un rhum de la Barbade, composé d'un mélange de rhums vieux allant jusqu'à 30 ans. Il présente des notes de fruits secs, de chêne et de cacao.",
    country: "Barbade",
    categoryId: 4, // "Hors d'âge"
  },

  // Épicé
  {
    name: "Captain Morgan Original Spiced Gold",
    description:
      "Un rhum épicé populaire avec des notes de vanille, de cannelle et de clou de girofle, parfait pour les cocktails.",
    country: "Jamaïque",
    categoryId: 5, // "Épicé"
  },
  {
    name: "Sailor Jerry Spiced Rum",
    description:
      "Un rhum épicé robuste avec des notes de vanille, de cannelle et de noix de muscade. Il est souvent utilisé dans les cocktails tiki.",
    country: "États-Unis",
    categoryId: 5, // "Épicé"
  },

  // Agricole
  {
    name: "Rhum J.M Blanc",
    description:
      "Un rhum agricole blanc de Martinique, distillé à partir de pur jus de canne à sucre. Il présente des arômes herbacés et floraux avec une touche de canne fraîche.",
    country: "Martinique",
    categoryId: 6, // "Agricole"
  },
  {
    name: "Dillon Rhum Agricole Blanc",
    description:
      "Un rhum blanc agricole de Martinique, avec des notes fraîches et vives de canne à sucre et d'agrumes, idéal pour les ti-punchs.",
    country: "Martinique",
    categoryId: 6, // "Agricole"
  },
];
