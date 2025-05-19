import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useParams } from 'react-router-dom';

const OrderhistoryPage = () => {

   const { cid } = useParams();
  console.log(cid)


  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasIssue, setHasIssue] = useState('no');
  const [feedback, setFeedback] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/customer/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`); // THIS OnE here Display error as toast message
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleRatingChange = (itemId, value) => {
    setRatings((prev) => ({ ...prev, [itemId]: value }));
  };

  const handleFeedback = async (order) => {
    try {
      const response = await fetch('http://localhost:3000/api/customer/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order._id,
          orderNumber: order.orderNumber,
          feedback,
          hasIssue,
          complaintType: hasIssue === 'yes' ? complaintType : null,
          ratings: hasIssue === 'no' ? ratings : null,
          role: 'customer',
        }),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      toast.success('Feedback submitted successfully!'); // Show success toast
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback'); // Show error toast
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-green-700 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-xl">Error: {error}</div>;
  }

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/customer_images/order_hostory.png')` }}
    >
      {/* Sidebar */}
      <div className="w-60 h-screen fixed">
        <Sidebar custId={cid}/>
      </div>

      {/* displaying order hsitory Content */}
      <div className="flex-1 ml-60 p-6 md:p-10 overflow-y-auto h-screen">
      <div className="bg-gray-600 rounded-2xl p-10 shadow-xl mx-4 mt-10 mb-5">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/customer_images/Our_logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="rounded-full"
          />
          <h2 className="text-5xl font-bold text-white order-heading">
            Order History
          </h2>
          <img
            src="/customer_images/Our_logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="rounded-full"
          />
        </div>
      </div>




        
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-300 rounded-xl shadow-md border-l-4 border-green-500 p-6 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl font-bold text-green-800">Order #{order.orderNumber}</h3>
              {/* <p className={`text-lg font-semibold mt-2 ${order.status === 'Cancelled' ? 'text-red-600' : 'text-green-700'}`}>
                Status: {order.status}
              </p> */}

              <div className="mt-4 space-y-3">
                {order.cartItems &&
                  order.cartItems.map((item) => (
                    <div key={item.id} className="relative flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                      
                      <span className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl shadow-lg">
                        ✓
                      </span>

                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-md object-cover shadow-md border"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-green-800">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Seller Id: {item.sellerId}</p>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 border-t pt-4">
                <p className="text-lg font-semibold text-green-800">Buyer ID: {order.ordinary_buyer_id}</p>
                <p className="text-lg font-semibold text-green-800 mt-2">Final Total: Rs.{order.finalTotal}</p>

                <div className="mt-4 flex justify-end">
                  {/* updated ,showiNG Feedback Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md">
                        Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-green-800 font-bold">Feedback & Complaint</DialogTitle>
                        <DialogDescription asChild>
                          <form className="space-y-4 mt-4" onSubmit={(e) => {
                            e.preventDefault();
                            handleFeedback(order);
                          }}>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                              <textarea
                                rows="3"
                                className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-green-500"
                                placeholder="Write your feedback here..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              ></textarea>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Is there any issue?</label>
                              <select
                                className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-green-500"
                                value={hasIssue}
                                onChange={(e) => setHasIssue(e.target.value)}
                              >
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                              </select>
                            </div>

                            {hasIssue === 'yes' ? (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
                                <select
                                  className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-green-500"
                                  value={complaintType}
                                  onChange={(e) => setComplaintType(e.target.value)}
                                >
                                  <option value="" disabled>Select a reason</option>
                                  <option value="delay">Product Delay</option>
                                  <option value="quality">Quality Issue</option>
                                  <option value="damaged">Damaged Item</option>
                                  <option value="wrong">Wrong Product Delivered</option>
                                  <option value="other">Other</option>
                                </select>
                              </div>
                            ) : (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rate the Products</label>
                                {order.cartItems.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between mb-2 bg-gray-100 p-2 rounded">
                                    <span className="text-green-800 font-semibold">{item.name}</span>
                                    <select
                                      className="border rounded-md p-1 text-sm focus:outline-none"
                                      value={ratings[item.id] || ''}
                                      onChange={(e) => handleRatingChange(item.id, e.target.value)}
                                    >
                                      <option value="" disabled>Rate</option>
                                      <option value="1">⭐</option>
                                      <option value="2">⭐⭐</option>
                                      <option value="3">⭐⭐⭐</option>
                                      <option value="4">⭐⭐⭐⭐</option>
                                      <option value="5">⭐⭐⭐⭐⭐</option>
                                    </select>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="text-right">
                              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                Submit Feedback
                              </Button>
                            </div>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*UPDATED this instead of alerts, Toast Container for displaying toasts */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} />
    </div>
  );
};

export default OrderhistoryPage;
