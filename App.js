import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import Header from './components/Header';
import NumberInput from './components/NumberInput';

export default function App() {

  const [peso, setPeso] = useState('0,00');
  const [altura, setAltura] = useState('0,00');
  const [imc, setImc] = useState('-,--');
  const [grau, setGrau] = useState('N/A');
  const [isValid, setIsValid] = useState(false);

  const calcularIMC = () => {
    let pesoNumber = parseFloat(peso.replaceAll('.', '').replaceAll(',', '.'));
    let alturaNumber = parseFloat(altura.replaceAll('.', '').replaceAll(',', '.'));

    if (pesoNumber == 0 || alturaNumber == 0) {
      setIsValid(false);
      return;
    }

    var resultado = pesoNumber / Math.pow(alturaNumber, 2);

    if (isNaN(resultado)) {
      setImc('-,--');
      setGrau('N/A');
      setIsValid(false);
      return;
    }

    setImc(resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

    if (resultado < 18.5) {
      setGrau('Abaixo do peso (menor que 18,50)');
    } else if (resultado < 25) {
      setGrau('Peso normal (18,50 a 24,99)');
    } else if (resultado < 30) {
      setGrau('Sobrepeso (25,00 a 29,99)');
    } else if (resultado < 35) {
      setGrau('Obesidade grau I (30,00 a 34,99)');
    } else if (resultado < 40) {
      setGrau('Obesidade grau II (35,00 a 39,99)');
    } else {
      setGrau('Obesidade grau III (maior que 40,00)');
    }

    setIsValid(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Calculadora de IMC" />
      <ScrollView style={{ flexGrow: 1, backgroundColor: 'white', padding: 20 }}>
        <View style={styles.form}>
          <FontAwesomeIcon
            style={styles.form__icon}
            icon={faCalculator}
            size={50} />
          <NumberInput
            label="Peso (Kg)*"
            placeholder="Insira o seu peso"
            initialValue={peso}
            changeFunction={setPeso}
            onEndEditing={calcularIMC} />
          <NumberInput
            label="Altura (m)*"
            placeholder="Insira a sua altura"
            initialValue={altura}
            changeFunction={setAltura}
            onEndEditing={calcularIMC} />
          <Button color={"#0118D8"} title='CALCULAR' onPress={calcularIMC}></Button>
        </View>
        {isValid &&
          <View style={styles.result}>
            <Text style={styles.result__title}>Resultado</Text>
            <Text style={{}}>IMC: <Text style={{ fontWeight: 'bold' }}>{imc}</Text></Text>
            <Text style={{}}>Grau: <Text style={{ fontWeight: 'bold' }}>{grau}</Text></Text>

            <Text style={styles.result__title}>Tabela de classificação do IMC</Text>

            <View style={styles.table}>
              <View style={styles.table__row}>
                <View  style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>Abaixo de 18,5</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Abaixo do peso</Text>
                </View>
              </View>
              <View style={styles.table__row}>
                <View style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>18,5 a 24,9</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Peso normal</Text>
                </View>
              </View>
              <View style={styles.table__row}>
                <View style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>25 a 29,9</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Sobrepeso</Text>
                </View>
              </View>
              <View style={styles.table__row}>
                <View style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>30 a 34,9</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Obesidade grau I</Text>
                </View>
              </View>
              <View style={styles.table__row}>
                <View style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>35 a 39,9</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Obesidade grau II</Text>
                </View>
              </View>
              <View style={styles.table__row}>
                <View style={styles.table__header}>
                  <Text style={{fontWeight: 'bold'}}>40 ou mais</Text>
                </View>
                <View style={styles.table__cell}>
                  <Text>Obesidade grau III</Text>
                </View>
              </View>
            </View>

          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginBottom: 20,
  },
  form: {
    paddingVertical: 10,
  },
  form__icon: {
    alignSelf: 'center',
    color: '#1B56FD',
    marginVertical: 20,
  },
  result: {
    marginTop: 10,
  },
  result__title: {
    backgroundColor: '#E9DFC3',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
  table: {
    backgroundColor: '',
    marginVertical: 10,
  },
  table__row: {
    flexDirection: 'row',
  },
  table__header: {
    flex: 1,
  },
  table__cell: {
    flex: 1,
  }
});