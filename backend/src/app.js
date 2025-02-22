const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/payments', paymentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});