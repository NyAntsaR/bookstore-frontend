// Add product to the localStorage
// remove duplicates
export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        // get the item in the local storage with the name of cart
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        // push the new item 
        cart.push({
            ...item,
            count: 1
        })
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            // run map() on it again and return the actual product from the cart
            return cart.find(p =>p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}