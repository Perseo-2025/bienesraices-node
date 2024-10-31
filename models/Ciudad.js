import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ciudad = db.define('ciudades', {
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

})

export default Ciudad