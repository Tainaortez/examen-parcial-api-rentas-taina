const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, precios, baños, camas, direccion, imagen
    FROM casas LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

/* GET rentas. */
async function create(casa){
    const result = await db.query(
      `INSERT INTO casas 
      (precios, baños, camas, direccion, imagen) 
      VALUES 
      ('${casa.precios}',
        '${casa.baños}',
        '${casa.camas}',
        '${casa.direccion}',
        '${casa.imagen}')`
    );
  
    let message = 'Error en crear las rentas';
  
    if (result.affectedRows) {
      message = 'Rentas creadas exitosamente';
    }
  
    return {message};
  }

  /* PUT rentas. */
  async function update(id, casa){
    const result = await db.query(
      `UPDATE casas
      SET
      precios="${casa.precios}",
      baños="${casa.baños}",
      camas="${casa.camas}",
      direccion="${casa.direccion}",
      imagen="${casa.imagen}"
      WHERE id=${id}` 
    );
  
    let message = 'Error al actualizar la renta';
  
    if (result.affectedRows) {
      message = 'Renta actualizada correctamente';
    }
  
    return {message};
  }

  /* DELETE rentas. */
  async function remove(id){
    const result = await db.query(
      `DELETE FROM casas WHERE id=${id}`
    );
  
    let message = 'Error en eliminar la renta';
  
    if (result.affectedRows) {
      message = 'Renta eleminada correctamente';
    }
  
    return {message};
  }

  module.exports = {
    getMultiple,
    create,
    update,
    remove
  }