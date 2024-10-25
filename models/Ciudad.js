import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ciudad = db.define('ciudad', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

})

export default Ciudad