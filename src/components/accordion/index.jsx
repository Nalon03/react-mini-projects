// single selection
// multiple selection

import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);

  function handleSingleSelection(getCurrentItemId) {
    setSelected(getCurrentItemId === selected ? null : getCurrentItemId);
  }

  return (
    <div className="acc-wrapper">
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="acc-item">
              <div
                className="acc-title"
                onClick={() => handleSingleSelection(item.id)}
              >
                <h3>{item.title}</h3>
                <span>+</span>
              </div>
              <div className="acc-content">
                {selected === item.id ? <div>{item.content}</div> : null}
              </div>
            </div>
          ))
        ) : (
          <div>No Accordion Found</div>
        )}
      </div>
    </div>
  );
}
