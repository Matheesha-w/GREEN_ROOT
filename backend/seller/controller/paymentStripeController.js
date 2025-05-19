const stripe = require('stripe')('sk_test_51R5p89RvsikKtmlomY1q53IlqgUCIZkj7D0hK92D8eBwm8ohWxY5X5SKKE0C7ZG4FrvoPhP2eRS6wPqSsrNImP7v00VQk26fyY');

async function createCheckoutSession(req, res) {
  try {
    const { cartItems, totalAmount, cartId, userId } = req.body;

    console.log('Cart Items:', cartItems);
    console.log('Total Amount:', totalAmount);

    if (!cartItems || cartItems.length === 0 || !totalAmount) {
      return res.status(400).json({ error: 'Invalid cart data or total amount' });
    }

    console.log('Metadata:', { cartId, userId });

    
    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.cropId.image ? [item.cropId.image] : [], // Ensure images exist
        },
        unit_amount: Math.round(item.price * 100), // Ensure whole number
      },
      quantity: item.quantity || 1,
    }));

    

   
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `http://localhost:5173/seller/${userId}/placeOrder?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/seller/${userId}/Inventory`,
      metadata: { 
        cartId, 
        userId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createCheckoutSession };
