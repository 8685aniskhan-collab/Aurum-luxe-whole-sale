module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end('Method Not Allowed');
  }

  // Vercel parses JSON bodies automatically for application/json
  const { name, email, interest } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  console.log('Wholesale inquiry received:', { name, email, interest });

  return res.status(200).json({ message: 'Thank you! Your inquiry has been received. Our team will contact you shortly.' });
};
