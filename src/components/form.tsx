import { useState } from "preact/hooks";

export default function Form() {
  const [feedback, setFeedback] = useState<string>("");
  const [selectedStar, setSelectedStar] = useState<number>(4);

  return (
    <form class="ff-form">
      <div class="ff-form-header-wrapper">
        <h2 class="ff-form-header">Send us your feedback!</h2>
        <h3 class="ff-form-subheader">
          <span class="ff-text-opaque">
            Have a suggestion or found a bug? Let us know.
          </span>
        </h3>
      </div>
      <div class="ff-form-body-wrapper">
        <p class="ff-label">How was your experience?</p>
        <div class="ff-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedStar(star);
              }}
              key={star}
              class={`ff-star ${selectedStar >= star ? "ff-selected" : ""}`}
            />
          ))}
        </div>
        <div class="ff-form-textarea">
          <textarea
            autoFocus
            id="ff-textarea"
            class="ff-textarea"
            rows={10}
            placeholder={"Describe your experience here"}
            value={feedback}
            onChange={(e) => setFeedback(e?.currentTarget.value)}
          />
        </div>
        <div class="ff-form-footer">
          <button class="ff-form-submit">SUBMIT</button>
        </div>
      </div>
    </form>
  );
}
