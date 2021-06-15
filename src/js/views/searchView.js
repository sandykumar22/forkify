import { elements } from './base';

export const getInput = () => elements.searchField.value;

export const clearInput = () => {
    elements.searchField.value = '';
};

export const clearResults = () => {
    elements.resultList.innerHTML = '';
    elements.pageButtons.innerHTML = '';
};

export const highLightRecipe = id => {
    const list = Array.from(document.querySelectorAll('.result_list_item'));

    list.forEach(el => {
        el.classList.remove('active');
        //console.log(el);
    });

    document.querySelector(`.result_list_item[href="#${id}"]`).classList.add('active');
};

export const formatRecipe = (title, limit = 17) => {
    let newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }
    return title;  
};

const renderRecipe = recipe => {
    const markup = `
        <a class = "result_list_item" href = "#${recipe.recipe_id}">
            <img src = "${recipe.image_url}" class = "list_img">
            <div class = "item_desc">
                <span id = "desc_red">${formatRecipe(recipe.title)}</span>
                <p id = "tag">${recipe.publisher}</p>
            </div>
        </a>
    `;
    elements.resultList.insertAdjacentHTML('beforeend', markup);
};

const createPageButton = (page, type) => 

    `   <button class = "btn-page ${type}_page" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
            <i class = "fa fa-caret-${type === 'prev' ? 'left' : 'right'}"></i>        
            <span>page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>
    `
;

const pagination = (numOfResults, resPerPage, page) => {
    const numOfPages = Math.ceil(numOfResults / resPerPage);
    // console.log(numOfPages);

    let button;
    if(page === 1 && numOfPages > 1) {
        button = createPageButton(page, 'next');
    }
    else if(page < numOfPages) {
        button = `
            ${createPageButton(page, 'prev')}
            ${createPageButton(page, 'next')}        
        `;
    }
    else if(page === numOfPages && numOfPages > 1) {
        button = createPageButton(page, 'prev'); 
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    pagination(recipes.length, resPerPage, page);
    // console.log(recipes.length);
};