const dotenv = require("dotenv");
dotenv.config();

const { default: Stripe } = require("stripe");
const stripe = require("stripe")(process.env.CUS_STRIPE);

const checkout = async (req, res) => {
  try {
    const { Subtotal,customerId } = req.body; // Only get Subtotal from request

    console.log("cusid:",customerId);

    if (!Subtotal || Subtotal <= 0) {
      return res.status(400).json({ error: "Invalid total price" });
    }

    // Convert total price to cents (As Stripe requires amounts in cents)
    const totalAmount = Math.round(parseFloat(Subtotal) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "Lkr",
            product_data: { name: "Total Order Payment" },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["LK", "US"],
      },
      success_url: `http://localhost:5173/Home/Checkout/${customerId}`,//changed to checkoutpage
      cancel_url: "http://localhost:5173/Customer",//changed to customerpage
    });

    res.status(200).json({ data: session });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { checkout };
