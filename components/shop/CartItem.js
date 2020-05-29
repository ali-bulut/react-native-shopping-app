import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
    let title = props.title;
    if(title.length > 15){
        title = title.substring(0, 15) + "...";
    }
    
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity}</Text><Text style={styles.mainText}>{title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${props.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cartItem:{
        
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal: 20
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center'
    },
    quantity:{
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16
    },
    mainText:{
        fontFamily:'open-sans-bold',
        fontSize: 16,
        marginLeft:5,
        
    },
    deleteButton:{
        marginLeft:20
    }
});

export default CartItem;
