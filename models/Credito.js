import db from "../config/db.js";
import { DataTypes } from "sequelize";


const Credito = db.define('creditos', {
    montoInmueble: { 
        type: DataTypes.DECIMAL, 
        allowNull: false 
    },
    cuotaInicialPorcentaje: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    TEA: { 
        type: DataTypes.DECIMAL, 
        allowNull: false 
    },
    plazoMeses: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    // Columnas de resultados calculados
    cuotaInicial: { 
        type: DataTypes.DECIMAL 
    },
    montoCapital: { 
        type: DataTypes.DECIMAL 
    },
    TEM: { 
        type: DataTypes.DECIMAL 
    },
    pagoMensual: { 
        type: DataTypes.INTEGER 
    }

})

export default Credito;