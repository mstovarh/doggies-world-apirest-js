console.log('Hello, world')

const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_HQgBsTVg0VK997f8RYepMe0ZoL18awH1WUrBzRvGaRCoseNypdrYukOXmafxe3xM';

const spanError = document.getElementById('error');

async function loadRandomDoggies() {
    const { data, status } = await api.get('/images/search?limit=4');

    console.log('Random')
    console.log(data)

    if(status !== 200){
        spanError.innerHTML = "Hubo un error: " + status;
    }else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        const btn4 = document.getElementById('btn4');
        
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;

        btn1.onclick = () => savedFavouritesDoggies(data[0].id);
        btn2.onclick = () => savedFavouritesDoggies(data[1].id);
        btn3.onclick = () => savedFavouritesDoggies(data[2].id);
        btn4.onclick = () => savedFavouritesDoggies(data[3].id);
    }
}

async function loadFavouritesDoggies() {
    const { data, status } = await api.get('/favourites');
  
    console.log('Favoritos')
    console.log(data)

    if(status !== 200){
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    }else{
        const section = document.getElementById('favoritesDoggies');
        section.innerHTML = "";

        data.forEach (doggie => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const containerBtn = document.createElement('div');
            const btn = document.createElement('button');
            const pBtnText = document.createElement('p');
            const btnText = document.createTextNode('❌');

            img.src = doggie.image.url;
            
            article.className = "w-40 h-40";
            img.className = "w-full h-full";
            containerBtn.className = "flex justify-center";
            btn.className = "bg-brown hover:bg-brown-dark text-white font-semibold py-2 px-3 mt-1 border border-brown-dark rounded-md shadow-md transition duration-300 ease-in-out";
            pBtnText.className = "font-luckiest-guy-regular";

            btn.appendChild(pBtnText);
            pBtnText.appendChild(btnText);
            btn.onclick = () => deleteFavouritesDoggies(doggie.id);
            article.appendChild(img);
            containerBtn.appendChild(btn);
            article.appendChild(containerBtn);
            section.appendChild(article);
        });
    }
}

async function savedFavouritesDoggies(id) {
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });

    console.log('save');

    if(status !== 200){
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    }else{
        console.log('Doggie guardado en favoritos');
        loadFavouritesDoggies();
    }
}

async function deleteFavouritesDoggies(id) {
    const { data, status } = await api.delete(`/favourites/${id}`);

    console.log('Doggie borrado')
    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Doggie eliminado de favoritos')
        loadFavouritesDoggies();
    }
}

async function uploadDoggieFoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log('Foto subida');
    console.log(formData.get('file'));

    const { data, status } = await api.post('/images/upload', {
        body: formData,
    });
}

loadRandomDoggies();
loadFavouritesDoggies();
