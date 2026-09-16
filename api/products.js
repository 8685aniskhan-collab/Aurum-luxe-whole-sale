const products = [
  { id: 1, name: 'Elara Diamond Hoop', brand: 'Aurum Atelier', category: 'Jewelry', retailPrice: '$520', wholesalePrice: '$320', moq: '12 units', image: 'https://source.unsplash.com/800x600/?jewelry' },
  { id: 2, name: 'Noir Leather Clutch', brand: 'Maison Cuir', category: 'Leather', retailPrice: '$460', wholesalePrice: '$285', moq: '10 units', image: 'https://source.unsplash.com/800x600/?leather-bag' },
  { id: 3, name: 'Velvet Rouge Lip Set', brand: 'Luxe Ritual', category: 'Beauty', retailPrice: '$220', wholesalePrice: '$135', moq: '24 units', image: 'https://source.unsplash.com/800x600/?lipstick' },
  { id: 4, name: 'Aster Pearl Necklace', brand: 'Aurum Atelier', category: 'Jewelry', retailPrice: '$680', wholesalePrice: '$430', moq: '8 units', image: 'https://source.unsplash.com/800x600/?necklace' },
  { id: 5, name: 'Siena Travel Bag', brand: 'Maison Cuir', category: 'Bags', retailPrice: '$720', wholesalePrice: '$450', moq: '6 units', image: 'https://source.unsplash.com/800x600/?travel-bag' },
  { id: 6, name: 'Aurelia Chronograph', brand: 'Horloge Maison', category: 'Watches', retailPrice: '$1,280', wholesalePrice: '$760', moq: '4 units', image: 'https://source.unsplash.com/800x600/?watch' },
  { id: 7, name: 'Strada Pointed Pump', brand: 'Sole Atelier', category: 'Shoes', retailPrice: '$640', wholesalePrice: '$380', moq: '10 units', image: 'https://source.unsplash.com/800x600/?heels' },
  { id: 8, name: 'Noir Optical Frame', brand: 'Luxe Vision', category: 'Glasses', retailPrice: '$350', wholesalePrice: '$210', moq: '12 units', image: 'https://source.unsplash.com/800x600/?glasses' },
  { id: 9, name: 'Golden Serum Elixir', brand: 'Luxe Ritual', category: 'Beauty', retailPrice: '$180', wholesalePrice: '$105', moq: '18 units', image: 'https://source.unsplash.com/800x600/?serum,skincare' }
];

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(products);
};
