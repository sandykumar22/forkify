import { elements } from './base';
import { formatRecipe } from './searchView';

export const toggleLoveBtn = isLiked => {
    const shape = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe_love use').setAttribute('href', `img/icons.svg#${shape}`);
};

export const toggleFavItems = numLikes => {
    elements.favIcon.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
    const markup = `
        <li>
            <a class = "fav_list_items" href="#${like.id}">
                <img src = "${like.img}" class = "list_img" alt = "${like.title}">
                <div class = "item_desc">
                    <span id = "desc_red">${formatRecipe(like.title)}</span>
                    <p id = "tag">${like.author}</p>
                </div>
            </a> 
        </li> 
    `;
    elements.likesPanel.insertAdjacentHTML('beforeend', markup);
};

export const delLike = id => {
    const el = document.querySelector(`.fav_list_items[href="#${id}"]`).parentElement;
    console.log(el);
    console.log(el.parentElement);
    if(el) el.parentElement.removeChild(el);
};