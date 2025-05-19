import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getResearcherId } from '../utils/auth'

export default function GrowingGuideForm() {

    const [title, setTitle] = useState('')
    const [bName, setBName] = useState('')
    const [description, setDescription] = useState('')
    const [sunReq, setSunReq] = useState('')
    const [watering, setWatering] = useState('')
    const [soilReq, setSoilReq] = useState('')
    const [sowing, setSowing] = useState('')
    const [spread, setSpread] = useState('')
    const [rowSpacing, setRowSpacing] = useState('')
    const [height, setHeight] = useState('')
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if(!user) {
        //     setError('You must be loged in ')
        //     return 
        //   }

        setIsSubmitting(true); // Set loading state
        setError(null); // Clear previous errors

         // Get the researcher's ID
        const researcherId = getResearcherId();
        if (!researcherId) {
          setError('You must be logged in as a researcher to submit news.');
          setIsSubmitting(false);
          return;
        }

        const data = new FormData();
        data.set('title', title);
        data.set('binominalName', bName);
        data.set('description', description);
        data.set('sunRequirement', sunReq);
        data.set('soilRequirements', soilReq);
        data.set('sowingMethod', sowing);
        data.set('wateringNeeds', watering);
        data.set('spread', spread);
        data.set('rowSpacing', rowSpacing);
        data.set('height', height);
        data.set('user_id', researcherId);

        // Only add file if it exists
        if (file && file[0]) {
            data.set('file', file[0])
        }


        try {
            const response = await fetch('http://localhost:3000/api/researcher/posts', {
            method: 'POST',
            body: data,
           credentials: 'include',
         });
      
          const json = await response.json();
      
          if (!response.ok) {
            setError(json.error);
          }
      
          if (response.ok) {
            setTitle('')
            setBName('')
            setDescription('')
            setSunReq('')
            setWatering('')
            setSoilReq('')
            setSowing('')
            setSpread('')
            setRowSpacing('')
            setHeight('')
            setFile(null)

            console.log('Post Added Successfully', json);
          }
      
            // Redirect to the same page to refresh data
            navigate(0); // Reloads the current page
          }  catch (error) {
            setError(error.message); // Set error message
          } finally {
            setIsSubmitting(false); // Reset loading state
          }
    }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-green-700 ml-40">Create Growing Guide Post</h2>
        <form className="space-y-4" onSubmit={handleSubmit} >
            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Title*</label>
                <input 
                  type="text" 
                  placeholder='Enter title' 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Binominal Name (Scientific Name)</label>
                <input 
                  type="text" 
                  placeholder='Enter binominal name' 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setBName(e.target.value)}
                  value={bName}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Description*</label>
                <textarea 
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Sun Requirements*</label>
                    <input 
                      type="text" 
                      placeholder='Enter sun requirements' 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setSunReq(e.target.value)}
                      value={sunReq} 
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Watering Needs*</label>
                    <input 
                      type="text" 
                      placeholder='Enter watering needs' 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setWatering(e.target.value)}
                      value={watering}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Soil Requirements*</label>
                <input 
                  type="text" 
                  placeholder='Enter soil requirements' 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setSoilReq(e.target.value)}
                  value={soilReq}
                />
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Sowing Method</label>
                <input 
                  type="text" 
                  placeholder='Enter sowing method' 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setSowing(e.target.value)}
                  value={sowing}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Spread (cm)</label>
                    <input 
                      type="text" 
                      placeholder='Enter spread' 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setSpread(e.target.value)}
                      value={spread}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Row Spacing (cm)</label>
                    <input 
                      type="text" 
                      placeholder='Enter row spacing' 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                     onChange={(e) => setRowSpacing(e.target.value)}
                     value={rowSpacing}
                  />
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Height (cm)</label>
                    <input 
                      type="text" 
                      placeholder='Enter height' 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      onChange={(e) => setHeight(e.target.value)}
                      value={height}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-gray-700 font-medium">Upload Image</label>
                <input type="file"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                onChange={(e) => setFile(e.target.files)}/>
            </div>

            <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </button>

            </div>
            {/* Error Message */}
            {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
            </div>
            )}
        </form>
    </div>
  )
}