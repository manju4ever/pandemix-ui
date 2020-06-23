import { RNToasty } from 'react-native-toasty';

export default { 
    normal: (title, options) => RNToasty.Normal({ title, ...options}),
    info: (title, options) => RNToasty.Info({ title, ...options}),
    success: (title, options) => RNToasty.Success({ title, ...options}),
    warn: (title, options) => RNToasty.Warn({ title, ...options}),
    error: (title, options) => RNToasty.Error({ title, ...options}),
    show: (title, options) => RNToasty.Show({ title, ...options}),
}