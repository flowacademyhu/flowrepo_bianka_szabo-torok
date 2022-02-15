const { openBrowser, goto, $, hover, click, link, below, dragAndDrop, mouseAction, waitFor, closeBrowser, to, scrollDown, focus, } = require("taiko");
const assert = require("assert");
const { Console } = require("console");
const expect = require("chai").expect;
let activeView = "shop-list__layout-select__item is-active";

afterScenario(async()=>{
  await closeBrowser()
});

step("Open browser in headless mode <headless>", async function (headless) {
  let headlessParam = headless.toLowerCase() === "true";
  await openBrowser({ headless: headlessParam });
});

step("Navigate to <page>", async function (page) {
  await goto(page);
});

step("Hover over 'Shop menu' button", async function () {
  await hover($(`span.site-nav__shop-menu.js-shop-menu-trigger`));
});

step("Hover over 'PC accessories' button", async function () {
  await hover((await $(`.menu__link--label`).elements())[1]);
});

step("Click on <gvc> category", async function (gvc) {
  await click(gvc);
  let classNameCardView = await $(`a[title="Card view"]`).attribute("class");
  expect(classNameCardView).to.equal(activeView);
  expect(await $(`li.shop-list__filter-tags__item`).isDisabled()).to.be.false
});

step("Hover over first product to see available webshop options", async function() {
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
  let classNameListView = await $(`a[title="List view"]`).attribute("class");
  expect(classNameListView).to.equal(activeView);
  let quantity = await $(`div.spinner-input.shop-card--list__quantity__input.js-spinner`).element(0)
  expect(await quantity.isVisible()).to.be.true
  let addToCartButton = await $(`a.shop-to-cart-button.shop-to-cart-button--lg.shop-card--list__cart`).element(0)
  expect(await addToCartButton.isVisible()).to.be.true
});

step("Click on 'Card view' icon", async function () {
  await click($(`a[title="Card view"]`));
  let classNameCardView = await $(`a[title="Card view"]`).attribute("class");
  expect(classNameCardView).to.equal(activeView);
});

step("Click on minimum side button of the slider and move it right", async function() {
  let itemsCountTextDefault = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountDefault = [];
  itemsCountDefault.push(itemsCountTextDefault[1], itemsCountTextDefault[2], itemsCountTextDefault[3]);
  itemsCountDefault = parseInt(itemsCountDefault.join("")); //rows 73-77: Storing itemcount and price sliders lowest price in variables before any change.
  let lowestPriceDefault = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'press', {x:0,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'move', {x:60,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'release', {x:60,y:0}); //For some reason, dragAndDrop didn't work for the left side
  let lowestPriceString = await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext");
  let lowestPriceFiltered = parseInt(lowestPriceString);
  let itemsCountTextFiltered = (await $(`div.shop-list__header__item-count`).text()).split("");
  let itemsCountFiltered = [];
  itemsCountFiltered.push(itemsCountTextFiltered[1], itemsCountTextFiltered[2], itemsCountTextFiltered[3]);
  itemsCountFiltered = parseInt(itemsCountFiltered.join("")); //rows 81-86: Storing itemcount and price sliders lowest price in variables after minimum slider is moved right.
  expect(lowestPriceFiltered > lowestPriceDefault).to.be.true;
  expect(itemsCountFiltered <= itemsCountDefault).to.be.true; // we expect changes in itemcount and lowest price, altough there is chance that itemcount won't change in some cases. 
  expect(await (await $(`li.shop-list__filter-tags__item`).element(0)).isVisible()).to.be.true; //pricefilter tag is expected to appear in the header of the page.
  let lowestPriceFilteredString = lowestPriceFiltered.toString();
  let filteredMimimumPriceString = (await(await $(`li.shop-list__filter-tags__item`).element(0)).text());
  let filteredMimimumPriceNoSpaces = filteredMimimumPriceString.replace(/\s+/g, '');
  expect(filteredMimimumPriceNoSpaces).to.include(lowestPriceFilteredString); //rows 90-93: we check if slider input price matches slider filter tag price 
}); 

step("Click on maximum side of the slider and move it left", async function() { //assertions are the same as at minimum side slider change
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
  expect (highestPriceDefault > highestPriceFiltered).to.be.true
  expect(itemsCountFiltered <= itemsCountDefault).to.be.true;
  expect(await (await $(`li.shop-list__filter-tags__item`).element(0)).isVisible()).to.be.true;
  let highestPriceFilteredString = highestPriceFiltered.toString();
  let filteredMaximumPriceString = (await(await $(`li.shop-list__filter-tags__item`).element(0)).text());
  let filteredMaximumPriceStringNoSpaces = filteredMaximumPriceString.replace(/\s+/g, '');
  expect(filteredMaximumPriceStringNoSpaces).to.include(highestPriceFilteredString);
});

step("Click on 'Manufacturer' button to see the dropdown list", async function() {
	await click(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control`).element(1));
  let manufacturersArray = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li[class="shop-filter-options__item"]`).elements());
  expect(manufacturersArray).to.have.lengthOf(5); //checks if there is a limited number (5) of manufacturers in the dropdown, before we click on "show all" button
  expect(await $(`div.dropdown-control__dropdown.js-dropdown-control-dropdown ul.shop-filter-options-toggle`).isVisible()).to.be.true; //checks if "show all button is visible"
  expect(await $(`div.dropdown-control__dropdown.js-dropdown-control-dropdown input[type="checkbox"]`).isVisible()).to.be.true; //checks if checkboxes are visible
});

step("Click on 'Show all' button", async function() {
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open a.shop-filter-options__show-link`)); 
  let dropdown = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(2) ul:first-of-type`).attribute("class"));
  expect(dropdown).to.equal("shop-filter-options shop-filter-options--nested is-show-all");
  //row 127-129: checks if "Show all" is activated
  expect(await $(`div.shop-list__filters-order--wrapper div.shop-list__filter.dropdown-control.js-dropdown-control.is-open input[placeholder="Filter..."]`).isVisible()).to.be.true
  //row130 checks if filter inputfield is visible
  await hover($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`))
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`).isVisible()).to.be.true
  //row132-133: checks if "less" button is visible
});

step("Click on a checkbox than another checkbox", async function() {
  let itemsCountDefault = await ($(`div.shop-list__header__item-count`).text());
  await hover($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(4) span.control__indicator`))
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(10) span.control__indicator`));
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`).text()); //rows 139-141: checks if checkboxes are clickable with multiple checkbox clicked
  expect(itemsCountDefault).to.not.equal(itemsCountFiltered) // checks if itemscount changed after filtering by checkboxes
});


step("Click on 'Pickup' button", async function() {
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(3)`));
  let pickupArray = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li[class="shop-filter-options__item"]`).elements());
  expect(pickupArray).to.have.lengthOf(5); //checks if there is a limited number (5) of manufacturers in the dropdown, before we click on "show all" button
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open ul.shop-filter-options-toggle`).isVisible()).to.be.true; //checks if "show all button is visible"
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open span.control__indicator`).isVisible()).to.be.true; //checks if checkboxes are visible
});

step("Click on 'Show all' button in 'Pickup' filter", async function() {
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open a.shop-filter-options__show-link`)); 
  let dropdown = (await $(`div.shop-list__filter.dropdown-control.js-dropdown-control:nth-of-type(3) ul:first-of-type`).attribute("class"));
  expect(dropdown).to.equal("shop-filter-options shop-filter-options--nested is-show-all");
  //row 156-158: checks if "Show all" is activated
  expect(await $(`div.shop-list__filters-order--wrapper div.shop-list__filter.dropdown-control.js-dropdown-control.is-open input[placeholder="Filter..."]`).isVisible()).to.be.true
  //row 161 checks if filter inputfield is visible
  await hover($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`))
  expect(await $(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item.shop-filter-options__item--show-less`).isVisible()).to.be.true
  //row 162-163: checks if "less" button is visible;
});


step("Click on a checkbox than another checkbox in 'Pickup filter'", async function() {
	let itemsCountDefault = await ($(`div.shop-list__header__item-count`).text());
  await hover($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(2) span.control__indicator`))
	await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(6) span.control__indicator`));
  await click($(`div.shop-list__filter.dropdown-control.js-dropdown-control.is-open li.shop-filter-options__item:nth-of-type(8) span.control__indicator`));
  let itemsCountFiltered = await ($(`div.shop-list__header__item-count`).text()); //rows 170-172: checks if checkboxes are clickable with multiple checkbox clicked
  expect(itemsCountDefault).to.not.equal(itemsCountFiltered) // checks if itemscount changed after filtering by checkboxes;
});

