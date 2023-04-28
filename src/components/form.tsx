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

const SpinnerIcon = () => (
  // Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
  <svg viewBox="0 0 512 512" class="ff-spinner-icon">
    <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
  </svg>
);

export default function Form() {
  const [feedback, setFeedback] = useState<string>("");
  const [selectedStar, setSelectedStar] = useState<number>(4);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [loading, setLoading] = useState(false);

  return (
    <form
      class="ff-form"
      onSubmit={(e) => {
        e.preventDefault();
        const url = process.env.FF_API_URL;

        if (!url) {
          console.error(
            "API URL missing. Define it using the FF_API_URL environment variable."
          );
          return;
        }

        setError(undefined);
        setSuccess(undefined);
        setLoading(true);

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
          })
          .finally(() => {
            setLoading(false);
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
          <button
            class={`ff-form-submit${loading ? " ff-form-submit-loading" : ""}`}
          >
            <span style={{ visibility: loading ? "hidden" : "visible" }}>
              SUBMIT
            </span>
            {loading && <SpinnerIcon />}
          </button>
        </div>
      </div>
    </form>
  );
}
