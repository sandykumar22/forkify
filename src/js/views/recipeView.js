import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}

const formatCount = count => {
    if(count) {

        const newCount = Math.round(count * 10000 / 10000);
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return newCount;

        if(int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        }
        else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
};

export const renderRecipe = (recipe, isLiked) => {

    const createIng = ingredient => `
        <li class = "recipe_ingredients_list">
            <i class = "fa fa-check-circle-o"></i>
            <div class = "recipe_count">${formatCount(ingredient.count)}</div>
            <div class = "recipe_ing>
                <span class = "recipe_unit">${ingredient.unit}</span>
                <span class = "recipe_item_needed">${ingredient.ingredient}</span>
            </div>
        </li>
    `;
    const markup = `

    <div class = "item_img">
        <img src = "${recipe.img}" class = "recipe_img" alt = "${recipe.title}">
        <h1 class = "recipe_name">
            <span>${recipe.title}</span>
        </h1>
    </div>
    <div class = "recipe_info">
        <div class = "recipe_time_info">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
                <span class = "recipe_info_in_num">${recipe.time}</span>
                <span class = "recipe_info_in_min">minutes</span>                    
        </div>
        <div class = "recipe_servings">
            <i class = "fa fa-male"></i>
                <span class = "recipe_no_of_servings">${recipe.servings}</span>
                <span class = "recipe_in_servs">servings</span>
            <div class = "recipe_minus_serve btn_dec">
                <i class = "fa fa-minus"></i>
            </div>
            <div class = "recipe_plus_serve btn_inc">
                <i class = "fa fa-plus"></i>
            </div>
        </div>
        <button class = "recipe_love">
            <svg class="likes__icon">
                <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class = "recipe_content">
        <ul class = "recipe_ingredients">
            ${recipe.ingredients.map(el => createIng(el)).join('')}
        </ul>
        <div class = "shopping_cart">
            <button class = "shop_cart">
                <i class = "fa fa-shopping-cart"></i>
                <span>Add to shopping list</span>
            </button>
        </div>
    </div>
    <div class = "cooking_instructions">
        <h2 class = "recipe_instruct_title">How to cook it</h2>
        <h4 class = "recipe_tester">This recipe was carefully designed and tested by <span class = "recipe_chef">${recipe.author}</span>. Please check out directions at their website.</h4>
        <button class = "recipe_direction"> 
            <a href = "${recipe.url}" target = "_blank">directions
                <i class = "fa fa-arrow-circle-o-right"></i>
            </a>
        </button>
    </div>-->
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markup);
}

export const updateServingsInUI = (recipe) => {
    document.querySelector('.recipe_no_of_servings').textContent = recipe.servings;

    const countElements = Array.from(document.querySelectorAll('.recipe_count'));

    countElements.forEach((el, i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });
}