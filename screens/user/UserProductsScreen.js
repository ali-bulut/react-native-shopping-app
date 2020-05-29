import React from "react";
import { FlatList, Button, Platform } from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from '../../constants/Colors';
import { deleteProduct } from "../../store/actions/products";


const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

    const editProductHandler = (productId) => {
        props.navigation.navigate('EditProduct', {productId});
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
                onPress={() => {
                    dispatch(deleteProduct(itemData.item.id))
                }}
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
