import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import TimeAgo from 'react-native-timeago';

import styles from './styles'
import PNDView from '../../../Views/PNDView';
import { fetchFeedWhoNews } from '../../../actions'

export default class Feeds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: []
        }

    }

    componentDidMount() {
        this.fetchFeeds();
    }

    fetchFeeds() {
        //Loading started
        this._indicator.startActivity();
        const parseString = require('react-native-xml2js').parseString;
        _this = this;
        fetchFeedWhoNews()
            .then((response) => {
                //Loading stoped
                this._indicator.stopActivity();
                parseString(response.data, function (err, result) {
                    _this.setState({
                        item: result.rss.channel[0].item
                    })
                });
            })
            .catch(err => {
                //Loading stoped
                this._indicator.stopActivity();
                console.warn('Fetch news failed.', err);
            })
    }

    _refresh = () => {
        return new Promise((resolve) => {
            const parseString = require('react-native-xml2js').parseString;
            _this = this;
            fetchFeedWhoNews()
                .then((response) => {
                    //Loading stoped
                    resolve()
                    parseString(response.data, function (err, result) {
                        _this.setState({
                            item: result.rss.channel[0].item
                        })
                    });
                })
                .catch(err => {
                    //Loading stoped
                    resolve()
                    console.error(`Fetch news failed.`, err);
                })
        });
    }

    render() {

        const mListItems = this.state.item;
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <PTRView onRefresh={this._refresh} >
                    <View style={styles.container}>
                        <FlatList
                            style={{ flex: 1.0, width: '100%', height: '100%' }}
                            data={mListItems}
                            renderItem={({ item }) => (this.renderFeedsCell(item))}
                            extraData={mListItems}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </PTRView>
            </PNDView >
        )
    };

    navigateToFeedsDetail(item) {
        this.props.screenProps.navigation.navigate('FeedDetail', {
            item: item
        });
    }

    renderFeedsCell(item) {

        let title = item.title[0];
        let description = item.description[0];
        let time = item.pubDate[0];
        let link = item.link[0];

        const regex = /(<([^>]+)>)/ig;
        description = description.replace(regex, '');


        return (
            <TouchableOpacity
                onPress={() => {
                    this.navigateToFeedsDetail(item)
                }}
                style={{ borderRadius: 8, backgroundColor: 'white', elevation: 4, padding: 16, marginRight: 16, marginLeft: 16, marginTop: 8, marginBottom: 8, flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Image source={{ uri: 'pandemix_logo' }} resizeMode='cover' style={{ height: 56, width: 56, borderRadius: 28, borderWidth: 1, borderColor: "#192965" }} /> */}
                    <View style={{ flex: 1.0 }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}> {title} </Text>
                        <TimeAgo style={{ color: '#afafaf', fontSize: 12, fontWeight: 'bold' }} time={time} hideAgo={false} />
                    </View>
                </View>
                <Text style={{ color: '#3e3e3e', fontSize: 15, marginTop: 8, textAlign: 'justify' }} numberOfLines={5}> {description}</Text>
                {/* <View style={{ height: 250, flex: 1.0, backgroundColor: 'black', marginTop: 16 }}></View> */}
            </TouchableOpacity>
        )
    }
}