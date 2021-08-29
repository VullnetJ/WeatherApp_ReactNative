import React, {useState, Component}from "react";
import { Container, Header, Left, Body, Right, Button, Icon, Title,  SafeAreaView,
  StyleSheet,ScrollView, View, Text, Form, Item, Input, Card, CardItem, StatusBar,} from 'native-base';
  import {

    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
  import { } from 'react-native';
  import Dialog from "react-native-dialog";
  import Axios from 'axios';
  import useAxios from "axios-hooks";
  import AsyncStorage from '@react-native-community/async-storage'

  const WeatherForecast = (params) => {
  const city = params.city;
  const API_KEY = '';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{ data, loading, error }, refetch] = useAxios(
    URL+city+'&appid='+API_KEY
  )

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error!</Text>;
  
  const refreshForecast = () => {
    refetch();
  }
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      // saving error
      console.log("Cities saving error!");
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
    }
  }

  return (
    <Card>
      <CardItem>
        <Body>
          <Text>
             {city}
          </Text>
          <Text>Main: {data.weather[0].main}</Text>
          <Text>Temp: {data.main.temp} °C</Text>
        </Body>
      </CardItem>
    </Card>
  );
}


export default function App()  {
const [modalVisible, setModalVisible] = useState(false); 
const [cityName, setCityName] = useState(""); 
const [cities, setCities] = useState([]);

const openDialog = () => {
  setModalVisible(true);
}

const cancelCity = () => {
  setModalVisible(false);
};

const addCity = () => {
  setCities( [...cities,{id:cities.length, name:cityName}]);
  setModalVisible(false);
}

const deleteCity = (id) => {
  let filteredArray = cities.filter(city => city.id !== id);
  setCities(filteredArray);
}
    return (
      <Container>
      <Header>
        <Left/>
        <Body>
          <Title>Weather App</Title>
        </Body>
        <Right>
          <Button>
          <Text onPress={openDialog}>Add</Text>
          </Button>
        </Right>
      </Header>
        <Dialog.Container visible={modalVisible}>
        
          <Dialog.Title>Add a new city</Dialog.Title>
          <Form>
            <Item>
              <Input onChangeText={ (text) => setCityName(text)} placeholder="cityname"/>
            </Item>
           </Form>
          <Dialog.Button label="Cancel" onPress={cancelCity} />
          <Dialog.Button label="Add" onPress={addCity} />
        </Dialog.Container>
        <ScrollView>
          {!modalVisible && cities.map(city => (
              <WeatherForecast key={index} 
              city={city.name} 
              id={city.id} 
              deleteCity={deleteCity} />
          ))}
         </ScrollView>
    </Container>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
