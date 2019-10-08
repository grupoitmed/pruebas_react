import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      loading:true,
      pokemon:[],
      url:"https://pokeapi.co/api/v2/pokemon/"
    }
  }
  componentDidMount(){
    this.getdata();
  }

  getdata=()=>{
    this.setState({loading:true});
    fetch(this.state.url)
    .then(res => res.json() )
    .then(res =>{
      this.setState({
        pokemon:res.results,
        url:res.next,
        loading:false
      });
    });
  }

  render(){
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Text>Cargando app!</Text>
        </View>
      );
    }else{
      return (
        <View style={{ flex:1,paddingTop:50,paddingLeft:5 }}>
          <FlatList
            data={this.state.pokemon}
            renderItem={
              ({item})=> <Text> { item.name } </Text>
            }
            keyExtractor={(item, index)=>index.toString()}
          />
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
