const { openBrowser, goto, $, hover, click, link, below, dragAndDrop, mouseAction, waitFor, } = require("taiko");
const assert = require("assert");
const { Console } = require("console");
const expect = require("chai").expect;
let activeView = "shop-list__layout-select__item is-active";

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
  itemsCountDefault = parseInt(itemsCountDefault.join(""));
  let lowestPriceDefault = parseInt(await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext"));
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'press', {x:0,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'move', {x:60,y:0});
  await mouseAction($(`div[data-collapse-id-value="price"] .noUi-handle.noUi-handle-lower`), 'release', {x:60,y:0});
  let lowestPriceString = await $(`aside.sidebar-layout__side.sidebar-layout__side--border.shop-filter-sidebar.js-shop-filter-sidebar div.noUi-handle.noUi-handle-lower`).attribute("aria-valuetext");
  let lowestPriceFiltered = parseInt(lowestPriceString);
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
  expect (highestPriceDefault > highestPriceFiltered).to.be.true
  expect(itemsCountFiltered <= itemsCountDefault).to.be.true;
  expect(await (await $(`li.shop-list__filter-tags__item`).element(0)).isVisible()).to.be.true;
  let highestPriceFilteredString = highestPriceFiltered.toString();
  let filteredMaximumPriceString = (await(await $(`li.shop-list__filter-tags__item`).element(0)).text());
  let filteredMaximumPriceStringNoSpaces = filteredMaximumPriceString.replace(/\s+/g, '');
  expect(filteredMaximumPriceStringNoSpaces).to.include(highestPriceFilteredString);
});