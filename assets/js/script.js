async function getMoney(tipo) {
    const urlApi = `https://mindicador.cl/api/${tipo}`;
    try {
        const res = await fetch(urlApi);
        const money = await res.json();
        return money
    } catch (error) {
        alert(error)    
    }
}

const ultimasFechas = ()=>{
    const fechaActual = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let fechas = [fechaActual.toLocaleDateString()]
    for (let i = 1; i < 6; i++) {
        let fecha = new Date(fechaActual.getTime() - (DIA_EN_MILISEGUNDOS*i)).toLocaleDateString();
        fechas.push(fecha)
    }
    fechas = fechas.reverse()
    return fechas
}


function configGrafico(tipos){
    const fechas = ultimasFechas()
    const tipoDeGrafica = "line";
    const nombreStats =  fechas.map((fecha) => {
        return fecha;
        });
    const titulo = "Estadisticas Ultimos 5 Días";
    const colorDeLinea = "blue";
    const valores = tipos.serie.map((tipo) => {
        return tipo.valor;
        });
    const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombreStats,
        datasets: [
            {
                label: titulo,
                backgroundColor: colorDeLinea,
                data: valores
            }
        ]
        }
    };
    return config;
}

async function renderGrafica() {
    const tipos = await getMoney(conversor.toLowerCase());
    const config = configGrafico(tipos);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}


const inputUser = document.getElementById("input-user").value
const conversor = document.getElementById("convercion").value
const resultado = document.getElementById("resultado")
const boton = document.getElementById("boton")
boton.addEventListener("click", async ()=>{
    const valores = await getMoney("") 
    if (conversor === "Dolar") {
        resultado.innerHTML = `Resultado: $ ${(inputUser / valores.dolar.valor).toFixed(2)}`
    }
    else if (conversor === "Euro") {
        resultado.innerHTML = `Resultado: $ ${(inputUser / valores.euro.valor).toFixed(2)}`
    }
    else if (conversor === "UF") {
        resultado.innerHTML = `Resultado: $ ${(inputUser / valores.uf.valor).toFixed(2)}`
    }
    else if (conversor === "IVP") {
        resultado.innerHTML = `Resultado: $ ${(inputUser / valores.ivp.valor).toFixed(2)}`
    }
    else if (conversor === "UTM") {
        resultado.innerHTML = `Resultado: $ ${(inputUser / valores.utm.valor).toFixed(2)}`
    }
})

renderGrafica()




