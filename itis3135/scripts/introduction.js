const form = document.getElementById("introForm");
const clearBtn = document.getElementById("clearBtn");
const addCourseBtn = document.getElementById("addCourse");

function buildIntroPage() {
  const data = new FormData(form);
  form.style.display = "none";

  // Collect valid links (ignore blanks)
  const links = [];
  for (let i = 1; i <= 5; i++) {
    const link = data.get(`link${i}`);
    if (link) links.push(link);
  }

  const introHTML = `
    <h3>${data.get("firstName")} ${data.get("lastName")} | ${data.get("mascotAdj")} ${data.get("mascotAnimal")}</h3>
    <p>${data.get("acknowledge")} ${data.get("ackDate")}</p>
    <figure>
      <img src="${document.getElementById("previewImage").src}" alt="User image">
      <figcaption>${data.get("caption")}</figcaption>
    </figure>
    <p>${data.get("statement")}</p>
    <ul>
      <li><p>Personal Background: ${data.get("personal")}</p></li>
      <li><p>Professional Background: ${data.get("professional")}</p></li>
      <li><p>Academic Background: ${data.get("academic")}</p></li>
      <li><p>Primary Computer: ${data.get("computer")}</p></li>
      <li><p>Courses I’m Taking & Why:</p></li>
      <ul>
        ${Array.from(document.querySelectorAll(".course"))
          .map((course) => {
            const inputs = course.querySelectorAll("input");
            return `<li><p>${inputs[0].value}-${inputs[1].value} ${inputs[2].value}: ${inputs[3].value}</p></li>`;
          })
          .join("")}
      </ul>
    </ul>
    <blockquote>"${data.get("quote")}"<br><em>— ${data.get("quoteAuthor")}</em></blockquote>
    ${
      data.get("funny")
        ? `<p><strong>Funny Thing:</strong> ${data.get("funny")}</p>`
        : ""
    }
    ${
      data.get("share")
        ? `<p><strong>Something I’d Like to Share:</strong> ${data.get("share")}</p>`
        : ""
    }
    ${
      links.length
        ? `<p><strong>My Links:</strong></p><ul>${links
            .map((link) => `<li><a href="${link}" target="_blank">${link}</a></li>`)
            .join("")}</ul>`
        : ""
    }
    <a href="#" id="resetForm">Start Over</a>
  `;

  const main = document.querySelector("main");
  const section = document.createElement("section");
  section.innerHTML = introHTML;
  main.appendChild(section);

  document.getElementById("resetForm").addEventListener("click", () => {
    section.remove();
    form.style.display = "block";
  });
}

// Prevent default form behavior
form.addEventListener("submit", (e) => {
  e.preventDefault();
  buildIntroPage();
});

// Clear button
clearBtn.addEventListener("click", () => {
  form.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
});

// Add new course dynamically
addCourseBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("course");
  div.innerHTML = `
    <input type="text" placeholder="Department" required>
    <input type="text" placeholder="Number" required>
    <input type="text" placeholder="Course Name" required>
    <input type="text" placeholder="Reason" required>
    <button type="button" class="deleteCourse">Delete</button>
  `;
  document.getElementById("courses").appendChild(div);
  div.querySelector(".deleteCourse").addEventListener("click", () => div.remove());
});

// Image preview
document.getElementById("photo").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById("previewImage").src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});


