DROP TABLE IF EXISTS users, incomeExpenses, incomeAllocaiton;

CREATE TABLE users (
  userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(25),
  userPassword VARCHAR(100),

  UNIQUE KEY (username)
);

CREATE TABLE incomeExpenses (
  expensesId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  regularIncome VARCHAR(45),
  taxes VARCHAR(45),
  insurance VARCHAR(45),
  debts VARCHAR(45),
  housing VARCHAR(45),
  investing VARCHAR(45),
  remainingIncome VARCHAR(45)

);

CREATE TABLE incomeAllocaiton (
  allocationId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  earnedIncome INT NOT NULL,
  savings VARCHAR(100),
  groceries VARCHAR(50),
  transport VARCHAR(50),
  leisure VARCHAR(50),
  luxuries VARCHAR(50)
  #FOREIGN KEY (earnedIncome)

);

