import React, { Component } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text, StatusBar } from 'react-native';
import Toast from '../../utils/Toast'
import styles from './styles'
import PNDText from '../../Views/PNDText';
import PNDView from '../../Views/PNDView';
import TimeAgo from 'react-native-timeago';
import { WebView } from 'react-native-webview';


export default class Feeds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: this.props.navigation.getParam('item')
        }

    }


    render() {

        let item = this.state.item;
        let title = item.title[0];

        let description = item.description[0];
        let time = item.pubDate[0];
        let link = item.link[0];

        const regex = /(<([^>]+)>)/ig;
        description = description.replace(regex, '');

        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <StatusBar
                    backgroundColor="#192965" />
                <View style={styles.container}>
                    {this.renderToolbar()}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 16, paddingRight: 16, paddingBottom: 24, paddingBottom: 16, backgroundColor: 'white', alignItems: 'center', elevation: 4 }}>
                        {/* <Image source={{ uri: 'pandemix_logo' }} resizeMode='cover' style={{ height: 56, width: 56, borderRadius: 28, borderWidth: 1, borderColor: "#192965" }} /> */}
                        <View style={{ flex: 1.0 }}>
                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}> {title} </Text>
                            <TimeAgo style={{ color: '#afafaf', fontSize: 12, fontWeight: 'bold' }} time={time} hideAgo={false} />
                        </View>
                    </View>
                    <WebView
                        source={{ uri: link }}
                    />
                </View>
            </PNDView>
        )
    };


    renderToolbar() {
        return (
            <View style={styles.headerContainer}>
                {this.renderbackButton()}
                <PNDText style={styles.title} fontType='bold' fontSize={25} textColor='#192965' text='Feed' />
            </View>
        )
    }

    renderbackButton() {
        return (
            <TouchableOpacity style={styles.backArrowwraperStyle} onPress={() => {
                this.props.navigation.goBack(null);
            }}>
                <Image
                    style={styles.backArrow}
                    source={{ uri: 'back' }}
                    resizeMode='contain' />

            </TouchableOpacity>
        )
    }


}