"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var analytics_1 = require("firebase/analytics");
var firebaseConfig = {
    apiKey: "AIzaSyDbG7FBdoy8vNZJ_dm-1ZcZtHhRtRdorIA",
    authDomain: "cardealership-b2ed7.firebaseapp.com",
    projectId: "cardealership-b2ed7",
    storageBucket: "cardealership-b2ed7.appspot.com",
    messagingSenderId: "390897001399",
    appId: "1:390897001399:web:cf80e50bfb1367466dbe32",
    measurementId: "G-X2NXGXBYSS"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var analytics = (0, analytics_1.getAnalytics)(app);
exports.analytics = analytics;
