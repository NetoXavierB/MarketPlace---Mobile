import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as CartActions from '../../store/modules/cart/actions';
import formatValue from '../../utils/formatValue';
import FloatingCart from '../../components/FloatingCart';
import {
  Container,
  ProductContainer,
  ProductImage,
  ProductList,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  ProcutButtonText,
} from './styles';

import api from '../../services/api';


export default function Catalog(){
  const dispactch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts(){
      const { data } = await api.get('/products');
      setProducts(data);
    }
    loadProducts();
  },[]);

  function handleAddToCart(id){
    dispactch(CartActions.addToCartRequest(id));
  }


  return (
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListfooterComponent={<View/>}
          ListfooterComponentStyle={{
            height:80,
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }}/>
              <ProductTitle>{item.title}</ProductTitle>
              <PriceContainer>
                <ProductPrice>{formatValue(item.price)}</ProductPrice>
                <ProductButton onPress={() => { handleAddToCart(item.id) }}>
                  <ProcutButtonText>Adicionar</ProcutButtonText>
                  <FeatherIcon size={30} name="plus-circle" color="#d1d7e9"/>
                </ProductButton>
              </PriceContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <FloatingCart/>
    </Container>
  );
};
