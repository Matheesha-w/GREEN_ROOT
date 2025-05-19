import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';

const FeedbackPage = () => {

  const { cid } = useParams();
    console.log(cid)

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/customer/feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div
      className="flex h-screen "
      
    >
      {/* Fixed Sidebar */}
      <div className="w-60 h-screen fixed">
        <Sidebar custId={cid}/>
      </div>

      {/* UPDated ,Scrollable Main Content */}
      <div className="flex-1 ml-60 h-screen overflow-y-auto p-6 md:p-10 bg-cover bg-center"
      style={{ backgroundImage: `url('/customer_images/feedback.jpg')` }}>
        <div >
                <div className=" rounded-2xl p-10 shadow-xl mx-4 mt-3 mb-10">
        <div className="flex items-center justify-center gap-4">
          <img
            src="/customer_images/Our_logo.png"
            alt="Logo"
            width={90}
            height={90}
            className="rounded-full"
          />
          <h2 className="text-5xl font-bold text-white order-heading">
            Feed back ...
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

          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && feedbacks.length === 0 && (
            <p className="text-center text-gray-500">No feedbacks available.</p>
          )}

          {!loading && !error && feedbacks.map((fb) => (
  <div key={fb._id} className="mb-10">

    {/* Feedback from Customer placed to Always on Right */}
    <div className="relative max-w-xl bg-green-300 p-4 rounded-2xl shadow-md text-left ml-auto mr-2 before:absolute before:top-4 before:-right-3 before:w-4 before:h-4 before:bg-green-100 before:rounded-full before:content-[''] before:shadow-md">
      <p className="text-green-800 text-sm font-semibold">👤 Role: Customer</p>
      <p><strong>📝 Feedback:</strong> {fb.feedback}</p>
      <p><strong>❓ Has Issue:</strong> {fb.hasIssue}</p>
      {fb.hasIssue === 'yes' && (
        <p><strong>📌 Complaint Type:</strong> {fb.complaintType}</p>
      )}
      {fb.ratings && (
        <div>
          <strong>⭐ Ratings:</strong>
          <ul className="ml-4 list-disc">
            {Object.entries(fb.ratings).map(([category, rating]) => (
              <li key={category}>{category}: {rating} ⭐</li>
            ))}
          </ul>
        </div>
      )}
      {fb.orderId && <p><strong>📦 Order ID:</strong> {fb.orderId}</p>}
      <p className="text-sm text-gray-500">🕒 {new Date(fb.createdAt).toLocaleString()}</p>
    </div>

    {/* Conditional Message plced to Always on Left */}
    <div className={`relative max-w-xl bg-gray-300 font-bold p-4 rounded-2xl shadow-md text-left ml-2 mt-2 before:absolute before:top-4 before:-left-3 before:w-4 before:h-4 before:bg-gray-100 before:rounded-full before:content-[''] before:shadow-md ${fb.hasIssue === 'yes' ? 'text-red-600' : 'text-green-900'}`}>

      {fb.hasIssue === 'yes' ? (
        <>
          💬 Thank you for your feedback. We’ll consider your matter seriously and get back to you as soon as possible.
        </>
      ) : (
        <>
          💬 Thank you for your feedback! We’re glad to hear from you. Stay with us for more great experiences.
        </>
      )}
    </div>

  </div>
))}


        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
