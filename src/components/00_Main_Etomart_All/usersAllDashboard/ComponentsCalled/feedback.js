import React, { useState, useEffect } from 'react';

const Feedback = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>
      <div className="space-y-8">
        <Testimonials />
        <Ratings />
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch testimonials from API
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    // Simulating API call
    const response = await new Promise(resolve =>
      setTimeout(() => resolve([
        { id: 1, text: "Great service!", date: "2023-09-01" },
        { id: 2, text: "Love the app!", date: "2023-08-15" },
      ]), 500)
    );
    setTestimonials(response);
  };

  const handleAddTestimonial = async (text) => {
    // Simulating API call to add testimonial
    const newTestimonial = {
      id: Date.now(),
      text,
      date: new Date().toISOString().split('T')[0]
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleUpdateTestimonial = async (id, newText) => {
    // Simulating API call to update testimonial
    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, text: newText } : testimonial
    );
    setTestimonials(updatedTestimonials);
    setEditingId(null);
  };

  const handleDeleteTestimonial = async (id) => {
    // Simulating API call to delete testimonial
    const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(filteredTestimonials);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
      <TestimonialForm onSubmit={handleAddTestimonial} />
      <div className="mt-6 space-y-4">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="border-b pb-4 last:border-b-0">
            {editingId === testimonial.id ? (
              <TestimonialForm
                initialValue={testimonial.text}
                onSubmit={(text) => handleUpdateTestimonial(testimonial.id, text)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <p className="text-gray-800">{testimonial.text}</p>
                <p className="text-sm text-gray-500 mt-1">{testimonial.date}</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => setEditingId(testimonial.id)}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="text-red-600 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialForm = ({ onSubmit, initialValue = '', onCancel }) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        placeholder="Enter your testimonial"
        className="w-full px-3 py-2 border rounded-md resize-none"
        rows="3"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          {initialValue ? 'Update' : 'Add'} Testimonial
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Fetch ratings from API
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    // Simulating API call
    const response = await new Promise(resolve =>
      setTimeout(() => resolve([
        { id: 1, name: "Restaurant A", type: "restaurant", rating: 4 },
        { id: 2, name: "Pharmacy B", type: "pharmacy", rating: 5 },
      ]), 500)
    );
    setRatings(response);
  };

  const handleUpdateRating = async (id, newRating) => {
    // Simulating API call to update rating
    const updatedRatings = ratings.map(rating =>
      rating.id === id ? { ...rating, rating: newRating } : rating
    );
    setRatings(updatedRatings);
    setEditingId(null);
  };

  const handleDeleteRating = async (id) => {
    // Simulating API call to delete rating
    const filteredRatings = ratings.filter(rating => rating.id !== id);
    setRatings(filteredRatings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Ratings</h2>
      <div className="space-y-4">
        {ratings.map(rating => (
          <div key={rating.id} className="border-b pb-4 last:border-b-0">
            <h3 className="font-medium">{rating.name} ({rating.type})</h3>
            {editingId === rating.id ? (
              <RatingForm
                initialValue={rating.rating}
                onSubmit={(newRating) => handleUpdateRating(rating.id, newRating)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <p className="text-gray-600 mt-1">Rating: {rating.rating} / 5</p>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => setEditingId(rating.id)}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Update Rating
                  </button>
                  <button
                    onClick={() => handleDeleteRating(rating.id)}
                    className="text-red-600 text-sm font-medium"
                  >
                    Delete Rating
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingForm = ({ onSubmit, initialValue, onCancel }) => {
  const [rating, setRating] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
        className="w-full px-3 py-2 border rounded-md"
      >
        <option value="">Select rating</option>
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          Update Rating
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Feedback;