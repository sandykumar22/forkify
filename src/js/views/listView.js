import { elements } from './base';

export const renderItem = item => {
    const markup = `
        <li class = "shopping_list" data-itemid=${item.id}>
            <div class = "shopping_item_quantity">
                <input type = "number" step = "${item.count}" value = "${item.count}" class = "shop_item_count">
                <p>${item.unit}</p>
            </div>
                <span class = "shopping_item_name">${item.ingredient}</span>
            <button class = "shop_del_btn">
                <i class = "fa fa-times-circle"></i>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    // console.log(item);
    if(item) item.parentElement.removeChild(item);
};

export const removeItemUI = () => {
    elements.shopping.innerHTML = '';
};