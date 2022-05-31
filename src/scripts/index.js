const APIOffers = 'http://localhost:4005/offers';
const APIPopular = 'http://localhost:4005/popular';

//Función que hace llamado a los datos almacenados en el json-server.
async function dataAPI(url){
    try {
        const respond = await fetch(url)
        const data = await respond.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

function showModalItem(id, idModal, name, image, price, formatWeight, weight = '1'){
    return `
    <div class="modalItem">
        <div class="modal fade" id="${idModal}" tabindex="-1" aria-labelledby="${idModal}Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <button type="button" class="button-close" data-bs-dismiss="modal" aria-label="Close"><img src="./Icons-Images/cancel.png" alt=""></button>
                    <div class="modal-body">
                        <div class="product-info">
                            <img src="${image}" alt="${name}">
                            <div class="info">
                                <p class="name-product">${name}</p>
                                <p class="price">· $${price}/${formatWeight}</p>
                                <p class="paragraph">Precios con IVA incluido</p>
                                <p class="description">Peso aproximado por pieza, puede variar de acuerdo al peso real.</p>
                                <p class="select-text">Selecciona la madurez que deseas</p>
                                <select name="Por elegir" id="select-type-product">
                                    <option value="today">Maduro (Para hoy)</option>
                                    <option value="max-5-days">Normal (3-5 días)</option>
                                    <option value="max-7-days">Verde (7 días)</option>
                                </select>
                                <div class="add-details-product">
                                    <div class="increase-amount">
                                        <img class="button-increase" src="./Icons-Images/icon-less.png" alt="">
                                        <p id="gram-product${id}">${weight}</p>
                                        <img class="button-decrease" src="./Icons-Images/icon-sum.png" alt="">
                                    </div>
                                    <button class="button-add">Agregar</button>
                                </div>
                            </div>
                        </div>
                        <div class="products-related"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

async function showOffers() {
    const info = await dataAPI(APIOffers);
    $('.products-offers').html(
        info.map(({ id, name, image, percentage, discountPrice, price, formatWeight, idModal }) => `
        <div class="product-offer">
            <p class="discount"> ${percentage}% dto</p>
            <div class="container-image"> <img src="${image}" alt="${name}"/> </div>
            <p class="price">$${price}/${formatWeight}<span class="price-discount">$${discountPrice}/${formatWeight}</span> </p>
            <p class="name-product">${name}</p>
            <button class="button-add" type="button" data-bs-toggle="modal" data-bs-target="#${idModal}"> Agregar </button>
            ${showModalItem(id, idModal, name, image, price, formatWeight)}
        </div>
        `)
    )
}
showOffers()

async function showPopular(){
    const info = await dataAPI(APIPopular);
    $('.products-popular').html(
        info.map(({ id, idModal, name, image, price, weight, pricePerGram, formatWeight, und}) => `
        <div class="product-popular">
            <img src="${image}" alt="${name}">
            <p class="price">$${price}</p>
            <p class="name-product">${name}</p>
            <p class="info-price">${weight}${formatWeight} <span> ($${pricePerGram}/${formatWeight}) </span></p>
            <button class="button-add" type="button" data-bs-toggle="modal" data-bs-target="#${idModal}"> Agregar </button>
            ${showModalItem(id, idModal, name, image, price, und)}
        </div>
    `)
    )
}
showPopular()