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
    const tipos = await getMoney(conversor.value.toLowerCase());
    const config = configGrafico(tipos);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}


const inputUser = document.getElementById("input-user")
const conversor = document.getElementById("convercion")
const resultado = document.getElementById("resultado")
const boton = document.getElementById("boton")
boton.addEventListener("click", async ()=>{

    const valores = await getMoney("")
    if (conversor.value === "Dolar") {
        resultado.innerHTML = `Resultado: $ ${(inputUser.value / valores.dolar.valor).toFixed(2)}`
        inputUser.value = ""
        const tipos = await getMoney(conversor.value.toLowerCase());
        const config = configGrafico(tipos);
        const chartDOM = document.getElementById("myChart");
        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        window.myChart = new Chart(chartDOM, config);
    }
    else if (conversor.value === "Euro") {
        resultado.innerHTML = `Resultado: $ ${(inputUser.value / valores.euro.valor).toFixed(2)}`
        inputUser.value = ""
        const tipos = await getMoney(conversor.value.toLowerCase());
        const config = configGrafico(tipos);
        const chartDOM = document.getElementById("myChart");
        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        window.myChart = new Chart(chartDOM, config);
    }
    else if (conversor.value === "UF") {
        resultado.innerHTML = `Resultado: $ ${(inputUser.value / valores.uf.valor).toFixed(2)}`
        inputUser.value = ""
        const tipos = await getMoney(conversor.value.toLowerCase());
        const config = configGrafico(tipos);
        const chartDOM = document.getElementById("myChart");
        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        window.myChart = new Chart(chartDOM, config);
    }
    else if (conversor.value === "IVP") {
        resultado.innerHTML = `Resultado: $ ${(inputUser.value / valores.ivp.valor).toFixed(2)}`
        inputUser.value = ""
        const tipos = await getMoney(conversor.value.toLowerCase());
        const config = configGrafico(tipos);
        const chartDOM = document.getElementById("myChart");
        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        window.myChart = new Chart(chartDOM, config);
    }
    else if (conversor.value === "UTM") {
        resultado.innerHTML = `Resultado: $ ${(inputUser.value / valores.utm.valor).toFixed(2)}`
        inputUser.value = ""
        const tipos = await getMoney(conversor.value.toLowerCase());
        const config = configGrafico(tipos);
        const chartDOM = document.getElementById("myChart");
        if(window.myChart instanceof Chart)
        {
            window.myChart.destroy();
        }
        window.myChart = new Chart(chartDOM, config);
    }
    
})