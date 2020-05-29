import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  //replacing object to an array
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}> ${cartTotalAmount > 0 ? cartTotalAmount.toFixed(2) : 0.00}</Text>
        </Text>
        <Button
          color={Colors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
              dispatch(addOrder(cartItems, cartTotalAmount))
          }}
        />
      </View>
      <View style={styles.list}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable={true}
            onRemove={() => {
                dispatch(removeFromCart(itemData.item.productId))
            }}
          />
        )}
      />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
    title: 'Your Cart'
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  list:{
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },    
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
