import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import DataSet from './dataset';

/*const getRandomIntWithBias = (max) => {
  const min = 0;
  // Bias towards lower numbers
  const biasedRandom = Math.random() ** 2; // Square the random value to bias towards lower numbers
  const scaledRandom = biasedRandom * (max - min + 1);
  return Math.floor(scaledRandom) + min;
}*/

const getRandomInt = (max) => {
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - 0 + 1)) + 0;
}

export default function App() {
  const [names, setNames] = useState({ MALE: [], FEMALE: [] });
  const [generatedName, setGeneratedName] = useState(null);

  const getNames = (currGender) => {
    if (!names[currGender]?.length) {
      const currGenderNames = DataSet.filter(x => { 
        const [, g] = x; return g === currGender 
      }).sort(([,,,,a,],[,,,,b,]) =>  parseInt(b)-parseInt(a));
      const newNames = { ...names, [currGender]: currGenderNames };
      setNames(() => newNames);
      return newNames[currGender];
    } else {
      return names[currGender];
    }
  }

  const getRandomName = (currGender) => {
    // load only the names for the selected gender, if not loaded yet
    const namesForCurrGender = getNames(currGender);

    const getRandomIndex = getRandomInt(namesForCurrGender?.length - 1);
    setGeneratedName(() => {
      const [year, gender, etnicity, name, count, rank] = namesForCurrGender?.[getRandomIndex]
      return ({year, gender, etnicity, name, count, rank})
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Baby name generator!</Text>
      <Text style={styles.bodyText}>Choose the gender:</Text>
      <View style={styles.buttonGroup}>
        <Button title="Female" color={'#9f2351'} onPress={() => getRandomName('FEMALE')}></Button>
        <Button title="Male" color={'#295dae'} onPress={() => getRandomName('MALE')}></Button>
      </View>
      <h3 style={styles.outputName}>
      {generatedName?.gender === 'MALE' && '👦' || generatedName?.gender === 'FEMALE' && '👧'} {generatedName?.name?.toLowerCase()}
        </h3>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      backgroundImage: 'linear-gradient(202deg, rgba(255,255,255,1) 0%, rgba(221,96,187,1) 0%, rgba(79,196,255,1) 100%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontStyle: 'bold',
    color: 'white',
    textShadow: '2px 2px 2px rgba(90,90,128,0.6)'

  },
  bodyText: {
    fontSize: 22,
    color: 'white',
    textShadow: '2px 2px 2px rgba(90,90,128,0.6)'

  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10
  },
  outputName: {
    fontFamily: 'Verdana, Arial, sans-serif',
    textTransform: 'capitalize',
    textShadow: '2px 2px 2px rgba(90,90,128,0.9)',
    color: 'white'
  }
});
