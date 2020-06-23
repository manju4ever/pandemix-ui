import React from 'react';
import { Image, Text } from "react-native";
import { Marker, Callout } from 'react-native-maps';
import TimeAgo from 'react-native-timeago';

const HAZARD_IMG = require('./images/ic_virus.png');
const CORONA_IMG = require('./images/corona_optim.png');

export const HazardMarker = props => <Marker
    {...props}
    coordinate={props.latlng}
    title={props.title}
    description={props.description}
    pinColor={"#aaafff"}
>
    <Image source={HAZARD_IMG} style={{height: 46, width: 46}} />
    <Callout>
        <Text>Last Seen:</Text>
        <TimeAgo style={{ color: '#afafaf', fontSize: 12, fontWeight: 'bold' }} time={props.seenAt || null} hideAgo={false} />
    </Callout>
</Marker>

export const GreenMarker = props => <Marker
    title={"Safe"}
    {...props}
    coordinate={props.latlng}
    title={props.title}
    description={props.description}
    pinColor={"#22e35c"}
 >
    <Callout>
        <Text>{"Safe User"}</Text>
    </Callout>
 </Marker>

 export const MeMarker = props => <Marker
    {...props}
    coordinate={props.latlng}
    title={props.title}
    description={props.description}
    pinColor={"#2c57a8"}
 >
     <Callout><Text>{"This is you"}</Text></Callout>
 </Marker>

export const PublicPatientMarker = props => <Marker
    {...props}
    coordinate={props.latlng}
    title={props.title}
    description={props.description}
    pinColor={"#aaafff"}
>
    <Image source={CORONA_IMG} style={{height: 30, width: 30}} />
    <Callout style={{ width: 120 }}>
        <Text>{props.title}</Text>
    </Callout>
</Marker>
