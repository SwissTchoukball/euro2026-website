<template>
  <main>
    <section class="l-section">
      <h2>Location</h2>
      <p class="l-paragraph">
        The <em>European Tchoukball Championships 2026</em> will take place in
        <dfn title="Magglingen is the name of the town in German, and Macolin is the name in French."
          >Magglingen/Macolin</dfn
        >, Switzerland. The town is home to a
        <a href="https://www.baspo.admin.ch/fr/centre-national-de-sport-de-macolin">national sports centre</a> with
        professional sports facilities, the <a href="https://www.baspo.admin.ch">Federal Office of Sport</a> and the
        <a href="https://www.ehsm.admin.ch/en">Swiss Federal Institute of Sport</a>.
      </p>
      <p class="l-paragraph">
        <a href="https://maps.apple.com/?q=Magglingen/Macolin">View in Maps</a>
      </p>
      <iframe
        src="//map.geo.admin.ch/#/embed?center=2582611.01,1220891.04&z=8&lang=en&bgLayer=ch.swisstopo.pixelkarte-farbe&featureInfo=tooltip"
        frameborder="0"
        class="c-location__map"
      />
      <!-- TODO: Add information about sports facilities for the competition -->
    </section>
  </main>
</template>

<style scoped>
.c-location__description {
  padding-block: var(--euro-spacing-4);
}

.c-location__map {
  width: 100%;
  height: 50vh;
  border: none;
  margin-top: var(--euro-spacing-4);
}
</style>
