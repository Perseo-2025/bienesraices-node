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
          pagoMensual: '0.00'
      };
  }

  const cuotaInicial = montoInmueble * (cuotaInicialPorcentaje);
  const montoCapital = montoInmueble - cuotaInicial;
  const TEM = Math.pow(1 + TEA / 100, 1/12) - 1;
  const plazoMeses = plazoAnios * 12;
  const pagoMensual = montoCapital * (TEM * Math.pow(1 + TEM, plazoMeses)) / (Math.pow(1 + TEM, plazoMeses) - 1);

  return {
      cuotaInicial: cuotaInicial.toFixed(2),
      montoCapital: montoCapital.toFixed(2),
      TEM: (TEM * 100).toFixed(2),
      pagoMensual: pagoMensual.toFixed(2)
  };
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
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('simulationForm');
  const inputs = form.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
      input.addEventListener('input', actualizarResultados);
  });

  actualizarResultados(); // Actualizar resultados iniciales
});