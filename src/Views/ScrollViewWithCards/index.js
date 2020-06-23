import React, { useState, } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';


const FlatCard = styled.View`
  height: 80px;
  width: 150px;
  margin-left: 5px;
  elevation: 4;
  padding: 10px;
  background: white;
  border-radius: 5px;
  border-top-width: 4px;
  box-shadow: none;
  border-top-color: ${props => props.active ? 'purple' : 'goldenrod' };
`;

const CardTitle = styled.Text`
    text-align: center;
    font-size: 18px;
    font-weight: 100;
`

const CardDesc = styled.Text`
    text-align: center;
    font-size: 12px;
    font-style:italic;
`


export default (props = {
    items: data,
    activeItemIdx,
    style,
    onPress
}) => {
    return (
        <ScrollView 
        style={props.style} 
        horizontal
        showsHorizontalScrollIndicator={false}
        >   
        {
            props.items.map((item, idx) => {
                return <TouchableOpacity 
                        key={idx}
                        activeOpacity={0.7}
                        onPress={props.onPress.bind(null, item, idx)}
                        >
                        <FlatCard active={props.activeItemIdx === idx} key={idx}>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDesc>{item.description}</CardDesc>
                        </FlatCard>
                </TouchableOpacity>
            })
        }
        </ScrollView>
    )
}