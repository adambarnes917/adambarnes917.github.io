// hide news items only if present (original slider)
(function startNewsSlider() {
  const items = document.querySelectorAll(".news-item");
  if (!items.length) return;
  let idx = 0;
  items.forEach(i => i.style.display = "none");
  items[0].style.display = "block";
  setInterval(() => {
    items[idx].style.display = "none";
    idx = (idx + 1) % items.length;
    items[idx].style.display = "block";
  }, 2500);
})();

// Contact form handler (simple)
document.addEventListener("submit", function(e) {
  const form = e.target;
  if (form && form.id === "contactForm") {
    e.preventDefault();
    document.getElementById("formStatus").textContent =
      "Thank you! Your message has been sent.";
    form.reset();
  }
}, true);


// Robust AJAX loader for schedule
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("loadSchedule");
  const out = document.getElementById("scheduleResults");
  const err = document.getElementById("scheduleError");

  if (!btn) return;

  btn.addEventListener("click", function() {
    out.innerHTML = "Loading schedule...";
    err.textContent = "";

    fetch("data/schedule.json", { cache: "no-store" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not OK (status " + response.status + ")");
        }
        return response.json();
      })
      .then(data => {
        // Accept either an array or an object with "games" key
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data.games)) {
          list = data.games;
        } else {
          throw new Error("Unexpected schedule JSON format. Expected an array or { games: [...] }.");
        }

        if (!list.length) {
          out.innerHTML = "<p>No scheduled items found.</p>";
          return;
        }

        // Render as a table for readability
        let html = `<table class="schedule-table" style="width:100%;border-collapse:collapse">
                      <thead>
                        <tr>
                          <th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">Date</th>
                          <th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">Time</th>
                          <th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">Event</th>
                          <th style="text-align:left;padding:8px;border-bottom:1px solid #ddd">Location</th>
                        </tr>
                      </thead>
                      <tbody>`;
        list.forEach(item => {
          const date = item.date || item.day || "TBD";
          const time = item.time || item.start || "TBD";
          const event = item.event || item.title || item.opponent || "Practice";
          const loc = item.location || item.venue || "-";
          html += `<tr>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0">${escapeHtml(date)}</td>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0">${escapeHtml(time)}</td>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0">${escapeHtml(event)}</td>
                    <td style="padding:8px;border-bottom:1px solid #f0f0f0">${escapeHtml(loc)}</td>
                  </tr>`;
        });
        html += `</tbody></table>`;
        out.innerHTML = html;
      })
      .catch(fetchErr => {
        console.error(fetchErr);
        out.innerHTML = "";
        err.textContent = "Could not load schedule: " + fetchErr.message + ". Check console for details.";
      });
  });
});

// small helper to prevent XSS in inserted text
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str.replace(/[&<>"']/g, function(m) {
    return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m];
  });
}
