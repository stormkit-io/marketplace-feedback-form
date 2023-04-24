import { render } from "preact";
import { useState } from "preact/hooks";
import Button from "./components/button";
import Form from "./components/form";
import css from "./index.css?inline";

if (!document.head.querySelector("#ff-css")) {
  const style = document.createElement("style");
  style.innerHTML = css;
  style.id = "ff-css";
  document.head.appendChild(style);
}

function Widget() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div class="ff-wrapper">
      <div class="ff-inner-wrapper">
        {showForm && <Form />}
        <Button onClick={() => setShowForm(!showForm)} />
      </div>
    </div>
  );
}

const div = document.createElement("div");
document.body.appendChild(div);

render(<Widget />, div);
