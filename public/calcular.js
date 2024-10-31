document.getElementById('simulationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const amountInmueble = parseFloat(document.getElementById('amountInmueble').value);
    const porcentageInmueble = parseFloat(document.getElementById('porcentageInmueble').value) / 100;
    const tea = parseFloat(document.getElementById('tea').value) / 100;
    const plazoMeses = parseInt(document.getElementById('plazoMeses').value);
    const csrfToken = document.querySelector('input[name="_csrf"]').value; 

    try {
      const response = await fetch('/simulacion-credito-hipotecario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken // Incluye el token en los encabezados
        },
        body: JSON.stringify({
          amountInmueble,
          porcentageInmueble,
          tea,
          plazoMeses,
          
          _csrf: csrfToken // Incluye el token en el cuerpo
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        document.getElementById('totalInicialInmueble').innerText = `S/ ${data.totalInicialInmueble}`;
        document.getElementById('totalMontoCapital').innerText = `S/ ${data.totalMontoCapital}`;
        document.getElementById('tem').innerText = `${(data.tem * 100).toFixed(2)}%`;
        document.getElementById('pagoMensual').innerText = `S/ ${data.pagoMensual}`;
      } else {
        alert(data.error || 'Hubo un error al procesar la solicitud.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con el servidor.', error);
    }
  });