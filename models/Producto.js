import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Producto = db.define('productos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    titulo:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    }
});