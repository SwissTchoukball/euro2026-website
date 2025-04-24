<template>
  <main>
    <img src="/logo_euro2026.svg" alt="Logo of the European Tchoukball Championships 2026" class="logo" />
    <h1>
      <abbr title="Fédération Internationale de Tchoukball (International Tchoukball Federation)">FITB</abbr>
      European Tchoukball Championships 2026
    </h1>
    <p class="dates">🗓️ <time datetime="2026-08-01">1</time> – <time datetime="2026-08-08">8 August 2026</time></p>
    <p>Youth competitions: 1 – 3 August<br />Adults competitions: 5 – 8 August</p>
    <p class="location">📍 <a href="https://s.geo.admin.ch/svyhhn08na8p">Magglingen/Macolin, Switzerland</a></p>
    <p>Come back soon, for more information about the event.</p>
    <p>🤲 <a href="https://tchouk.ch/benevoles-euro2026">Devenir bénévole</a></p>
    <p>
      <small>
        Organised by <a href="https://tchoukball.ch">Swiss Tchoukball</a> under the supervision of the
        <a href="https://tchoukball.eu">European Tchoukball Federation</a>.
      </small>
    </p>
    <div class="social-icons">
      <a
        href="https://instagram.com/euro2026tchoukball"
        class="social-logo-link"
        title="Instagram account of the European Tchoukball Championships 2026"
      >
        <svg
          class="social-logo"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="instagram"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
          ></path>
        </svg>
      </a>
      <a
        href="https://facebook.com/euro2026tchoukball"
        class="social-logo-link"
        title="Facebook account of the European Tchoukball Championships 2026"
      >
        <svg
          class="social-logo"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="facebook"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
          ></path>
        </svg>
      </a>
    </div>
  </main>
</template>

<style scoped>
.logo {
  width: 80vw;
  max-width: 300px;
  margin-bottom: 2rem;
}

.dates {
  font-size: 1.5rem;
  font-weight: bold;
}

.location {
  font-size: 1.1rem;
  font-weight: bold;
}

.social-icons {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.social-logo {
  width: 2rem;
}

.social-logo-link {
  color: #999;
  text-decoration: none;
}

.social-logo-link:hover {
  color: #000;
}
</style>
