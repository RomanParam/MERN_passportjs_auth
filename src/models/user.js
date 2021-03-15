import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Имя пользователя
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Минимальная длинна имени - 3 (сообщение из mongo Schema)'],
    // match: /^[A-ZА-Я ]\w+$/i,
  },
  // Мы не храним пароль, а только его хэш
  password: {
    type: String,
    required: true,
  },
  // Email
  email: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
  vkontakteId: {
    type: String
  },
  googleId: {
    type: String
  }

});

export default mongoose.model('User', UserSchema);
