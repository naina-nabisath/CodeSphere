import bcrypt from "bcryptjs";

console.log("bcrypt version:", bcrypt);

const hash = await bcrypt.hash("hello123", 10);

console.log("Hash:", hash);

bcrypt.compare("hello123", hash).then((result) => {
  console.log("RESULT:", result);
});