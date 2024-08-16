Feature: Add Product to Cart and CheckOut



Scenario: Add Product to Cart and CheckOut
Given Load application url
 When Search "Apple iPhone 13 (128GB)" product on application
 And Select Midnight color
 And Add Item to cart 
 Then verify item in cart
 Then Procced to CheckOut
 Then Submit the payment

 Scenario: Add Product to Cart and CheckOut
Given Load application url
 When Search "No Such Item" product on application
 And Select Midnight color
 And Add Item to cart 
 Then verify item in cart
 Then Procced to CheckOut
 Then Submit the payment

