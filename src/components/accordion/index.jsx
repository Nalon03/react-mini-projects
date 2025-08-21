import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordion() {
  const [openIds, setOpenIds] = useState([]);
  const [multi, setMulti] = useState(false);

  const isOpen = (id) => openIds.includes(id);

  const toggleId = (id) => {
    setOpenIds((prev) => {
      const set = new Set(prev);
      if (set.has(id)) set.delete(id);
      else {
        if (!multi) set.clear();

        set.add(id);
      }
      return Array.from(set);
    });
  };

  const switchMode = () => {
    setMulti((prev) => !prev);
    setOpenIds((prev) => (prev.length > 1 ? [prev[0]] : prev));
  };

  return (
    <div className="acc-wrapper">
      <button className="multi-button" onClick={switchMode}>
        {multi ? "Switch to Single Selection" : "Enable Multiple Selection"}
      </button>

      <div className="accordion" role="list">
        {data && data.length ? (
          data.map((item) => {
            const open = isOpen(item.id);
            const contentId = `acc-panel-${item.id}`;
            const buttonId = `acc-button-${item.id}`;

            return (
              <div key={item.id} className="acc-item" role="listitem">
                <div
                  id={buttonId}
                  className="acc-title"
                  aria-expanded={open}
                  aria-controls={contentId}
                  onClick={() => toggleId(item.id)}
                >
                  <h3>{item.title}</h3>
                  <span>{open ? "−" : "+"}</span>
                </div>

                {open && (
                  <div
                    id={contentId}
                    className="acc-content"
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    {item.content}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="acc-content">No Accordion Found</div>
        )}
      </div>
    </div>
  );
}
