import React, {useEffect} from "react";
import { FlatList, Button, Platform } from "react-native";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from '../../constants/Colors';
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: { productId: id, productTitle: title },
    });
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title)
                }}
              />
              <Button
                color={Colors.primary}
                title="Add To Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item))
                }}
              />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return{
  title: "All Products",
  headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
      navData.navigation.navigate('Cart')
    }} />
  </HeaderButtons>,
  headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
  <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
    navData.navigation.toggleDrawer();
  }} />
</HeaderButtons>
  }
};

export default ProductsOverviewScreen;
