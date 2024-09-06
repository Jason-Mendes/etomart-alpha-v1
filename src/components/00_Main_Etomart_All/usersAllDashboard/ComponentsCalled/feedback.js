import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Edit2, Trash2, MessageSquare, ThumbsUp, X } from 'lucide-react';
const Feedback = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
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
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const response = await new Promise(resolve =>
      setTimeout(() => resolve([
        { id: 1, text: "Great service!", date: "2023-09-01", rating: 5 },
        { id: 2, text: "Love the app!", date: "2023-08-15", rating: 4 },
      ]), 500)
    );
    setTestimonials(response);
  };

  const handleAddTestimonial = async (text, rating) => {
    const newTestimonial = {
      id: Date.now(),
      text,
      date: new Date().toISOString().split('T')[0],
      rating
    };
    setTestimonials([...testimonials, newTestimonial]);
  };

  const handleUpdateTestimonial = async (id, newText, newRating) => {
    const updatedTestimonials = testimonials.map(testimonial =>
      testimonial.id === id ? { ...testimonial, text: newText, rating: newRating } : testimonial
    );
    setTestimonials(updatedTestimonials);
    setEditingId(null);
  };

  const handleDeleteTestimonial = async (id) => {
    const filteredTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
    setTestimonials(filteredTestimonials);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <MessageSquare className="mr-2 text-orange-600" /> Testimonials
      </h2>
      <TestimonialForm onSubmit={handleAddTestimonial} />
      <div className="mt-6 space-y-4">
        <AnimatePresence>
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border-b pb-4 last:border-b-0"
            >
              {editingId === testimonial.id ? (
                <TestimonialForm
                  initialValue={testimonial.text}
                  initialRating={testimonial.rating}
                  onSubmit={(text, rating) => handleUpdateTestimonial(testimonial.id, text, rating)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <div className="flex items-center mb-2">
                    <StarRating rating={testimonial.rating} />
                    <p className="text-sm text-gray-500 ml-2">{testimonial.date}</p>
                  </div>
                  <p className="text-gray-800">{testimonial.text}</p>
                  <div className="mt-2 space-x-2">
                    <motion.button
                      onClick={() => setEditingId(testimonial.id)}
                      className="text-orange-600 text-sm font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 size={16} className="mr-1" /> Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="text-red-600 text-sm font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const TestimonialForm = ({ onSubmit, initialValue = '', initialRating = 5, onCancel }) => {
  const [text, setText] = useState(initialValue);
  const [rating, setRating] = useState(initialRating);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text, rating);
    setText('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
        <StarRating rating={rating} setRating={setRating} editable />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        placeholder="Enter your testimonial"
        className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
        rows="3"
      />
      <div className="flex space-x-2">
        <motion.button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare size={16} className="mr-2" />
          {initialValue ? 'Update' : 'Add'} Testimonial
        </motion.button>
        {onCancel && (
          <motion.button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={16} className="mr-2" />
            Cancel
          </motion.button>
        )}
      </div>
    </form>
  );
};

const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const response = await new Promise(resolve =>
      setTimeout(() => resolve([
        { id: 1, name: "Restaurant A", type: "restaurant", rating: 4 },
        { id: 2, name: "Pharmacy B", type: "pharmacy", rating: 5 },
      ]), 500)
    );
    setRatings(response);
  };

  const handleUpdateRating = async (id, newRating) => {
    const updatedRatings = ratings.map(rating =>
      rating.id === id ? { ...rating, rating: newRating } : rating
    );
    setRatings(updatedRatings);
    setEditingId(null);
  };

  const handleDeleteRating = async (id) => {
    const filteredRatings = ratings.filter(rating => rating.id !== id);
    setRatings(filteredRatings);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ThumbsUp className="mr-2 text-orange-600" /> Ratings
      </h2>
      <div className="space-y-4">
        <AnimatePresence>
          {ratings.map(rating => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border-b pb-4 last:border-b-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{rating.name}</h3>
                  <p className="text-sm text-gray-600">{rating.type}</p>
                </div>
                {editingId === rating.id ? (
                  <RatingForm
                    initialValue={rating.rating}
                    onSubmit={(newRating) => handleUpdateRating(rating.id, newRating)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex items-center">
                    <StarRating rating={rating.rating} />
                    <div className="ml-4 space-x-2">
                      <motion.button
                        onClick={() => setEditingId(rating.id)}
                        className="text-orange-600 text-sm font-medium flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit2 size={16} className="mr-1" /> Edit
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteRating(rating.id)}
                        className="text-red-600 text-sm font-medium flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 size={16} className="mr-1" /> Delete
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <StarRating rating={rating} setRating={setRating} editable />
      <motion.button
        type="submit"
        className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-orange-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Update
      </motion.button>
      <motion.button
        type="button"
        onClick={onCancel}
        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Cancel
      </motion.button>
    </form>
  );
};

const StarRating = ({ rating, setRating, editable = false }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => editable && setRating(star)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${editable ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Star
            size={20}
            className={`${
              star <= rating ? 'text-orange-600 fill-current' : 'text-gray-300'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};

export default Feedback;