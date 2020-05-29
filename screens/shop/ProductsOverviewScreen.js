import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
    title: 'All Products'
}

export default ProductsOverviewScreen;
