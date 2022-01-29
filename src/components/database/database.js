

export function getDatabase() {
    let database = JSON.parse(localStorage.getItem('database') || 'null')
    if (!database) {
        database = {users: {}}
        localStorage.setItem('database', JSON.stringify(database))
    }
    return database
}

export function authenticate({email, password}) {
    let database = getDatabase()
    console.log(database)
    let response = {
        data: null,
        message: ''
    }
    if (database.users[email] && database.users[email].password === password) {
        response.data = database.users[email]
        return Promise.resolve(response)
    } else {
        response.message = 'Invalid email or password'
    }
    return Promise.reject(response)
}

export function createUser({email, password, firstName, lastName}) {
    let database = getDatabase()
    console.log(database)
    let response = {
        data: null,
        message: ''
    }
    let user = {
        email,
        password,
        firstName,
        lastName,
        favourites: ['Nur-Sultan', 'Paris', 'Beijing', 'Moscow', 'London']
    }
    if (!database.users[email]) {
        database.users[email] = user
        response.data = user
        localStorage.setItem('database', JSON.stringify(database))
        return Promise.resolve(response)
    } else {
        response.message = 'User with this email already exist'
        return Promise.reject(response)
    }
}

export function updateFavourites(email, city) {
    let database = getDatabase()
    let user = database.users[email]
    let cityIndex = user.favourites.indexOf(city)
    if (cityIndex === -1) {
        user.favourites.push(city)
    } else {
        user.favourites.splice(cityIndex, 1)
    }
    localStorage.setItem('database', JSON.stringify(database))
    return user.favourites
}

export function getUser(email) {
    let database = getDatabase()
    return database.users[email]
}