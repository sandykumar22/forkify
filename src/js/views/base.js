export const elements = {
    searchForm: document.querySelector('.search'),
    searchField: document.querySelector('.search_field'),
    result: document.querySelector('.results'),
    resultList: document.querySelector('.results_list'),
    pageButtons: document.querySelector('.result_pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping_items'),
    favIcon: document.querySelector('.like_btn'),
    likesPanel: document.querySelector('.fav-list')
};

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class = "${elementStrings.loader}">
            <i class = "fa fa-repeat"></i>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}