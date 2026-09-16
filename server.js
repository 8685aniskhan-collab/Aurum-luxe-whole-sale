const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-\_]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const products = [
  {
    id: 1,
    name: 'Elara Diamond Hoop',
    brand: 'Aurum Atelier',
    category: 'Jewelry',
    retailPrice: '$520',
    wholesalePrice: '$320',
    moq: '12 units',
    image: '💎'
  },
  {
    id: 2,
    name: 'Noir Leather Clutch',
    brand: 'Maison Cuir',
    category: 'Leather',
    retailPrice: '$460',
    wholesalePrice: '$285',
    moq: '10 units',
    image: '👜'
  },
  {
    id: 3,
    name: 'Velvet Rouge Lip Set',
    brand: 'Luxe Ritual',
    category: 'Beauty',
    retailPrice: '$220',
    wholesalePrice: '$135',
    moq: '24 units',
    image: '💄'
  },
  {
    id: 4,
    name: 'Aster Pearl Necklace',
    brand: 'Aurum Atelier',
    category: 'Jewelry',
    retailPrice: '$680',
    wholesalePrice: '$430',
    moq: '8 units',
    image: '✨'
  },
  {
    id: 5,
    name: 'Siena Travel Bag',
    brand: 'Maison Cuir',
    category: 'Bags',
    retailPrice: '$720',
    wholesalePrice: '$450',
    moq: '6 units',
    image: '👜'
  },
  {
    id: 6,
    name: 'Aurelia Chronograph',
    brand: 'Horloge Maison',
    category: 'Watches',
    retailPrice: '$1,280',
    wholesalePrice: '$760',
    moq: '4 units',
    image: '⌚'
  },
  {
    id: 7,
    name: 'Strada Pointed Pump',
    brand: 'Sole Atelier',
    category: 'Shoes',
    retailPrice: '$640',
    wholesalePrice: '$380',
    moq: '10 units',
    image: '👠'
  },
  {
    id: 8,
    name: 'Noir Optical Frame',
    brand: 'Luxe Vision',
    category: 'Glasses',
    retailPrice: '$350',
    wholesalePrice: '$210',
    moq: '12 units',
    image: '🕶️'
  },
  {
    id: 9,
    name: 'Golden Serum Elixir',
    brand: 'Luxe Ritual',
    category: 'Beauty',
    retailPrice: '$180',
    wholesalePrice: '$105',
    moq: '18 units',
    image: '🌿'
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/inquiry', upload.array('media', 8), (req, res) => {
  const { name, email, interest } = req.body;
  const files = req.files || [];

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  console.log('Wholesale inquiry received:');
  console.log({
    name,
    email,
    interest,
    attachments: files.map(file => ({ originalName: file.originalname, storedName: file.filename, size: file.size }))
  });

  res.json({
    message: `Thank you! Your inquiry has been received${files.length ? ` with ${files.length} attachment${files.length === 1 ? '' : 's'}` : ''}. Our team will contact you shortly.`
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'wholesale.html'));
});

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
