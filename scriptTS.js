"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs = require("dayjs");
var digiClockTS = document.getElementById("digital-clock");
var anaClockTS = document.getElementById('ac-border');
var angleOffsetTS = 180;
function updateTimeTS() {
    setInterval(function () {
        var time = dayjs().format('HH:mm:ss');
        digiClock.text(time);
        var clock = new Date();
        var seconds = clock.getSeconds();
        var minutes = clock.getMinutes();
        var hours = clock.getHours();
        var secsAngle = ((360 / 60) * seconds) + angleOffset;
        var minsAngle = ((360 / 60) * minutes) + angleOffset;
        var hourAngle = ((360 / 12) * hours) + angleOffset + (minutes / 2);
        // console.log(minsAngle);
        calcAngleHandTS("wrapper-second-hand", secsAngle);
        calcAngleHandTS("wrapper-minute-hand", minsAngle);
        calcAngleHandTS("wrapper-hour-hand", hourAngle);
    }, 1000);
}
function calcAngleHandTS(css, ang) {
    var el = document.getElementById(css);
    el.style.transform = "rotate(".concat(ang, "deg)");
}
updateTimeTS();
var numArrayTS = [
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    1,
    2,
];
var hourStyleTS = function (index) {
    var x = btnPosXTS(index), y = btnPosYTS(index);
    // console.log(`${y} ${x}`)
    return ("\n        \"position: absolute;\n        top: ".concat(y, "rem;\n        left: ").concat(x, "rem;\n        text-align: left;\n        width: 0px;\n        height: 0px;\n        font-size: 32px;\""));
};
function calcAngleTS(arr, index) {
    return index * Math.PI * 2 / arr.length;
}
var btnPosXTS = function (index, radius) {
    if (radius === void 0) { radius = 8; }
    return radius * Math.cos(calcAngleTS(numArray, index));
};
var btnPosYTS = function (index, radius) {
    if (radius === void 0) { radius = 8; }
    return radius * Math.sin(calcAngleTS(numArray, index));
};
//console.log(hourStyle());
numArrayTS.map(function (hour, index) {
    var hours = document.getElementById('hours');
    var hr = document.createElement("<div id=\"".concat(hour, "\" style=").concat(hourStyle(index), ">").concat(hour, "</div>"));
    hours.appendChild(hr);
});
var canwakelockTSTS = function () { return 'wakelockTS' in navigator; };
var wakelockTS;
function lockWakeStateTS() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!canwakelockTSTS())
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.wakeLock.request()];
                case 2:
                    wakelockTS = _a.sent();
                    wakelockTS.addEventListener('release', function () {
                        console.log('Screen Wake State Locked:', !wakelockTS.released);
                    });
                    console.log('Screen Wake State Locked:', !wakelockTS.released);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.error('Failed to lock wake state with reason:', e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
lockWakeStateTS();
