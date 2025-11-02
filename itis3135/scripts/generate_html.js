document.addEventListener("DOMContentLoaded", () => {
  const htmlBtn = document.getElementById("generateHtmlBtn");

  htmlBtn.addEventListener("click", () => {
    const form = document.getElementById("introForm");

    // Gather data from your existing form
    const firstName = form.firstName.value.trim();
    const middleName = form.middleName.value.trim();
    const nickname = form.nickname.value.trim();
    const lastName = form.lastName.value.trim();
    const mascotAdj = form.mascotAdj.value.trim();
    const mascotAnimal = form.mascotAnimal.value.trim();
    const imageSrc = document.getElementById("previewImage").src;
    const imageCaption = form.caption.value.trim();
    const personal = form.personal.value.trim();
    const professional = form.professional.value.trim();
    const academic = form.academic.value.trim();
    const computer = form.computer.value.trim();
    const quote = form.quote.value.trim();
    const quoteAuthor = form.quoteAuthor.value.trim();
    const funny = form.funny.value.trim();
    const share = form.share.value.trim();

    // Collect courses
    let coursesHTML = "";
    document.querySelectorAll("#courses .course").forEach((course) => {
      const dept = course.querySelector('[name="dept"]').value.trim();
      const num = course.querySelector('[name="num"]').value.trim();
      const name = course.querySelector('[name="name"]').value.trim();
      const reason = course.querySelector('[name="reason"]').value.trim();
      coursesHTML += `
        <li><strong>${dept} ${num} ${name}:</strong> ${reason}</li>`;
    });

    // Collect links
    let linksHTML = "";
    for (let i = 1; i <= 5; i++) {
      const link = form[`link${i}`].value.trim();
      if (link) {
        linksHTML += `
        <li><a href="${link}" target="_blank">${link}</a></li>`;
      }
    }

    // Build HTML string (escaped for display)
    const htmlString = `
<h2>Introduction HTML</h2>
<h3>${firstName}${middleName ? middleName.charAt(0) + "." : ""} "${nickname || firstName}" ${lastName} ★ ${mascotAdj} ${mascotAnimal}</h3>
<figure>
  <img src="${imageSrc}" alt="${imageCaption}">
  <figcaption>${imageCaption}</figcaption>
</figure>
<ul>
  <li><strong>Personal Background:</strong> ${personal}</li>
  <li><strong>Professional Background:</strong> ${professional}</li>
  <li><strong>Academic Background:</strong> ${academic}</li>
  <li><strong>Primary Computer:</strong> ${computer}</li>
</ul>
<h4>Courses I'm Taking</h4>
<ul>${coursesHTML}</ul>
<h4>Quote</h4>
<blockquote>"${quote}" — ${quoteAuthor}</blockquote>
${funny ? `<p><strong>Funny Thing:</strong> ${funny}</p>` : ""}
${share ? `<p><strong>Something I'd Like to Share:</strong> ${share}</p>` : ""}
<h4>Links</h4>
<ul>${linksHTML}</ul>`;

    // Replace the form content with highlighted HTML code
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML</h2>
      <section>
        <pre><code class="language-html">${htmlString.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
      </section>
    `;

    // Re-run highlight.js
    hljs.highlightAll();
  });
});
