import { useState } from "preact/hooks";

const SuccessIcon = () => (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    class="ff-success-icon"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
  </svg>
);

const ErrorIcon = () => (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    class="ff-error-icon"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
  </svg>
);

export default function Form() {
  const [feedback, setFeedback] = useState<string>("");
  const [selectedStar, setSelectedStar] = useState<number>(4);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();

  return (
    <form
      class="ff-form"
      onSubmit={(e) => {
        e.preventDefault();
        const url = process.env.API_URL;

        if (!url) {
          console.error(
            "API URL missing. Define it using the API_URL environment variable."
          );
          return;
        }

        setError(undefined);
        setSuccess(undefined);

        fetch(`${url.replace(/\/$/, "")}/submit`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            stars: selectedStar,
            feedback,
          }),
        })
          .then(() => {
            setSuccess("Your feedback was submitted successfully. Thank you!");
          })
          .catch(() => {
            setError(
              "Something went wrong while submitting the feedback. Please try again."
            );
          });
      }}
    >
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
            rows={8}
            placeholder={"Describe your experience here"}
            value={feedback}
            onChange={(e) => setFeedback(e?.currentTarget.value)}
          />
        </div>
        {error || success ? (
          <div class="ff-alert">
            {success && <SuccessIcon />}
            {error && <ErrorIcon />} {success || error}
          </div>
        ) : (
          ""
        )}
        <div class="ff-form-footer">
          <button class="ff-form-submit">SUBMIT</button>
        </div>
      </div>
    </form>
  );
}
