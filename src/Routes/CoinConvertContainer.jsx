import React from 'react';
import { useFetch } from '../Hooks/useFetch';
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';

export default function CoinConvert() {
  const [initValue, setInitValue] = React.useState('BRL');

  const [finalValue, setFinalValue] = React.useState('USD');

  const [initCoin, setInitCoin] = React.useState(0);

  const [dropDValues, setDropDValues] = React.useState(['EUR', 'BRL', 'USD']);

  const [inputDorp1, setInputDorp1] = React.useState(['EUR', 'BRL', 'USD']);

  const [inputDorp2, setInputDorp2] = React.useState(['EUR', 'BRL', 'USD']);

  const [result, setResult] = React.useState(0);

  // request api

  // https://felipecesar.dev/como-criar-testes-de-integra%C3%A7%C3%A3o-em-aplica%C3%A7%C3%B5es-react

  const { data, error, loading } = useFetch(
    `https://economia.awesomeapi.com.br/json/last/${initValue}-${finalValue}`
  );

  // useEffect

  React.useEffect(() => {
    const coinset = initValue + finalValue;

    if (data[`${coinset}`]) {
      const askValue = Number(data[`${coinset}`][`ask`]);
      const input1 = Number(initCoin);
      const resutado = (askValue * input1).toFixed(2);

      setResult(resutado);
      console.log(result);
    } else {
      console.log('cade');
    }
  }, [initValue, finalValue, initCoin]);

  React.useEffect(() => {}, [initValue, finalValue]);

  //captura caixa de texto

  const inputValue1 = (e) => {
    const coin1 = e.target.value;
    setInitCoin(coin1);
  };

  //altera os dropdowns pra nao ser o mesmo

  React.useEffect(() => {
    const newValues1 = dropDValues.filter(function filtro(p) {
      if (p !== finalValue) return p;
    });

    setInputDorp1(newValues1);

    const newValues2 = dropDValues.filter(function filtro(p) {
      if (p !== initValue) return p;
    });

    setInputDorp2(newValues2);

    console.log(newValues2);
  }, [initValue, finalValue]);

  // altera a variavel coin in/out

  const selected1 = (event) => {
    setInitValue(event.target.value);
  };
  const selected2 = (event) => {
    setFinalValue(event.target.value);
  };

  return (
    <div style={{ padding: '12px' }}>
      <TextField
        onChange={inputValue1}
        type="number"
        id="standard-basic"
        label="Valor a ser convertido"
        variant="standard"
      />

      <FormControl>
        <InputLabel htmlFor="agent-simple">moeda</InputLabel>
        <Select
          value={initValue}
          onChange={selected1}
          inputProps={{
            name: 'agent',
            id: 'age-simple',
          }}
        >
          {inputDorp1.map((value, index) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
      </FormControl>

      <br />
      <br />

      <TextField
        type="number"
        id="standard-basic"
        label="resultado"
        variant="standard"
        value={result}
      />

      <FormControl>
        <InputLabel htmlFor="agent-simple">moeda</InputLabel>
        <Select
          value={finalValue}
          onChange={selected2}
          inputProps={{
            name: 'agent',
            id: 'age-simple',
          }}
        >
          {inputDorp2.map((value, index) => {
            return <MenuItem value={value}>{value}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
