module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    return res.end('Method Not Allowed');
  }

  const { name, email, interest } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const summary = `Name: ${name}\nEmail: ${email}\nInterest: ${interest || ''}\nTime: ${new Date().toISOString()}`;

  // If SMTP env vars are set, attempt to send an email notification
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.EMAIL_TO) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.EMAIL_TO,
        subject: 'New Wholesale Inquiry',
        text: summary
      });

      return res.status(200).json({ message: 'Inquiry sent via email.' });
    } catch (err) {
      console.error('Email send failed', err);
      // fallthrough to log
    }
  }

  // Fallback: log the inquiry to the function logs (visible in Vercel dashboard)
  console.log('Wholesale inquiry received:', { name, email, interest });
  return res.status(200).json({ message: 'Thank you! Your inquiry has been received (no email configured).' });
};
