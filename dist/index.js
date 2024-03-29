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
        while (_) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var templatePath = "./src/template.t";
var templateFlag = "<----template---->";
var outputDir = "./src/icon";
var encoder = new TextEncoder();
var decoder = new TextDecoder("utf-8");
var getSvgContent = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    var data, str, newStr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Deno.readFile(filePath)];
            case 1:
                data = _a.sent();
                str = decoder.decode(data);
                newStr = str.replace(/\<svg.+?\>/, "").replace(/\<\/svg\>/, "");
                return [2 /*return*/, newStr];
        }
    });
}); };
var insertToTemplate = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var templateData, templateStr;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Deno.readFile(templatePath)];
            case 1:
                templateData = _a.sent();
                templateStr = decoder.decode(templateData);
                return [2 /*return*/, templateStr.replace(templateFlag, data)];
        }
    });
}); };
var createNewFile = function (name, data) { return __awaiter(void 0, void 0, void 0, function () {
    var newFilePath, encodeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newFilePath = outputDir + "/" + name + ".tsx";
                encodeData = encoder.encode(data);
                return [4 /*yield*/, Deno.writeFile(newFilePath, encodeData, { create: true })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var baseFold, _a, _b, dirEntry, filePath, svgData, newData, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                baseFold = "./src/icons/";
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, 9, 14]);
                _a = __asyncValues(Deno.readDir(baseFold));
                _d.label = 2;
            case 2: return [4 /*yield*/, _a.next()];
            case 3:
                if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 7];
                dirEntry = _b.value;
                console.log(dirEntry.name);
                debugger;
                filePath = baseFold + dirEntry.name;
                return [4 /*yield*/, getSvgContent(filePath)];
            case 4:
                svgData = _d.sent();
                return [4 /*yield*/, insertToTemplate(svgData)];
            case 5:
                newData = _d.sent();
                createNewFile(dirEntry.name, newData);
                console.log(newData);
                _d.label = 6;
            case 6: return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 14];
            case 8:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 9:
                _d.trys.push([9, , 12, 13]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 11];
                return [4 /*yield*/, _c.call(_a)];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 13: return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
run();
//# sourceMappingURL=index.js.map