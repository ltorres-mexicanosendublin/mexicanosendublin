export type Drink = {
  id: string;
  category: "Tequila" | "Cerveza";
  type: string; // Blanco, Reposado, Lager, IPA...
  brand: string;
  name: string;
  sizeMl: number;
  priceEUR: number;
  description: string;
  imageUrl: string;
  available: boolean;
};

export const drinks: Drink[] = [
  {
    id: "tq-001",
    category: "Tequila",
    type: "Blanco",
    brand: "Don Julio",
    name: "Don Julio Blanco",
    sizeMl: 700,
    priceEUR: 55,
    description: "Agave azul, perfil limpio. Ideal para paloma o margarita.",
    imageUrl: "/products/tequilas/don-julio-blanco.jpg",
    available: true,
  },
  {
    id: "tq-002",
    category: "Tequila",
    type: "Reposado",
    brand: "1800",
    name: "1800 Reposado",
    sizeMl: 700,
    priceEUR: 52,
    description: "Reposado equilibrado, suave para tomar solo.",
    imageUrl: "/products/tequilas/1800-reposado.jpg",
    available: true,
  },
  {
    id: "cz-001",
    category: "Cerveza",
    type: "Lager",
    brand: "Corona",
    name: "Corona Extra (6 pack)",
    sizeMl: 1980,
    priceEUR: 14,
    description: "Clásica lager mexicana, ligera y refrescante.",
    imageUrl: "/products/cervezas/corona-6pack.jpg",
    available: true,
  },
  {
    id: "cz-002",
    category: "Cerveza",
    type: "Guinez",
    brand: "Guinez",
    name: "Guinez",
    sizeMl: 1980,
    priceEUR: 14,
    description: "Clásica lager mexicana, ligera y refrescante.",
    imageUrl: "/products/cervezas/corona-6pack.jpg",
    available: true,
  },
];
