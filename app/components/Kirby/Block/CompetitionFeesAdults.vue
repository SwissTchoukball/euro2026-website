<template>
  <table class="l-table l-table--styled l-table--centred kb-competition-fees-adults">
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
</template>

<style scoped>
.kb-competition-fees-adults {
  td:first-child {
    width: 1px;
    white-space: nowrap;
  }

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
</style>
