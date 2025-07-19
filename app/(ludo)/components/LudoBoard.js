import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Dice from './Dice';
import BoardGrid from './BoardGrid';
import useLudoGame from '../hooks/useLudoGame';

export default function LudoBoard() {
  const { positions, currentPlayer, dice, rollDice, moveToken } = useLudoGame();
  return (
    <View style={styles.container}>
      <Text style={styles.turn}>Player {currentPlayer}'s turn</Text>
      <Dice onRoll={rollDice} image={require('../assets/dice' + dice + '.png')} />
      <BoardGrid positions={positions} onMove={moveToken} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  turn: {
    fontSize: 18,
    marginBottom: 10,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
  },
  red : {
    backgroundColor : "#fa9daa"
  },  
  green : {
    backgroundColor : "#9effa5",
  },
  orange : {
    backgroundColor : "#ffcff0"
  },
  item : {
    borderWidth : 1,borderColor : "black",width : Dimensions.get("window").width*6.4/100,height : Dimensions.get("window").width*6.4/100
  },
  First : {
    flexDirection : "column",marginLeft : Dimensions.get("window").width/50 
  },
  wholeSetup : {
    marginTop : 70
  },
  winnerZone : {
    borderWidth : 4,borderLeftColor : "red",borderTopColor : "green",borderRightColor : "orange",borderBottomColor : "blue",width : Dimensions.get("window").width*19.2/100,height : Dimensions.get("window").width*19.2/100
    ,flexDirection : "row"
  },
  blue : {
    backgroundColor : "#67E6DC"
  },
  places : {
    backgroundColor : "white",borderWidth : 2,width : 30,height : 30,borderRadius : 30
  },
  icons : {
    marginLeft : 3,marginTop : 2
  }
});
