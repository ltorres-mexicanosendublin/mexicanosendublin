export type AfterItem = {
  id: string;
  name: string;
  priceEUR: number;
  description: string;
  imageUrl: string;
  category: "Tacos" | "Burritos" | "Trompitos" | "Refrescos" | "Desayuno" | "Extras";
  available?: boolean;
};

export const afterMenu: AfterItem[] = [
  {
    id: "tacos-pastor",
    name: "Tacos al Pastor (4)",
    priceEUR: 10,
    description: "Orden de 4 tacos con trompo estilo CDMX + salsa.",
    imageUrl: "/after/tacos-pastor.jpg",
    category: "Tacos",
    available: true,
  },
  {
    id: "burrito-after",
    name: "Burrito After",
    priceEUR: 12,
    description: "Carne, arroz, frijoles, queso y salsa especial.",
    imageUrl: "/after/burrito.jpg",
    category: "Burritos",
    available: true,
  },
  {
    id: "trompitos",
    name: "Trompitos",
    priceEUR: 8,
    description: "Mini tacos para compartir, perfectos para el after.",
    imageUrl: "/after/trompitos.jpg",
    category: "Trompitos",
    available: true,
  },

  // ✅ REFRESCOS
  {
    id: "coca",
    name: "Coca-Cola",
    priceEUR: 2,
    description: "Lata fría.",
    imageUrl: "/after/coca.jpg",
    category: "Refrescos",
    available: true,
  },
  {
    id: "jarritos",
    name: "Jarritos",
    priceEUR: 3,
    description: "Sabor según disponibilidad.",
    imageUrl: "/after/jarritos.jpg",
    category: "Refrescos",
    available: true,
  },

  // ✅ DESAYUNOS (huevos)
  {
    id: "huevos-jitomate",
    name: "Huevos con Jitomate",
    priceEUR: 9,
    description: "Huevos a la mexicana con frijoles y arroz.",
    imageUrl: "/after/huevos-jitomate.jpg",
    category: "Desayuno",
    available: true,
  },
  {
    id: "huevos-jamon",
    name: "Huevos con Jamón",
    priceEUR: 9,
    description: "Huevos con jamón + frijoles y arroz.",
    imageUrl: "/after/huevos-jamon.jpg",
    category: "Desayuno",
    available: true,
  },

  // ✅ EXTRAS
  {
    id: "arroz-extra",
    name: "Arroz (extra)",
    priceEUR: 2,
    description: "Porción extra.",
    imageUrl: "/after/arroz.jpg",
    category: "Extras",
    available: true,
  },
  {
    id: "frijoles-extra",
    name: "Frijoles (extra)",
    priceEUR: 2,
    description: "Porción extra.",
    imageUrl: "/after/frijoles.jpg",
    category: "Extras",
    available: true,
  },
];
