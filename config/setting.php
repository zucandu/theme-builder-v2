<?php 
return [
    'price_ranges' => ['0.1-1', '1-5', '5-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100', 
        '100-120', '120-140', '140-160', '160-180', '180-200', '200-220', '220-240', '240-260', '260-280', '280-300', 
        '300-350', '350-400', '400-450', '450-500', '500-550', '550-600', '600-650', '650-700', '700-750', '750-800', 
        '800-850', '850-900', '900-950', '950-1000', '1000-1500', '1500-2000', '2000-2500', '2500-3000', '3000-3500',
        '3500-4000', '4000-4500', '4500-5000', '5000-5500', '5500-6000', '6000-6500', '6500-7000', '7000-7500', '7500-8000', '8000-8500', 
        '8500-9000', '9000-9500', '9500-10000'],
    'ratings' => [1, 2, 3, 4, 5],
    'rating_text' => [1 => 'Bad', 2 => 'Average', 3 => 'Good', 4 => 'Excellent'],
    'countries_with_tax_rates_by_zip_code' => ['US'],
    'countries_with_tax_rates_by_state' => ['CA'],
    'number_of_items_per_block' => 4,
    'meta_tags' => [
        [
            'pagename' => 'index',
            'path' => '/',
            'meta_title' => 'Earn extra income while you sleep | Deepplusplus',
            'meta_description' => 'Learn how Deepplusplus can fuel your business with all the capabilities of enterprise ecommerce—without the cost or complexity.',
        ],
        [
            'pagename' => 'login',
            'path' => 'login',
            'meta_title' => 'Log In Deepplusplus',
            'meta_description' => 'Log In Deepplusplus',
        ],
        [
            'pagename' => 'register',
            'path' => 'register',
            'meta_title' => 'Start your free trial of Deepplusplus',
            'meta_description' => 'Try Deepplusplus free and start a business or grow an existing one. Get more than ecommerce software with tools to manage every part of your business.',
        ],
        [
            'pagename' => 'password_forgotten',
            'path' => 'forgot-password',
            'meta_title' => 'Reset your password',
            'meta_description' => 'Enter your email address to reset your password.',
        ],
        [
            'pagename' => 'account',
            'path' => 'account',
            'meta_title' => 'My account',
            'meta_description' => 'Manager your data like orders, profile, billing or shipping address.',
        ],
        [
            'pagename' => 'cart',
            'path' => 'cart',
            'meta_title' => 'Shopping cart',
            'meta_description' => 'Show all products added to your cart.',
        ],
        [
            'pagename' => 'checkout',
            'path' => 'checkout',
            'meta_title' => 'Checkout',
            'meta_description' => 'After you\'ve reviewed the items in your Shopping Cart, proceed to checkout to complete your order.',
        ],
        [
            'pagename' => 'logout',
            'path' => 'logout',
            'meta_title' => 'Log out - see you soon',
            'meta_description' => 'Log out - see you soon',
        ],
        [
            'pagename' => 'contact_us',
            'path' => 'contact-us',
            'meta_title' => "We're here to help",
            'meta_description' => 'Our sales and support teams are available via phone, live chat and email. ',
        ],
        [
            'pagename' => 'track_order',
            'path' => 'track-order',
            'meta_title' => 'Tracking your shipment',
            'meta_description' => 'Enter your order reference then you will see all of the shipment.',
        ],
        [
            'pagename' => 'blog',
            'path' => 'blog',
            'meta_title' => 'Ecommerce Marketing Blog - Ecommerce News',
            'meta_description' => 'A blog about ecommerce marketing, running an online business and updates to Deepplusplus\'s ecommerce community.',
        ],
        [
            'pagename' => 'account_profile',
            'path' => 'account/profile',
            'meta_title' => 'My Account - Profile',
            'meta_description' => 'Provides personal information about the entity that created the store account.',
        ],
        [
            'pagename' => 'account_orders',
            'path' => 'account/orders',
            'meta_title' => 'My Account - Orders',
            'meta_description' => 'The Order History tab allows users to view the details of their past orders and print invoices.',
        ],
        [
            'pagename' => 'account_order_list',
            'path' => 'account/orders/list',
            'meta_title' => 'My Account - Orders',
            'meta_description' => 'The Order History tab allows users to view the details of their past orders and print invoices.',
        ],
        [
            'pagename' => 'account_password',
            'path' => 'account/password',
            'meta_title' => 'My Account - Change your password',
            'meta_description' => 'Reset your password to keep your account safe.',
        ],
        [
            'pagename' => 'account_address_book',
            'path' => 'account/address-book',
            'meta_title' => 'My Account - Address Book',
            'meta_description' => 'The address book contains the customer\'s default billing and shipping addresses, and any additional addresses that they frequently use.',
        ],
        [
            'pagename' => 'account_address_book_details',
            'path' => 'account/address-book/details',
            'meta_title' => 'My Account - Update your address',
            'meta_description' => 'Update your name, billing information, or shipping information for a tax invoice directly in your store account.',
        ],
        [
            'pagename' => 'account_address_book_add_new',
            'path' => 'account/address-book/add-new-address',
            'meta_title' => 'My Account - Add new address',
            'meta_description' => 'Add a new address or use an existing one from the customer account.',
        ],
        [
            'pagename' => 'track_order_form',
            'path' => 'track-order/form',
            'meta_title' => 'Tracking your shipment',
            'meta_description' => 'Enter your order reference then you will see all of the shipment.',
        ],
        [
            'pagename' => 'blog_posts',
            'path' => 'blog/posts',
            'meta_title' => 'Blog posts',
            'meta_description' => 'A blog about ecommerce marketing, running an online business and updates to Deepplusplus\'s ecommerce community.',
        ],
        [
            'pagename' => 'page_not_found',
            'path' => 'page-not-found',
            'meta_title' => 'Page not found',
            'meta_description' => "We couldn't find any matches for your keyword",
        ],
        [
            'pagename' => 'account_address_book_edit',
            'path' => 'account/address-book/edit',
            'meta_title' => 'My Account - Edit address',
            'meta_description' => "Change your address information for contact, shipping, and payment.",
        ],
        [
            'pagename' => 'return_exchange_form',
            'path' => 'return-exchange/form',
            'meta_title' => 'Returns & Exchanges',
            'meta_description' => "We will happily accept a return for a full refund within 30 days of purchase date. All we ask is that you send the items back to us in the original packaging and make sure that the products are in the same condition as when you receive.",
        ],
        [
            'pagename' => 'return_exchange_process',
            'path' => 'return-exchange',
            'meta_title' => 'Returns & Exchanges - Select your item(s)',
            'meta_description' => "Please select your items that need to be returned, we will issue a pre-paid return label to the email address associated with your order.",
        ],
        [
            'pagename' => 'store_signup_create',
            'path' => 'store-signup/create',
            'meta_title' => 'Create your store',
            'meta_description' => "Enter the name of the store that you want to register your business on the internet.",
        ],
        [
            'pagename' => 'store_signup_setup',
            'path' => '/store-signup/setup',
            'meta_title' => 'Your store is being setup...',
            'meta_description' => "Your store is being set up...",
        ],
        [
            'pagename' => 'account_order_details',
            'path' => '/account/orders/details',
            'meta_title' => 'Order details',
            'meta_description' => "You can check order status, track a delivery, view pickup details.",
        ],
        [
            'pagename' => 'account_wishlist',
            'path' => 'account/wishlist',
            'meta_title' => 'My Wishlist: Create a wishlist for birthday, Christmas & more',
            'meta_description' => "Create your online wishlist here. For any occasion. Add items from any store. Invitees can reserve gifts. It's easy.",
        ],
        [
            'pagename' => 'account_quick_reorder',
            'path' => '/account/quick-reorder',
            'meta_title' => 'Quick Reorder',
            'meta_description' => "Easily order all the products you have purchased in previous orders with the quick ordering feature.",
        ],
    ]
];