 import { TrashIcon } from 'lucide-react';
 import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
 import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
 import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

 const CartItemList = ({custId}) => {

        console.log("customerId:",custId);

    const [cartItems, setCartItems] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [Subtotal,setSubtotal] = useState(0);
     const navigate = useNavigate();

     //fetch data to cart
     useEffect(() => {
         const fetchCartItems = async () => {
             setLoading(true);
             setError(null);
             try {
                 const response = await fetch('http://localhost:3000/api/customer/addtocart');//change
                if (!response.ok) {                     
                    throw new Error('Failed to fetch cart items');
                 }
                const data = await response.json();
                console.log('Fetched data:', data); // Inspect the fetched data
                 setCartItems(data);
                 console.log('Cart items state:', cartItems); // Inspect the updated state
             } catch (err) {
                 setError(err.message);
             } finally {
                 setLoading(false);
             }
         };

         fetchCartItems();
     }, []); // Added empty dependency array






     //calculate total price in cart
    useEffect(() => {
     // Change is here: added a check to see if cartItems is not null and has a length greater than zero.
     if (cartItems && cartItems.length > 0) {
         let total = 0;
         cartItems.forEach((item) => {
             total += item.totalPrice;
         });
         setSubtotal(total);
     } else {
         // Change is here: if cartItems is null or empty, set subtotal to 0.
         setSubtotal(0);
     }

 }, [cartItems]);


    



     //delete item from cart
     const handleDelete = async (itemId) => {
         try {
             const response = await fetch(`http://localhost:3000/api/customer/addtocart/${itemId}`, {//change
                 method: 'DELETE',
             });
             if (!response.ok) {
                 throw new Error('Failed to delete item');
             }
             // Refetch cart items after deletion
             fetch('http://localhost:3000/api/customer/addtocart')//change
                 .then((response) => response.json())
                 .then((data) => setCartItems(data));

                 toast.success('Item was deleted!');

         } catch (err) {
             toast.error('Error deleting item:', err);
         }
     };

   //payment sreipe
   const handleForm = async (e) => {
    e.preventDefault();

    try {
        const stripeAmount = Math.round((Subtotal*0.01) * 100); // Corrected calculation

        const response = await axios.post("http://localhost:3000/api/customer/payment", {
            Subtotal: stripeAmount,
            customerId:custId,
        });

        if (response.data && response.data.data.url) {
            window.location.href = response.data.data.url;
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Error processing payment. Please try again.");
    }
};



    // Handle quantity change
    const handleQuantityChange = async (itemId, newQuantity, originalPrice) => {
        try {
            const response = await fetch(`http://localhost:3000/api/customer/addtocart/${itemId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
    
            const updatedItem = await response.json(); // Get updated item from the backend
    
            // Update cart items state
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item._id === itemId ? updatedItem : item
                )
            );
    
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };





     if (loading) {
         return <div>Loading...</div>;
     }

     if (error) {
         return <div>Error: {error}</div>;
     }

     if (!cartItems) {
         return <div>No cart items found.</div>;
     }


    

    
    

     return (
         <div>  
                 <div className='h-[500px] overflow-auto'>
                     {cartItems.map((item) => (
                         <div className='flex justify-between items-center p-2 mb-5'>
                         <div key={item._id} className='flex gap-6 items-center'>
                            
                            
                             <div>
                             {item.image && <img src={item.image} alt={item.name} 
                            style={{ width: '70px', height: '70px' }} className='border p-2 '/>}
                            </div>
                            <div>
                            <h2 className='font-bold'>{item.name}</h2>
                            <div className='p-2 border flex gap-10 items-center px-5'>
  <button
    disabled={item.quantity === 1}
    onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.price)}
    className="w-8 h-8 bg-green-600 text-white font-bold border border-green-600 rounded-full flex items-center justify-center disabled:bg-green-300 disabled:cursor-not-allowed"
  >
    -
  </button>
  <h2>{item.quantity}</h2>
  <button
    onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.price)}
    className="w-8 h-8 bg-green-600 text-white font-bold border border-green-600 rounded-full flex items-center justify-center"
  >
    +
  </button>
</div>

                            <h2 className='text-lg font-bold'>Rs. {item.totalPrice}</h2>
                            </div>
                           
                            <div className='absolute w-[90%] bottom-6 flex flex-col'>

                    <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>Rs.{Subtotal}</span></h2>
                    <Button onClick={handleForm}>Checkout</Button>
                     </div>
                            
                        </div>

                        <TrashIcon className='cursor-pointer' onClick={() => handleDelete(item._id)}/>
                        </div>
                        


                    ))}

                    
                </div>
                 {/* Toast container to render the toast notifications */}
                      <ToastContainer />
                
            </div>
        
    );
};

export default CartItemList;