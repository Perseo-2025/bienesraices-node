function calcularSimulacion(montoInmueble, cuotaInicialPorcentaje, TEA, plazoAnios) {
  montoInmueble = parseFloat(montoInmueble);
  cuotaInicialPorcentaje = parseFloat(cuotaInicialPorcentaje);
  TEA = parseFloat(TEA);
  plazoAnios = parseInt(plazoAnios);

  if (isNaN(montoInmueble) || isNaN(cuotaInicialPorcentaje) || isNaN(TEA) || isNaN(plazoAnios)) {
      return {
          cuotaInicial: '0.00',
          montoCapital: '0.00',
          TEM: '0.00',
          pagoMensual: '0.00',
          cronograma: [],
      };
  }

  const cuotaInicial = montoInmueble * (cuotaInicialPorcentaje);
  const montoCapital = montoInmueble - cuotaInicial;
  const TEM = Math.pow(1 + TEA / 100, 1/12) - 1;
  const plazoMeses = plazoAnios * 12;
  const pagoMensual = montoCapital * (TEM * Math.pow(1 + TEM, plazoMeses)) / (Math.pow(1 + TEM, plazoMeses) - 1);
  
  const cronograma = generarCronograma(montoCapital, TEM, plazoMeses, pagoMensual);

  return {
      cuotaInicial: cuotaInicial.toFixed(2),
      montoCapital: montoCapital.toFixed(2),
      TEM: (TEM * 100).toFixed(2),
      pagoMensual: pagoMensual.toFixed(2),
      cronograma: cronograma
  };
}

function generarCronograma(montoCapital, TEM, plazoMeses, pagoMensual) {
  let saldo = montoCapital;
  const cronograma = [];

  for (let mes = 1; mes <= plazoMeses; mes++) {
      const interes = saldo * TEM;
      const aporteC = pagoMensual - interes;
      saldo -= aporteC;

      cronograma.push({
          mes: mes,
          pagoMensual: pagoMensual.toFixed(2),
          interes: interes.toFixed(2),
          aporteC: aporteC.toFixed(2),
          saldo: saldo.toFixed(2)
      });
  }

  return cronograma;
}
function actualizarResultados() {
  const montoInmueble = document.getElementById('montoInmueble').value;
  const cuotaInicialPorcentaje = document.getElementById('cuotaInicialPorcentaje').value;
  const TEA = document.getElementById('TEA').value;
  const plazoAnios = document.getElementById('plazoAnios').value;

  const resultados = calcularSimulacion(montoInmueble, cuotaInicialPorcentaje, TEA, plazoAnios);

  document.getElementById('cuotaInicial').textContent = `S/ ${resultados.cuotaInicial}`;
  document.getElementById('montoCapital').textContent = `S/ ${resultados.montoCapital}`;
  document.getElementById('TEM').textContent = `${resultados.TEM}%`;
  document.getElementById('pagoMensual').textContent = `S/ ${resultados.pagoMensual}`;

  mostrarCronograma(resultados.cronograma);
}

function mostrarCronograma(cronograma) {
  const tabla = document.getElementById('tablaCronograma');
  tabla.innerHTML = `
      <tr>
          <th>Mes</th>
          <th>Cuota Mensual</th>
          <th>Interés Mensual</th>
          <th>Aporte Capital</th>
          <th>Saldo</th>
      </tr>
  `;

  cronograma.forEach(pago => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
          <td>${pago.mes}</td>
          <td>S/ ${pago.pagoMensual}</td>
          <td>S/ ${pago.interes}</td>
          <td>S/ ${pago.aporteC}</td>
          <td>S/ ${pago.saldo}</td>
      `;
      tabla.appendChild(fila);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('simulationForm');
  const inputs = form.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
      input.addEventListener('input', actualizarResultados);
  });

  actualizarResultados(); // Actualizar resultados iniciales
});