const { openBrowser, goto, $, hover, click, link, below, dragAndDrop, mouseAction, waitFor, closeBrowser, to, scrollDown, focus, scrollUp, reload, 
        press, write, clear, resizeWindow, scrollTo, currentURL, goBack, } = require("taiko");
const assert = require("assert");
const { Console } = require("console");
const expect = require("chai").expect;
const headless = process.env.headless_chrome.toLowerCase() === "true";

beforeSuite(async () => {
  await openBrowser({
      headless: headless
  })
  await resizeWindow({width: 1300, height: 900});
  await goto('iponcomp.com');
  await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
  await hover((await $(`span.menu__link--label`).elements())[1]);
  await click(link('Gamer videocard'));
});

afterSuite(async()=>{
  await closeBrowser()
});


step("Hover over first product to see available webshop options", async function() {
	let activeView = "shop-list__layout-select__item is-active";
  let classNameCardView = await $(`a[title="Card view"]`).attribute("class");
  expect(classNameCardView).to.equal(activeView);
  expect(await $(`li.shop-list__filter-tags__item`).isDisabled()).to.be.false
  await hover($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12`));
  expect(await $(`div.shop-card__comparison-checkbox`).isVisible()).to.be.true 
  let quantity = await $(`input.shop-to-cart-quantity__input`).element(0)
  expect(await quantity.isVisible()).to.be.true
  let addToCartButton = await $(`a.shop-card__button.shop-card__cart-button`).element(0)
  expect(await addToCartButton.isVisible()).to.be.true
});

step("Click on 'Detailed view' icon", async function () {
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`))
  await click($(`a[title="Detailed view"]`));
  let activeView = "shop-list__layout-select__item is-active";
  let classNameDetailedView = await $(`a[title="Detailed view"]`).attribute("class");
  expect(classNameDetailedView).to.equal(activeView);
  expect(await $(`div.shop-card__comparison-checkbox`).isVisible()).to.be.true 
  let quantity = await $(`input.shop-to-cart-quantity__input`).element(0)
  expect(await quantity.isVisible()).to.be.true
  let addToCartButton = await $(`a.shop-to-cart-button.shop-to-cart-button--lg.shop-card--detail__cart`).element(0)
  expect(await addToCartButton.isVisible()).to.be.true
});

step("Click on 'List view' icon", async function () {
  await click($(`a[title="List view"]`));
  let activeView = "shop-list__layout-select__item is-active";
  let classNameListView = await $(`a[title="List view"]`).attribute("class");
  expect(classNameListView).to.equal(activeView);
  let quantity = await $(`div.spinner-input.shop-card--list__quantity__input.js-spinner`).element(0)
  expect(await quantity.isVisible()).to.be.true
  let addToCartButton = await $(`a.shop-to-cart-button.shop-to-cart-button--lg.shop-card--list__cart`).element(0)
  expect(await addToCartButton.isVisible()).to.be.true
});

step("Click on 'Card view' icon", async function () {
  await click($(`a[title="Card view"]`));
  let activeView = "shop-list__layout-select__item is-active";
  let classNameCardView = await $(`a[title="Card view"]`).attribute("class");
  expect(classNameCardView).to.equal(activeView);
});

step("Click on minimum side button of the slider and move it right", async function() {
  let itemsCountTextDefault = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountDefault = [];
  itemsCountDefault.push(itemsCountTextDefault[1], itemsCountTextDefault[2], itemsCountTextDefault[3]);
  itemsCountDefault = parseInt(itemsCountDefault.join("")); 
  let lowestPriceDefault = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'press', {x:0,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'move', {x:60,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'release', {x:60,y:0}); 
  let lowestPriceFiltered = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
  let itemsCountTextFiltered = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountFiltered = [];
  itemsCountFiltered.push(itemsCountTextFiltered[1], itemsCountTextFiltered[2], itemsCountTextFiltered[3]);
  itemsCountFiltered = parseInt(itemsCountFiltered.join("")); 
  expect(lowestPriceFiltered > lowestPriceDefault).to.be.true;
  expect(itemsCountFiltered <= itemsCountDefault).to.be.true; 
  expect(await (await $(`li.shop-list__filter-tags__item`).element(0)).isVisible()).to.be.true; 
  let lowestPriceFilteredString = lowestPriceFiltered.toString();
  let filteredMimimumPriceString = (await(await $(`li.shop-list__filter-tags__item`).element(0)).text());
  let filteredMimimumPriceNoSpaces = filteredMimimumPriceString.replace(/\s+/g, '');
  expect(filteredMimimumPriceNoSpaces).to.include(lowestPriceFilteredString); 
}); 

step("Click on maximum side of the slider and move it left", async function() { 
  let itemsCountTextDefault = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountDefault = [];
  itemsCountDefault.push(itemsCountTextDefault[1], itemsCountTextDefault[2], itemsCountTextDefault[3]);
  itemsCountDefault = parseInt(itemsCountDefault.join(""));
  let highestPriceDefault = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle.noUi-handle-upper`).attribute("aria-valuetext"));
	await dragAndDrop($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-upper`), {left:60});
  let highestPriceFiltered = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle.noUi-handle-upper`).attribute("aria-valuetext"));
  let itemsCountTextFiltered = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountFiltered = [];
  itemsCountFiltered.push(itemsCountTextFiltered[1], itemsCountTextFiltered[2], itemsCountTextFiltered[3]);
  itemsCountFiltered = parseInt(itemsCountFiltered.join(""));
  expect (highestPriceDefault > highestPriceFiltered).to.be.true;
  expect(itemsCountFiltered <= itemsCountDefault).to.be.true;
  expect(await (await $(`li.shop-list__filter-tags__item`).element(0)).isVisible()).to.be.true;
  let highestPriceFilteredString = highestPriceFiltered.toString();
  let filteredMaximumPriceString = (await(await $(`li.shop-list__filter-tags__item`).element(0)).text());
  let filteredMaximumPriceStringNoSpaces = filteredMaximumPriceString.replace(/\s+/g, '');
  expect(filteredMaximumPriceStringNoSpaces).to.include(highestPriceFilteredString);
});

step("Click on 'Manufacturer' button to see the dropdown list", async function() {
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`));
	await click(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control`).element(1));
  let manufacturersArray = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li[class="shop-filter-options__item"]`).elements());
  expect(manufacturersArray).to.have.lengthOf(5); 
  expect(await $(`div.dropdown-control__dropdown.js-dropdown-control-dropdown ul.shop-filter-options-toggle`).isVisible()).to.be.true; 
  expect(await $(`div.dropdown-control__dropdown.js-dropdown-control-dropdown input[type="checkbox"]`).isVisible()).to.be.true; 
});

step("Click on 'Show all' button", async function() {
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open a.shop-filter-options__show-link`)); 
  let dropdown = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(2) ul:first-of-type`).attribute("class"));
  expect(dropdown).to.equal("shop-filter-options shop-filter-options--nested is-show-all");
  expect(await $(`div.shop-list__filters-order--wrapper div.shop-list__filter.dropdown-control.js-dropdown-control.is-open input[placeholder="Filter..."]`).isVisible()).to.be.true
  await hover($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`));
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`).isVisible()).to.be.true
});

step("Click on a checkbox than another checkbox", async function() {
  let itemsCountDefault = await ($(`div.shop-list__header__item-count`).text());
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`));
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(10) span.control__indicator`));
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`).text()); 
  expect(itemsCountDefault).to.not.equal(itemsCountFiltered);
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(10) span.control__indicator`));
});


step("Click on 'Pickup' button", async function() {
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`));
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(3)`));
  let pickupArray = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li[class="shop-filter-options__item"]`).elements());
  expect(pickupArray).to.have.lengthOf(5); 
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open ul.shop-filter-options-toggle`).isVisible()).to.be.true; 
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open span.control__indicator`).isVisible()).to.be.true; 
});

step("Click on 'Show all' button in 'Pickup' filter", async function() {
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open a.shop-filter-options__show-link`)); 
  let dropdown = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(3) ul:first-of-type`).attribute("class"));
  expect(dropdown).to.equal("shop-filter-options shop-filter-options--nested is-show-all");
  expect(await $(`div.shop-list__filters-order--wrapper div.shop-list__filter.dropdown-control.js-dropdown-control.is-open input[placeholder="Filter..."]`).isVisible()).to.be.true
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`));
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`).isVisible()).to.be.true
});


step("Click on a checkbox than another checkbox in 'Pickup filter'", async function() {
	let itemsCountDefault = await ($(`div.shop-list__header__item-count`).text());
  await hover($(`div.shop-list__filter-tags-layout-select-wrapper`));
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(6) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`).text()); 
  expect(itemsCountDefault).to.not.equal(itemsCountFiltered);
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(6) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
});

step("Click on 'Order' dropdown menu", async function() {
	await click($(`div[class="select-input shop-list__order-select select-input--order-icon@mobile"]`));
  let orderOptions = await $(`div[class*="select-input shop-list__order-select select-input--order-icon@mobile"] option`).elements();
  expect(orderOptions.length).to.equal(5); 
  let defaultOrder = (await $(`div[class*="select-input shop-list__order-select select-input--order-icon@mobile"] option:first-of-type`).element(0));
  let defaultOrderText = await defaultOrder.text();
  expect(defaultOrderText).to.contain("Popular first"); 
});

step("Click on 'Cheap first' option", async function() {
  let itemsCountDefault = await ($(`div.shop-list__header__item-count`)).text();
	await press("ArrowDown");
  await press("Enter");
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`)).text();
  expect(itemsCountDefault).to.equal(itemsCountFiltered);
});

step("Click on 'Expensive first' option", async function() {
	let itemsCountDefault = await ($(`div.shop-list__header__item-count`)).text();
  await click($(`div[class="select-input shop-list__order-select select-input--order-icon@mobile"]`));
	await press("ArrowDown");
  await press("Enter")
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`)).text();
  expect(itemsCountDefault).to.equal(itemsCountFiltered);
});

step("Click on 'Newest first' option", async function() {
	let itemsCountDefault = await ($(`div.shop-list__header__item-count`)).text();
  await click($(`div[class="select-input shop-list__order-select select-input--order-icon@mobile"]`));
	await press("ArrowDown");
  await press("Enter")
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`)).text();
  expect(itemsCountDefault).to.equal(itemsCountFiltered);
});

step("Click on 'Discount' option", async function() {
	let itemsCountDefault = await ($(`div.shop-list__header__item-count`)).text();
  await click($(`div[class="select-input shop-list__order-select select-input--order-icon@mobile"]`));
	await press("ArrowDown");
  await press("Enter")
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`)).text();
  expect(itemsCountDefault).to.equal(itemsCountFiltered);
});

step("Click in the search input", async function() {
  await hover($(`input[placeholder="Search in category..."]`));
  await scrollUp();
  await click($(`li.shop-list__filter-tags__item:first-of-type i.fas.fa-times.shop-list__filter-tags__icon`));
  await click($(`input[placeholder="Search in category..."]`));
});


step("Write <word> in the search field", async function(word) {
  let itemsCountDefault = await $(`div.shop-list__header__item-count`).text()
	await write(word, $(`input[placeholder="Search in category..."]`));
  await press('Enter');
  let itemsCountFiltered = await $(`div.shop-list__header__item-count`).text()
  assert.notEqual(itemsCountDefault, itemsCountFiltered);
  await clear($(`input.shop-list__search__input.js-width-dynamic`));
  await press('Enter'); 
});


step("Scroll down to the bottom of product list", async function() {
	await hover($(`div.product-list__show-more-button-wrapper`));
  let showMore = await $(`div.product-list__show-more-button-wrapper`).isVisible();
  let previousPageButton = await $(`div.forum-pagination.forum-pagination--messages button:first-of-type`).attribute("class");
  expect(showMore).to.be.true; 
  expect(previousPageButton).to.equal("forum-pagination__button--prev forum-pagination__button button");
  let itemsCountText = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCount = [];
  itemsCount.push(itemsCountText[1], itemsCountText[2], itemsCountText[3]);
  itemsCount = parseInt(itemsCount.join(""));
  let numberOfPages = parseInt(await $(`span.forum-pagination__pages-all`).text());
  expect(Math.ceil(itemsCount/36)).to.equal(numberOfPages);
});

step("Click on 'next page' button", async function() {
	await click($(`button[class*="forum-pagination__button--next forum-pagination__button button"]`));
  await hover ($(`div.product-list__show-more-button-wrapper`));
  let showMore = await $(`div.product-list__show-more-button-wrapper`).isVisible();
  let previousPageButton = await $(`div.forum-pagination.forum-pagination--messages button:first-of-type`).attribute("class");
  expect(showMore).to.be.true; 
  expect(previousPageButton).to.equal("forum-pagination__button--prev forum-pagination__button button forum-pagination__button--active");
});

step("Check if there is a 4th page, if yes click on it", async function() {
  let numberOfPages = parseInt(await $(`span.forum-pagination__pages-all`).text());
	if(numberOfPages > 3){
    let nextPageButton = await $(`div.forum-pagination.forum-pagination--messages button:last-of-type`).attribute("class");
    await click($(`button[class*="forum-pagination__button--next forum-pagination__button button"]`));
    expect(nextPageButton).to.equal("forum-pagination__button--next forum-pagination__button button"); 
  };
  await clear($(`input.forum-pagination__pages-input`));
  await write('1', $(`input.forum-pagination__pages-input`));
  await press('Enter');
});


step("Click on dropdown filter menus and click on radio buttons: <bt1> <bt2> <bt3> options inside <table>", async function(bt1, bt2, bt3, table){
  await click($(`div[data-collapse-id-value="price"] i[class="fas fa-angle-up"]`));
  await focus($(`div[data-collapse-id-value="brand"] i[class="fas fa-angle-up"]`));
  await click($(`div[data-collapse-id-value="brand"] i[class="fas fa-angle-up"]`));
  await focus($(`div[data-collapse-id-value="day"] i[class="fas fa-angle-up"]`));
  await click($(`div[data-collapse-id-value="day"] i[class="fas fa-angle-up"]`));
  await focus($(`div[data-collapse-id-value="guarantee-month"] i[class="fas fa-angle-up"]`));
  await click($(`div[data-collapse-id-value="guarantee-month"] i[class="fas fa-angle-up"]`));
  await focus($(`div[data-collapse-id-value="feature-38"] i[class="fas fa-angle-up"]`));
  await click($(`div[data-collapse-id-value="feature-38"] i[class="fas fa-angle-up"]`));
  for (var row of table.rows) {
    await focus(row.cells[0]);
    await scrollUp(800)
	  await click(row.cells[0]);
    let itemsCountTextFilteredAll = await $(`div.shop-list__header__item-count`).text();
    await click(bt2);
    let itemsCountTextFilteredYes = await $(`div.shop-list__header__item-count`).text();
    assert.notEqual(itemsCountTextFilteredAll, itemsCountTextFilteredYes);
    await focus(bt3);
    await click(bt3);
    let itemsCountFilteredNo = await $(`div.shop-list__header__item-count`).text();
    assert.notEqual(itemsCountTextFilteredYes,itemsCountFilteredNo);
    await click(bt1);
    await focus(row.cells[0]);
    await scrollUp(800)
    await click(row.cells[0]);
  }
});


step("Click on 'compare' checkbox inside a product card", async function() {
    await hover($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12`));
    await click($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:first-of-type span.control__indicator`));
  if ((await $(`div.shop-compare-dock.js-shop-compare-dock.shop-compare-dock--unpinned`).exists()) === false) {    
    let compareBoxes = await $(`div.shop-compare-dock__item.compare-dock-card`).elements(); 
    let compareRemaining = await $(`div.shop-compare-dock__item.shop-compare-dock__item--placeholder`).elements();
    expect(compareBoxes).to.have.lengthOf(1);
    expect(compareRemaining).to.have.lengthOf(3);  
  } else {
    console.log("Bug detected! Compare bar missing, further steps cannot be executed.");
  }
});

step("Click on an other products 'compare' checkbox", async function() {
    await hover($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:nth-of-type(4)`));
    await click($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:nth-of-type(4) span.control__indicator`));
  if ((await $(`div.shop-compare-dock.js-shop-compare-dock.shop-compare-dock--unpinned`).exists()) === false) {	  
    compareBoxes = await $(`div.shop-compare-dock__item.compare-dock-card`).elements();
    compareRemaining = await $(`div.shop-compare-dock__item.shop-compare-dock__item--placeholder`).elements();
    expect(compareBoxes).to.have.lengthOf(2);
    expect(compareRemaining).to.have.lengthOf(2);
    await click($(`a.shop-compare-dock__compare-button.button.button--secondary`));
} else {
  console.log("Bug detected! Step: 'Click on an other products 'compare' checkbox' cannot be executed");
}
});

step("Click on 'Compare' in the bar at the bottom of the screen", async function() {
  if ((await $(`div.shop-compare-dock.js-shop-compare-dock.shop-compare-dock--unpinned`).exists()) === false) {
	  await click($(`a.shop-compare-dock__compare-button.button.button--secondary`));
    let breadcrumbsElements = await $(`li.breadcrumb__item`).elements();
    let pageTitle = await $(`h1.page__title`).text();
    expect(breadcrumbsElements).to.have.lengthOf(5);
    assert.equal(pageTitle, "Compare");
    let compareColumns = await $(`div.shop-compare__content th.shop-compare__th`).elements();
    expect(compareColumns).to.have.lengthOf(3);
    expect(await $(`li.shop-compare__header-links__item:first-of-type span.action-link__text`).isVisible()).to.be.true;
    expect(await $(`li.shop-compare__header-links__item:last-of-type span.action-link__text`).isVisible()).to.be.true;
    assert.equal(await $(`li.shop-compare__header-links__item:first-of-type span.action-link__text`).text(), "Copy link");
    assert.equal(await $(`li.shop-compare__header-links__item:last-of-type span.action-link__text`).text(), "Delete all");
    expect(await $(`div.shop-compare__content th.shop-compare__th:nth-of-type(2) i.fas.fa-arrow-right.button__icon`).isVisible()).to.be.true;
    expect(await $(`div.shop-compare__content th.shop-compare__th:nth-of-type(3) i.fas.fa-arrow-right.button__icon`).isVisible()).to.be.true;
} else {
  console.log("Bug detected! Step: 'Click on 'Compare' in the bar at the bottom of the screen' cannot be executed");
}
});

step("Click on 'Delete all' button", async function() {
  if ((await $(`li.breadcrumb__item.breadcrumb__item--active`).text()) === "Compare") {
  	await click($(`li.shop-compare__header-links__item:last-of-type span.action-link__text`));
    expect(await $(`li.shop-list__filter-tags__item`).isDisabled()).to.be.true;
    await click($(`div[data-collapse-id-value="feature-545"]`));
    await click($(`div[data-collapse-id-value="feature-545"] li.shop-filter-options__item:nth-of-type(2) span.control__indicator`));
} else {
  console.log("Bug detected! Step: 'Click on 'Delete all' button' cannot be executed");
  await goto('https://iponcomp.com/shop/group/pc-accessories/gamer-videocard/18215');
} 
});

step("Hover over a product and click on 'Add to cart' button", async function() {
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(3)`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open a.shop-filter-options__show-link:last-of-type`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li[class*="shop-filter-options__item is-hidden"]:last-of-type span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open`));
  await hover($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:first-of-type`));
  await click($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:first-of-type a[title="To cart"]`));
  expect(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.basket-sidebar.js-basket-sidebar.js-state--visible`).isDisabled()).to.be.false;
  expect(await $(`div.spinner-input.basket-card__quantity__input.js-spinner`).isVisible()).to.be.true;
  expect(await $(`a.basket-card__remove`).isDisabled()).to.be.false;
  expect(await $(`div.shop-scroll.shop-scroll--basket`).isDisabled()).to.be.false;
  expect(await $(`a[href="/shop/checkout"]`).isDisabled()).to.be.false;
  expect(await $(`a.basket__full-link`).isDisabled()).to.be.false;
});

step("Click 'Delete all' button to empty the cart", async function() {
  await click($(`a.basket__delete-all-link`));
  let cancelText = await $(`a.basket-card--removed__title-link:last-of-type`).text();
  assert.equal(cancelText, "Cancel");
  await click($(`a.basket__full-link`));
  await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
  await hover((await $(`.menu__link--label`).elements())[1]);
  await click(link('Gamer videocard'));
});


step("Click on subcategory", async function() {
	await hover($(`ul.shop-filter-categories`));
  let chipsetFilters = await $(`li.shop-filter-categories__item`).elements();
  let itemsCountDefault = await $(`div.shop-list__header__item-count`).text();
  await click(chipsetFilters[Math.floor(Math.random() * chipsetFilters.length)]);
  let itemsCountFiltered = await $(`div.shop-list__header__item-count`).text();
  expect(itemsCountDefault >= itemsCountFiltered);
});

step("Scroll to bottom of the page", async function() {
	await scrollTo($(`div.site-footer__header`));
});

step("Click on 'Back to top of the page button'", async function() {
	await click($(`a.site-footer__back-to-top-link.js-site-footer-back-to-top-link`));
  await waitFor(3000);
  expect(await $(`div.shop-list__filters-order--wrapper`).isVisible()).to.be.true;
});


step("Click on first supreme category in breadcrumbs", async function() {
  await focus($(`li.breadcrumb__item.breadcrumb__item--active`));
	let breadcrumbsElements = await $(`li[class*="breadcrumb__item"`).elements();
  expect(breadcrumbsElements.length).to.equal(4);
  let breadcrumbLast = $(`li[class*="breadcrumb__item"]:last-of-type`);
  let breadcrumbParent = $(`li[class*="breadcrumb__item"]:nth-of-type(3)`);
  assert.equal((await (breadcrumbLast).text()), ("Gamer videocard"));
  assert.equal((await (breadcrumbLast).attribute("class")), "breadcrumb__item breadcrumb__item--active");
  assert.equal(await breadcrumbParent.attribute("class"), "breadcrumb__item breadcrumb__item--parent");
  await click($(`li[class*="breadcrumb__item"]:nth-of-type(3)`));
});


step("Click on second supreme category in breadcrumbs (originally first parent category)", async function() {
	let breadcrumbsElements = await $(`li[class*="breadcrumb__item"`).elements();
  expect(breadcrumbsElements.length).to.equal(3);
  let breadcrumbLast = $(`li[class*="breadcrumb__item"]:last-of-type`);
  let breadcrumbParent = $(`li[class*="breadcrumb__item"]:nth-of-type(2)`);
  assert.equal((await (breadcrumbLast).text()), ("PC accessories"));
  assert.equal((await (breadcrumbLast).attribute("class")), "breadcrumb__item breadcrumb__item--active");
  assert.equal(await breadcrumbParent.attribute("class"), "breadcrumb__item breadcrumb__item--parent");
  await click($(`li[class*="breadcrumb__item"]:nth-of-type(2)`));
});

step("Click on third supreme category in breadcrumbs", async function() {
	let breadcrumbsElements = await $(`li[class*="breadcrumb__item"`).elements();
  expect(breadcrumbsElements.length).to.equal(2);
  let breadcrumbLast = $(`li[class*="breadcrumb__item"]:last-of-type`);
  let breadcrumbParent = $(`li[class*="breadcrumb__item"]:first-of-type`);
  assert.equal((await (breadcrumbLast).text()), ("Shop"));
  assert.equal((await (breadcrumbLast).attribute("class")), "breadcrumb__item breadcrumb__item--active");
  assert.equal(await breadcrumbParent.attribute("class"), "breadcrumb__item breadcrumb__item--parent");
  await click($(`li[class*="breadcrumb__item"]:first-of-type`));
  await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
  await hover((await $(`span.menu__link--label`).elements())[1]);
  await click(link('Gamer videocard'));
});


step("Click on hamburger menu icon", async function() {
	await click($(`a.site-nav__hamburger.js-site-nav__hamburger`));
  let hamburgerClass = await $(`a.site-nav__hamburger.js-site-nav__hamburger>div`).attribute("class");
  assert.equal(hamburgerClass, "hamburger hamburger--slider site-nav__hamburger__icon js-site-nav__hamburger__icon is-active");
  let menuClass = await $(`body.is-menu-overlay-visible header nav`).attribute("class");
  assert.equal(menuClass, "main-menu js-main-menu is-open");
  let menuColumns = await $(`ul.main-menu__list`).elements();
  expect(menuColumns.length).to.equal(5);
  let shopColumnItems = await $(`ul.main-menu__list:first-of-type li.main-menu__item`).elements();
  expect(shopColumnItems.length).to.equal(19);
  let secondColumnItems = await $(`ul.main-menu__list:nth-of-type(2) li.main-menu__item`).exists();
  expect(secondColumnItems).to.be.false;
  let extrasColumnItems = await $(`ul.main-menu__list:nth-of-type(3) li.main-menu__item`).elements();
  expect(extrasColumnItems.length).to.equal(2);
  let myProfileColumnItems = await $(`ul.main-menu__list:nth-of-type(4) li.main-menu__item`).elements();
  expect(myProfileColumnItems.length).to.equal(1);
  let otherColumsItems = await $(`ul.main-menu__list:last-of-type li.main-menu__item`).elements();
  expect(otherColumsItems.length).to.equal(5);
});

step("Click again to close hamburger menu", async function() {
	await click($(`a.site-nav__hamburger.js-site-nav__hamburger`));
  let hamburgerClass = await $(`a.site-nav__hamburger.js-site-nav__hamburger>div`).attribute("class");
  assert.equal(hamburgerClass, "hamburger hamburger--slider site-nav__hamburger__icon js-site-nav__hamburger__icon");
});


step("Check default highlights", async function() {
	await scrollTo($(`div.product-list__show-more-button-wrapper`));
  let recommendedDefault = await $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) div[class*="shop-scroll__item u-content-card-hover slick-slide slick-"]`).elements();
  expect(recommendedDefault.length).to.equal(5);
  let carouselRightButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--right`);
  let carouselLeftButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--left`);
  expect(await carouselRightButton.isDisabled()).to.be.false;
  expect(await carouselLeftButton.isVisible()).to.be.false;
});

step("Click right button on the carousel", async function() {
	await click($(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--right`));
  let carouselLeftButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--left`);
  let carouselRightButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--right`);
  expect(await carouselLeftButton.isDisabled()).to.be.false;
  let numberOfHighlighted = (await $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) div[class*="shop-scroll__item u-content-card-hover slick-slide"]`).elements()).length;
  let possibleRightClicks = Math.ceil(numberOfHighlighted/5);
  for (let i = 3; i = possibleRightClicks; i++) {
    if (await carouselRightButton.isVisible() === true){
      await click(carouselRightButton);
    } else {
      break;
    }
  }
  expect(await carouselRightButton.isVisible()).to.be.false;
  expect(await carouselLeftButton.isVisible()).to.be.true;
});


step("Click on left button on the carousel", async function() {
	let carouselLeftButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--left`);
  let carouselRightButton = $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) span.shop-scroll__scroll-btn-overlay.shop-scroll__scroll-btn-overlay--right`);
  let numberOfHighlighted = (await $(`section.shop-section.shop-section--product-list-scroll:nth-child(2) div[class*="shop-scroll__item u-content-card-hover slick-slide"]`).elements()).length;
  let possibleLeftClicks = Math.ceil(numberOfHighlighted/5);
  for (let i = 2; i = possibleLeftClicks; i++) {
    if (await carouselLeftButton.isVisible() === true){
      await click(carouselLeftButton);
    } else {
      break;
    }
  }
  expect(await carouselRightButton.isVisible()).to.be.true;
  expect(await carouselLeftButton.isVisible()).to.be.false;
});

step("Click on PC bulider button", async function() {
	await focus($(`a[title="PC builder"]`));
  await click($(`a[title="PC builder"]`));
  assert.equal((await $(`li.breadcrumb__item.breadcrumb__item--active`).text()).toLowerCase(), " pc builder");
  assert.equal((await $(`span.builder-header__title`).text()).toLowerCase(), "pc builder");
  expect(await $(`a.button.button--secondary.button--lg.button--icon--right.builder-header__button`).exists()).to.be.true;
  let defaultItemCounter = await $(`span.builder__nav-item__counter`).text();
  defaultItemCounter = defaultItemCounter.split("");
  let defaultItemCounterNumbers = [];
  defaultItemCounterNumbers.push(defaultItemCounter[1], defaultItemCounter[2]);
  defaultItemCounterNumbers = parseInt(defaultItemCounterNumbers.join(""));
  let configListElements = await $(`div.content-card--shadow.content-card--hoveranim`).elements();
  assert.equal(defaultItemCounterNumbers, configListElements.length); 
});

step("Click 'start empty' button", async function() {
	await click($(`a.button.button--secondary.button--lg.button--icon--right.builder-header__button`));
  assert.equal(await $(`div.builder-secondary-header div[class="builder-secondary-header__price u-hide@mobile"]`).text(), "0 Ft");
  let numberOfSections = await $(`h3.builder-section__title`).elements();
  expect(numberOfSections.length).to.equal(4);
  let numberOfAddButtons = await $(`a.button.button--secondary.button--icon--right.builder-component__button.builder-component__button--add`).elements();
  expect(numberOfAddButtons.length).to.equal(17);
});


step("Hover over a product card", async function() {
	await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
  await hover((await $(`span.menu__link--label`).elements())[1]);
  await click(link('Gamer videocard'));
  await hover($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:first-of-type div.u-shop-card-hover.js-shop-card-hover a.shop-card__overlay-link`));
  
});

step("Click on the product card (name or pictrue)", async function() {
	await click($(`div.product-list__grid--cards__item.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12.grid-col-xl-2-12:first-of-type div.u-shop-card-hover.js-shop-card-hover a.shop-card__overlay-link`));
  let breadcrumbsElements = await $(`li[class*="breadcrumb__item"]`).elements();
  expect(breadcrumbsElements.length).to.equal(5);
  let productUrl = await currentURL();
  expect(productUrl).to.contain("https://iponcomp.com/shop/product/");
  await goBack();
});

step("Click on minimum button and move it right", async function() {
  let itemsCountDefault = await $(`div.shop-list__header__item-count`).text();
  let lowestPriceDefault = parseInt(await $(`div[data-collapse-id-value="guarantee-month"] div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
	await mouseAction($(`div[data-collapse-id-value="guarantee-month"] .noUi-handle.noUi-handle-lower`), 'press', {x:0,y:0});
  await mouseAction($(`div[data-collapse-id-value="guarantee-month"] .noUi-handle.noUi-handle-lower`), 'move', {x:60,y:0});
  await mouseAction($(`div[data-collapse-id-value="guarantee-month"] .noUi-handle.noUi-handle-lower`), 'release', {x:60,y:0}); 
  let lowestPriceFiltered = parseInt(await $(`div[data-collapse-id-value="guarantee-month"] div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
  itemsCountFiltered = await $(`div.shop-list__header__item-count`).text();
  expect(itemsCountDefault >= itemsCountFiltered);
  assert.notEqual(lowestPriceDefault, lowestPriceFiltered);
});

step("Click on maximum button and move it left", async function() {
	let itemsCountDefault = await $(`div.shop-list__header__item-count`).text();
  let maxPriceDefault = parseInt(await $(`div[data-collapse-id-value="guarantee-month"] div.noUi-handle.noUi-handle-upper`).attribute("aria-valuetext"));
	await dragAndDrop($(`div[data-collapse-id-value="guarantee-month"] div.noUi-handle.noUi-handle-upper`), {left:60});
  let itemsCountFiltered = await $(`div.shop-list__header__item-count`).text();
  let maxPriceFiltered = parseInt(await $(`div[data-collapse-id-value="guarantee-month"] div.noUi-handle.noUi-handle-upper`).attribute("aria-valuetext"));
  assert.notEqual(itemsCountDefault, itemsCountFiltered);
  assert.notEqual(maxPriceDefault, maxPriceFiltered);
});

step("Disable filter", async function() {
  await scrollTo($(`div.site-footer__header`));
  await click($(`a.site-footer__back-to-top-link.js-site-footer-back-to-top-link`));
	await click($(`li.shop-list__filter-tags__item:first-of-type i.fas.fa-times.shop-list__filter-tags__icon`));
});

step("Click on 'notebook search' button", async function() {
  await click($(`a[title="Notebook search"] span.shop-special-button__text`));
	let title = await $(`div.search-notebook__header-title`).text();
  let progressSteps = await $(`li[class*="progress__step js-progress__step"]`).elements();
  assert.equal(title.toLocaleLowerCase(), ("Notebook search").toLocaleLowerCase());
  expect(progressSteps.length).to.equal(4);
  expect(await $(`div.grid-col-1.grid-col-md-4-12.grid-col-lg-3-12`).isVisible()).to.be.true;
  expect(await $(`button.button.button--secondary.button--icon--right`).isVisible()).to.be.true;
  expect(await $(`div.search-notebook__header-buttons a.button.button--secondary-hollow`).isVisible()).to.be.true;
  let progressStepActive = await($(`div.progress__bar.js-progress__bar.progress__bar--current.progress__bar--active-1`).exists());
  expect(progressStepActive).to.be.true;
});

step("Click on 'next' button", async function() {
	await click($(`button.button.button--secondary.button--icon--right`));
  let progressStepActive = await($(`div.progress__bar.js-progress__bar.progress__bar--current.progress__bar--active-2`).exists());
  expect(progressStepActive).to.be.true;
});

step("Choose a manufacturer", async function() {
	await click($(`div.grid-col-1-2.grid-col-md-4-12.grid-col-lg-2-12:nth-of-type(5) a.search-option__link-overlay`));
  await click($(`button.button.button--secondary.button--icon--right`));
});

step("Choose screen size", async function() {
  let progressStepActive = await($(`div.progress__bar.js-progress__bar.progress__bar--current.progress__bar--active-3`).exists());
  expect(progressStepActive).to.be.true;
	let resultCountDefault = await $(`span.search-result__count`).text(); 
  await dragAndDrop($(`div.noUi-handle.noUi-handle-upper`), {left: 100});
  let resultCountFiltered = await $(`span.search-result__count`).text(); 
  expect(resultCountDefault >= resultCountFiltered);
});

step("Choose extras", async function() {
  await click($(`button.button.button--secondary.button--icon--right`));
  let progressStepActive = await($(`div.progress__bar.js-progress__bar.progress__bar--current.progress__bar--active-4`).exists());
  expect(progressStepActive).to.be.true;
  let typesOfFilters = await $(`ul.shop-filter-options.shop-filter-options--nested`).elements();
  expect(typesOfFilters.length).to.equal(28);
  await click($(`button.button.button--secondary.button--icon--right`));
  let notebookUrl = await currentURL();
  expect(notebookUrl).to.contain("https://iponcomp.com/shop/group/notebook-pc/notebook/");
  await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
  await hover((await $(`span.menu__link--label`).elements())[1]);
  await click(link('Gamer videocard'));
});


step("Activate some filters", async function() {
  let numberOfActiveFilters = await $(`li.shop-list__filter-tags__item`).elements();
  expect(numberOfActiveFilters.length).to.equal(1);
	await click($(`div[data-collapse-id-value="brand"] li.shop-filter-options__item:nth-of-type(4) span.control__indicator`));
  let numberOfActiveFiltersOneTriggered = await $(`li.shop-list__filter-tags__item`).elements();
  expect(numberOfActiveFiltersOneTriggered.length).to.equal(2);
  await click($(`div[data-collapse-id-value="feature-38"] li.shop-filter-options__item:first-of-type span.control__indicator`));
  let numberOfActiveFiltersTwoTriggered = await $(`li.shop-list__filter-tags__item`).elements();
  expect(numberOfActiveFiltersTwoTriggered.length).to.equal(3);
});

step("Click 'Delete all' filters button", async function() {
	let itemsCountFiltered = await $(`div.shop-list__header__item-count`).text();
  await focus($(`a.shop-filter-title__clear-link.js-clear-shop-filters`));
  await click($(`a.shop-filter-title__clear-link.js-clear-shop-filters`));
  let itemsCountNoFilters = await $(`div.shop-list__header__item-count`).text();
  assert.notEqual(itemsCountFiltered, itemsCountNoFilters); 
  let numberOfActiveFilters = await $(`li[class="shop-list__filter-tags__item"]`).elements();
  expect(numberOfActiveFilters.length).to.equal(1);
});