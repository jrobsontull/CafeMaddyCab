import bcrypt from 'bcrypt';
import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;
let users;

function User(id, commonName, role) {
  this._id = id;
  this.commonName = commonName;
  this.token = null;
  this.role = role;
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
      console.error(
        'AuthDAO: Unable to establish a connection handle in AuthDAO. ' + e
      );
    }
  }

  static async loginUser(username, pass) {
    try {
      // Check user credentials
      const userFound = await users.findOne({ username: username });

      if (!userFound) {
        return { error: 'Invalid username or password.' };
      }

      const validPass = await bcrypt.compare(pass, userFound.password);

      if (!validPass) {
        return { error: 'Invalid username or password.' };
      }
      console.log('AuthDAO: User ' + userFound._id + ' attempted login.');
      return new User(userFound._id, userFound.commonName, userFound.role);
    } catch (e) {
      console.error('AuthDAO: Failed to login. ' + e);
      return { error: e };
    }
  }

  static async registerUser(username, pass, commonName, role = 'approver') {
    try {
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
        commonName: commonName,
        role: role,
        dateCreated: new Date(),
      });

      return new User(registerResonse.insertedId, username, role);
    } catch (e) {
      console.error('AuthDAO: Failed to register. ' + e);
      return { error: e };
    }
  }

  static async getUsername(id) {
    try {
      const query = { _id: ObjectId(id) };
      let cursor;

      try {
        cursor = await users.findOne(query);
      } catch (e) {
        console.error(
          'ridesDAO: Unable to issue find command with query ' +
            query +
            '\n' +
            e.message
        );
        return { error: e };
      }

      const foundUser = await cursor;
      return { username: foundUser.username };
    } catch (e) {
      console.error('AuthDAO: Failed to get username. ' + e);
      return { error: e };
    }
  }

  static async changePassword(currentPass, newPass, id) {
    try {
      // Check user credentials
      const userFound = await users.findOne({ _id: ObjectId(id) });
      if (!userFound) {
        return { error: 'This user ID does not exist.' };
      }

      const validPass = await bcrypt.compare(currentPass, userFound.password);
      if (!validPass) {
        return { error: 'Invalid current password.' };
      }

      // Hash new pass
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPass, salt);

      // Update user
      const updateResponse = await users.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        {
          $set: {
            password: hashedPass,
          },
        }
      );

      return { status: 'success' };
    } catch (e) {
      console.error('AuthDAO: Failed to change password. ' + e);
      return { error: e };
    }
  }
}
