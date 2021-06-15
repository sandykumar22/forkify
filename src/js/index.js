import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Recipe from './models/Recipe';
import Likes from './models/Likes';

const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    // console.log(query);

    if(query) {
        state.search = new Search(query);

        try {
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.result);

            await state.search.getResults();

            clearLoader();
            searchView.renderResults(state.search.result);
        }
        catch(error) {
            alert("Something wrong with the search ;)");
            clearLoader();
        }
        
        

        // console.log(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
    const btn = e.target.closest('.btn-page');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

const controlList = () => {
    if(!state.list) state.list = new List();

    // console.log(state.list.items.length);

    if(state.list.items.length > 0) {
       state.list.items = [];
       listView.removeItemUI();
       // console.log(state.list.items);
    }
    
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    }); 
};

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping_list').dataset.itemid;
    // console.log(id);
    if(e.target.matches('.shop_del_btn, .shop_del_btn *')) {
        state.list.delItem(id);
        // console.log(state.list.items);
        listView.deleteItem(id);
    } 
    else if(e.target.matches('.shop_item_count')) {
        const val = parseFloat(e.target.value, 10);

        state.list.updateCount(id, val);
        // console.log(state.list.items);
    }
});

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    // console.log(id);
    
    if(id) {

       
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        searchView.highLightRecipe(id);
        state.recipe = new Recipe(id);

        try {
        
            
            await state.recipe.getRecipe();

            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();

            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        }
        catch(error) {
            alert("Something went wrong :) ");
        }
    }
    
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



const controlLike = () => {
    // if(!state.likes) state.likes = new Likes();

    // state.likes = new Likes();
    const curId = state.recipe.id;

    // console.log(curId);

    if(!state.likes.isLiked(curId)) {

        const newLike = state.likes.addLike(
            curId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // console.log(newLike);
        likesView.toggleLoveBtn(true);
        likesView.renderLike(newLike);
        // console.log(state.likes);
    }

    else {
        state.likes.delLike(curId);

        likesView.delLike(curId);
        likesView.toggleLoveBtn(false);
        // console.log(state.likes);
    }

    likesView.toggleFavItems(state.likes.getNumLikes());
};

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn_dec, .btn_dec *')) {
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsInUI(state.recipe);
        }
    }
    else if(e.target.matches('.btn_inc, .btn_inc *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsInUI(state.recipe);
    }
    else if(e.target.matches('.shop_cart, .shop_cart *')) {
        controlList();
    }
    else if(e.target.matches('.recipe_love, .recipe_love *')) {
        controlLike();
    }
});

window.addEventListener('load', () => {
    state.likes = new Likes();


    state.likes.readStorage();


    likesView.toggleFavItems(state.likes.getNumLikes());
    

    state.likes.likes.forEach(like => likesView.renderLike(like));
});