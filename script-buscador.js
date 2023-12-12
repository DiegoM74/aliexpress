// Array con los nombres de los envíos
    const shippingOptions = [
        "AliExpress Standard Shipping",
        "AliExpress Selection Standard", 
        "AliExpress Saver Shipping",
        "AliExpress Selection Saver",
        "Cainiao Standard for Special Goods",
        "Cainiao Super Economy Global",
        "AliExpress Premium Shipping",
        "360Lion Standard Packet"
    ];

// Para el contenedor del resultado
    var resultContainer = document.getElementById("result-container");

// Función que muestra las sugerencias cuando se escriben al menos 3 letras
    function showSuggestions() {

        let suggestions = document.getElementById("suggestions");

        //Se limpian las sugerencias
            suggestions.innerHTML = "";
  
        let input = document.getElementById("name");
        let text = input.value;
        let found = false;
  
        if(text.length >= 3) {
            let suggestions = document.getElementById("suggestions");
            suggestions.innerHTML = "";
            shippingOptions.forEach(option => {

        if(option.toLowerCase().includes(text.toLowerCase())) {
            let div = document.createElement("div");
            div.innerHTML = option; 
            div.onclick = () => {
            input.value = option;
            suggestions.innerHTML = "";
        }
            suggestions.appendChild(div);
            found = true;
        }
        });

        if(!found) {
            let div = document.createElement("div");
            div.classList.add("suggestion");
            div.innerHTML = "Envío no encontrado o desconocido";
            suggestions.appendChild(div);
        }
        }
    }

// Función que muestra la info del envío
    function buscar() {
        let name = document.getElementById("name").value;

        switch(name) {

            case "AliExpress Standard Shipping":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://track.4px.com'>4PX Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a>, <a href='https://www.blue.cl'>BluExpress</a>, <a href='https://www.99minutos.com'>99minutos</a>, <a href='http://49.234.140.229:8082/en/trackIndex.htm'>Mia Express</a> y <a href='https://centrodeayuda.chilexpress.cl'>Chilexpress</a></p>  
                <p>Seguimiento por AliExpress: Sí</p>
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 4 semanas</p>
            `;
            break;

            case "AliExpress Selection Standard":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://track.4px.com'>4PX Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a>, <a href='https://www.blue.cl'>BluExpress</a>, <a href='https://www.99minutos.com'>99minutos</a>, <a href='http://49.234.140.229:8082/en/trackIndex.htm'>Mia Express</a> y <a href='https://centrodeayuda.chilexpress.cl'>Chilexpress</a></p>  
                <p>Seguimiento por AliExpress: Sí</p>
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 4 semanas</p>
            `;
            break;

            case "AliExpress Saver Shipping":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://track.4px.com'>4PX Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a> y <a href='http://49.234.140.229:8082/en/trackIndex.htm'>Mia Express</a></p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 5 semanas</p>
            `;
            break;

            case "AliExpress Selection Saver":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://track.4px.com'>4PX Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a> y <a href='http://49.234.140.229:8082/en/trackIndex.htm'>Mia Express</a></p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 5 semanas</p>
            `;
            break;

            case "Cainiao Standard for Special Goods":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://track.4px.com'>4PX Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a> y <a href='https://www.blue.cl'>BluExpress</a></p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 5 semanas</p>
            `;
            break;

            case "Cainiao Super Economy Global":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a>, <a href='https://track.4px.com'>4PX Express</a> y <a href='https://www.yw56.com.cn/en'>Yanwen Express</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a> y una empresa desconocida</p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Aveces</p>
                <p>Tiempo estimado de entrega: 2 a 7 meses</p>
            `;
            break;

            case "AliExpress Premium Shipping":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a>, <a href='https://track.4px.com'>4PX Express</a> y <a href='https://www.fedex.com/es-cl/home.html'>FedEx</a></p>
                <p>Transportista en Chile: <a href='https://www.fedex.com/es-cl/home.html'>FedEx</a></p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 4 semanas</p>
            `;
            break;

            case "360Lion Standard Packet":
            result.innerHTML = `
                <p>Transportista en China: <a href='https://global.cainiao.com'>Cainiao</a> y <a href='https://customer.360lion.com/track'>360Lion</a></p>
                <p>Transportista en Chile: <a href='https://www.correos.cl'>Correos Chile</a>, <a href='https://centrodeayuda.chilexpress.cl'>Chilexpress</a>, <a href='https://starken.cl/'>Starken</a> y <a href='https://www.fedex.com/es-cl/home.html'>FedEx</a></p>
                <p>Seguimiento por AliExpress: Sí</p> 
                <p>Seguimiento en Chile: Sí</p>
                <p>Tiempo estimado de entrega: 2 a 5 semanas</p>
            `;
            break;

            default:
            result.innerHTML = "<p>Envío no encontrado o desconocido</p>";
        }

// Para mostrar el contenedor del resultado
    resultContainer.style.display = "block";
}

// Eventos 
    document.getElementById("name").addEventListener("keyup", showSuggestions);