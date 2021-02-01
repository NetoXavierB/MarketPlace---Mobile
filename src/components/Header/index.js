import React from 'react';
import { Image } from 'react-native';

import { Container } from './style';
import logo from '../../assets/logoHeader.png'

const Header =  () => {
  return(
    <Container>
      <Image source={logo}/>
    </Container>
  )
}

export default Header;
