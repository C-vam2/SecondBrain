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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let port = 3000;
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requiredBody = zod_1.z.object({
            username: zod_1.z.string().min(5).max(50).email(),
            password: zod_1.z.string().min(8, { message: "Password must be atleast 8 charactesr long" }).max(40, { message: "password can not be more than 40 characters." }).refine((val) => {
                let n = val.length;
                let isCapPresent = false;
                let isSmallPresent = false;
                for (let i = 0; i < n; i++) {
                    if (val[i] >= 'A' && val[i] <= 'Z')
                        isCapPresent = true;
                    if (val[i] >= 'a' && val[i] <= 'z')
                        isSmallPresent = true;
                }
                return isCapPresent && isSmallPresent;
            }, { message: "password must contain atleast 1 Capital and 1 small letter." })
        });
        const result = requiredBody.safeParse(req.body);
        if (result.success) {
            const password = yield bcrypt_1.default.hash(req.body.password, 10);
            yield db_1.UserModel.create({ username: req.body.username, password: password });
            res.status(200).json({ message: "Signup Successful" });
        }
        else {
            res.status(401).json({ message: "Signup Failed",
                error: result.error
            });
        }
    }
    catch (err) {
        res.status(401).json({ message: "Some error occured.", error: err });
    }
    return;
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const user = yield db_1.UserModel.findOne({ username: username });
        if (!user) {
            res.status(404).json({ msg: "User doesn't exist." });
            return;
        }
        const hashedPassword = user.password;
        const result = yield bcrypt_1.default.compare(password, hashedPassword);
        if (result) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET);
            res.status(200).json({ msg: "signin Success.", token: token });
            return;
        }
        else {
            res.status(403).json({ msg: "Wrong email or password provided." });
            return;
        }
    }
    catch (err) {
        res.status(500).json({ msg: "Internal Server Error." });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    try {
        const content = yield db_1.ContentModel.create({
            link,
            title,
            type,
            userId: req.userId,
            tags: []
        });
        if (content) {
            res.json({ msg: "Content Added." });
            return;
        }
        else {
            res.status(411).json({ msg: "Unable to add content." });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ msg: "Some error occured!" });
        return;
    }
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const contents = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username");
        if (contents) {
            res.json({ data: contents });
            return;
        }
        else {
            res.status(402).json({ msg: "Some error occured" });
            return;
        }
    }
    catch (err) {
        res.status(403).json({
            msg: "Some error occured while getting the user's data"
        });
    }
}));
app.delete('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        const userId = req.userId;
        const result = yield db_1.ContentModel.deleteOne({ _id: contentId, userId: userId });
        if (result) {
            res.json({ msg: "Deleted" });
        }
        else {
            res.status(401).json({ msg: "Unable to retrive the content" });
        }
    }
    catch (error) {
        res.status(401).json({ msg: "Unable to delete requested content" });
        return;
    }
}));
app.post('/api/v1/brain/share', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isShare = req.body.share;
    if (isShare) {
        const oldLink = yield db_1.LinkModel.findOne({ userId: req.userId });
        if (oldLink) {
            res.json({ hash: oldLink.hash });
            return;
        }
        const link = yield db_1.LinkModel.create({
            hash: (0, utils_1.randHash)(10),
            userId: req.userId
        });
        res.json({ hash: link.hash });
        return;
    }
    else {
        yield db_1.LinkModel.deleteOne({ userId: req.userId });
        res.json({ msg: "Removed Link" });
    }
}));
app.get('/api/v1/brain/:shareLink', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.params.shareLink;
    try {
        const isLinkAvailable = yield db_1.LinkModel.findOne({ hash: link });
        if (!isLinkAvailable) {
            res.status(411).json({ msg: "Link is not valid." });
            return;
        }
        const content = yield db_1.ContentModel.find({ userId: isLinkAvailable.userId });
        const user = yield db_1.UserModel.findById(isLinkAvailable.userId);
        res.json({
            user: user,
            content: content
        });
        return;
    }
    catch (err) {
        res.status(401).json({ msg: "Some error occured while getting the link" });
        return;
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on post ${port}...`);
});
