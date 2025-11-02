document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateJsonBtn");

  generateBtn.addEventListener("click", () => {
    const form = document.getElementById("introForm");

    // Build JSON object using your form's exact field names
    const jsonData = {
      firstName: form.firstName.value.trim(),
      preferredName: form.nickname.value.trim() || form.firstName.value.trim(),
      middleInitial: form.middleName.value.trim().charAt(0) || "",
      lastName: form.lastName.value.trim(),
      divider: "~",
      mascotAdjective: form.mascotAdj.value.trim(),
      mascotAnimal: form.mascotAnimal.value.trim(),
      image: document.getElementById("previewImage").src,
      imageCaption: form.caption.value.trim(),
      personalStatement: form.statement.value.trim(),
      personalBackground: form.personal.value.trim(),
      professionalBackground: form.professional.value.trim(),
      academicBackground: form.academic.value.trim(),
      subjectBackground: "",
      primaryComputer: form.computer.value.trim(),
      courses: [],
      links: [],
      quote: form.quote.value.trim(),
      quoteAuthor: form.quoteAuthor.value.trim(),
      funnyThing: form.funny.value.trim(),
      somethingToShare: form.share.value.trim()
    };

    // Collect course(s)
    document.querySelectorAll("#courses .course").forEach((course) => {
      jsonData.courses.push({
        department: course.querySelector('[name="dept"]').value.trim(),
        number: course.querySelector('[name="num"]').value.trim(),
        name: course.querySelector('[name="name"]').value.trim(),
        reason: course.querySelector('[name="reason"]').value.trim()
      });
    });

    // Collect links (up to 5)
    for (let i = 1; i <= 5; i++) {
      const linkValue = form[`link${i}`].value.trim();
      if (linkValue) {
        jsonData.links.push({
          name: `Link ${i}`,
          href: linkValue
        });
      }
    }

    // Convert to pretty JSON string
    const formattedJSON = JSON.stringify(jsonData, null, 2);

    // Replace the form content with formatted JSON code
    const main = document.querySelector("main");
    main.innerHTML = `
      <h2>Introduction HTML</h2>
      <section>
        <pre><code class="language-json">${formattedJSON}</code></pre>
      </section>
    `;

    // Initialize syntax highlighting
    hljs.highlightAll();
  });
});
