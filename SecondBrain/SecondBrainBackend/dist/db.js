"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/');
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.UserModel = mongoose_1.default.model('Users', UserSchema);
const ContentSchema = new mongoose_1.default.Schema({
    link: String,
    type: {
        type: String,
    },
    title: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'Users', required: true }
});
exports.ContentModel = mongoose_1.default.model('Contents', ContentSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "Users", required: true }
});
exports.LinkModel = mongoose_1.default.model("Links", LinkSchema);
