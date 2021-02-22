import React from 'react';
import LottieView from 'lottie-react-native';

import empytCartAnimation from '../../../empty-cart.json';

import { Container, EmptyCartText, EmptyCartContainer } from './styles';

export default function EmptyCart(){
  return(
    <Container>
      <EmptyCartContainer>
        <LottieView
          source={empytCartAnimation}
          resizeMode="contain"
          autoPlay
          loop
        />
      </EmptyCartContainer>
      <EmptyCartText>Seu carrinho está vazio.</EmptyCartText>
    </Container>
  )
}
