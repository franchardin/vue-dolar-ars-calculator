<template>
  <main class="calculator">
    <section class="firstContainer">
      <h2>{{ $t.es.amount }}</h2>
      <input
        type="number"
        id="input-field"
        class="input-field"
        v-model="input"
        placeholder="0.00"
        autofocus
      />
      <h2>{{ $t.es.currency }}</h2>
      <select 
        v-model="selectedCurrency"
        id="select-field"
      >
        <option value="0">{{ $t.es.ars_name }}</option>
        <option v-for="(item, i) in data" :key="item.casa.nombre" :value="i+1">
          {{ item.casa.nombre }}
        </option>
      </select>
      <div v-if="data && selectedCurrency === '0'">
        <div v-for="item in data" :key="item.casa.nombre">
          <h3>{{ item.casa.nombre }}: </h3>
          <span class="green small">${{ input !== "" && input !== 0 ? this.calculateChange(parseFloat(item.casa.venta)) : '0' }}</span>
        </div>
      </div>
      <div v-else>
        <h3>{{ $t.es.ars_name_plural }}: </h3>
        <span class="green small">${{ input !== "" && input !== 0 ? this.calculateChange(selectedCurrency) : '0' }}</span>
      </div>
    </section>
    <section class="secondContainer">
      <h2>{{ $t.es.dolar_values }}</h2>
      <table v-if="data">
        <th>{{ $t.es.change_type }}</th>
        <th>{{ $t.es.change_buy }}</th>
        <th>{{ $t.es.change_sale }}</th>
        <tr v-for="item in data" :key="item.casa.nombre">
          <td>{{ item.casa.nombre.substr(6, item.casa.nombre.length) }}</td>
          <td class="bigCurrencyNumber light">${{ item.casa.compra }}</td>
          <td class="bigCurrencyNumber light">${{ item.casa.venta }}</td>
        </tr>
      </table>
      <div v-else>
        <Loader />
      </div>
    </section>
  </main>
</template>

<script>
import { getDolarValues } from '../services/apiCall.js'
import $t from '../assets/text/text.json'
const enums = [
  'Dolar turista',
  'Dolar Soja',
  'Bitcoin',
  'Argentina',
  'Dolar'
]

export default {
  name: 'TheCalculator',
  data() {
    return {
      input: '',
      data: null,
      error: null,
      selectedCurrency: '0',
      $t: $t,
      enums: enums
    }
  },
  methods: {
    formatData(dataArray) {
      return dataArray.filter(item => {
        return !enums.includes(item.casa.nombre);
      });
    },
    calculateChange(change) {
      if(this.selectedCurrency === "0") {
        return parseFloat(this.input / change).toFixed(2);
      } else {
        return (this.input * parseFloat(this.data[change-1].casa.venta)).toFixed(2);
      }
    }
  },
  async mounted() {
    let response = await getDolarValues();
    response[0] === 'error'
      ? this.error = response[1]
      : this.data = this.formatData(response[1]);
  }
}
</script>

<style scoped lang="scss">
.calculator {
  background-color: #e7e7e7;
  border-radius: 3em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1em 0;
  height: 60vh;
  width: 80vw;
  th, tr, td {
  text-align: left;
  }
  table {
    border-spacing: 10px;
  }
  h2 {
    font-size: 2rem;
    margin-top: .4em;
    margin-bottom: .2em;
  }
  h3, .small {
    font-size: .6em;
    display: inline;
  }
  .firstContainer {
    color: #138513;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    input, select {
      border-radius: 2em;
      border: solid #138513 2px;
      font-size: .8em;
      color: #4c4d4c;
      padding-left: 12px;
    }
    select {
      margin-bottom: .2em;
    }
  }
  .secondContainer {
    border-radius: 1em;
    background-color: #138513;
    color: #e7e7e7;
    padding: 1em;
  }
  .bigCurrencyNumber {
    font-size: 2em;
  }
  .light {
    color: #e7e7e7;
  }
  .green {
    color: #138513;
  }
}
@media screen and (max-width: 1000px) {
  .calculator {
    flex-direction: column;
    align-items: center;
    height: auto;
    margin-top: 10em;
    margin-bottom: 10em;
    .secondContainer {
      margin-top: 1em;
    }
  }
}
@media screen and (max-width: 1000px) {
  .calculator {
    padding: 2em;
    align-items: stretch;
    .secondContainer {
      padding: .2em;
      font-size: .75em;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 492px) {
  .calculator {
    max-width: 95%;
    padding: 0;
    h2 {
      font-size: .65em;
    }
    h3, span {
      font-size: 0.4em;
    }
    .firstContainer {
      padding: .2em;
      input, select {
        font-size: .5em;
        max-width: 95%;
        align-self: center;
      }
    }
    .secondContainer {
      width: 100%;
      margin: 0;
      padding: .5em;
      box-sizing: border-box;
      border-radius: 0 0 3em 3em;
      h2 {
        font-size: 1em;
      }
      td {
        font-size: 1em;
      }
    }
  }
  .secondContainer {
    max-width: 90vw;
  }
}
</style>
