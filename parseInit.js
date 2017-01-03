/**
 * Created by lijianxun on 2017/1/3.
 */
const Parse = require('parse/node');//in react-native: require('parse/react-native')

Parse.initialize('myAppId');
Parse.serverURL = 'http://localhost:1337/api';

module.exports = {
	Parse: Parse
};