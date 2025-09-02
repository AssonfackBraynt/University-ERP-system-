const backupDatabase = async (req, res) => {
  console.log('Database backup initiated (simulated)');
  res.json({ message: 'Backup performed (simulated)' });
};

module.exports = { backupDatabase };