// Array con los envios
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

// Elementos del DOM
    const resultContainer = document.getElementById("result-container");
    const input = document.getElementById("name");
    const suggestionsContainer = document.getElementById("suggestions");
    const result = document.getElementById("result");

// Funcion para limpiar sugerencias
    function clearSuggestions() {
        suggestionsContainer.innerHTML = "";
    }

// Funcion para las sugerencias
    function buildSuggestions(text) {
        shippingOptions.forEach(option => {
            //se muestran sugerencias que coincidan con el texto ingresado
            if (option.toLowerCase().includes(text.toLowerCase())) {
                let div = document.createElement("div");
                div.innerHTML = option;
                //para reemplazar texto escrito
                div.addEventListener("click", () => {
                    input.value = option;
                    clearSuggestions();
                });
                suggestionsContainer.appendChild(div);
            }
        });
    
        //se muestra un mensaje si no hay coincidencias
        if (suggestionsContainer.children.length === 0) {
            let div = document.createElement("div");
            div.classList.add("suggestion");
            div.innerHTML = "Envío no encontrado o desconocido";
            suggestionsContainer.appendChild(div);
        }
    }
    
// Funcion para mostrar las sugerencias
    function showSuggestions() {
        clearSuggestions();
    
        const text = input.value;
        if (text.length >= 3) {
            buildSuggestions(text);
        }
    }

// Funcion para mostrar la info
    function buscar() {
        const name = input.value;

        switch(name) {

            case "AliExpress Standard Shipping":
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

// Evento para mostar sugerencias al ingresar texto
    document.getElementById("name").addEventListener("keyup", showSuggestions);