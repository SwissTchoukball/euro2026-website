<template>
  <main>
    <section class="l-section l-section--centered-text">
      <h2 class="t-headline-1">Information for teams</h2>
      <p class="l-paragraph">
        Link to this page: <a href="https://euro2026.ch/info-teams">euro2026.ch/info-teams</a>
        <button class="u-unstyled-button l-inline-icon-button" @click="copyPageLink">
          <Icon :icon="copyLinkIcon" name="copy" />
        </button>
      </p>
    </section>

    <section class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Table of contents</h3>
      <ul>
        <li><a href="#key-contact-information">Key contact information</a></li>
        <li><a href="#schedule">Schedule</a></li>
        <li>
          <a href="#registration-and-payment">Registration and payment</a>
          <ul>
            <li><a href="#deadlines">Deadlines</a></li>
            <li><a href="#registration-process">Registration process</a></li>
            <li><a href="#currency">Currency</a></li>
            <li><a href="#competition-fees">Competition fees</a></li>
            <li><a href="#fitb-event-fees">FITB event fees</a></li>
            <li><a href="#requirements-for-fitb-referees">Requirements for FITB referees</a></li>
            <li><a href="#banking-information">Banking information</a></li>
            <li><a href="#insurance">Insurance</a></li>
          </ul>
        </li>
        <li><a href="#competition-rules">Competition rules</a></li>
        <li>
          <a href="#location-and-venues">Location and venues</a>
          <ul>
            <li><a href="#magglingen-macolin">Magglingen/Macolin</a></li>
            <li><a href="#accommodation">Accommodation</a></li>
            <li><a href="#catering">Catering</a></li>
            <li><a href="#sports-venues">Sports venues</a></li>
            <li><a href="#smoke-free-policy">Smoke-free policy</a></li>
          </ul>
        </li>
        <li>
          <a href="#transportation">Transportation</a>
          <ul>
            <li><a href="#from-airports-to-macolin">From airports to Macolin</a></li>
            <li><a href="#public-transport">Public transport</a></li>
            <li><a href="#parking">Parking</a></li>
          </ul>
        </li>
        <li>
          <a href="#other-information">Other information</a>
          <ul>
            <li><a href="#power-outlets">Power outlets</a></li>
            <li><a href="#paying">Paying</a></li>
          </ul>
        </li>
        <li><a href="#updates">Updates to this page</a></li>
      </ul>
    </section>

    <section id="key-contact-information" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Key contact information</h3>
      <h4 class="t-headline-3">Organising committee (OC)</h4>
      <p class="l-paragraph">
        <button class="c-info-teams__toggle-map-button" @click="togglePeerdomMapVisibility">
          {{ isPeerdomMapVisible ? "Hide" : "Show" }} the organising committee organigram
        </button>
      </p>
      <iframe
        v-if="isPeerdomMapVisible"
        src="https://peerdom.org/embed/euro2026/map"
        width="100%"
        class="c-info-teams__peerdom-map l-cancel-section-padding"
        frameborder="0"
      ></iframe>
      <dl>
        <dt>Director</dt>
        <dd>Gaël Sieber</dd>
        <dt>Technical</dt>
        <dd>Pierre-Alain Girardin</dd>
        <dt>Administration</dt>
        <dd>Nanghita Sieber</dd>
        <dt>Logistics</dt>
        <dd>David Rohrbach</dd>
        <dt>Communication</dt>
        <dd>David Sandoz</dd>
      </dl>
      <h4 class="t-headline-3">Communications</h4>
      <p class="l-paragraph">
        All official communications between the organising committee, the European tchoukball federation and the teams
        will be conducted via <strong>Discord</strong>, before and during the event.
      </p>
      <p class="l-paragraph">
        <a href="https://discord.gg/R4mr7tcryy">Join the Euro 2026 Discord server</a> ·
        <a href="https://discord.com/download">Install the app</a>
      </p>
      <p class="l-paragraph">
        In addition to a global announcement channel to all teams, you will have a privileged channel for communications
        between your team, the ETBF and the OC. Moreover, as soon as you'll have registered teams, you'll get access to
        channels dedicated to specific topics such as catering, competitions, etc. Of course, direct messages to any
        individual member of the OC is also possible.
      </p>
      <p class="l-paragraph">
        As a fallback, the OC can also be reached via email at <a href="mailto:info@euro2026.ch">info@euro2026.ch</a>.
      </p>
    </section>

    <section id="schedule" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Schedule</h3>
      <p class="l-paragraph">This schedule will be updated regularly, so please check back often.</p>
      <table class="l-table l-table--styled l-table--centred c-info-teams__table">
        <thead>
          <tr>
            <th colspan="2">Friday, 31 July</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15:00 – 18:00<br /><small>Hotel check-in hours</small></td>
            <td>Arrival of youth teams</td>
          </tr>
          <tr>
            <td></td>
            <td>Opening ceremony</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Saturday, 1 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Youth competitions - Day 1</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Sunday, 2 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Youth competitions - Day 2</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Monday, 3 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Youth competitions - Day 3</td>
          </tr>
          <tr>
            <td></td>
            <td>Medals ceremony</td>
          </tr>
          <tr>
            <td></td>
            <td>Gala dinner</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Tuesday, 4 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Until 09:00<br /><small>Hotel check-out time</small></td>
            <td>Departure of youth teams</td>
          </tr>
          <tr>
            <td>15:00 – 18:00<br /><small>Hotel check-in hours</small></td>
            <td>Arrival of adults teams</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Wednesday, 5 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Adults competitions - Day 1</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Thursday, 6 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Adults competitions - Day 2</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Friday, 7 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Adults competitions - Day 3</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Saturday, 8 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Adults competitions - Day 4</td>
          </tr>
          <tr>
            <td></td>
            <td>Medals ceremony</td>
          </tr>
          <tr>
            <td></td>
            <td>Gala dinner</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <th colspan="2">Sunday, 9 August</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Until 09:00<br /><small>Hotel check-out time</small></td>
            <td>Departure of adults teams</td>
          </tr>
        </tbody>
      </table>
      <p class="l-paragraph">Note : A referee course will be organized during the event upon request.</p>
    </section>

    <section id="registration-and-payment" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Registration and payment</h3>
      <h4 id="deadlines" class="t-headline-3">Deadlines</h4>
      <table class="l-table l-table--styled l-table--centred c-info-teams__table">
        <tbody>
          <tr>
            <td>26 October 2025</td>
            <td>
              NFs register the number of teams for each category<br />
              <small>Please contact us on your Discord Chanel to find a solution</small>
            </td>
          </tr>
          <tr>
            <td>30 November 2025</td>
            <td>
              <p>
                NFs have to pay a non-refundable<sup><small>*</small></sup> deposit of 500€ per team registered to
                <a href="#banking-information">the Euro 26 account</a>
              </p>
              <p>
                <small>
                  <strong>Reason for this date</strong>: We would like to do group draw during Geneva Indoors Nations
                  Cup in December. Therefore, we need to know which teams will be participating (at least for the elite
                  men and elite women teams).
                </small>
              </p>
              <p>
                <small>
                  <sup>*</sup>The deposit will be refunded only in case of cancellation of the event, but not if caused
                  by the withdrawal of the team.
                </small>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              28 January 2026<sup><small>*</small></sup>
            </td>
            <td>
              <p>NFs must submit the list of players, staff and supporter.<br /></p>
              <p>
                <small>
                  <strong>Reason for this date</strong>: It's the date until when we have to secure all the rooms in the
                  hotel. After that, others can book rooms and we cannot ensure availability.
                </small>
              </p>
              <p>
                <small>
                  If this deadline is not respected,
                  <strong>
                    12 players and 0 supporters per team will be registered by default and be counted in the final bill.
                  </strong>
                </small>
              </p>
              <p>
                <small>
                  <sup>*</sup>For Youth categories we could accept registration until end of March, but we cannot ensure
                  rooms availabilities, in this case you will have to find accommodation in the area but we can still
                  arrange the meals if needed.
                </small>
              </p>
            </td>
          </tr>
          <tr>
            <td>28 February 2026</td>
            <td>
              <p>NFs must pay the remaining balance for all players*</p>
              <p>
                <small>
                  *OC is allowed to add an additional 300€ fees for administratives tasks if the deadline is not
                  respected
                </small>
              </p>
            </td>
          </tr>
          <tr>
            <td>28 February 2026</td>
            <td>
              <p>NFs must send the players and teams pictures to the OC.</p>
              <p>
                <small>
                  <strong>Reason for this date</strong>: We would like to promote the event through social media with
                  teams/roster presentation. After this date only 20 weeks are remaining before the event. Even with
                  this margin it would be complicated to present all teams in a reasonable pace.
                </small>
              </p>
            </td>
          </tr>
          <tr>
            <td>26 April 2026</td>
            <td>
              <p>NFs must provide the remaining information - Allergies & dietary preferences, etc.</p>
              <p>
                <small> Normal food will be ordered if information is not submitted on time </small>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <h4 id="registration-process" class="t-headline-3">Registration process</h4>
      <p class="l-paragraph">
        Each NF will be given access to a shared online spreadsheet that the OC has prepared to facilitate the
        registration process. The link will be shared to you via your NF Discord channel. Any questions specific to your
        NF registration can be asked in that channel. More general questions can be asked in the
        <a href="https://discord.com/channels/1339975634604265532/1367792773410979900">#ask-registration</a> channel, as
        they could be of interest to other NFs.
      </p>

      <h4 id="currency" class="t-headline-3">Currency</h4>
      <p class="l-paragraph">
        All fees shall be paid in CHF (Swiss francs). All bank charges for sending and receiving fees shall be paid by
        the participating country.
      </p>

      <h4 id="competition-fees" class="t-headline-3">Competition fees</h4>

      <h5 class="t-headline-4">Youth competitions</h5>

      <table class="l-table l-table--styled l-table--centred c-info-teams__table c-info-teams__table--competition-fees">
        <thead>
          <tr>
            <th></th>
            <th>Player / Coach</th>
            <th>NF Staff</th>
            <th>Supporter</th>
            <th>Gala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Accommodation</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td></td>
          </tr>
          <tr>
            <th>Food</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td></td>
          </tr>
          <tr>
            <th>Accreditation card and souvenir</th>
            <td>✅</td>
            <td>✅</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Welcome pack</th>
            <td>✅</td>
            <td>✅</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Venue hire</th>
            <td>✅</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Trophies and medals</th>
            <td>✅</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Gala dinner</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total costs (4 nights)</th>
            <td>CHF 530</td>
            <td>CHF 430</td>
            <td>CHF 400</td>
            <td>CHF 50</td>
          </tr>
        </tfoot>
      </table>

      <h5 class="t-headline-4">Adults competitions</h5>

      <table class="l-table l-table--styled l-table--centred c-info-teams__table c-info-teams__table--competition-fees">
        <thead>
          <tr>
            <th></th>
            <th>Player / Coach</th>
            <th>NF Staff</th>
            <th>Supporter</th>
            <th>Gala</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Accommodation</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td></td>
          </tr>
          <tr>
            <th>Food</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td></td>
          </tr>
          <tr>
            <th>Accreditation card and souvenirs</th>
            <td>✅</td>
            <td>✅</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Welcome pack</th>
            <td>✅</td>
            <td>✅</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Venue hire</th>
            <td>✅</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Trophies and medals</th>
            <td>✅</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>Gala dinner</th>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Total costs (5 nights)</th>
            <td>CHF 660</td>
            <td>CHF 530</td>
            <td>CHF 495</td>
            <td>CHF 50</td>
          </tr>
        </tfoot>
      </table>

      <h5 class="t-headline-4">Options / additional costs</h5>
      <ul>
        <li>
          <strong>Package without accommodation and food:</strong> this would doable, but not recommended because the
          price and availability of accommodation in Switzerland is difficult. However, we are open to discussion.
        </li>
        <li><strong>Single bed room:</strong> +CHF 30 per night</li>
        <li>
          <strong>Extra night:</strong> Not possible outside the range 31 July to 9 August. Otherwise, each night costs
          the price of the supporter package.
        </li>
        <li>
          <strong>Missing FITB referee:</strong> See
          <a href="#requirements-for-fitb-referees">Requirements for FITB referees</a>.
        </li>
      </ul>

      <h4 id="fitb-event-fees" class="t-headline-3">FITB event fees</h4>
      <h5 class="t-headline-4">Event fee costs</h5>
      <p class="l-paragraph">All delegates listed in the official registration form shall pay the FITB Event Fee of:</p>
      <ul>
        <li>EYTC: US$ 25 per delegate</li>
        <li>ETC: US$ 50 per delegate</li>
      </ul>
      <p class="l-paragraph">
        The fees will be due with the final payment and must be paid in Swiss francs. The Swiss francs amount will be
        determined at the time of payment.
      </p>

      <h5 class="t-headline-4">Exemptions</h5>
      <ul>
        <li>
          1 FITB coach of each team if they are holding a valid coach card that has not expired. Please attach a copy of
          FITB coach card with your registration form.
        </li>
        <li>
          All FITB International Referees (valid) if they are registered as a referee only with NO other team
          appointment. They must be available for any official scheduling. If they are also the coach, player, or any
          other team appointment, they shall pay 50% of the FITB Event Fee.
        </li>
        <li>All supporters are exempted from the FITB Event Fee.</li>
      </ul>

      <h4 id="requirements-for-fitb-referees" class="t-headline-3">Requirements for FITB referees</h4>

      <p class="l-paragraph">
        Each participating team shall register and bring along 3 valid FITB referees for the competition. These referees
        are considered as official delegates and still must pay the Competition Fee to the host.
      </p>

      <p class="l-paragraph">
        The ETBF will reserve the right to charge a team if they cannot provide the correct number of FITB referee (€
        500 / missing referee)
      </p>

      <p class="l-paragraph">
        If the team sends any participant for the FITB referee course (if conducted), these participants shall be
        considered as one of the above required FITB referees, regardless of whether he/she passes the assessment.
      </p>

      <h4 id="banking-information" class="t-headline-3">Banking information</h4>
      <dl>
        <dt>Beneficiary Bank</dt>
        <dd>PostFinance</dd>
        <dt>Account Name</dt>
        <dd>Swiss Tchoukball EURO 2026</dd>
        <dt>Address</dt>
        <dd>CH-1000 Lausanne</dd>
      </dl>
      <h5 class="t-headline-4">International payment information</h5>
      <dl>
        <dt>IBAN</dt>
        <dd>CH71 0900 0000 1666 0684 4</dd>
        <dt>SWIFT CODE / BIC</dt>
        <dd>POFICHBEXXX</dd>
      </dl>

      <h4 id="insurance" class="t-headline-3">Insurance</h4>
      <p class="l-paragraph">
        All teams shall be responsible for their own delegates’ insurance: goods, third-party, and repatriation.
        Importantly, every delegate should ensure they have valid health and accident insurance coverage, as well as
        travel insurance.
      </p>
      <p class="l-paragraph">
        People who are not taking any packages proposed by the OC for lodging are responsible for their lodging and food
        at their own expenses. There is no public restaurant or grocery store in Macolin.
      </p>
    </section>

    <section id="nations-cup-referee-course" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Referee course at Nations Cup 2025</h3>
      <p class="l-paragraph"><em>Cancelled</em></p>
      <p class="l-paragraph">
        <del>
          We are working hard with ETBF, FITB and the Nations Cup to organize a referee course during the Nations Cup
          2025. This is a good opportunity for all the NFs to have non-player referees ready for the ETC 2026. More
          information will be given until the registration deadline.
        </del>
      </p>
    </section>

    <section id="competition-rules" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Competition rules</h3>
      <p class="l-paragraph"><em>This information will be provided at a later point.</em></p>
    </section>

    <section id="location-and-venues" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Location and venues</h3>
      <h4 id="magglingen-macolin" class="t-headline-3">Magglingen/Macolin</h4>
      <p class="l-paragraph">
        Macolin (Magglingen in German) is located on a hill, North-West of Biel (Bienne in French). It is reachable by
        car or funicular. Macolin is home to a
        <a href="https://www.baspo.admin.ch/fr/centre-national-de-sport-de-macolin">national sports center</a>
        with professional sports facilities, the
        <a href="https://www.baspo.admin.ch">Federal Office of Sport</a>
        and the
        <a href="https://www.ehsm.admin.ch/en">Swiss Federal Institute of Sport</a>.
      </p>
      <iframe
        :src="`//map.geo.admin.ch/#/embed?center=2582611.01,1220891.04&z=8&lang=${locale}&bgLayer=ch.swisstopo.pixelkarte-farbe&featureInfo=tooltip`"
        frameborder="0"
        class="c-info-teams__map l-cancel-section-padding"
      />
      <p>
        <a href="https://www.baspo.admin.ch/dam/fr/sd-web/iYv-cVv6o3MW/Arealplan%20BASPO%20Februar%202025.pdf">
          Official PDF map
        </a>
        /
        <a href="https://www.openstreetmap.org/node/130286973#map=15/47.14023/7.21587">
          {{ $t("location.seeOnOpenStreetMap") }}
        </a>
        /
        <a
          href="https://maps.apple.com/place?address=Magglingen,%20Switzerland&auid=15632740880420030654&coordinate=47.141316,7.202105&lsp=7618&name=Magglingen&map=transit"
        >
          {{ $t("location.seeOnAppleMaps") }}
        </a>
        /
        <a href="https://maps.app.goo.gl/zp2d3kd3gHq1M6WZ9">
          {{ $t("location.seeOnGoogleMaps") }}
        </a>
      </p>

      <h4 id="accommodation" class="t-headline-3">Accommodation</h4>
      <p class="l-paragraph">
        Three hotels are available in Macolin: The
        <a href="https://www.baspo.admin.ch/fr/hebergements#Grand-Hôtel">Grand Hotel</a>, the
        <a href="https://www.baspo.admin.ch/fr/hebergements#Hôtel-Bellavista">Hotel Bellavista</a>, and the
        <a href="https://www.baspo.admin.ch/fr/hebergements#Swiss Olympic House">Swiss Olympic House</a>. Single room,
        double, or three are available. It is possible that some teams might be lodged in the city of Biel due to the
        limited sleeping places in Macolin.
      </p>

      <h4 id="catering" class="t-headline-3">Catering</h4>
      <p class="l-paragraph">
        Meals will be provided at the
        <a href="https://www.baspo.admin.ch/fr/restauration#Restaurant-Bellavista">Bellavista Restaurant</a>. It is a
        large self-service cafeteria with a variety of meal options.
      </p>

      <h4 id="sports-venues" class="t-headline-3">Sports venues</h4>
      <p class="l-paragraph">See our dedicated <NuxtLink :to="localePath('/location')">location page</NuxtLink>.</p>

      <h4 id="smoke-free-policy" class="t-headline-3">Smoke-free policy</h4>
      <p class="l-paragraph">
        The entire Macolin sports centre is a smoke-free area. Smoking is prohibited in all buildings and outdoor areas.
        Smoking is permitted only in areas specially designated for this purpose. Those areas will be indicated on a map
        provided by the OC.
      </p>
    </section>

    <section id="transportation" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Transportation</h3>
      <h4 id="from-airports-to-macolin" class="t-headline-3">From airports to Macolin</h4>
      <p class="l-paragraph">
        From the airports of Basel, Geneva, and Zurich, trains are available to reach Biel/Bienne. From there, buses are
        available to reach the
        <a href="https://maps.app.goo.gl/vfu6JdXEf4nCVXtZ6">base station of the Macolin funicular</a>.
      </p>

      <h4 id="public-transport" class="t-headline-3">Public transport</h4>
      <p class="l-paragraph">
        We strongly urge you to use public transport to reach Macolin. Parking slots are limited and pretty expensive
        (CHF 16.– per day) Free parking in Macolin are rare and far away from the venues (see
        <a href="#parking">Parking</a>).
      </p>

      <p class="l-paragraph">
        The most convenient way to get tickets and schedules for all public transport in Switzerland is via the
        <a href="https://www.sbb.ch/en/travel-information/apps/sbb-mobile.html">SBB Mobile app</a>
        (<a href="https://itunes.apple.com/app/sbb-mobile/id294855237">iOS</a> /
        <a href="https://play.google.com/store/apps/details?id=ch.sbb.mobile.android.b2c">Android</a>). With groups of
        10 people or more, you can get group tickets with a 30% discount, or even cheaper for under 25 years old people
        in the group.
        <a href="https://www.sbb.ch/en/tickets-offers/tickets/group-tickets-switzerland.html/"
          >More information about group tickets.</a
        >
        If you travel in a group of less than 10 people, you can still get
        <a
          href="https://www.sbb.ch/en/tickets-offers/tickets/point-to-point-tickets-switzerland/supersaver-tickets.html"
          >Supersaver tickets</a
        >
        if you book a ticket in advance and for a specific time. Those tickets can be bought directly in the SBB Mobile
        app.
      </p>

      <h4 id="parking" class="t-headline-3">Parking</h4>
      <p class="l-paragraph">
        You can see all the parking spots on the
        <a href="https://www.baspo.admin.ch/dam/fr/sd-web/iYv-cVv6o3MW/Arealplan%20BASPO%20Februar%202025.pdf"
          >official PDF map</a
        >. Only the parking P11 is free and it takes 30 minutes by foot to reach it from the closest hotel. The other
        parking spots cost CHF 2.– the hour and are capped to CHF 16.– for a day. Moreover, it’s not possible to pay by
        cash or card. The only way is to use the Parkingpay or EasyPark applications.
      </p>
    </section>

    <section id="other-information" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Other information</h3>
      <h4 id="power-outlets" class="t-headline-3">Power outlets</h4>
      <p class="l-paragraph">
        Power outlets in Switzerland are of
        <a href="https://www.worldstandards.eu/electricity/plugs-and-sockets/j/">type J</a>. Make sure to get the proper
        adapters. Those adapters can be bought in most large shops in the country.
      </p>
      <h4 id="paying" class="t-headline-3">Paying</h4>
      <p class="l-paragraph">
        In Switzerland, the currency is the Swiss Franc (CHF). Credit and debit cards are widely accepted. Euro is
        usually not accepted.
      </p>
    </section>

    <section id="updates" class="l-section l-section--centered-text">
      <h3 class="t-headline-2">Notable updates made on this page</h3>
      <ul>
        <li>10/09/2025: Initial version of the page.</li>
        <li>
          19/10/2025: Cancellation of the <a href="#nations-cup-referee-course">referee course at the Nations Cup</a>.
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const { locale } = useI18n();
const localePath = useLocalePath();

useHead({
  meta: [
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
});

const copyLinkIcon = ref<string>("radix-icons:copy");
function copyPageLink() {
  navigator.clipboard.writeText("https://euro2026.ch/info-teams");
  copyLinkIcon.value = "radix-icons:check";
  setTimeout(() => {
    copyLinkIcon.value = "radix-icons:copy";
  }, 2000);
}

const isPeerdomMapVisible = ref(false);
function togglePeerdomMapVisibility() {
  isPeerdomMapVisible.value = !isPeerdomMapVisible.value;
}
</script>

<style scoped>
.c-info-teams__toggle-map-button {
  font-size: 1rem;
}

.c-info-teams__peerdom-map {
  height: 80vh;
}

.c-info-teams__table {
  td:first-child {
    width: 1px;
    white-space: nowrap;
  }

  td,
  th {
    vertical-align: top;
  }

  td p {
    margin-bottom: 0.4rem;
  }
}

.c-info-teams__table--competition-fees {
  td,
  th {
    vertical-align: middle;
  }

  td {
    border: 1px solid var(--euro-gray-500);
  }

  td,
  th:not(:first-child) {
    text-align: center;
  }
}

.c-info-teams__map {
  height: 50vh;
  border: none;
  margin-top: var(--euro-spacing-4);
}
</style>
