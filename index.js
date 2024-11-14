import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const markCommit = (year, month, day) => {
  const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

// To create a commit on oct 7, 2021:
// markCommit(2021, 10, 7);
markCommit(2018, 3, 15);