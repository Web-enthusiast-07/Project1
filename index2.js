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

  // Generate random date within 2022
  const year = 2022;
  const month = random.int(0, 11); // 0 (Jan) to 11 (Dec)
  const day = random.int(1, 31); // 1 to avoid generating Feb 30th

  const date = moment(`${year}-${month + 1}-${day}`, "YYYY-MM-DD").format();

  await markCommit(date);
  await makeCommits(n - 1); // Recursive call with n-1 remaining commits
};

makeCommits(100); // Create 100 commits