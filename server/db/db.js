'use strict'
import mysql from 'mysql'
import config from '../config/config.js'

const pool = mysql.createPool(config.dbUri)

export default pool
