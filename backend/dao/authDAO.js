import bcrypt from 'bcrypt';

let users;

function User(id, username) {
  this._id = id;
  this.username = username;
  this.token = null;
}

export default class AuthDAO {
  static async injectAuthDB(conn) {
    if (users) {
      return;
    }
    try {
      // Check if production environment
      let db_type = process.env.CAFEMADDYCAB_NS_DEV;
      if (process.env.NODE_ENV === 'production') {
        console.log('Enabling authDAO production mode.');
        db_type = process.env.CAFEMADDYCAB_NS_PRODUCTION;
      }

      users = await conn.db(db_type).collection('backend_users');
    } catch (e) {
      console.log('Unable to establish a connection handle in AuthDAO: ' + e);
    }
  }

  static async loginUser(username, pass) {
    try {
      // Check user credentials
      const userFound = await users.findOne({ username: username });
      if (!userFound)
        return { error: 'An account with this username does not exist.' };
      const validPass = await bcrypt.compare(pass, userFound.password);
      if (!validPass) return { error: 'Invalid password.' };
      return new User(userFound._id, userFound.name, userFound.email);
    } catch (e) {
      console.log('Failed to login: ' + e);
      return { error: e };
    }
  }

  static async registerUser(username, pass) {
    try {
      // Check if has secret before registering
      //   const registerSecret = env.process.REGISTER_SECRET;
      //   if (secret !== registerSecret) {
      //     throw new Error('Invalid register token.');
      //   }

      // Check if user email already exists
      const emailExists = await users.findOne({ username: username });
      if (emailExists)
        return { error: 'User with this username already exists.' };

      // Hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);

      // Register user
      const registerResonse = await users.insertOne({
        username: username,
        password: hashedPass,
        date: new Date(),
      });

      return new User(registerResonse.insertedId, username);
    } catch (e) {
      console.log('Failed to register: ' + e);
      return { error: e };
    }
  }
}