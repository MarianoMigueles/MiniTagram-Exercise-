
import { safeNewData } from "./main.js";

    const btnPublic = document.getElementById('camera-public-post');
    const btnCancel = document.getElementById('camera-cancel-post');
    const dateText = document.getElementById('post-date');

    dateText.textContent = new Date().toLocaleString();

    const btnUploadImg = document.querySelector('.minitagram-card-new-post-img');
    const inputTitle = document.querySelector('.minitagram-card-img-title');
    const inputDescription = document.querySelector('.minitagram-card-img-description-text');
    const userName = document.getElementById('user_name')

    btnCancel.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("¿Realmente quieres cancelar la publicacion?")) {
            window.location.href = "./index.html";
        }
    });

    btnPublic.addEventListener('click', (event) => {
        event.preventDefault();
        createNewPost()
    });

    const inputCamera = document.createElement("input")
    inputCamera.type = "file"
    inputCamera.id = "inputCamera"
    inputCamera.accept = "camera"
    inputCamera.capture = "environment-facing"

    btnUploadImg.addEventListener('click', ()=> {
        inputCamera.click()
    })

    inputCamera.addEventListener("change", ()=> {
        if (inputCamera.value !== "") {
            btnUploadImg.innerHTML = ""
            const postImg = document.createElement('img')
            postImg.id = "post-img"
            postImg.src = URL.createObjectURL(inputCamera.files[0]) 
            btnUploadImg.append(postImg)
        }
    })


    function convertirImagenAbase64(imagen) {
        if (imagen == null)
        {
            ToastIt.now({
                close: true,
                style: 'error',
                timer: 4000,
                message: 'Es nesesario proporcionar una imagen', 
            })
            throw new Error()
        }
        const canvas = document.createElement("canvas")
        canvas.width = imagen.width
        canvas.height = imagen.height
        const ctx = canvas.getContext("2d")
        ctx.drawImage(imagen, 0, 0, imagen.width, imagen.height)
        return canvas.toDataURL("image/jpeg");       
    }

    async function createNewPost() {

        const img = document.querySelector('#post-img');

        let newPost = [{ user: "", imagen: "", titulo: "", descripcion: "", fecha: "" }];

        newPost[0].user = "Yo";
        newPost[0].titulo = inputTitle.value;
        if (newPost[0].titulo.length == 0)
        {
            ToastIt.now({
                close: true,
                style: 'error',
                timer: 4000,
                message: 'Es nesesario proporcionar un titulo', 
            })
            throw new Error()
        }
        newPost[0].descripcion = inputDescription.value;
        newPost[0].imagen = convertirImagenAbase64(img);
        newPost[0].fecha = dateText.textContent;
        await safeNewData(newPost[0])

        window.location.href = "./index.html";
    }

