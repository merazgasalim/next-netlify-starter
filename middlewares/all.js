import nc from "next-connect";
import database from "./database";
//import uploadfiles from "./uploadfiles"

const all = nc();

all.use(database)//.use(uploadfiles);
  //.use(session)
  //.use(passport.initialize())
  //.use(passport.session());

export default all;
