/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
