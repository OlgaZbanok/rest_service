const Column = require('./column.model');

const COLUMNS = [
  new Column({ title: 'Column1', order: '1' }),
  new Column({ title: 'Column2', order: '2' })
];

const getAllColumns = async () => {
  return COLUMNS;
};

module.exports = { getAllColumns };
