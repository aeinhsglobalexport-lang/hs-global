interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  specs: {
    finish: string;
    thickness: string;
    application: string;
    material: string;
    origin: string;
    mohs: string;
  };
  relatedProducts: {
    id: number;
    name: string;
    image: string;
  }[]; // Fixed to indicate this is an array of related products
}

const products: Product[] = [
  {
    id: 1,
    name: "Absolute Black Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Absolute-Black-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 2,
    name: "African Sparkle",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/African-Sparkle-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 3,
    name: "Alaska Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Alaska gold-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 4,
    name: "Alaska Pink",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Alaska pink-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 8,
    name: "Alpine white",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Alpine white (2).jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 15,
    name: "antique brown",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/antique-brown.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 16,
    name: "Armani gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Armani gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 17,
    name: "Armani great",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Armani great -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 18,
    name: "Armani grey",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Armani grey -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 19,
    name: "azul nuevo",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/azul-nuevo.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 20,
    name: "Belvedere",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Belvedere.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 21,
    name: "Bianco typhoon",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Bianco typhoon 1081-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 22,
    name: "Black-Galaxy-Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Black-Galaxy-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 23,
    name: "Black-Marquina",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Black-Marquina.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 24,
    name: "black-pebble",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/black-pebble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 25,
    name: "Blue dunes",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Blue dunes-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 26,
    name: "Blue dunes",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Blue dunes.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 29,
    name: "blue flower",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/blue-flower.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 30,
    name: "blue in night",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/blue-in-night.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 31,
    name: "blue pearl",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/blue-pearl.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 32,
    name: "blue Topaz",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Blue-Topaz.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 33,
    name: "branco-ceara",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/branco-ceara.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 34,
    name: "Candle brass",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Candle brass.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 36,
    name: "Champagne gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Champagne gold-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 37,
    name: "champagne gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/champagne-gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 38,
    name: "Cheema-Pink",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Cheema-Pink.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 39,
    name: "cheema white",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Cheema-White.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 41,
    name: "coin black",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Coin-Black.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 42,
    name: "copanhagen",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/copanhagen.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 43,
    name: "Copenhagen cream",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Copenhagen cream -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 46,
    name: "cotton white",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/cotton-white.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 47,
    name: "crystal grey",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Crystal-Grey-ROYAL-BEIZ-2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 48,
    name: "crystal yellow",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Crystal-Yellow-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 49,
    name: "Crystallo",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Crystallo.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 50,
    name: "Desert Brown Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Desert-Brown-Granite-Slab-Granix.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 51,
    name: "Desert Green",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Desert-Green.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 52,
    name: "Devgarh Black Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Devgarh-Black-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 53,
    name: "Diamond Fall",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Diamond-Fall.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 54,
    name: "Dior White",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Dior white.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 55,
    name: "Emerald Pearl ",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/emerald-pearl.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 56,
    name: "Exuberant Brown",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Exuberant-Brown.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 57,
    name: "Fantasy Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Fantasy-Gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 58,
    name: "French Green",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/French-Green.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 59,
    name: "Gem Red",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Gem-Red-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 60,
    name: "Ghibli Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Ghibli-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 61,
    name: "Giallo Florito",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Giallo-Florito.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 62,
    name: "Golden Persia",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Golden Persia-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 63,
    name: "Golden Torronci",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Golden-Torronci.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 65,
    name: "Himalayan Green Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/himalayan-green.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 66,
    name: "Ice Crystal",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Ice Crystal-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 67,
    name: "Imperial Blue Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Imperial-Blue.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 68,
    name: "Imperial Red",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Imperial-Red-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 69,
    name: "Jhansi",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Jhansi-Red.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 70,
    name: "Jupiter Red",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Jupiter-Red-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 71,
    name: "Kosmus",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Kosmus.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 72,
    name: "Lakha Red ",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Lakha-Red-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 73,
    name: "Lava oro",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Lava oro -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 74,
    name: "Lava oro extra",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Lava oro extra -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 75,
    name: "Lemurian",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Lemurian.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 76,
    name: "Lenon Blue",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/lenon-blue.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 77,
    name: "Magic Black",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Magic-black.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 79,
    name: "Monk Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/monk-gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 80,
    name: "Mont Blue",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/mont-blue.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 81,
    name: "Moulin Rouge",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Moulin-Rouge.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 82,
    name: "Notte Doro",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Notte-Doro.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 83,
    name: "Oreo",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Oreo.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 84,
    name: "White Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/P-White-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 85,
    name: "Pantagonia",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Pantagonia-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 86,
    name: "Pebble Black",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Pebble Black 2-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 88,
    name: "Polar Blue",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Polar-Blue.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 89,
    name: "Rajasthan Black Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Rajasthan-Black-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 90,
    name: "Red Marcus",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Red Marcus.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 92,
    name: "River Black Granite",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/River-Black-Granite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 93,
    name: "Rosewood",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Rosewood.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 94,
    name: "Rosy Pink",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Rosy-Pink.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 95,
    name: "Sand Brown",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Sand-Brown.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 96,
    name: "Sensation",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Sensation.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 97,
    name: "Splendor Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Splendor-Gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 98,
    name: "Sunset",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Sunset -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 99,
    name: "Sunset Canyon",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Sunset canyon-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 101,
    name: "Tan Brown",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/tan-brown.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 103,
    name: "Titanium Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Titanium-Gold (1).jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 105,
    name: "Umari ",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Umari -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 106,
    name: "Venezia Gold",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Venezia-Gold.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 107,
    name: "Volcanic Grey",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/volcanic-grey.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 108,
    name: "Walnut Jasper",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Walnut-Jasper.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 109,
    name: "Web Grey",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/Web grey-p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 110,
    name: "White Knight",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/White knight -p-2000.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 111,
    name: "Alpine White",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/grenite/_Alpine white.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 112,
    name: "Amazonite ",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Amazonite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 113,
    name: "Ambaji White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Ambaji-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 114,
    name: "Aqua Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/aqua-black-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },

    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 115,
    name: "Arbescato",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Arbescato.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 116,
    name: "Ash Grey",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Ash-Grey.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 117,
    name: "Batch Mermer",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Batch-Mermer-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 118,
    name: "Beige",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Beige.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 120,
    name: "Bruno White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Bruno-White-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 121,
    name: "Calacatta",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Calacatta.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 122,
    name: "cappuccino marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Cappuccino-Marble_1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 123,
    name: "Carbone Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Carbon-black-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 124,
    name: "Cherry Gold Marble",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Cherry-Gold-Marble2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 125,
    name: "Equator",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Equator.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 126,
    name: "Fantacy Brown",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Fantasy-Brown.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 127,
    name: "Flowery Gold Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Flowery-Gold-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 128,
    name: "Giallo Siena",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Giallo-siena.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 129,
    name: "aqua black",
    category: "/marble/Grafitto.jpg",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/aqua-black-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 130,
    name: "reenmarble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/green-marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 131,
    name: "HIMALAYAN ONYX",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/HIMALAYAN-ONYX.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 133,
    name: "Indian Serfinjinte",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Indian-Serfinjinte-2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 134,
    name: "Lady Onyx",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Lady-Onyx.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 135,
    name: "Magic Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Magic-Black.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 136,
    name: "Majestic Brown",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Majestic-Brown-Copy.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 137,
    name: "Makrana White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Makrana-White.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 138,
    name: "Matrix",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Matrix-4.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 139,
    name: "Mercury Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Mercury-Black-3.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 140,
    name: "Mercury White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Mercury-White.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 141,
    name: "Millennium Grey",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Millennium-Grey-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 142,
    name: "Ocean Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Ocean-Black-Marble-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 143,
    name: "Pink Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Pink-Marble-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 144,
    name: "Pistachino Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Pistachino-Marble-2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 145,
    name: "Purple White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Purple-White-Marble-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 146,
    name: "Red Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/R.White-2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 147,
    name: "Rain Forest Brown",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Rain-Forest-Brown-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 148,
    name: "Rain Forest Gold",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Rain-Forest-Gold-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 149,
    name: "Rain Forest Green",
    category: "Granite",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Rain-Forest-Green-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 150,
    name: "Red Fire",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Red-Fire-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 151,
    name: "River Blue",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/River-Blue-3.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 152,
    name: "Rosso Verona",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Rosso-verona.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 153,
    name: "Rosy Pink",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Rosy-Pink-1.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 154,
    name: "Scorpio Brown",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Scorpio-Brown-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 155,
    name: "Scorpio ",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Scorpio.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 156,
    name: "Slab Panda White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/slabpandawhite.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 157,
    name: "Sonal White",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Sonal-White-2.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 158,
    name: "Spider Green",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Spider-Green.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 159,
    name: "Tick Black",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Tick-Black.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 160,
    name: "Tiger Stone",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Tiger-Stone.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 161,
    name: "Toronto Brown Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Toronto-Brown-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 162,
    name: "Tra Onyx",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/Tra-Onyx.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 163,
    name: "White Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/white-marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 164,
    name: "White Onyx Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: ["/marble/White-Onyx-Marble.jpg"],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
  {
    id: 165,
    name: "White Onyx Marble",
    category: "Marble",
    price: "$45/sqft",
    description:
      "Premium black granite with timeless elegance, perfect for modern kitchens and bathrooms.",
    images: [
      "/marble/White-Onyx-Marble.jpg",
    ],
    specs: {
      finish: "Polished",
      thickness: "20mm/30mm",
      application: "Interior/Exterior",
      material: "Natural Granite",
      origin: "India",
      mohs: "6-7",
    },
    relatedProducts: [
      {
        id: 2, // Updated id to be unique
        name: "Blue Pearl Granite",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      },
      {
        id: 3, // Updated id to be unique
        name: "Desert Brown Granite",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      },
      {
        id: 4, // Updated id to be unique
        name: "Arctic White Granite",
        image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      },
      {
        id: 5, // Updated id to be unique
        name: "Galaxy Black Granite",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      },
    ],
  },
];

export const productDetail = (id: number) => {
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
};

export default products;
