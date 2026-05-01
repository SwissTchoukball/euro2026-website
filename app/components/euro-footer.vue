<template>
  <footer class="c-footer">
    <div class="c-footer__sponsors">
      <h3 class="t-headline-3">{{ $t("sponsors.main") }}</h3>
      <ul class="u-unstyled-list c-footer__sponsors-list">
        <li>
          <a
            href="https://www.linkedin.com/company/pro-gaïa-invest-sa"
            class="c-footer__sponsor c-footer__sponsor--main"
          >
            <img
              class="c-footer__sponsor-logo"
              src="/images/logo-pro-gaia-invest.svg"
              alt="Logo of Pro Gaïa Invest SA"
            />
          </a>
        </li>
      </ul>

      <h3 class="t-headline-4">{{ $t("sponsors.operational") }}</h3>
      <ul class="u-unstyled-list c-footer__sponsors-list">
        <li>
          <a
            href="https://baspo.admin.ch"
            class="c-footer__sponsor c-footer__sponsor--secondary c-footer__sponsor--ofspo"
          >
            <img
              class="c-footer__sponsor-logo"
              src="/images/logo-swiss-confederation.svg"
              alt="Logo of the Swiss Confederation"
            />
            <div class="c-footer__sponsor-ofspo-text">{{ $t("sponsors.federalOfficeOfSport") }}</div>
          </a>
        </li>
        <li>
          <a href="https://peerdom.com" class="c-footer__sponsor c-footer__sponsor--secondary">
            <img class="c-footer__sponsor-logo" src="/images/logo-peerdom.svg" alt="Logo of Peerdom" />
          </a>
        </li>
      </ul>
    </div>

    <div class="c-footer__about">
      <i18n-t keypath="about.intro">
        <template #formattedEtc>
          <em>{{ $t("etc.long") }}</em>
        </template>
        <template #formattedFitb>
          <a href="https://fitb.org">{{ $t("fitb.long") }}</a>
        </template>
        <template #formattedEtbf>
          <a href="https://tchoukball.eu">{{ $t("etbf.long") }}</a>
        </template>
        <template #formattedSwissTchoukball>
          <a href="https://tchoukball.ch">Swiss Tchoukball</a>
        </template>
      </i18n-t>

      <ul class="u-unstyled-list c-footer__federation-logos">
        <li>
          <a href="https://fitb.org" :title="$t('websiteOf', { name: $t('fitb.longWithDefiniteArticle') })">
            <img class="c-footer__federation-logo" src="/images/logo-fitb.svg" alt="Logo of the FITB" />
          </a>
        </li>
        <li>
          <a href="https://etbf.org" :title="$t('websiteOf', { name: $t('etbf.longWithDefiniteArticle') })">
            <img class="c-footer__federation-logo" src="/images/logo-etbf.svg" alt="Logo of the ETBF" />
          </a>
        </li>
        <li>
          <a href="https://tchoukball.ch" :title="$t('websiteOf', { name: 'Swiss Tchoukball' })">
            <img
              class="c-footer__federation-logo"
              src="/images/logo-swiss-tchoukball.svg"
              alt="Logo of Swiss Tchoukball"
            />
          </a>
        </li>
      </ul>
    </div>

    <div class="c-footer__social-icons">
      <a
        href="https://instagram.com/euro2026tchoukball"
        class="c-footer__social-logo-link"
        title="Instagram account of the European Tchoukball Championships 2026"
      >
        <Icon name="lineicons:instagram" class="c-footer__social-logo" />
      </a>
      <a
        href="https://facebook.com/euro2026tchoukball"
        class="c-footer__social-logo-link"
        title="Facebook account of the European Tchoukball Championships 2026"
      >
        <Icon name="lineicons:facebook" class="c-footer__social-logo" />
      </a>
      <a
        href="https://tiktok.com/@euro2026tchoukball"
        class="c-footer__social-logo-link"
        title="TikTok account of the European Tchoukball Championships 2026"
      >
        <Icon name="lineicons:tiktok" class="c-footer__social-logo" />
      </a>
    </div>
  </footer>
</template>

<style scoped>
.c-footer {
  margin-top: var(--euro-spacing-8);
}

.c-footer__sponsors {
  text-align: center;
  padding-block: var(--euro-spacing-8);
  background-color: var(--euro-gray-050);

  h3:not(:first-child) {
    margin-top: var(--euro-spacing-6);
  }
}

.c-footer__sponsors-list {
  margin-top: var(--euro-spacing-4);

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: var(--euro-spacing-8);
}

.c-footer__sponsor {
  display: block;
  text-decoration: none;
  color: black;

  &.c-footer__sponsor--main {
    height: 6rem;
    width: 12rem;
  }

  &.c-footer__sponsor--secondary {
    height: 4rem;
    width: 8rem;
  }

  /* Although they're secondary, just to make their logo readable, we make it bigger. */
  &.c-footer__sponsor--ofspo {
    height: 6rem;
    width: 12rem;
  }
}

.c-footer__sponsor-logo {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.c-footer__sponsor-ofspo-text {
  text-align: left;
  font-weight: bold;
  font-size: 0.6rem;
  padding-left: 37px;
  transform: translateY(-20px);
}

.c-footer__about {
  margin: var(--euro-spacing-8);
  font-size: 0.8rem;
  text-align: center;
}

.c-footer__federation-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--euro-spacing-8);
  gap: var(--euro-spacing-8);
}

.c-footer__federation-logo {
  height: 5vw;
  max-height: 3rem;
}

.c-footer__social-icons {
  padding-block: var(--euro-spacing-4);

  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--euro-sky-blue-500);
}

.c-footer__social-logo {
  width: 2.5rem;
  height: 2.5rem;
}

.c-footer__social-logo-link {
  color: white;
  text-decoration: none;
}

.c-footer__social-logo-link:hover {
  color: #000;
}
</style>
