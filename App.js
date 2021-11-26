import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [text, setText] = React.useState('')
  const [getItem, setItem] = React.useState([]);

  const [editingKey, setEditingKey] = React.useState()
  const [isEditing, setIsEditing] = React.useState(false)

  const addItem = () => {
    setItem([...getItem, {data: text, key: Math.random()}])
    setText('')
  }

  const deleteItem = (key) => {
    setItem(getItem.filter(i => i.key != key))
  }

  const updateItem = () => {
    setItem(getItem.map(i => i.key == editingKey ? {data: text, key: editingKey} : i))
    setText("")
    setIsEditing(false)
  }

  return (
    <View style={styles.container}>
      <View style = {{flexDirection: 'row'}}>
        <TextInput 
          style = {styles.input} 
          placeholder = "Enter Product Name"
          onChangeText = {setText}
          value = {text}
        />
        <Pressable 
          style = {styles.pressable}
          onPress = {isEditing ? updateItem: addItem}  
        ><Text style = {styles.text}>{isEditing ? "Update": "Add"}</Text></Pressable>
      </View>
      <FlatList 
        style={{ paddingTop: 20, width: '100%' }}
        data = {getItem}
        renderItem = {({item}) => (
          <TouchableOpacity
            style = {styles.touchable}
            key = {item.key}
            onPress = {() => {
              setText(item.data)
              setEditingKey(item.key)
              setIsEditing(true)
            }}
          >
          <Text style={{ fontSize: 25, color: 'white' }}>{item.data}</Text>
          <TouchableOpacity 
            style = {styles.touchable2}
            onPress = {() => {
              deleteItem(item.key)
            }}  
          >
            <Text style={{color: 'red', fontSize:  20}}>X</Text>
          </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
  },
  pressable: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginLeft: 15,
    borderRadius: 5
  },
  text: {
    color: '#fff'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    width: 200,
  },
  touchable: {
    backgroundColor: 'green',
    margin: 5,
    padding: 5,
    borderRadius: 15,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable2: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
