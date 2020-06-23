import React, { Component } from 'react';
import { View, Text, Alert, Switch } from 'react-native';
import MapView, { Heatmap, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';
import PushNotification from 'react-native-push-notification';

import styles from './styles'
import {
  fetchProfile,
  getOverlappingLocations,
  pingLocation,
  updateCovidStatus
} from '../../../actions';
import { getPatientsLocation, getPatientMarkers } from '../../../actions/public_info';
import ScrollViewWithCards from '../../../Views/ScrollViewWithCards';
import PNDView from '../../../Views/PNDView';
import { getOverlappingMarkers } from './selectors';
import { HazardMarker, GreenMarker, PublicPatientMarker } from './CustomerMarkers';

const MENU_OPTIONS = [{
  id: 1,
  image: { uri: ""},
  title: 'Infected Patients',
  description: "5 min ago"
},{
  id: 2,
  image: { uri: ""},
  title: 'Infected Areas Heatmap',
  description: "20 min ago"
}, {
  id: 3,
  image: { uri: ""},
  title: 'Safe Zones for Travel',
  description: "10 min ago"
}];

const initalState = {
  region: {
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  },
  initalRegion: {
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  },
  currentLocation: {
    latitude: 12.9716,
    longitude: 77.5946,
  },
  markers: [{
    latlng: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    title: "Bengaluru"
  }],
  publicPatientMarkers: [],
  covid19_positive: false,
  overlappingMarkers: [],
  profileData: null,
  heatMapConfig: {
    points: [],
  },
  selectedMenuItemIdx: 0,
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = initalState;
  }

  componentDidMount() {
    this.syncProfile();
    this.syncLocation();
    this.handleOverlappingLocations
    this.moveToCurrentLocation();
    this.notifyInfectionsNearby();
    this.updateHeatMap();
  }

  updateHeatMap = async () => {
    const data = await getPatientsLocation();
    const patient_markers = await getPatientMarkers({
      currentLocation: this.state.currentLocation,
    });
    this.setState({
      heatMapConfig: {
        ...this.state.heatMapConfig,
        points: data,
      },
      publicPatientMarkers: patient_markers,
    });
  }

  notifyInfectionsNearby = () => {
     const _notifyRegardingInfections = () => {
        const { overlappingMarkers } = this.state;
        const unique_user_ids = [...new Set(overlappingMarkers.map(rec => rec.user_id))];
        const unique_users = unique_user_ids.map(id => overlappingMarkers.find(rec => rec.user_id === id));
        console.debug(`Unique Users:`, unique_users);
        if(unique_users.length > 0) {
            PushNotification.localNotification({
              title: "⚠️ Caution", 
              message: `There are nearly ${unique_users.length % 9} affected spots nearby`, 
              playSound: false, 
              soundName: 'default', 
          });
        } else {
          PushNotification.localNotification({
            title: "👍 Looking good near you", 
            message: `There are no COVID-19 affected users nearby`, 
            playSound: false, 
            soundName: 'default', 
        });
        }
     }
     this._notifyUsersFn = setInterval(_notifyRegardingInfections,  5 * 60 * 1000);
  }

  syncProfile = async () => {
    await fetchProfile().then(res => {
      this.setState({
        profile: res.data,
        covid19_positive: res.data.covid19_positive,
      })
    }).catch(err => {
      console.error(err);
    })
  }

  handleOverlappingLocations = () => {
    const { currentLocation } = this.state;
    console.debug(`Fetching Overlapping Locations for:`, currentLocation);
    const requestData = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      cov_status: true,
      radius: 6000,
      limit: 20,
      offset: 0,
    };
    return Promise.all([
      getOverlappingLocations(requestData), 
      getOverlappingLocations({
        ...requestData,
        cov_status: false,
      })]).then(([pos_data, neg_data]) => {
        this.setState({
          overlappingMarkers: getOverlappingMarkers([].concat(pos_data.data, neg_data.data)),
        });
      }).catch(err => {
      console.warn(`Cannot fetch overlapping locations.`);
    });
  }

  confirmStatusChange = (value) => {
      if(this.state.covid19_positive) {
        return Alert.alert('', '❗ You cannot perform this action.');
      }
      return Alert.alert(
        ' ❗ Danger Zone',
        ` \n⚠️ We will be notifying all persons who have crossed paths(1m) with you in the last 15 days. 
          \n⚠️ We will be notifying responsible authorities to assist you.
          \n⚠️ This is an irreversible action. Do you want to proceed ?`,
        [
          { text: 'CONFIRM', onPress: () => this.handleStatusChange(value) },
          { text: 'CANCEL', onPress: () => null, style: 'cancel' },
        ],
        { cancelable: false }
    ) && this.setState({
      covid19_positive: value,
    })
  }

  moveToCurrentLocation = async () => {
    const { latitude, longitude } = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    const region = { 
      latitude,
      longitude,
      latitudeDelta: 0.0098,
      longitudeDelta: 0.0045,
    }
    this.setState({
      region,
      initalRegion: region,
      currentLocation: {
        latitude,
        longitude,
      }
    });
  }

  handleRegionChange = (region) => this.setState({ region })

  syncLocation = () => {
    this._fetchLocationFn = setInterval(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      }).then(({ latitude, longitude }) => {
        console.debug(`Current location:`, [latitude, longitude]);
        this.setState({
          currentLocation: {
            latitude,
            longitude,
          }
        }, this.handleOverlappingLocations);
        return pingLocation({
          lat: latitude,
          lng: longitude,
        });
      }).then((res) => {
        console.debug("Location Sync Successful...");
      }).catch(err => {
        console.warn(`Location Sync Failed !`, err);
      });
    }, 10000);
  }

  handleStatusChange = async (val) => {
      return await updateCovidStatus(val).then((res) => {
        console.debug("covid status update done");
        this.syncProfile();
      }).catch(err => {
        console.warn('COVID Status Update Failed!', err);
      });
  }

  handleMenuItemPress = async (item, idx) => {
    if(idx === 0) {
      this.setState({
        selectedMenuItemIdx: idx,
      });
      await this.moveToCurrentLocation();
    }
    if(idx === 1) {
      this.setState({
        selectedMenuItemIdx: idx,
        region: {
          ...this.state.region,
          longitudeDelta: 8,
          latitudeDelta: 8,
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this._fetchLocationFn);
    clearInterval(this._fetchOverlappingFn);
    clearInterval(this._notifyUsersFn);
  }

  render() {
    return (
      <PNDView
        ref={(ref) => this._indicator = ref}
        toastRef={(ref) => this.toast = ref}>
        <View style={styles.container}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: 60,
          }}>
            <Text style={{ fontSize: 24 }}>🦠 I'm COVID-19 +ve</Text>
            <Switch
              thumbColor={this.state.covid19_positive ? "red": "green"}
              style={{ scaleX: 1.4, scaleY: 1.4 }}
              value={this.state.covid19_positive}
              onValueChange={this.confirmStatusChange}
            />
          </View>
          <MapView
            showsUserLocation
            zoomEnabled={true}
            showsCompass
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
              flex: 1
            }}
            region={this.state.region}
            initialRegion={this.state.initalRegion}
            onRegionChangeComplete={this.handleRegionChange}
          >
              {
                this.state.selectedMenuItemIdx === 0 ? [
                  this.state.overlappingMarkers.map(({ latlng, covid19_positive_on, created_at}) => {
                    return !!covid19_positive_on ? <HazardMarker seenAt={created_at} latlng={latlng} /> : <GreenMarker latlng={latlng} />
                  }),
                  this.state.publicPatientMarkers.length ?  this.state.publicPatientMarkers.map(({ latlng, title }) => {
                    return <PublicPatientMarker title={title} latlng={latlng} />
                  }) : null
                ] : null
              }
              {
                this.state.selectedMenuItemIdx === 1 && this.state.heatMapConfig.points.length ?  
                <Heatmap
                  points={this.state.heatMapConfig.points}
                  maxIntensity={90}
                  gradientSmoothing={50}
                  heatmapMode={"POINTS_DENSITY"}
                  gradient={{
                    colors: ["#E50000", "#79BC6A", "#BBCF4C", "#EEC20B", "#F29305"],
                    startPoints: [0, 0.25, 0.50, 0.75, 1],
                    colorMapSize: 500
                }} /> : null
              }
          </MapView>
          <ScrollViewWithCards 
          style={{
            position: 'absolute',
            bottom: 5,
            padding: 10
          }}
          activeItemIdx={this.state.selectedMenuItemIdx}
          items = {MENU_OPTIONS}
          onPress={this.handleMenuItemPress}
        />
        </View>
      </PNDView>
    )
  };
}
