

async function login(queryStringParameters = {}) {
    const res = await uniCloud.callFunction({
        name: "api",
        data: { path: '/login', queryStringParameters },
    });
    return res
}

async function status(queryStringParameters = {}) {
    const res = await uniCloud.callFunction({
        name: "api",
        data: { path: '/status', queryStringParameters },
    });
    return res
}

export {
    login, status
}