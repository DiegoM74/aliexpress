//boton
    const calcularButton = document.getElementById('calcular');

//valores ingresados
    const productoInput = document.getElementById('producto'); //valor producto
    const envioInput = document.getElementById('envio'); //valor envio

//selectores
    const monedaSelect = document.getElementById('moneda') //selector moneda
    const envioGratisSelect = document.getElementById('envioGratis'); //selector envio gratis
    const empresaSelect = document.getElementById('empresa'); //selector empresa

//valores calculados
    const totalCompraInput = document.getElementById('totalCompra'); //suma producto y envio
    const dolarInput = document.getElementById('dolar'); //valor dolar
    const seguroInput = document.getElementById('seguro'); //seguro
    const cifInput = document.getElementById('cif'); //cif
    const arancelInput = document.getElementById('arancel'); //arancel
    const ivaInput = document.getElementById('iva'); //iva
    const bodegaInput = document.getElementById('bodega'); //bodega
    const honorariosInput = document.getElementById('honorarios'); //honorarios

//totales
    const aduanaInput = document.getElementById('aduana');
    const totalHonorariosInput = document.getElementById('totalHonorarios');
    const impuestosInput = document.getElementById('impuestos');

//mensajes error
    const monedaError = document.getElementById('monedaError');
    const productoError = document.getElementById('productoError');
    const envioGratisError = document.getElementById('envioGratisError');
    const envioError = document.getElementById('envioError');
    const empresaError = document.getElementById('empresaError');
    const honorariosError = document.getElementById('honorariosError');

// Selector envío gratis
envioGratisSelect.addEventListener('change', function() {
    if (envioGratisSelect.value === 'si') {
        envioInput.disabled = true;
    } else if (envioGratisSelect.value === 'no') {
        envioInput.disabled = false;
    }
});

// Funciones para mostrar errores
    // Función para validar valores
    function validarValores() {
        const producto = parseFloat(productoInput.value);
        const envioGratis = envioGratisSelect.value === 'si';
    
    if (isNaN(producto) || producto <= 0) {
        productoError.textContent = 'Ingresa un valor válido.';
        return false;
        }
    if (!envioGratis) {
        const envio = parseFloat(envioInput.value);
    
    if (isNaN(envio) || envio <= 0) {
        envioError.textContent = 'Ingresa un valor válido.';
        return false;
        }
    }
    return true;
}

    // Función para validar selectores
    function validarSelectores() {
    if (monedaSelect.value === '') {
        monedaError.textContent = 'Selecciona una opción';
        return false;
        }  
    if (envioGratisSelect.value === '') {
        envioGratisError.textContent = 'Selecciona una opción.';
        return false;
        }
    if (empresaSelect.value === '') {
        empresaError.textContent = 'Selecciona una opción.';
        return false;
        }
    return true;
}

    // Función para validar la entrada
    function validarEntrada() {
        monedaError.textContent = '';
        productoError.textContent = '';
        envioError.textContent = '';
        envioGratisError.textContent = '';
        empresaError.textContent = '';
    return (
        validarSelectores() &&
        validarValores()
    );
}

// Función para realizar los cálculos
function calcularImpuestos() {
    if (!validarEntrada()) {
        return;
    }

    const producto = parseFloat(productoInput.value);
    const envioGratis = envioGratisSelect.value === 'si';
    const envio = envioGratis ? producto * 0.10 : parseFloat(envioInput.value);

    const totalCompra = calcularTotalCompra(producto, envio);
    const dolar = ValorDolar();
    const seguro = calcularSeguro(producto);
    const cif = calcularCIF(producto, envio, seguro);
    const arancel = calcularArancel(cif);
    const iva = calcularIVA(cif, arancel);
    const aduana = calcularAduana(iva, arancel);
    const empresa = empresaSelect.value;
    const honorarios = calcularHonorarios(empresa, cif, producto);
    const bodega = calcularBodega(empresa);
    const totalHonorarios = calcularTotalHonorarios(honorarios, bodega);
    const total = calcularTotalImpuestos(aduana, totalHonorarios);

// Función para el formato de resultados    
    function formatearNumero(numero) {
        return numero.toLocaleString('es-ES', {
            maximumFractionDigits: 0, //decimales
            useGrouping: true, //forzar uso de separador de miles
          });
        }
    totalCompraInput.value = formatearNumero(totalCompra)
    dolarInput.value = dolar;
    seguroInput.value = formatearNumero(seguro);
    cifInput.value = formatearNumero(cif);
    arancelInput.value = formatearNumero(arancel);
    ivaInput.value = formatearNumero(iva);
    aduanaInput.value = formatearNumero(aduana);
    honorariosInput.value = formatearNumero(honorarios);
    bodegaInput.value = formatearNumero(bodega);
    totalHonorariosInput.value = formatearNumero(totalHonorarios);
    impuestosInput.value = formatearNumero(total);

// Funciones para el cálculo
    //total compra
    function calcularTotalCompra(producto, envio){
    return producto + envio;
    }

    //dolar
    function ValorDolar() {
    const valorDolar = 904.62; //valor octubre 2023
    return valorDolar;
    }

    //seguro
    function calcularSeguro(producto) {
    return producto * 0.02;
    }

    //cif
    function calcularCIF(producto, envio, seguro) {
    return producto + envio + seguro;
    }

    //arancel
    function calcularArancel(cif) {
    return cif * 0.06;
    }

    //iva
    function calcularIVA(cif, arancel) {
    return (cif + arancel) * 0.19;
    }

    //total aduana
    function calcularAduana(iva, arancel) {
    return iva + arancel;
    }

    //honorarios
    function calcularHonorarios(empresa, cif, producto) {
    honorariosError.textContent = '';
    let honorarios = 0;
        if (empresa === 'correos') {
        honorarios = 2.21 + (0.015 * cif);
        }
        else if (empresa === 'dhl') {
            if (producto <= 30) {
                honorarios = 0;
            } else if (producto <= 100) {
                honorarios = 15;
            } else if (producto <= 400) {
                honorarios = 37;
            } else if (producto <= 1000) {
                honorarios = 75;
            } else if (producto <= 3000) {
                honorarios = 170;
            } else if (producto > 3000) {
                honorariosError.textContent = 'No es posible calcular los honorarios';
                return false;
            }
        }
        else if (empresa === 'ups') {
            if (producto <= 30) {
                honorarios = 0;
            } else if (producto <= 50) {
                honorarios = 11.96;
            } else if (producto <= 70) {
                honorarios = 21.84;
            } else if (producto <= 100) {
                honorarios = 29.75;
            } else if (producto <= 200) {
                honorarios = 37.13;
            } else if (producto <= 400) {
                honorarios = 55.45;
            } else if (producto <= 700) {
                honorarios = 73.78;
            } else if (producto <= 1000) {
                honorarios = 82.88;
            } else if (producto <= 3000) {
                honorarios = 171.54;
            } else if (producto > 3000) {
                honorariosError.textContent = 'No es posible calcular los honorarios';
                return false;
            }
        }
        else if (empresa === 'fedex') {
            if (producto <= 29.99) {
                honorarios = 0;
            } else if (producto <= 49.99) {
                honorarios = 20.23;
            } else if (producto <= 69.99) {
                honorarios = 38.08;
            } else if (producto <= 99.99) {
                honorarios = 46.41;
            } else if (producto <= 299.99) {
                honorarios = 65.45;
            } else if (producto <= 399.99) {
                honorarios = 98.77;
            } else if (producto <= 599.99) {
                honorarios = 117.81;
            } else if (producto <= 1000) {
                honorarios = 130.90;
            } else if (producto > 1000) {
                honorarios = 188.02;
            }
        }
        return honorarios;
    }

    //bodega
    function calcularBodega(empresa) {
    let bodega = 0;
        if (empresa === 'correos' || empresa === 'ups') {
            bodega = 0;
        } else if (empresa === 'dhl') {
            bodega = 10;
        } else if (empresa === 'fedex') {
            bodega = 8.1;
        }
        return bodega;
    }

    //total honorarios
    function calcularTotalHonorarios(honorarios, bodega) {
    return honorarios + bodega;
    }
        
    // total a pagar
    function calcularTotalImpuestos(aduana, totalHonorarios) {
    return aduana + totalHonorarios;
    }
}

// Asignar el evento click al botón calcular
    calcularButton.addEventListener('click', calcularImpuestos);