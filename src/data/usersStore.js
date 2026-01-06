const crypto = require('crypto');

const USERS = [
    { id: '1', username: 'alice', email: 'alice@example.com', passwordHash: null },
    { id: '2', username: 'bob', email: 'bob@example.com', passwordHash: null },
    { id: '3', username: 'charlie', email: 'charlie@example.com', passwordHash: null },
];

function hashPassword(password) {
    return crypto.createHash('sha256').update(String(password)).digest('hex');
}

function listUsers() {
    return USERS;
}

function getUserById(id) {
    return USERS.find((u) => u.id === String(id));
}

function getUserByUsername(username) {
    return USERS.find((u) => u.username === String(username));
}

function createUser({ username, email, password }) {
    const nextId = String(Math.max(0, ...USERS.map((u) => Number(u.id) || 0)) + 1);
    const user = {
        id: nextId,
        username,
        email,
        passwordHash: password ? hashPassword(password) : null,
    };
    USERS.push(user);
    return user;
}

function replaceUser(id, { username, email }) {
    const index = USERS.findIndex((u) => u.id === String(id));
    if (index === -1) return null;
    const updated = { ...USERS[index], id: String(id), username, email };
    USERS[index] = updated;
    return updated;
}

function patchUser(id, patch) {
    const user = getUserById(id);
    if (!user) return null;
    if (patch.username !== undefined) user.username = patch.username;
    if (patch.email !== undefined) user.email = patch.email;
    if (patch.password !== undefined) user.passwordHash = hashPassword(patch.password);
    return user;
}

function deleteUser(id) {
    const index = USERS.findIndex((u) => u.id === String(id));
    if (index === -1) return false;
    USERS.splice(index, 1);
    return true;
}

function verifyCredentials(username, password) {
    const user = getUserByUsername(username);
    if (!user || !user.passwordHash) return null;
    return user.passwordHash === hashPassword(password) ? user : null;
}

module.exports = {
    listUsers,
    getUserById,
    getUserByUsername,
    createUser,
    replaceUser,
    patchUser,
    deleteUser,
    verifyCredentials,
    hashPassword,
};
