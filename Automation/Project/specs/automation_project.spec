# Testing of iponcomp.com category page
Category subpages are available at iponcomp.com, where products get listed according to the given category. 
There are multiple options to set for the user to see the productlist in a specific way desired.

The first action in this test (and before every scenario) is to open a browser and navigate to iponcomp.com-s 'Gamer videocard' category page.

Note: 'iponcomp.com' is the english language version of 'ipon.hu'

* Opening a browser, and navigating to iponcomp.com gamer videocard subpage

## Checking out view options
* Hover over first product to see available webshop options
* Click on 'Detailed view' icon
* Click on 'List view' icon
* Click on 'Card view' icon

In this scenario, our test checks if the chosen view option is activated or not, and checks if products has the same options (compare, cart quantity, add to cart) on each view.
According to specification, list view has no compare option, so it is not a bug not to have a compare button with list view, therefor it is not checked either.

## Testing price slider
* Click on minimum side button of the slider and move it right
* Click on maximum side of the slider and move it left

In this scenario, our test checks price slider filter on desktop fullscreen windowsize. The filter is located on the left side of the page. 
The test checks if filtering actually happens when the user moves the minimum and maximum buttons, and if filter prices equal filter tag prices. 
Filter tag appears when one of the slider buttons are moved, and changes according to the sliders movements. 

## Manufacturer Filter
* Click on 'Manufacturer' button to see the dropdown list
