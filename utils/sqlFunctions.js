const mysql = require("mysql");
const config = require("../db/config");
const { response } = require("express");
const pool = mysql.createPool(config);
const resp = require("../response")

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const displayRecord = (tablename, column, key, value, res, token)=>{
  return new Promise((resolve, reject)=>{
    const query = `SELECT ${column} FROM ${tablename} WHERE ${key}='${value}'`

    pool.query(query, (eror, data)=>{
      
      if(eror){
        reject(resp(401, eror, "bang ini eror loh", res))
      }
      else{
        resolve(resp(200, data, token, res))
      }
    })
  })
}

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  displayRecord
};