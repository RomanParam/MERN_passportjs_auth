import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // Имя пользователя
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Минимальная длинна имени - 4 (сообщение из mongo Schema)'],
    match: /^[A-Z]\w+$/i,
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
    match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  },
});

export default mongoose.model('User', UserSchema);
