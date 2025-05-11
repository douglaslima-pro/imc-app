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
  },
  form: {
    paddingVertical: 10,
  },
  form__icon: {
    alignSelf: 'center',
    color: '#1B56FD',
    marginVertical: 40,
  },
  result: {
    marginTop: 10,
  },
  result__title: {
    backgroundColor: '#E9DFC3',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    marginTop: 40,
    paddingVertical: 5,
    textAlign: 'center',
  }
});