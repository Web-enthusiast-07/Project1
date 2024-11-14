import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = async (date) => {
  const data = {
    date: date,
  };

  await jsonfile.writeFile(path, data);
  await simpleGit().add([path]).commit(date, { "--date": date }).push();
};

const makeCommits = async (n) => {
  if (n === 0) return simpleGit().push();

  const year = 2019;
  let lastCommitDate;

  do {
    const month = random.int(0, 11);
    const day = random.int(1, 31);
    const date = moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").format();

    // Check if the generated date is different from the last commit date
    if (!lastCommitDate || !moment(lastCommitDate).isSame(date, 'day')) {
      lastCommitDate = date;
      await markCommit(date);
      await makeCommits(n - 1);
      break; // Exit the loop after a successful commit
    }
  } while (true);
};

makeCommits(10); // Create 100 commits