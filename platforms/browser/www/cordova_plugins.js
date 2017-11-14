cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-tts/www/tts.js",
        "id": "cordova-plugin-tts.tts",
        "pluginId": "cordova-plugin-tts",
        "clobbers": [
            "TTS"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-tts": "0.2.3",
    "cordova-plugin-whitelist": "1.3.3"
}
// BOTTOM OF METADATA
});