import bcrypt from "bcrypt";

export const hashingPassword = (password) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      return `${hash}`;
    });
  });
};
