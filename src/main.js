console.log('Hello, world')

const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=4&api_key=live_HQgBsTVg0VK997f8RYepMe0ZoL18awH1WUrBzRvGaRCoseNypdrYukOXmafxe3xM';

const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?api_key=live_HQgBsTVg0VK997f8RYepMe0ZoL18awH1WUrBzRvGaRCoseNypdrYukOXmafxe3xM';

const API_URL_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}?api_key=live_HQgBsTVg0VK997f8RYepMe0ZoL18awH1WUrBzRvGaRCoseNypdrYukOXmafxe3xM`;

const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';

const spanError = document.getElementById('error');

async function loadRandomDoggies() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  console.log('Random')
  console.log(data)

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
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
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
  
    console.log('Favoritos')
    console.log(data)

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        const section = document.getElementById('favoritesDoggies');
        section.innerHTML = "";
/*         const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Doggies favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);  */

        data.forEach (doggie => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Borrar al doggie de favoritos');
            
            img.src = doggie.image.url;
            img.width = 150;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouritesDoggies(doggie.id);
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        });
    }
}

async function savedFavouritesDoggies(id) {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();

    console.log('save');
    console.log(res);

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        console.log('Doggie guardado en favoritos');
        loadFavouritesDoggies();
    }
}

async function deleteFavouritesDoggies(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
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

    const rest = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_HQgBsTVg0VK997f8RYepMe0ZoL18awH1WUrBzRvGaRCoseNypdrYukOXmafxe3xM',
        },
        body: formData,
    });
}

loadRandomDoggies();
loadFavouritesDoggies();
