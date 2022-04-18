Feature: Category subpages are available at iponcomp.com, where products get listed according to the given category.

    #browser used: <Google Chrome>

    Note: 'Gamer videocard' subpage is actually 'videocard' subpage with 'gamer' filter activated.

    #000

    #000.01
    Scenario: Category subpages can be reached from homepage
        Given I am on iponcomp.com homepage
        When I move the mouse over 'Shop menu' button
        Then I should see a list of available subcategories

    #000.02
    Scenario: Subcategories can be chosen from 'Shop menu' list
        Given I am on iponcomp.com homepage, shop menu is open
        When I move the mouse over PC accesories
        Then I should see a list of further subcategories, Gamer videcard is among them

    #000.03

    Scenario: Subcategories can be chosen from 'Shop menu' list
        Given I am on iponcomp.com homepage, shop menu is open, PC accesories subcategory is open
        When I click on 'Gamer videocard' subcategory
        Then a loading screen should appear
        And Video card category page should be seen
        And 'Gamer' filter should be active

    #001

    Scenario Outline: There are three view options on the list by category page
        Given I am at 'Gamer videocard' category page
        And 'card' view is default
        When I click on any of the other two view options ('detailed' and 'list')
        Then I should see the productlist in the chosen view
        And I should see the same <options> for each product
        Examples:
            | options                            |
            | add to basket                      |
            | number of products added to basket |
            | compare                            |

    #002

    Scenario: There is a 'Price' slider filter on the category page
        Given I am on category page
        When I move the minimum side of the slider
        And I move the maximum side of the slider
        Then price counters change as the slider buttons move
        And a loading icon appears inside the filter, next to the word price
        And the list of products gets filtered according to the modified minimum price
        And a clickable filter tag appears on top of the page, under the name of the category

    Test note: users can change the price manually either in the price input field, or in the URL of the page


    #003

    #003.01
    Scenario: There is a 'Manufacturer' filter on the category page
        Given I am on category page
        When I click on manufacturer button
        Then a dropdown menu appears with limited numbers of available manufacturers, each with a checkbox
        And a show all button with blue font color is shown


    #003.02
    Scenario: 'Manufacturer' filter with limited number of manufacturers
        Given I am on category page, manufacturer filter is open with limited manufacturers
        When I click on 'Show all' button
        Then all available manufacturers appear in a bubble
        And a search field is shown inside the bubble, so I am able to search among manufacturers
        And a 'Less' button is shown

    #003.03
    Scenario: 'Manufacturer' filter with all possible manufacturers
        Given I am on category page, manufacturer filter is open with all available manufacturers
        When I click on a checkbox
        Then the checkbox becomes purple with a white tik inside of it
        And a loading icon appears next to the name of the manufacturer
        And the list of products gets filtered by the chosen manufacturer
        And multiple manufacturer checkboxes are clickable

    #004

    #004.01
    Scenario: Filtering by 'Pickup' date (expected delivery) is available
        Given I am on category page
        When I click on 'Pickup' button
        Then a dropdown menu appears with limited numbers of available pickup dates, each with a checkbox
        And a show all button with blue font color is shown

    #004.02
    Scenario: 'Pickup' filter with limited number of pickup dates
        Given I am on category page, pickup filter is open with limited pickup dates
        When I click on 'Show all' button
        Then all available pickup dates plus 'Hide B2B items' option appear in a bubble, each with a checkbox
        And a search field is shown inside the bubble, so I am able to search among dates
        And a 'Less' button is shown

    #004.03
    Scenario: 'Pickup' filter with all possible pickup dates
        Given I am on category page, pickup filter is open with all available pickup dates
        When I click on a checkbox
        Then the checkbox becomes purple with a white tik inside of it
        And a loading icon appears next to the date
        And the list of products gets filtered by the chosen date
        And multiple pickup date checkboxes are clickable

    Test note: Price, manufacturer and pickup filters are available at two places: top part of the page, above product listing and on the left side of the page,
    under the list of subcategories

    #005

    #005.01
    Scenario: There is an 'Order' menu on the category page
        Given I am on category page
        When I click on Order button
        Then a dropdown menu appears with a list of ordering options

    #005.02
    Scenario Outline: There is an 'Order' menu on the category page
        Given I am on category page, I previously clicked on Order and see the dropdown list
        When I click on <order> ordering option
        Then I should see the same ammount of products in the chosen order
        Examples:
            | order           |
            | popular first   |
            | cheap first     |
            | expensive first |
            | newest first    |
            | discount        |

    Test note: Ordering options also appear in the URL, order name is in hungarian so that only hungarian order names work if I change it in the URL

    #006

    Scenario: There is a 'Search in category' search field on the category field page
        Given I am on category page
        When I click in the search field
        And Type a keyword in the field
        And press Return key
        Then a loading icon appears at the end of the search field
        And I should see products that contain the given keyword

    #007

    Scenario Outline: There are multiple yes/no/all radiobutton filters on the category page
        Given I am on the category page
        When I click on <filter> dropdown filter menu
        And I click on  one of the three radio options inside the filter
        Then I should see a list of products that match the chosen filter and subfilter
        Examples:
            | filter     |
            | VGA/D-SUB  |
            | DVI        |
            | Mini HDMI  |
            | Micro HDMI |
            | LHR        |
            | Silent     |

    #008

    #008.001
    Scenario: There is a pagination feature on the bottom of the category page product list
        Given I am on category page, 1st page of 3
        When I scroll down to the bottom of the product list
        And I click on 'next page' button
        Then I should see the next 36 products
        And the page counter should change to number 2/3
        And A 'previous page' button should appear
        And a seperate 'Next 36 products' button is shown

    #008.002
    Scenario: There is a pagination feature on the bottom of the category page product list
        Given I am at the bottom of the product list, on the 2nd page
        When I click on 'next page' button
        Then the page counter shows page 3/3
        And 'next page' button turns grey and unclickable
        And 'Next 36 product' button is not shown

    #008.003 (Possible bug)
    Scenario: There is a pagination feature on the bottom of the category page product list
        Given I am at the bottom of the product list, there are 3 pages by default, 'Gamer' filter is active
        When I change the page number in the URL to a number greater than 3
        Then page counter shows the given number /3 f.e.: 5/3
        And no products are listed on pages greater than 3

    #009

    #009.01
    Scenario: There is a compare products option on the category page
        Given I am on gamer video card category page
        When I move the mouse cursor over a product
        And click on the checkbox in front of 'Compare'
        And I do the same with another product
        Then a white bar should appear at the bottom of the screen. The bar shows the chosen products
    with the productname, a product picture, an X to delete the product from compare,
    two more free spaces for additional products and a compare button

    #009.002
    Scenario: Users can compare products listed on the category page
        Given I am on category page, I have chosen 2 products to compare
        When I click on Compare button
        Then I should see the compare page of the chosen products with details of the products
        And I should see add to cart buttons for each product
        And a 'Copy link' button with an icon showing two chainlinks should be visible
        And a 'Delete all' button with an icon showing a trashbin should be visible

    Test note: Users can use the Compare checkbox at any products,
    but only 4 (first 4) products are shown on the compare page

    #010

    Scenario: Products can be added to cart from the list of products at category page
        Given I am on gamer video card category page
        When I move my mouse over a product
        And I click on the 'To cart' button
        Then a screen with cart contents should be shown
        And content of the cart should be changable by number of products, delete product(s),
        adding more products from recommended products carousel
        And a 'purchase' button is shown
        And 'check full cart' button is shown

    #011

    Scenario: Subcategories can be used on category page
        (subcategories are chipset manufacturers at video card subpage)
        Given I am on video card category page, gamer filter is active,
        subcategory buttons are on the left side of the page
        When I click on a subcategory
        Then A loading icon appears next to the name of the subcategory
        And Products according to the chosen subcategory and 'gamer' filter should be shown
        But choosing a subcategory disables gamer filter

    #012

    Scenario: 'Back to top of the page' button is available on the category page
        Given I am on card category page
        When I scroll down to the bottom of the page
        And I click on the 'back to top' button
        Then I should get back to the top of the category page

    #013

    Scenario Outline: Breadcrumbs sitemap option is available at the top of the category page
        Given I am on the video card category page
        When I click on a supreme category <category> in the breadcrumbs
        Then I should see the chosen subpage <subpage> of iponcomp.com
        And I should be able to go back to the previous <previous> page I started from
        Examples:
            | category | subpage        | previous      |
            | shop     | pc accessories | videocard     |
            | ipon     | shop           | pc accesories |
            |          | iPon           | shop          |

    #014

    Scenario: Hamburger menu is available on the top of category page
        Given I am on video card category page
        When I click on the hamburger menu icon
        Then a sitemap should appear with a list of possible clickable options
        But not every option is visible
        But I should be able to scroll down to see every option

    #015

    Scenario: Highlighted products are shown on category page
        Given I am at the bottom of video card category page, I see 5 of the highlighted products in a carousel
        When I click on the next button, which is an icon with a white arrow in purple background on the right side of the carousel
        Then I should see the next 5 highlighted products
        And a 'previous' button should appear in the left side of the carousel

    #016

    Scenario: There is a 'PC builder' option on the video card category page
        Given I am on video card category page
        When I click on the 'PC builder' button
        Then I should see the PC builder subpage
        And I can add components to the build
        And I can start a new assembly

    #017

    Scenario: Product pages can be reached from category page
        Given I am on category page
        When I click on a product tile (name or product picture)
        Then I should see a loading icon in the browser tab
        And I should be directed to the product page of the chosen product

    #018

    #018.01
    Scenario: Warranty slider filter is available on the left side of category page
        Given I am on category page
        When I click on the minimum slider button
        And move the button right
        Then a loading icon should appear
        And warranty month counter should change as the button moves
        And products should get filtered

    #018.02
    Scenario: Warranty slider filter is available on the left side of category page
        Given I am on category page at warranty slider, minimum slider is not on default
        When I click on the maximum slider button
        And move the button left
        Then a loading icon should appear
        And warranty month counter should change as the button moves
        And products should get filtered

    Test note: Slider type filters work proprely, counters cannot be modified to an invalid value manually or from URL

    #019

    Scenario: There is a notebook search option on the category page
        Given I am on video card category page
        When I click on 'Notebook search' button
        Then I should see a loading icon in the browser tab
        And I should get directed to notebook search page

    #020
    Scenario: All active filters can be deactivated by 'Delete all' button
        Given I am on video card category page, multiple filters are active
        When I click on 'delete all' button next to 'Filter'
        Then a loading icon should appear next to 'Filter'
        And all filters should get deactivated
        And all products that belong to 'video card' category should be shown in a list
