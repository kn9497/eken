<USER_REQUEST>
# Product Image and Description Alignment — Implementation Instructions for Antigravity

## Objective

Resolve the product image and description mismatches in the existing furniture marketplace by replacing the current `Gemini` image folder with the new `Gemini 2` folder and accurately mapping every product image to its corresponding product ID, name, price, and description.

## Background

The existing product catalog has several inconsistencies:

* Product images do not match their descriptions.
* Primary and secondary images sometimes show different products.
* Product names, descriptions, and prices are incorrectly assigned to certain products.

For example, a sofa listing may display a table as its secondary image. These inconsistencies must be corrected without changing the existing product identities or disrupting the marketplace.

## Implementation Tasks

### 1. Replace the Image Source

* Locate the existing `Gemini` folder in the project.
* Identify the new `Gemini 2` folder containing the corrected product images.
* Replace the existing `Gemini` image assets with the corresponding images from `Gemini 2`.
* Preserve the existing project structure and naming conventions wherever possible.
* Do not delete unrelated assets or modify other parts of the project.

### 2. Match Images to Product IDs

The images in `Gemini 2` are organized using a sequential naming convention:

* `P1` = Product 1's primary image.
* `P1 (2)` = Product 1's secondary image.
* `P2` = Product 2's primary image.
* `P2 (2)` = Product 2's secondary image.

Apply this convention consistently across the entire product catalog.

For every product:

* Identify its existing product ID and product name.
* Match the correct primary and secondary images.
* Ensure both images depict the same product.
* Preserve the original product ID and its relationship to the database.
* Do not assign images based solely on their position in the folder.

### 3. Correct Product Descriptions and Pricing

Use the product descriptions provided below as the authoritative reference.

For each product, verify that:

* The product name matches the actual item shown in the images.
* The description accurately reflects the product's design, materials, dimensions, and features, wherever specified.
* The price is assigned to the correct product.
* The primary and secondary images correspond to the same product.
* No product description, price, or image is accidentally assigned to another product.

Do not invent product specifications, dimensions, materials, or prices. If information is missing or ambiguous, preserve the existing value and flag it for review rather than guessing.

## Validation Requirements

Before completing the task, verify the following:

1. Every listed product has the correct primary image.
2. Every listed product has the correct secondary image, where available.
3. Both images depict the same product.
4. Product names, IDs, descriptions, and prices are correctly aligned.
5. Existing product functionality, including product cards, detail pages, filters, and cart operations, remains intact.
6. No unrelated files, product records, or application features have been modified.
7. No broken image paths or missing assets remain.

## Execution Guidelines

* First inspect the existing project structure, product data, and image references.
* Create a mapping between existing product IDs and the new images before making changes.
* Implement the image and product data corrections using the existing architecture.
* Avoid unnecessary refactoring or redesign.
* After implementation, run the application and verify the corrected product listings and detail pages.

## Expected Outcome

A consistent and accurate product catalog in which every product ID displays the correct images, name, description, and price, with no cross-product mismatches.

## Product Descriptions

[Insert the complete existing product descriptions here. Use them as the source of truth for product names, descriptions, and prices.]
 ----------------------------------------------------------------------------------------------------------product description ---------------------------------------------------------. I. Living Room & Accent Seating Collection
Product 1: Eken Narmada Sideboard
Category & Type: Living Room / Credenza & Storage

Description: Minimalist credenza in solid Sheesham wood with an amber walnut finish. Features four doors with hand-carved vertical ribbed fluting and inlaid aged brass strips, supported by a tapered wooden leg chassis with cross-bracing.

Dimensions: 64" W × 18" D × 34" H (
162.5 cm×45.7 cm×86.4 cm)

Materials Used: Solid Sheesham Wood (Amber Walnut finish), Aged Brass Inlays.

Regular Price: ₹68,000 ($890 USD)

Discounted Price: ₹62,000 ($810 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Narmada Sideboard, 64-inch modern credenza, solid Sheesham wood in dark amber walnut finish, 4 cabinet doors with vertical ribbed fluting and inlaid aged brass vertical strips, tapered wooden leg chassis, warm plaster background, 4:5 vertical aspect ratio.
Product 2: Eken Betwa Accent Stool
Category & Type: Living Room / Accent Stool & Ottoman

Description: Cylindrical drum stool with a smooth solid mango wood top disc, a main body wrapped in natural handwoven rattan cane lattice, and a base ring detailed with vertical fluted carving.

Dimensions: 16" Diameter × 18" Height (
40.6 cm Dia×45.7 cm H)

Materials Used: Solid Mango Wood (Natural Amber finish), Natural Rattan Cane.

Regular Price: ₹16,500 ($215 USD)

Discounted Price: ₹14,500 ($190 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Betwa Accent Stool, cylindrical drum stool, solid natural mango wood top disc, body wrapped in fine handwoven natural rattan cane lattice, base ring with vertical fluted carving, studio setting, 4:5 ratio.
Product 3: Eken Ken Two-Seater Sofa
Category & Type: Living Room Seating / Compact 2-Seater Sofa

Description: Mid-century Scandinavian sofa with an exposed light teak mango wood frame, natural woven rattan cane side arm panels, and deep forest green linen seat and back cushions.   
watermarked_img_14369196651993224921.png

Dimensions: 62" W × 32" D × 31" H (
157.5 cm×81.3 cm×78.7 cm)

Materials Used: Solid Mango Wood (Light Teak finish), Rattan Cane, Forest Green Linen.   
watermarked_img_14369196651993224921.png

Regular Price: ₹62,000 ($810 USD)

Discounted Price: ₹54,000 ($710 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Ken Two-Seater Sofa, exposed light teak mango wood frame, side arm panels inset with natural woven rattan cane, plush deep forest green linen cushions, living room studio context, 4:5 ratio.
Product 4: Eken Indus Lounge Chair
Category & Type: Living Room / Low-Profile Accent Chair   
watermarked_img_5636323783504522947.png

Description: Low-slung lounge chair built from sculpted natural teak, featuring natural saddle leather support straps and removable cushions upholstered in terracotta and beige geometric block-print textile.   
watermarked_img_5636323783504522947.png
+ 1

Dimensions: 30" W × 34" D × 29" H (
76.2 cm×86.4 cm×73.7 cm)

Materials Used: Solid Indian Teak Wood, Saddle Leather Straps, Terracotta/Beige Block-Print Fabric.   
watermarked_img_5636323783504522947.png
+ 1

Regular Price: ₹44,000 ($575 USD)

Discounted Price: ₹38,000 ($500 USD)   
watermarked_img_5636323783504522947.png

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Indus Lounge Chair, low-profile lounge seating, sculpted natural teak wood frame, seat supported by natural leather straps, terracotta and beige geometric block-print woven textile cushions, high-end studio photography, 4:5 ratio.
Product 5: Eken Narmada Accent Chair
Category & Type: Living Room / Club Armchair   
watermarked_img_13671941871302793615.png

Description: Club armchair featuring an exposed amber walnut mango wood frame, natural woven rattan cane side arm inserts, and olive green velvet cushioning.   
watermarked_img_13671941871302793615.png
+ 1

Dimensions: 29" W × 31" D × 32" H (
73.7 cm×78.7 cm×81.3 cm)

Materials Used: Solid Mango Wood (Amber Walnut finish), Natural Rattan Cane, Olive Green Velvet.   
watermarked_img_13671941871302793615.png
+ 1

Regular Price: ₹36,500 ($480 USD)

Discounted Price: ₹32,000 ($420 USD)   
watermarked_img_13671941871302793615.png

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Narmada Accent Chair, club armchair silhouette, exposed amber walnut mango wood frame, natural woven cane arm inserts, deep olive green velvet upholstery, clean plaster studio environment, 4:5 vertical aspect ratio.
Product 6: Eken Kaveri Armchair
Category & Type: Living Room / Barrel-Back Accent Chair

Description: Barrel-back armchair in matte natural teak with a continuous curved backrest enclosing a natural woven rattan cane panel, with a sand-beige linen seat pad.

Dimensions: 26" W × 26" D × 30" H (
66 cm×66 cm×76.2 cm)

Materials Used: Solid Teak Wood, Natural Rattan Cane, Sand-Beige Linen.

Regular Price: ₹32,000 ($420 USD)

Discounted Price: ₹28,000 ($370 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Kaveri Armchair, barrel back armchair silhouette, smooth natural teak frame, continuous curved woven cane back panel, sand beige linen seat cushion, ivory plaster backdrop, 4:5 vertical product photograph.
Product 7: Eken Godavari Oval Coffee Table
Category & Type: Living Room / Coffee Table

Description: Oval center table in solid Sheesham wood with an amber walnut finish, featuring an inset top of honed Jaisalmer yellow sandstone and vertical fluted wooden legs.

Dimensions: 48" W × 28" D × 18" H (
121.9 cm×71.1 cm×45.7 cm)

Materials Used: Solid Sheesham Wood (Amber Walnut finish), Honed Jaisalmer Sandstone Top.

Regular Price: ₹39,500 ($515 USD)

Discounted Price: ₹34,000 ($450 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Godavari Oval Coffee Table, amber walnut Sheesham wood frame, oval honed yellow sandstone inset tabletop, vertical fluted carved wooden legs, warm studio background, stone floor, 4:5 aspect ratio.
Product 8: Eken Malabar Armchair (Magnesium Hybrid)
Category & Type: Living Room / Flagship High-Back Chair

Description: High-back armchair combining dark walnut Sheesham wood armrests with hand-carved arch reliefs, a satin charcoal magnesium alloy cantilever chassis, and olive green leather cushions.

Dimensions: 31" W × 34" D × 38" H (
78.7 cm×86.4 cm×96.5 cm)

Materials Used: Dark Walnut Sheesham Wood, Satin Charcoal Magnesium Alloy, Olive Green Leather.

Regular Price: ₹82,000 ($1,075 USD)

Discounted Price: ₹72,000 ($950 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Malabar Armchair, dark walnut Sheesham wood frame with carved arch relief armrests, satin charcoal magnesium alloy cantilever leg chassis, muted olive green leather cushions, warm studio backdrop, 4:5 ratio.
Product 9: Eken Godavari Lounge Chair (Magnesium Hybrid)
Category & Type: Living Room / Flagship Accent Lounge Chair

Description: Sculptural teak shell supported by a curved champagne-gold magnesium alloy base chassis, featuring rattan cane side web and indigo raw silk cushions with gold/terracotta block prints.

Dimensions: 32" W × 35" D × 32" H (
81.3 cm×88.9 cm×81.3 cm)

Materials Used: Solid Teak Wood, Champagne Gold Magnesium Alloy Base, Indigo Block-Printed Raw Silk, Rattan Cane.

Regular Price: ₹98,000 ($1,285 USD)

Discounted Price: ₹85,000 ($1,120 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Godavari Lounge Chair, sculptural teak wood shell with cane side panels, satin champagne gold magnesium alloy curved leg base, indigo blue block-printed raw silk cushions, neutral studio environment, 4:5 vertical.
Product 10: Eken Narmada 4-Seater Grand Sofa
Category & Type: Living Room / 4-Seater Grand Sofa

Description: 102-inch grand sofa constructed on a satin charcoal magnesium alloy base chassis, with an Amber Walnut Sheesham wood top rail, hand-carved jaali apron, rattan cane arms, and forest green velvet upholstery.

Dimensions: 102" W × 36" D × 32" H (
259 cm×91.4 cm×81.3 cm)

Materials Used: Charcoal Magnesium Alloy, Solid Sheesham Wood, Rattan Cane, Forest Green Velvet.

Regular Price: ₹1,18,000 ($1,550 USD)

Discounted Price: ₹98,000 ($1,285 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Narmada 4-Seater Grand Sofa, 102-inch modern sofa, satin charcoal magnesium alloy leg frame, amber walnut Sheesham wood outer trim with carved jaali apron border, rattan cane arm panels, forest green velvet cushions, studio background, 4:5 ratio.
Product 11: Eken Kaveri Executive Swivel Lounge Chair
Category & Type: Living Room & Office / Swivel Accent Chair

Description: Executive swivel chair featuring a dark walnut teak shell, a splayed 4-star champagne-gold magnesium alloy base, and channel-tufted muted terracotta leather cushions.

Dimensions: 33" W × 35" D × 39" H (
83.8 cm×88.9 cm×99.1 cm)

Materials Used: Solid Teak Wood (Dark Walnut finish), Champagne Gold Magnesium Alloy Base, Muted Terracotta Leather.

Regular Price: ₹79,000 ($1,035 USD)

Discounted Price: ₹67,999 ($890 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Kaveri Executive Swivel Lounge Chair, sculpted dark walnut teak wood shell, 4-star splayed champagne gold magnesium alloy swivel base, channel-tufted muted terracotta leather upholstery, studio corner, 4:5 ratio.
Product 12: Eken Kaveri Daybed
Category & Type: Living Room / Lounging Daybed

Description: Sculpted Sheesham wood daybed frame in amber walnut finish, featuring full-length rattan cane side arm panels and a mattress upholstered in textured forest green linen.

Dimensions: 76" W × 34" D × 28" H (
193 cm×86.4 cm×71.1 cm)

Materials Used: Solid Sheesham Wood, Natural Rattan Cane, Forest Green Linen.

Regular Price: ₹68,000 ($890 USD)

Discounted Price: ₹57,999 ($760 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Kaveri Daybed, solid Sheesham wood frame in amber walnut finish, natural woven rattan cane side arm panels, textured forest green linen mattress, warm plaster studio environment, 4:5 vertical aspect ratio.
Product 13: Eken Royal Amber Leather Lounge Chair
Category & Type: Living Room / Flagship Single Leather Lounge

Description: Single-person lounge chair crafted from amber walnut teak wood, featuring debossed geometric cognac tan leather cushions supported by a champagne magnesium alloy chassis.

Dimensions: 32" W × 34" D × 33" H (
81.3 cm×86.4 cm×83.8 cm)

Materials Used: Solid Teak Wood, Champagne Magnesium Alloy Base, Cognac Tan Full-Grain Leather.

Regular Price: ₹84,000 ($1,100 USD)

Discounted Price: ₹72,000 ($945 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Royal Amber Leather Lounge Chair, single-person lounge seating, low three-quarter perspective, sculpted amber walnut teak frame, cognac tan full-grain leather cushions with debossed geometric motifs, champagne magnesium alloy base chassis, warm plaster studio environment, 4:5 vertical aspect ratio.
Product 14: Eken Indus Low Lounge Table & Magnesium Chair Set
Category & Type: Living Room / Coffee Table & Low Chair Trio

Description: Low lounge coffee table set featuring an oval teak table with white Banswara marble inset, paired with two low cantilever chairs combining dark walnut shells, satin charcoal magnesium bases, and debossed cognac leather cushions.

Dimensions: Table: 44" W × 26" D × 16" H (
111.8 cm×66 cm×40.6 cm) | Chair: 30" W × 32" D × 29" H (
76.2 cm×81.3 cm×73.7 cm)

Materials Used: Teak & Walnut Wood, Banswara Marble, Charcoal Magnesium Alloy, Cognac Leather.

Regular Price: ₹94,000 ($1,230 USD)

Discounted Price: ₹79,999 ($1,050 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Indus Low Lounge Table & Magnesium Chair Set, oval low teak coffee table with white marble top inset, 2 low cantilever lounge chairs with satin charcoal magnesium alloy chassis, dark walnut trim, and cognac tan debossed leather cushions, studio corner, 4:5 vertical.
Product 15: Eken Kaveri 4-Seater Dining Bench
Category & Type: Living & Dining / 4-Seater Bench

Description: 68-inch modern bench in solid Teak wood with an amber walnut finish, supported by a satin champagne-gold magnesium alloy leg chassis, with a carved jaali wooden apron and forest green velvet cushion.

Dimensions: 68" W × 18" D × 19" H (
172.7 cm×45.7 cm×48.3 cm)

Materials Used: Solid Teak Wood, Satin Champagne Magnesium Alloy, Deep Forest Green Velvet.

Regular Price: ₹48,000 ($630 USD)

Discounted Price: ₹39,999 ($525 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Kaveri 4-Seater Dining Bench, 68-inch modern dining bench, solid teak wood in amber walnut finish, satin champagne gold magnesium alloy leg chassis, seat upholstered in deep forest green velvet, carved jaali fluting along wood apron, travertine floor, 4:5 vertical aspect ratio.
Product 16: Eken Indus Low-Slung Lounge Chair (Magnesium Hybrid)
Category & Type: Living Room / Cantilever Accent Chair

Description: Low-slung lounge chair with a dark walnut Sheesham wood shell on a curved satin charcoal magnesium alloy cantilever base, with woven cane side panels and muted terracotta leather cushions.

Dimensions: 31" W × 34" D × 30" H (
78.7 cm×86.4 cm×76.2 cm)

Materials Used: Solid Sheesham Wood, Charcoal Magnesium Alloy, Natural Rattan Cane, Terracotta Leather.

Regular Price: ₹76,000 ($995 USD)

Discounted Price: ₹64,500 ($845 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Indus Low-Slung Lounge Chair, single-person accent chair, dark walnut Sheesham wood shell on curved satin charcoal magnesium alloy cantilever base, natural woven rattan cane side panels, muted terracotta leather cushions, minimal studio wall backdrop, 4:5 vertical aspect ratio.
II. Dining Room Collection
Product 17: Eken Gomati Dining Chair
Category & Type: Dining Seating / Wishbone-Inspired Chair

Description: Dining chair crafted from dark walnut Sheesham wood with an arched rear leg structure and a wrapped backrest in burnt terracotta linen.

Dimensions: 22" W × 22" D × 32" H (
55.9 cm×55.9 cm×81.3 cm)

Materials Used: Dark Walnut Sheesham Wood, Burnt Terracotta Linen.

Regular Price: ₹19,000 ($250 USD)

Discounted Price: ₹16,500 ($220 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Gomati Dining Chair, dark walnut Sheesham frame with arched rear leg support, curved backrest wrapped in burnt terracotta linen upholstery, minimal studio backdrop, 4:5 ratio.
Product 18: Eken Krishna Bar Cabinet
Category & Type: Dining & Bar / Vertical Storage Armoire   
watermarked_img_11902961730092161892.png

Description: Dark walnut Sheesham bar armoire set on an aged brass leg frame, featuring etched geometric jaali doors with inlaid brass wire patterns.   
watermarked_img_11902961730092161892.png
+ 1

Dimensions: 36" W × 18" D × 54" H (
91.4 cm×45.7 cm×137.2 cm)

Materials Used: Solid Sheesham Wood, Brass Wire Inlays, Aged Brass Base Frame.   
watermarked_img_11902961730092161892.png
+ 1

Regular Price: ₹78,000 ($1,020 USD)

Discounted Price: ₹68,000 ($900 USD)   
watermarked_img_11902961730092161892.png

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Krishna Bar Cabinet, dark walnut Sheesham bar armoire, doors etched with geometric jaali pattern and brass wire inlays, slim aged brass leg frame base, studio lighting, 4:5 aspect ratio.
Product 19: Eken Indus 8-Seater Dining Table
Category & Type: Dining Room / Large 8-Seater Table

Description: 84-inch rectangular dining table crafted from long-grain natural Indian Teak wood, featuring hand-carved arch aprons running under all sides.

Dimensions: 84" W × 40" D × 30" H (
213.4 cm×101.6 cm×76.2 cm)

Materials Used: Solid Indian Teak Wood (Natural finish).

Regular Price: ₹89,000 ($1,160 USD)

Discounted Price: ₹78,000 ($1,020 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Indus 8-Seater Dining Table, 84-inch rectangular solid natural teak table, hand-carved arch motif aprons, straight tapered wooden legs, sand beige studio setting, 4:5 aspect ratio.
Product 20: Eken Krishna Dining Chairs (Pair)
Category & Type: Dining Seating / Cane-Back Chair Pair

Description: Pair of natural teak dining chairs with square woven rattan cane backrests and padded seats in dark forest green and gold block-printed cotton.

Dimensions: 20" W × 21" D × 34" H (
50.8 cm×53.3 cm×86.4 cm)

Materials Used: Natural Teak Wood, Woven Rattan Cane, Forest Green/Gold Block-Printed Cotton.

Regular Price: ₹42,000 ($550 USD) (Pair)

Discounted Price: ₹36,000 ($480 USD) (Pair)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Krishna Dining Chairs, natural teak wood frames, woven cane square backrests, seat cushions upholstered in dark forest green and gold block-print cotton pattern, studio backdrop, 4:5 vertical.
Product 21: Eken Maru Dining Set (Magnesium Hybrid)
Category & Type: Dining Room / 5-Piece Round Dining Set

Description: 48-inch round dark walnut mango wood table with a champagne magnesium alloy leg chassis, paired with 4 cane-back chairs with olive velvet seats.

Dimensions: Table: 48" Dia × 30" H (
121.9 cm Dia×76.2 cm H) | Chair: 20" W × 21" D × 32" H (
50.8 cm×53.3 cm×81.3 cm)

Materials Used: Mango Wood (Dark Walnut finish), Champagne Gold Magnesium Alloy, Rattan Cane, Olive Velvet.

Regular Price: ₹1,42,000 ($1,860 USD)

Discounted Price: ₹1,25,000 ($1,650 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Maru Dining Set, 48-inch round dark walnut top dining table with champagne gold magnesium alloy leg base, 4 matching dining chairs with cane backrests and olive green velvet cushions, studio background, 4:5 ratio.
Product 22: Eken Coromandel 6-Seater Dining Table
Category & Type: Dining Room / Marble Inlay Table

Description: 72-inch rectangular dining table featuring an inset top of honed white Banswara marble, surrounded by a warm oak rim and a champagne magnesium alloy apron.

Dimensions: 72" W × 36" D × 30" H (
182.9 cm×91.4 cm×76.2 cm)

Materials Used: Honed White Banswara Marble, Warm Oak Wood, Champagne Magnesium Alloy.

Regular Price: ₹98,000 ($1,280 USD)

Discounted Price: ₹88,000 ($1,150 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Coromandel 6-Seater Dining Table, white Banswara marble inset top, warm oak rounded wood rim, brushed champagne magnesium alloy apron frame, light oak floor background, studio lighting, 4:5 vertical.
Product 23: Eken Yamuna Dining Set
Category & Type: Dining Room / 7-Piece Premium Dining Set

Description: Polished teak table with a champagne-gold magnesium alloy apron and leg chassis, surrounded by 6 chairs with champagne magnesium legs, cane backs, and rust raw silk pads.

Dimensions: Table: 72" W × 36" D × 30" H (
182.9 cm×91.4 cm×76.2 cm) | Chair: 20" W × 22" D × 33" H (
50.8 cm×55.9 cm×83.8 cm)

Materials Used: Solid Teak Wood, Champagne Gold Magnesium Alloy, Rattan Cane, Rust Raw Silk.

Regular Price: ₹1,65,000 ($2,160 USD)

Discounted Price: ₹1,45,000 ($1,900 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Yamuna Dining Set, 6-seater polished teak table with champagne gold magnesium alloy frame, 6 matching chairs with woven rattan cane backrests and rust raw silk seat pads, warm plaster wall backdrop, 4:5 ratio.
Product 24: Eken Betwa 8-Seater Grand Dining Set
Category & Type: Dining Room / 9-Piece Full Dining Set

Description: 96-inch rectangular teak dining table with white Banswara marble inset and champagne magnesium foot ferrules, paired with 8 cane-back chairs with indigo raw silk seats.

Dimensions: Table: 96" W × 42" D × 30" H (
243.8 cm×106.7 cm×76.2 cm) | Chair: 20" W × 22" D × 34" H (
50.8 cm×55.9 cm×86.4 cm)

Materials Used: Teak Wood (Amber Walnut finish), White Banswara Marble, Magnesium Ferrules, Rattan Cane, Indigo Raw Silk.

Regular Price: ₹1,85,000 ($2,430 USD)

Discounted Price: ₹1,58,000 ($2,075 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Betwa 8-Seater Grand Dining Set, 96-inch teak dining table with white Banswara marble inset top and champagne gold magnesium leg ferrules, 8 matching chairs with cane backrests and indigo raw silk cushions, grey marble floor background, 4:5 ratio.
Product 25: Eken Compact Bistro Set (2-Person)
Category & Type: Dining / Compact Balcony & Bistro Set

Description: 2-person dinette featuring a 32-inch round teak pedestal table and two matching chairs with handwoven natural rattan cane backrests and sand-beige linen cushions.

Dimensions: Table: 32" Dia × 30" H (
81.3 cm Dia×76.2 cm H) | Chair: 19" W × 20" D × 32" H (
48.3 cm×50.8 cm×81.3 cm)

Materials Used: Solid Teak Wood, Natural Rattan Cane, Sand-Beige Linen.

Regular Price: ₹45,000 ($590 USD)

Discounted Price: ₹37,500 ($490 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Compact Bistro Set, 32-inch round teak pedestal dining table, 2 matching bistro chairs with arched rattan cane backrests and sand beige linen seat pads, bright studio lighting, 4:5 ratio.
Product 26: Eken Small Apartment Dinette (2-Person)
Category & Type: Dining / Compact Nook Set

Description: Square dark walnut Sheesham wood table paired with two forest green velvet dining chairs featuring vertical channel tufting and tapered brass legs.

Dimensions: Table: 34" W × 34" D × 30" H (
86.4 cm×86.4 cm×76.2 cm) | Chair: 19" W × 21" D × 33" H (
48.3 cm×53.3 cm×83.8 cm)

Materials Used: Solid Sheesham Wood (Dark Walnut finish), Forest Green Velvet, Tapered Brass Legs.

Regular Price: ₹42,000 ($550 USD)

Discounted Price: ₹34,999 ($460 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Small Apartment Dinette, square dark walnut Sheesham dining table, 2 forest green velvet dining chairs with vertical channel tufting and tapered brass legs, minimalist plaster wall backdrop, 4:5 vertical.
Product 27: Eken Sculptural Molded Teak Set (2-Person)
Category & Type: Dining / Ergonomic Bentwood Set

Description: Round teak pedestal table paired with two ergonomic molded teak plywood chairs with backrest cutouts, terracotta seat cushions, and slim brass legs.

Dimensions: Table: 36" Dia × 30" H (
91.4 cm Dia×76.2 cm H) | Chair: 21" W × 21" D × 31" H (
53.3 cm×53.3 cm×78.7 cm)

Materials Used: Molded Teak Plywood, Solid Teak Pedestal, Terracotta Fabric, Brass Legs.

Regular Price: ₹48,000 ($630 USD)

Discounted Price: ₹39,999 ($525 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Sculptural Molded Teak Set, round teak wood pedestal table, 2 ergonomic molded teak plywood chairs with backrest cutouts and terracotta fabric seat cushions, slim brass legs, studio setting, 4:5 ratio.
Product 28: Eken Indus Dining Chair (Dabu Print)
Category & Type: Dining Seating / Accent Dining Chair

Description: Straight-on elevation dining chair built with a curved teak frame, cushioned seat and backrest upholstered in traditional indigo Dabu geometric block-printed cotton canvas.

Dimensions: 21" W × 22" D × 33" H (
53.3 cm×55.9 cm×83.8 cm)

Materials Used: Solid Teak Wood, Indigo Dabu Block-Printed Cotton Canvas, High-Density Foam.

Regular Price: ₹22,500 ($295 USD)

Discounted Price: ₹18,999 ($250 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Indus Dining Chair, front elevation view, curved natural teak wood frame, cushioned seat and backrest upholstered in traditional indigo Dabu geometric block-printed cotton canvas, studio backdrop, 4:5 vertical aspect ratio.
Product 29: Eken Nook 2-Person Leather & Magnesium Dining Set
Category & Type: Dining / Compact 2-Person Pedestal Set

Description: 36-inch round Mango wood table with a champagne-gold magnesium pillar base, paired with 2 teak chairs with rattan cane backs and terracotta leather cushions.

Dimensions: Table: 36" Dia × 30" H (
91.4 cm Dia×76.2 cm H) | Chair: 20" W × 21" D × 32" H (
50.8 cm×53.3 cm×81.3 cm)

Materials Used: Solid Mango Wood, Teak Wood, Champagne Magnesium Alloy, Rattan Cane, Terracotta Leather.

Regular Price: ₹68,000 ($890 USD)

Discounted Price: ₹56,999 ($745 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Nook 2-Person Dining Set, 36-inch round mango wood tabletop with champagne magnesium pedestal base, 2 matching teak dining chairs with rattan cane backrests and terracotta leather cushions, minimal studio backdrop, 4:5 vertical aspect ratio.
Product 30: Eken Gomati 6-Person Grand Dining Set
Category & Type: Dining Room / 7-Piece Table & Chair Set

Description: 72-inch rectangular solid teak table with a champagne-gold magnesium apron, surrounded by 6 matching teak chairs with natural cane backs and indigo raw silk seat pads.

Dimensions: Table: 72" W × 36" D × 30" H (
182.9 cm×91.4 cm×76.2 cm) | Chair: 20" W × 22" D × 33" H (
50.8 cm×55.9 cm×83.8 cm)

Materials Used: Solid Teak Wood, Champagne-Gold Magnesium Alloy, Natural Rattan Cane, Indigo Raw Silk.

Regular Price: ₹1,48,000 ($1,940 USD)

Discounted Price: ₹1,26,000 ($1,650 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Gomati 6-Person Grand Dining Set, 72-inch rectangular teak dining table with champagne gold magnesium alloy apron, 6 matching teak chairs with natural woven cane backrests and indigo raw silk seat pads, grey marble floor, warm studio lighting, 4:5 ratio.
III. Bedroom Collection
Product 31: Eken Son Chest of Drawers
Category & Type: Bedroom Storage / 6-Drawer Tallboy

Description: Vertical 6-drawer chest in dark walnut Sheesham wood, featuring exposed finger box joinery corners and recessed circular aged brass pulls.

Dimensions: 34" W × 18" D × 52" H (
86.4 cm×45.7 cm×132.1 cm)

Materials Used: Solid Sheesham Wood (Dark Walnut finish), Aged Brass Hardware.

Regular Price: ₹48,000 ($630 USD)

Discounted Price: ₹42,000 ($550 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Son Chest of Drawers, 6-drawer tallboy, dark walnut Sheesham wood, exposed finger box joinery corners, recessed circular aged brass drawer pulls, warm bedroom light, oak floor, 4:5 ratio.
Product 32: Eken Son Upholstered Storage Bed
Category & Type: Bedroom / Platform Storage Bed   
watermarked_img_5837864932303641708.png

Description: King platform bed in dark walnut Sheesham wood with integrated side storage drawers, featuring a sand beige linen headboard with vertical stepwell channel quilting.   
watermarked_img_5837864932303641708.png

Dimensions: King: 78" W × 84" L × 54" Headboard H (
198.1 cm×213.4 cm×137.2 cm)

Materials Used: Dark Walnut Sheesham Wood, Sand Beige Quilted Linen, Brass Pulls.   
watermarked_img_5837864932303641708.png

Regular Price: ₹86,000 ($1,120 USD)

Discounted Price: ₹75,000 ($980 USD)   
watermarked_img_5837864932303641708.png

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Son Upholstered Storage Bed, king platform bed, dark walnut wood base with side storage drawer, sand beige linen headboard with vertical stepwell quilted channels, morning bedroom lighting, 4:5 vertical.
Product 33: Eken Narmada Canopy Bed
Category & Type: Bedroom / 4-Poster Canopy Bed

Description: Four-poster king canopy bed in amber walnut Sheesham wood, detailed with hand-carved post finials and a soft neutral beige linen headboard.

Dimensions: King: 78" W × 84" L × 82" Post H (
198.1 cm×213.4 cm×208.3 cm)

Materials Used: Solid Sheesham Wood (Amber Walnut finish), Beige Linen.

Regular Price: ₹94,000 ($1,230 USD)

Discounted Price: ₹82,000 ($1,080 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Narmada Canopy Bed, 4-poster king bed frame in amber walnut Sheesham wood, hand-carved finials on post tops, neutral beige linen headboard cushion, warm plaster room backdrop, 4:5 ratio.
Product 34: Eken Sabarmati Nightstand Pair
Category & Type: Bedroom Storage / Bedside Tables

Description: Pair of nightstands in amber walnut Sheesham wood, featuring an upper open cubby and a single drawer front inset with hand-carved jaali lattice.

Dimensions: 20" W × 18" D × 24" H (
50.8 cm×45.7 cm×61 cm)

Materials Used: Solid Sheesham Wood (Amber Walnut finish), Brass Pull Tabs.

Regular Price: ₹26,000 ($340 USD) (Pair)

Discounted Price: ₹22,000 ($290 USD) (Pair)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Sabarmati Nightstand Pair, bedside tables in amber walnut Sheesham wood, open upper cubby, single drawer with carved wooden jaali lattice front, brass pull tab, bedroom studio floor setting, 4:5 ratio.
Product 35: Eken Konkan Modern Poster Bed (Magnesium Hybrid)
Category & Type: Bedroom / Modern Canopy Bed

Description: King bed constructed from amber walnut teak posts connected by satin champagne magnesium alloy canopy joints, with a large natural rattan cane headboard.

Dimensions: King: 78" W × 84" L × 80" H (
198.1 cm×213.4 cm×203.2 cm)

Materials Used: Teak Wood, Satin Champagne Magnesium Alloy Brackets, Rattan Cane.

Regular Price: ₹1,12,000 ($1,460 USD)

Discounted Price: ₹98,000 ($1,300 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Konkan Modern Poster Bed, teak wood vertical posts, satin champagne magnesium alloy corner canopy brackets, natural woven rattan cane headboard panel, beige linen bedding, 4:5 aspect ratio.
Product 36: Eken Brahmaputra King Bed (Magnesium Hybrid)
Category & Type: Bedroom / Ultra-Luxury Canopy Bed

Description: Dark matte magnesium alloy canopy frame with a high forest green velvet headboard, topped by a Sheesham wood accent bar with carved jaali details.

Dimensions: King: 80" W × 86" L × 84" H (
203.2 cm×218.4 cm×213.4 cm)

Materials Used: Dark Matte Magnesium Alloy, Forest Green Velvet, Carved Sheesham Wood.

Regular Price: ₹1,55,000 ($2,030 USD)

Discounted Price: ₹1,35,000 ($1,780 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Brahmaputra King Bed, dark matte magnesium alloy canopy frame, deep forest green velvet upholstered headboard, top Sheesham wood trim with carved jaali relief, soft micro-cement room studio, 4:5 vertical.
Product 37: Eken Godavari Bedside Table
Category & Type: Bedroom Storage / Nightstand

Description: Amber walnut Sheesham wood nightstand featuring a smooth solid wood top surface and a single drawer facade inset with intricate hand-carved geometric jaali work and a teardrop aged brass pull handle.

Dimensions: 22" W × 18" D × 24" H (
55.9 cm×45.7 cm×61 cm)

Materials Used: Solid Sheesham Wood (Amber Walnut finish), Aged Brass Hardware.

Regular Price: ₹24,500 ($320 USD)

Discounted Price: ₹20,499 ($270 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Godavari Bedside Table, elevated three-quarter view, amber walnut Sheesham wood, smooth top surface, single drawer facade with hand-carved geometric jaali lattice, teardrop aged brass pull handle, studio setting, 4:5 ratio.
Product 38: Eken Narmada Single Bed
Category & Type: Bedroom / Single Platform Bed

Description: Single platform bed built from amber walnut Sheesham wood with champagne magnesium corner brackets and a rattan cane headboard panel bordered by an ivory linen cushion.

Dimensions: Single/Twin: 42" W × 78" L × 48" Headboard H (
106.7 cm×198.1 cm×121.9 cm)

Materials Used: Solid Sheesham Wood, Satin Champagne Magnesium Alloy, Natural Rattan Cane, Ivory Linen.

Regular Price: ₹52,000 ($680 USD)

Discounted Price: ₹43,999 ($575 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Narmada Single Bed, single platform bed frame in amber walnut Sheesham wood, satin champagne magnesium alloy corner joinery, natural woven rattan cane headboard panel, warm ivory linen cushion, oak floor backdrop, 4:5 ratio.
IV. Study & Entryway Collection
Product 39: Eken Krishna Entryway Console Table
Category & Type: Entryway / Hallway Console Table

Description: 60-inch natural teak wood console featuring twin drawers with carved sunburst block motifs, an inset top of honed Jaisalmer yellow sandstone, and fluted legs.

Dimensions: 60" W × 16" D × 32" H (
152.4 cm×40.6 cm×81.3 cm)

Materials Used: Solid Natural Teak Wood, Honed Jaisalmer Sandstone, Aged Brass Hardware.

Regular Price: ₹54,000 ($710 USD)

Discounted Price: ₹48,000 ($640 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Krishna Entryway Console Table, natural teak console, 2 drawers with carved sunburst motif, honed yellow Jaisalmer sandstone inset top, classical fluted wooden legs, aged brass pull handles, architectural plaster niche backdrop, checkerboard floor, studio detail lighting, 4:5 aspect ratio.
Product 40: Eken Godavari Writing Desk
Category & Type: Study & Home Office / Executive Desk

Description: Executive desk in natural Indian Teak featuring an inset deep forest green leather writing surface, brass pull knobs, and a central drawer front hand-carved with a jaali lattice pattern.

Dimensions: 54" W × 26" D × 30" H (
137.2 cm×66 cm×76.2 cm)

Materials Used: Solid Indian Teak Wood, Forest Green Leather Inset, Brass Knobs.

Regular Price: ₹52,000 ($680 USD)

Discounted Price: ₹46,000 ($600 USD)

Anti-Gravity Web Generator Prompt:

Plaintext
Anti-Gravity Prompt: Eken Godavari Writing Desk, natural teak desk frame, inset deep forest green leather writing surface, central drawer with hand-carved jaali wood lattice facade, brass pull knobs, home office studio setting, 4:5 ratio.
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-11-02T15:45:13+05:30.
</ADDITIONAL_METADATA>