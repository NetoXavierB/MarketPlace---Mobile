import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EmptyCart from '../../components/EmptyCart';
import * as CartActions from '../../store/modules/cart/actions';
import {
   Container,
   ActionButton,
   ActionContainer,
   ProductPrice,
   ProductQuantity,
   ProductSinglePrice,
   Product,
   ProductContainer,
   ProductImage,
   ProductList,
   ProductPriceContainer,
   ProductTitle,
   ProductTitleContainer,
   SubTotalValue,
   TotalContainer,
   TotalProductContainer,
   TotalProductText,
  } from './styles'
import formatValue from '../../utils/formatValue';
import { EmptyCartText } from '../../components/EmptyCart/styles';

export default function Cart(){
  const dispactch = useDispatch();
  const products = useSelector(({ cart }) => cart );


  const cartSize = useMemo(() => {
    return products.length || 0 ;
  },[products])

  const carTotal = useMemo(() => {
    const cartAmount = products.reduce((accumulator, product) => {
      const totalPrice = accumulator + product.price * product.amount;
      return totalPrice;
    },0)
    return formatValue(cartAmount);
  },[products]);

  function increment(product){
    dispactch(CartActions.updateAmountRequest(product.id, product.amount +1 ));
  }

  function decrement(product){
    dispactch(CartActions.updateAmountRequest(product.id, product.amount -1 ));
  }

  function removeFromCart(id){
    dispactch(CartActions.removeFromCart(id));
  }

  return(
    <Container>
      <ProductContainer>
        <ProductList
          data={products}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyCart/>}
          listfooterComponent={<View/>}
          listfooterComponentStyle={{
            height: 80
          }}
          renderItem={({ item }) => (
            <Product>
              <ProductImage source={{ uri: item.image_url }}/>
              <ProductTitleContainer>
                <ProductTitle>{item.title}</ProductTitle>
                <ProductPriceContainer>
                  <ProductSinglePrice>
                    {formatValue(item.price)}
                  </ProductSinglePrice>

                </ProductPriceContainer>
                <TotalContainer>
                  <ProductQuantity>
                    {item.amount}x
                  </ProductQuantity>
                  <ProductPrice>
                    {formatValue(item.price * item.amount)}
                  </ProductPrice>
                </TotalContainer>
              </ProductTitleContainer>
              <ActionContainer>
                <ActionButton onPress={() => increment(item)}>
                  <FeatherIcon name="plus" color="#e83f5b" size={16}/>
                </ActionButton>
                <ActionButton onPress={() => {
                  item.amount > 1 ? decrement(item) : removeFromCart(item.id);
                }}>
                  <FeatherIcon name="minus" color="#e83f5b" size={16}/>
                </ActionButton>
              </ActionContainer>
            </Product>
          )}
        />
      </ProductContainer>
      <TotalProductContainer>
        <FeatherIcon name="shopping-cart" color="#fff" size={24} />
        <TotalProductText>{cartSize} {cartSize === 1 ? 'item' : 'itens'}</TotalProductText>
        <SubTotalValue>{carTotal}</SubTotalValue>
      </TotalProductContainer>
    </Container>
  )
}
