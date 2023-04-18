import { useState } from "preact/hooks";

export default function Form() {
  const [feedback, setFeedback] = useState<string>("");
  const [selectedStar, setSelectedStar] = useState<number>(-1);

  return (
    <form class="ff-form">
      <h2 class="ff-form-header">How would you rate your experience?</h2>
      <div class="ff-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            onClick={() => setSelectedStar(star)}
            key={star}
            class={`ff-star ${selectedStar >= star ? "ff-selected" : ""}`}
          />
        ))}
      </div>
      <div class="ff-form-textarea">
        <h3>How can we improve?</h3>
        <textarea
          class="ff-textarea"
          rows={10}
          value={feedback}
          onChange={(e) => setFeedback(e?.currentTarget.value)}
        />
      </div>
    </form>
  );
}
