
//#region Logica principal de la paina

const apiURL = "https://6675fdd6a8d2b4d072f21b95.mockapi.io/Pip-Task/Minitagram";

const postuserName = document.getElementById('user-name')
const postTitle = document.getElementById('post-title')
const postDescription = document.getElementById('post-description')
const postDate  = document.getElementById('post-date')
const btnBurgerMenu = document.getElementById('burger-menu-icon')
const burgerMenuOptions = document.getElementById('burger-menu-list')

btnBurgerMenu.addEventListener('click', ()=> {
    if(burgerMenuOptions.classList.contains('hidden-element'))
    {
        showElement(burgerMenuOptions)

        const btnBurgerItem = document.querySelector('.log-out')

        btnBurgerItem.addEventListener('click', ()=> {
            removeUserNameFromLocalStorage()
            window.location.href = './index.html';
        })    

    }  else {
        hiddenElement(burgerMenuOptions);
    }
})

export function getMiniTagramCards(done) {
    const results = fetch(apiURL)
    results.then( res => res.json())
    .then( data => {
        done(data)
    })
}

if (window.location.href.includes("index.html")) {

    getMiniTagramCards(data => {

        const notFoundAlert = document.querySelector('.not-post-founded')

        let dataLenght = 0;
        for (let x of data) {
            dataLenght++;
        }

        if(dataLenght > 0) {

            hiddenElement(notFoundAlert)

            const container = document.querySelector('#minitagram-card-container')
    
            data.forEach( card => {
                container.innerHTML += `
                <div class="minitagram-card">
                    <div class="minitaram-card-content">
                        <div class="user-information center-elements">
                            <div class="user center-elements">
                                <div class="img-user">
                                    <img src="./Img/Perfil.png"/>
                                </div>
                                <p class="user_name">${card.user}</p>
                            </div> 
                            <div class="information center-elements">
                                <strong id="post-title">${card.titulo}</strong>
                                <p id="post-description">${card.descripcion}</p>
                                <span id="post-date">${card.fecha}</span>
                            </div>               
                        </div>
                        <div class="minitagram-card-post-img">
                            <img src="${card.imagen}" />
                        </div>
                    </div>
                </div>
            `;
            })
        } else {
            showElement(notFoundAlert)
        }
       
    })
}

export async function safeNewData(data) {
    return fetch(apiURL , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud falló con estado: ' + response.status);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
        throw error;
    });
}

function showElement(element) {
    element.classList.remove('hidden-element')
    element.classList.add('show-element')
}

function hiddenElement(element) {
    element.classList.remove('show-element')
    element.classList.add('hidden-element')
}

//#endregion

