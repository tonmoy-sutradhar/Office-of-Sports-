import { Button, Modal, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import api from "../api/api";
import Cookies from "js-cookie";

interface FeedbackProps {
  bookingId: number;
}

export function Feedback({ bookingId }: FeedbackProps) {
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setComment('');
    setRating(1); // Reset to the default rating
  }

  async function handleSubmitFeedback() {
    setSubmitting(true);
    const token = Cookies.get("accessToken"); // Assuming you're using cookies to store the token
    if (!token) {
      alert("You are not logged in. Please log in and try again.");
      setSubmitting(false);
      return;
    }
    try {
      // Adjust URL and data payload as necessary
      const response = await api.post('/feedbacks/addFeedback', {
        bookingId,
        comment,
        rating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Feedback submitted successfully!");
      onCloseModal();
    } catch (error) {
      alert("Failed to submit feedback. Please try again.");
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button className="text-black" onClick={() => setOpenModal(true)}>Leave Feedback</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Feedback</h3>
          <Button className="text-black" onClick={onCloseModal} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </Button>
        </div>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="comment" value="Your Comment" />
              <TextInput
                id="comment"
                type="text"
                placeholder="Enter your feedback"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <div>
              <Label value="Your Rating" />
              <div className="rating">
                {[1, 2, 3, 4, 5].map((num) => (
                  <input 
                    key={num}
                    type="radio" 
                    name="rating" 
                    className="mask mask-star" 
                    checked={rating === num}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    value={num}
                  />
                ))}
              </div>
            </div>
            <Button onClick={handleSubmitFeedback} disabled={submitting} className="text-black">
              {submitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
