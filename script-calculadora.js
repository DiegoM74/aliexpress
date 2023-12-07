// Obteniendo referencias a elementos del DOM
    //boton
        const calcularButton = document.getElementById('calcular');

    //valores ingresados
        const productoInput = document.getElementById('producto');
        const envioInput = document.getElementById('envio');

    //selectores
        const monedaSelect = document.getElementById('moneda') //moneda
        const envioGratisSelect = document.getElementById('envioGratis'); //envio gratis
        const empresaSelect = document.getElementById('empresa'); //empresa

    //valores calculados
        const totalCompraInput = document.getElementById('totalCompra');
        const dolarInput = document.getElementById('dolar');
        const seguroInput = document.getElementById('seguro');
        const cifInput = document.getElementById('cif');
        const arancelInput = document.getElementById('arancel');
        const ivaInput = document.getElementById('iva');
        const bodegaInput = document.getElementById('bodega');
        const honorariosInput = document.getElementById('honorarios');

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
        const impuestosError = document.getElementById('impuestosError');
        const aduanaError = document.getElementById('aduanaError');
        const totalHonorariosError = document.getElementById('totalHonorariosError');
        const honorariosError = document.getElementById('honorariosError');


// Selector envío gratis
    envioGratisSelect.addEventListener('change', function() {
        if (envioGratisSelect.value === 'si') {
            envioInput.disabled = true; //se deshabilita la entrada
        
        } else if (envioGratisSelect.value === 'no') {
            envioInput.disabled = false; //se habilita la entrada
}});


// Funciones para mostrar errores
    //validar valores
        function validarValores() {
            const producto = parseFloat(productoInput.value)
            const envioGratis = envioGratisSelect.value === 'si';

            if (isNaN(producto) || producto <= 0) {
                productoError.textContent = 'Ingresa un valor válido.';
                return false;
}

            if (!envioGratis) {
                const envio = parseFloat(envioInput.value)
            if (isNaN(envio) || envio <= 0) {
                envioError.textContent = 'Ingresa un valor válido.';
                return false;
            }
        }
    return true;
}

    //validar selectores
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

    //validar la entrada
        function validarEntrada() {
            //se eliminan textos de error
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

        //se obtienen valores ingresados
            let producto = parseFloat(productoInput.value);
            let envioGratis = envioGratisSelect.value === 'si';
            let envio = envioGratis ? producto * 0.10 : parseFloat(envioInput.value);

        //se obtiene moneda seleccionada
            const moneda = monedaSelect.value;

        //se obtiene empresa seleccionada
            const empresa = empresaSelect.value;

        //se obtiene valor dolar
            const dolar = ValorDolar();

        //se convierte la moneda si es usd
            if (moneda === 'usd') {
                producto = producto * dolar;
                envio = envio * dolar;
}

        //se obtiene suma producto y envio
            const totalCompra = calcularTotalCompra(producto, envio);

        //condicion para no calcular impuestos
            //se eliminan mensajes de error
                impuestosError.textContent = '';
                aduanaError.textContent = '';

            if (totalCompra < 41 * dolar) {
                impuestosError.textContent = 'No es posible calcular los impuestos';
                aduanaError.textContent = 'No es posible calcular los impuestos';
                return; //se detiene la funcion
}

        //se calculan los valores
            const seguro = calcularSeguro(producto);
            const cif = calcularCIF(producto, envio, seguro);
            const arancel = calcularArancel(cif);
            const iva = calcularIVA(cif, arancel);
            const aduana = calcularAduana(iva, arancel);
            const honorarios = calcularHonorarios(empresa, cif, producto);
            const bodega = calcularBodega(empresa);
            const totalHonorarios = calcularTotalHonorarios(honorarios, bodega);
            const totalImpuestos = calcularTotalImpuestos(aduana, totalHonorarios);

        //formato de resultados    
            function formatearNumero(numero) {
                return numero.toLocaleString('es-ES', {
                maximumFractionDigits: 0, //decimales
                useGrouping: true, //forzar uso de separador de miles
    });
}

        //aplicar formato
            totalCompraInput.value = formatearNumero(totalCompra);
            dolarInput.value = dolar;
            seguroInput.value = formatearNumero(seguro);
            cifInput.value = formatearNumero(cif);
            arancelInput.value = formatearNumero(arancel);
            ivaInput.value = formatearNumero(iva);
            aduanaInput.value = formatearNumero(aduana);
            honorariosInput.value = formatearNumero(honorarios);
            bodegaInput.value = formatearNumero(bodega);
            totalHonorariosInput.value = formatearNumero(totalHonorarios);
            impuestosInput.value = formatearNumero(totalImpuestos);


    // Funciones para el cálculo
        //dolar
            function ValorDolar() {
                const valorDolar = 869.47; //valor diciembre 2023
                return valorDolar;
}
        //total compra
            function calcularTotalCompra(producto, envio) {
                return producto + envio;
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
                //se eliminan mensajes de error
                    totalHonorariosError.textContent ='';
                    honorariosError.textContent = '';
                let honorarios = 0;
                const dolar = ValorDolar(); //se obtiene valor dolar

                if (empresa === 'correos') {
                    honorarios = 2000 + (0.015 * cif);
}

                else if (empresa === 'otra') {
                    totalHonorariosError.textContent = 'No es posible calcular los honorarios';
                    honorariosError.textContent = 'No es posible calcular los honorarios';
                    honorarios = 0;
}

                else if (empresa === 'dhl') {
                    if (producto <= 30 * dolar) {
                        honorarios = 0;
                    } else if (producto <= 100 * dolar) {
                        honorarios = 15 * dolar;
                    } else if (producto <= 400 * dolar) {
                        honorarios = 37 * dolar;
                    } else if (producto <= 1000 * dolar) {
                        honorarios = 75 * dolar;
                    } else if (producto <= 3000 * dolar) {
                        honorarios = 170 * dolar;
                    } else if (producto > 3000 * dolar) {
                        totalHonorariosError.textContent = 'No es posible calcular los honorarios';
                        honorariosError.textContent = 'No es posible calcular los honorarios';
                        honorarios = 0;
    }
}

                else if (empresa === 'ups') {
                    if (producto <= 30 * dolar) {
                        honorarios = 0;
                    } else if (producto <= 50 * dolar) {
                        honorarios = 11.96 * dolar;
                    } else if (producto <= 70 * dolar) {
                        honorarios = 21.84 * dolar;
                    } else if (producto <= 100 * dolar) {
                        honorarios = 29.75 * dolar;
                    } else if (producto <= 200 * dolar) {
                        honorarios = 37.13 * dolar;
                    } else if (producto <= 400 * dolar) {
                        honorarios = 55.45 * dolar;
                    } else if (producto <= 700 * dolar) {
                        honorarios = 73.78 * dolar;
                    } else if (producto <= 1000 * dolar) {
                        honorarios = 82.88 * dolar;
                    } else if (producto <= 3000 * dolar) {
                        honorarios = 171.54 * dolar;
                    } else if (producto > 3000 * dolar) {
                        totalHonorariosError.textContent = 'No es posible calcular los honorarios';
                        honorariosError.textContent = 'No es posible calcular los honorarios';
                        honorarios = 0;
    }
}

                else if (empresa === 'fedex') {
                    if (producto <= 29.99 * dolar) {
                        honorarios = 0;
                    } else if (producto <= 49.99 * dolar) {
                        honorarios = 20.23 * dolar;
                    } else if (producto <= 69.99 * dolar) {
                        honorarios = 38.08 * dolar;
                    } else if (producto <= 99.99 * dolar) {
                        honorarios = 46.41 * dolar;
                    } else if (producto <= 299.99 * dolar) {
                        honorarios = 65.45 * dolar;
                    } else if (producto <= 399.99 * dolar) {
                        honorarios = 98.77 * dolar;
                    } else if (producto <= 599.99 * dolar) {
                        honorarios = 117.81 * dolar;
                    } else if (producto <= 1000 * dolar) {
                        honorarios = 130.90 * dolar;
                    } else if (producto > 1000 * dolar) {
                        honorarios = 188.02 * dolar;
    }
}
                return honorarios;
}

    //bodega
        function calcularBodega(empresa) {
            let bodega = 0;
            const dolar = ValorDolar(); //se obtiene valor dolar

            if (empresa === 'correos') {
                bodega = 0; //falta el valor

            } else if (empresa === 'otra') {
                bodega = 0;
            
            } else if (empresa === 'dhl') {
                bodega = 10 * dolar;

            } else if (empresa === 'ups') {
                bodega = 0; //falta el valor

            } else if (empresa === 'fedex') {
                bodega = 8.1 * dolar;
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

// Asignar el evento click al botón
    calcularButton.addEventListener('click', calcularImpuestos);