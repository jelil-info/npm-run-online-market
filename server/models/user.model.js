import mongoose from 'mongoose'
import crypto from 'crypto'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  seller: {
    type: Boolean,
    default: false
  },
  stripe_seller: {},
  stripe_customer: {}
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

//Password field validation
/*UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)*/

UserSchema.path('hashed_password').validate(function(v) {
  // Require that the password contain at least 6 characters.
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }

  // Require that the password contain at least one uppercase letter.
  if (!/[A-Z]/.test(this._password)) {
    this.invalidate('password', 'Password must contain at least one uppercase letter.')
  }

  // Require that the password contain at least one lowercase letter.
  if (!/[a-z]/.test(this._password)) {
    this.invalidate('password', 'Password must contain at least one lowercase letter.')
  }

  // Require that the password contain at least one number.
  if (!/\d/.test(this._password)) {
    this.invalidate('password', 'Password must contain at least one number.')
  }

  // Require that the password contain at least one special character.
  if (!/[!@#$%^&*()_+]/.test(this._password)) {
    this.invalidate('password', 'Password must contain at least one special character.')
  }

  // Prevent the user from reusing their old password.
  if (this.isNew && this._password === this.old_password) {
    this.invalidate('password', 'Password cannot be the same as your old password.')
  }

  // Prevent the user from creating a password that is too similar to their username.
  if (this._password === this.username) {
    this.invalidate('password', 'Password cannot be the same as your username.')
  }
}, null)



//Encryption and authentication
UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
