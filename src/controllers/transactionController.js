const TransactionModel = require('../models/transactionModel');

module.exports = {
  healthCheck: async (req, res) => {
    try {
      await TransactionModel.pool.query('SELECT 1');
      res.status(200).json({ status: 'UP', service: 'BANKPULSE-API', database: 'CONNECTED' });
    } catch (err) {
      res.status(500).json({ status: 'DOWN', error: err.message });
    }
  },

  createTransfer: async (req, res) => {
    const { sender, receiver, amount } = req.body;
    if (!sender || !receiver || !amount) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: sender, receiver, amount' });
    }
    try {
      const transaction = await TransactionModel.createTransaction(sender, receiver, amount);
      res.status(201).json({
        message: 'Transferencia procesada exitosamente',
        data: transaction
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al procesar la transferencia', details: err.message });
    }
  },

  listTransfers: async (req, res) => {
    try {
      const transactions = await TransactionModel.getTransactions();
      res.status(200).json({ data: transactions });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener transacciones', details: err.message });
    }
  }
};
