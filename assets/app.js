const apiUrl = "http://localhost:3000/favoritos"; // URL do JSON Server

async function exibirDadosPais(infoPais) {
    console.log(infoPais);
    document.getElementById("country-flag").src = infoPais.flags.png;
    document.getElementById("country-name").textContent = infoPais.name.common;
    document.getElementById("country-capital").textContent = infoPais.capital[0];
}

// GET: Buscar país na API REST Countries
async function obterPais(pais) {
    const url = `https://restcountries.com/v3.1/name/${pais}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0]; // Retorna apenas o primeiro resultado
}

// POST: Adicionar país aos favoritos
async function adicionarAosFavoritos(pais) {
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pais),
    });

    if (response.ok) {
        alert(`${pais.name.common} adicionado aos favoritos!`);
    } else {
        alert("Erro ao adicionar país.");
    }
}

// DELETE: Remover país dos favoritos
async function removerDosFavoritos(nome) {
    
    const response = await fetch(apiUrl);
    const favoritos = await response.json();


    const pais = favoritos.find(p => p.name.common === nome);

    if (!pais) {
        alert("País não encontrado nos favoritos.");
        return;
    }

    
    const deleteResponse = await fetch(`${apiUrl}/${pais.id}`, { method: "DELETE" });

    if (deleteResponse.ok) {
        alert(`${nome} removido dos favoritos!`);
    } else {
        alert("Erro ao remover país.");
    }
}

// Evento de busca ao pressionar Enter
document.getElementById("country-input").addEventListener("keydown", async (evento) => {
    if (evento.key == "Enter") {
        const infoPais = await obterPais(evento.target.value);
        exibirDadosPais(infoPais);
    }
});

// Botão para adicionar país aos favoritos
document.getElementById("add-favorite").addEventListener("click", async () => {
    const nome = document.getElementById("country-name").textContent;
    const bandeira = document.getElementById("country-flag").src;
    const capital = document.getElementById("country-capital").textContent;

    if (nome && bandeira && capital) {
        await adicionarAosFavoritos({ name: { common: nome }, flags: { png: bandeira }, capital: [capital] });
    }
});

// Botão para remover país dos favoritos
document.getElementById("remove-favorite").addEventListener("click", async () => {
    const nome = document.getElementById("country-name").textContent;
    if (nome) {
        await removerDosFavoritos(nome);
    }
});
