export const infoWindowContent = (name, city, postalCode, state) => {
  const content = `
  <div style="text-align:center,margin-top:1em">
    <header>
      <p>${name}</p>
    </header>
    <section>
      <ul style='list-style:none'>
        <li>${state}</li>
        <li>${city}</li>
        <li>${postalCode}</li>
      </ul>
    </section>
  </div>
  `;
  return content;
};
