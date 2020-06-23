import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import TimeAgo from 'react-native-timeago';
import PTRView from 'react-native-pull-to-refresh';

import Toast from '../../../utils/Toast'
import styles from './styles'
import PNDView from '../../../Views/PNDView';
import { fetchnotifications } from '../../../actions'


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this._refresh();
    }

    getNewNotifications = () => {
        this._indicator.startActivity();
        return fetchnotifications().then(result => {
            this.setState({ data: result.data });
            this._indicator.stopActivity();
        }).catch(err => {
            console.warn(`Error fetching notifications`, err);
            Toast.info(`Fetching Notification Failed.`)
            this._indicator.stopActivity();
        })
    }

    _refresh = () => {
        this.setState({ isLoading: true });
         return new Promise((resolve, reject) => {
            this.getNewNotifications().then(response => {
                this.setState({ isLoading: false });
                resolve();
            }).catch(err => {
                this.setState({ isLoading: false });
                reject();
            });
         });
    }

    render() {
        return (
            <PNDView
                ref={(ref) => this._indicator = ref}>
                <PTRView onRefresh={this._refresh} >
                    <View style={styles.container}>
                        <FlatList
                            style={{ flex: 1.0 }}
                            data={this.state.data}
                            renderItem={({ item }) => (this.renderNotificationCell(item))}
                            keyExtractor={item => item.id}
                            extraData={this.state.data}
                        />

                    </View>
                </PTRView>
                {this.renderEmptyView()}
            </PNDView>
        )
    };

    renderEmptyView() {
        const { isLoading, data } = this.state;
        return (
        !isLoading && !data.length ?
            <View style={{ justifyContent: 'center', position: 'absolute', alignItems: 'center', height: '100%', width: '100%' }}>
                <Text style={{ color: '#192965', fontSize: 20, fontWeight: 'bold' }} >
                    {`☕ No notifications for now.`}
                </Text>
            </View> : null
        );
    }

    renderNotificationCell(item) {

        var title = item.title;
        var description = item.description;
        var time = item.created_at
        var priority = item.priority
        var descriptionColor = (priority == 1) ? '#3e3e3e' : '#AFAFAF'

        return (
            <View style={styles.notificationBox}>
                {/* <Image source={{ uri: 'pandemix_logo' }} style={styles.profilePic} /> */}
                <View style={styles.notificationiewContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        overflow: 'hidden',
                        flexWrap: 'wrap'
                    }}>
                        <Text style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold',
                            flex: 1.0,
                        }}>
                            {title}
                        </Text>
                        <TimeAgo
                            style={{
                                fontSize: 12,
                                textAlign: 'right',
                                color: '#60C6BB'
                            }} time={time} hideAgo={false} />
                    </View>
                    <Text style={{
                        color: 'black',
                        fontSize: 15,
                        marginTop: 8,
                        color: descriptionColor,
                        fontWeight: '900'
                    }}>
                        {description}
                    </Text>
                </View>
            </View >
        )
    }

} 