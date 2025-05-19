import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarResearcher from '../components/SidebarResearcher';
import { getResearcherId } from '../utils/auth';

export default function GrowingGuideUpdate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const { post } = location.state || {};

    useEffect(() => {
      const userId = getResearcherId();
        
      if (userId) {
        setUserID(userId);
      } else {
        navigate(`/auth/login`);
      }
    })
    
    // State initialization
    const [title, setTitle] = useState(post?.title || '');
    const [binominalName, setBinominalName] = useState(post?.binominalName || '');
    const [description, setDescription] = useState(post?.description || '');
    const [sunRequirement, setSunRequirement] = useState(post?.sunRequirement || '');
    const [soilRequirements, setSoilRequirements] = useState(post?.soilRequirements || '');
    const [sowingMethod, setSowingMethod] = useState(post?.sowingMethod || '');
    const [wateringNeeds, setWateringNeeds] = useState(post?.wateringNeeds || '');
    const [spread, setSpread] = useState(post?.spread || '');
    const [rowSpacing, setRowSpacing] = useState(post?.rowSpacing || '');
    const [height, setHeight] = useState(post?.height || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMsg('');

        try {
            const updatedPost = {
                title, 
                binominalName, 
                description, 
                sunRequirement, 
                soilRequirements, 
                sowingMethod, 
                wateringNeeds, 
                spread, 
                rowSpacing, 
                height
            };

            const response = await fetch(`http://localhost:3000/api/researcher/posts/${post._id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedPost),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' 
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update post');
            }

            setSuccessMsg('Growing guide updated successfully!');
            setTimeout(() => navigate('/researcher/my-growing-guide'), 1500);
            
        } catch (error) {
            setError(error.message);
            console.error('Update error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!post) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-semibold text-gray-800">No post selected for editing</h2>
                {/* Success and error messages */}
                {successMsg && (
                    <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
                        {successMsg}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
                        {error}
                    </div>
                )}
                <button 
                    onClick={() => navigate('/researcher/my-growing-guide')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Back to Growing Guides
                </button>
            </div>
        );
    }
  return (
    <div>
     <SidebarResearcher/>
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Growing Guide</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)} value={title}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          {/* Binomial Name */}
          <div>
            <label htmlFor="binominalName" className="block text-sm font-medium text-gray-700">
              Binomial Name
            </label>
            <input
              type="text"
              onChange={(e) => setBinominalName(e.target.value)} value={binominalName}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description*
            </label>
            <textarea
             onChange={(e) => setDescription(e.target.value)} value={description}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          {/* Growing Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sun Requirement */}
            <div>
              <label htmlFor="sunRequirement" className="block text-sm font-medium text-gray-700">
                Sun Requirement*
              </label>
              <input
               type="text"
                onChange={(e) => setSunRequirement(e.target.value)} value={sunRequirement}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
                
            </div>

            {/* Soil Requirements */}
            <div>
              <label htmlFor="soilRequirements" className="block text-sm font-medium text-gray-700">
                Soil Requirements*
              </label>
              <input
               type="text"
                onChange={(e) => setSoilRequirements(e.target.value)} value={soilRequirements}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Watering Needs */}
            <div>
              <label htmlFor="wateringNeeds" className="block text-sm font-medium text-gray-700">
                Watering Needs*
              </label>
              <input
               type="text"
                onChange={(e) => setWateringNeeds(e.target.value)} value={wateringNeeds}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Sowing Method */}
            <div>
              <label htmlFor="sowingMethod" className="block text-sm font-medium text-gray-700">
                Sowing Method
              </label>
              <input
                type="text"
                onChange={(e) => setSowingMethod(e.target.value)} value={sowingMethod}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Spread */}
            <div>
              <label htmlFor="spread" className="block text-sm font-medium text-gray-700">
                Spread (inches)
              </label>
              <input
                type="text"
                onChange={(e) => setSpread(e.target.value)} value={spread}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Row Spacing */}
            <div>
              <label htmlFor="rowSpacing" className="block text-sm font-medium text-gray-700">
                Row Spacing (inches)
              </label>
              <input
                type="text"
                onChange={(e) => setRowSpacing(e.target.value)} value={rowSpacing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            {/* Height */}
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                Height (inches)
              </label>
              <input
                type="text"
                onChange={(e) => setHeight(e.target.value)} value={height}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/researcher/my-growing-guide')}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Guide'}
                        </button>
                    </div>
        </form>
      </div>
    </div></div>
  );
}