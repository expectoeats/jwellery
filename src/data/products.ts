export interface Product {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  originalPrice: number;
  currency: string;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  metalOptions: { label: string; color: string }[];
  inStock: boolean;
  sku: string;
  features: string[];
  specifications: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "opal-iolite-blue-topaz-earrings",
    name: "Opal & Iolite Blue Topaz Earrings",
    shortDesc: "Opal & Iolite Blue Topaz Earrings - Blue Hued & Silver Bezel-set Earrings",
    fullDesc:
      "Handcrafted in Thailand using traditional gem-setting techniques, these stunning earrings feature a mesmerizing combination of Opal, Iolite, and Blue Topaz. Each stone is carefully selected for its exceptional color and clarity, set in premium sterling silver with a bezel setting that highlights the natural beauty of each gem.",
    price: 15699,
    originalPrice: 20599,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/solitaire-jewellery-desktop-banner_2.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/solitaire-jewellery-desktop-banner_2.jpg?width=1440&quality=85&auto=avif,webp",
      "https://media.angara.com/angara/promotion/banners/solitaire-jewellery-desktop-banner_2.jpg?width=1440&quality=85&auto=avif,webp",
      "https://media.angara.com/angara/promotion/banners/solitaire-jewellery-desktop-banner_2.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Earrings",
    rating: 4.8,
    reviewCount: 127,
    sizes: ["Small", "Medium", "Large"],
    metalOptions: [
      { label: "Sterling Silver", color: "#C0C0C0" },
      { label: "14K Yellow Gold", color: "#FFD700" },
      { label: "14K Rose Gold", color: "#B76E79" },
    ],
    inStock: true,
    sku: "PJ-EAR-001",
    features: [
      "Handcrafted in Thailand",
      "AAA Grade Natural Gemstones",
      "Sterling Silver Bezel Setting",
      "Each piece is unique",
      "Comes with certificate of authenticity",
    ],
    specifications: [
      { label: "Gemstone", value: "Opal, Iolite, Blue Topaz" },
      { label: "Metal", value: "925 Sterling Silver" },
      { label: "Setting", value: "Bezel" },
      { label: "Weight", value: "4.2g" },
      { label: "Origin", value: "Thailand" },
    ],
  },
  {
    id: "rustic-malachite-earrings",
    name: "Rustic Malachite Earrings",
    shortDesc: "Rusticated Quartz - Strength Meets Transformation",
    fullDesc:
      "Bold and earthy, these Rustic Malachite Earrings embody the raw beauty of nature. The deep green malachite stones are paired with rusticated quartz to create a stunning contrast that speaks to the wearer's strength and individuality. Expertly crafted by Thai artisans.",
    price: 13199,
    originalPrice: 18149,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/mens-jewellery-desktop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/mens-jewellery-desktop-banner.jpg?width=1440&quality=85&auto=avif,webp",
      "https://media.angara.com/angara/promotion/banners/mens-jewellery-desktop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Earrings",
    rating: 4.7,
    reviewCount: 89,
    sizes: ["Small", "Medium"],
    metalOptions: [
      { label: "Sterling Silver", color: "#C0C0C0" },
      { label: "14K Yellow Gold", color: "#FFD700" },
    ],
    inStock: true,
    sku: "PJ-EAR-002",
    features: [
      "Natural Malachite Stone",
      "Rustic Finish",
      "Hand-set in Thailand",
      "Unique stone patterns",
      "Hypoallergenic posts",
    ],
    specifications: [
      { label: "Gemstone", value: "Malachite, Quartz" },
      { label: "Metal", value: "925 Sterling Silver" },
      { label: "Setting", value: "Prong" },
      { label: "Weight", value: "3.8g" },
      { label: "Origin", value: "Thailand" },
    ],
  },
  {
    id: "pink-tourmaline-rhodolite-opal",
    name: "Pink Tourmaline Rhodolite Opal",
    shortDesc: "Pink Tourmaline & Opal Dangle Earrings - Rhodolite Garnet & Rose Gold",
    fullDesc:
      "A breathtaking combination of Pink Tourmaline, Rhodolite Garnet, and Ethiopian Opal, these dangle earrings capture light in the most enchanting way. Set in warm rose gold, they add a touch of romance and sophistication to any ensemble.",
    price: 18999,
    originalPrice: 24799,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
      "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Earrings",
    rating: 4.9,
    reviewCount: 156,
    sizes: ["Small", "Medium", "Large"],
    metalOptions: [
      { label: "14K Rose Gold", color: "#B76E79" },
      { label: "18K Rose Gold", color: "#B76E79" },
    ],
    inStock: true,
    sku: "PJ-EAR-003",
    features: [
      "Ethiopian Opal",
      "Rose Gold Setting",
      "Dangle Design",
      "Natural Pink Tourmaline",
      "Certificate included",
    ],
    specifications: [
      { label: "Gemstone", value: "Pink Tourmaline, Rhodolite, Opal" },
      { label: "Metal", value: "14K Rose Gold" },
      { label: "Setting", value: "Pavé & Bezel" },
      { label: "Weight", value: "5.1g" },
      { label: "Origin", value: "Thailand" },
    ],
  },
  {
    id: "rustic-garnet-earrings",
    name: "Rustic & Garnet Earrings",
    shortDesc: "Golden Rusticated Quartz Earrings - A Touch of Nature's More",
    fullDesc:
      "These Rustic & Garnet Earrings combine the warmth of golden rusticated quartz with the deep crimson of natural garnet. Each pair is uniquely crafted, ensuring that no two pieces are exactly alike. A perfect statement piece for the nature-loving jewelry enthusiast.",
    price: 14799,
    originalPrice: 19799,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
      "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Earrings",
    rating: 4.6,
    reviewCount: 73,
    sizes: ["Small", "Medium"],
    metalOptions: [
      { label: "14K Yellow Gold", color: "#FFD700" },
      { label: "18K Yellow Gold", color: "#FFD700" },
    ],
    inStock: true,
    sku: "PJ-EAR-004",
    features: [
      "Natural Garnet",
      "Rusticated Quartz",
      "Gold Setting",
      "Artisan crafted",
      "Gift box included",
    ],
    specifications: [
      { label: "Gemstone", value: "Garnet, Quartz" },
      { label: "Metal", value: "14K Yellow Gold" },
      { label: "Setting", value: "Prong" },
      { label: "Weight", value: "4.6g" },
      { label: "Origin", value: "Thailand" },
    ],
  },
  {
    id: "tennis-bracelet-ruby",
    name: "Tennis Bracelet Ruby",
    shortDesc: "Classic Tennis Bracelet with Natural Rubies in Sterling Silver",
    fullDesc:
      "A timeless classic reimagined with natural rubies, this tennis bracelet features a continuous line of brilliant-cut stones set in sterling silver. The seamless design and secure clasp make it perfect for everyday elegance or special occasions.",
    price: 28899,
    originalPrice: 37199,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/tennis-bracelets-dektop-banner.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Bangles",
    rating: 4.8,
    reviewCount: 214,
    sizes: ["6.5 inch", "7 inch", "7.5 inch", "8 inch"],
    metalOptions: [
      { label: "Sterling Silver", color: "#C0C0C0" },
      { label: "14K Yellow Gold", color: "#FFD700" },
    ],
    inStock: true,
    sku: "PJ-BNG-001",
    features: [
      "Natural Rubies",
      "Secure Box Clasp",
      "Rhodium Plated",
      "Brilliant Cut Stones",
      "Lifetime warranty",
    ],
    specifications: [
      { label: "Gemstone", value: "Natural Ruby" },
      { label: "Metal", value: "925 Sterling Silver" },
      { label: "Clasp", value: "Box Clasp" },
      { label: "Total Weight", value: "12.4g" },
      { label: "Origin", value: "Thailand" },
    ],
  },
  {
    id: "gemstone-pendant-emerald",
    name: "Gemstone Pendant Emerald",
    shortDesc: "Emerald & Diamond Pendant Necklace in 14K Gold",
    fullDesc:
      "This exquisite pendant showcases a vivid Colombian emerald surrounded by a halo of natural diamonds. Set in warm 14K gold, the pendant hangs from a delicate chain that lets the stone take center stage. A truly luxurious piece for the discerning collector.",
    price: 40499,
    originalPrice: 49599,
    currency: "INR",
    image:
      "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    images: [
      "https://media.angara.com/angara/promotion/banners/gemstone_jewellery_desktop_section_banner.jpg?width=1440&quality=85&auto=avif,webp",
    ],
    category: "Pendants",
    rating: 4.9,
    reviewCount: 187,
    sizes: ["16 inch", "18 inch", "20 inch"],
    metalOptions: [
      { label: "14K Yellow Gold", color: "#FFD700" },
      { label: "14K White Gold", color: "#E8E8E8" },
    ],
    inStock: true,
    sku: "PJ-PND-001",
    features: [
      "Colombian Emerald",
      "Diamond Halo",
      "14K Gold Setting",
      "Adjustable chain",
      "Luxury gift box",
    ],
    specifications: [
      { label: "Gemstone", value: "Emerald, Diamond" },
      { label: "Metal", value: "14K Gold" },
      { label: "Pendant Size", value: "12mm x 10mm" },
      { label: "Chain", value: "Cable, adjustable" },
      { label: "Origin", value: "Thailand" },
    ],
  },
];

export const allCategories = [
  "Rings",
  "Pendants",
  "Bangles",
  "Earrings",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
