// models
const Shortcut = require("../models/Shortcut");

class ShortcutService {
    constructor() {}
    async createShortcut(name, url, userId) {
        let shortcut = await Shortcut.create({
            name: name,
            createdBy: userId,
            url: url,
        });
        return shortcut;
    }
    
    async updateShortcut(shortcutId, name, url) {
        return await Shortcut.updateOne({
            _id: shortcutId
        }, { name: name, url: url });
    }

    async getUserShortcuts(userId) {
        var shortcuts = await Shortcut.find({ createdBy: userId });
        return shortcuts;
    }

    async deleteShortcut(shortcutId) {
        await Shortcut.remove({ _id: shortcutId });
    }
}

module.exports = ShortcutService;