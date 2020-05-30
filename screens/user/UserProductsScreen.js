import React from "react";
import { FlatList, Button, Platform, Alert, View, Text } from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from '../../constants/Colors';
import { deleteProduct } from "../../store/actions/products";


const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this product?', [
        {text: 'No', style:'default'},
        {text: 'Yes', style:'destructive', onPress: () => {
            dispatch(deleteProduct(id))
        }}
    ])
}

    const editProductHandler = (productId) => {
        props.navigation.navigate('EditProduct', {productId});
    }

    if(userProducts.length === 0){
      return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>No products found, maybe start creating some?</Text>
      </View>
    }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id)
          }}
        >
            <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                    editProductHandler(itemData.item.id)
                }}
              />
              <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {deleteHandler(itemData.item.id)}}
              />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    title: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            iconSize={23}
            onPress={() => {
              navData.navigation.navigate('EditProduct');
            }}
          />
        </HeaderButtons>
      )
  };
};

export default UserProductsScreen;
