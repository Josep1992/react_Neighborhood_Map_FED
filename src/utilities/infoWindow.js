export const infoWindowContent = (
  title,
  subtitle,
  city = '<i class="fas fa-skull-crossbones"></i>',
  postalCode = '<i class="fas fa-skull-crossbones"></i>',
  address = '<i class="fas fa-skull-crossbones"></i>',
  lat,
  lng,
) => {
  const content = `
  <div class='infoWindow-wrapper'>
    <header class='infoWindow-header'>
      <h1><strong>${title}</strong></h1>
      <h2><strong>${subtitle}</strong></h2>
    </header>
    <section class='infoWindow-content'>
      <ul class='infoWindow-list'>
        <li class='infoWindow-list-item'><strong><i class="fas fa-map-marked-alt"></i> Address:</strong> ${address}</li>
        <li class='infoWindow-list-item'><strong><i class="fas fa-city"></i> City:</strong> ${city}</li>
        <li class='infoWindow-list-item'><strong><i class="fas fa-flushed"></i> ZipCode:</strong> ${postalCode}</li>
        <li class='infoWindow-list-item'><strong><i class="fas fa-compass"></i> Latitude:</strong> ${lat}</li>
        <li class='infoWindow-list-item'><strong><i class="fas fa-compass"></i> Longitude:</strong> ${lng}</li>
      </ul>
    </section>
  </div>
  `;
  return content;
};
