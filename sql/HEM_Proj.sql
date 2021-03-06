

USE site04
GO

------------------------------------------- יצירת טבלאות -------------------------------------------

CREATE TABLE [dbo].[TBUsers](
	[Email] [nvarchar](50) NOT NULL PRIMARY KEY,
	[Password] [nvarchar](12) NULL,
	[Name] [nvarchar](50) NULL,
	[PhotoUrl] [nvarchar](max) NULL,
	);
GO

CREATE TABLE [dbo].[TBAccount](
	[AccountID] [int] IDENTITY(1000,1) NOT NULL PRIMARY KEY,
	[Email] [nvarchar](50) NOT NULL
	)
GO

CREATE TABLE [dbo].[TBIncomes](
	[AccountID] [int] NOT NULL PRIMARY KEY,
	[Date] [date] NOT NULL PRIMARY KEY,
	[Time] [time](7) NOT NULL PRIMARY KEY,
	[Amount] [decimal](18, 2) NOT NULL,
	[Type] [nvarchar](50) NULL
	)
GO

CREATE TABLE [dbo].[TBExpenses](
	[AccountID] [int] NOT NULL PRIMARY KEY,
	[Date] [date] NOT NULL PRIMARY KEY,
	[Time] [time](0) NOT NULL PRIMARY KEY,
	[Amount] [decimal](18, 2) NOT NULL,
	[CategoryID] [int] NOT NULL,
	[Info] [nvarchar](50) NULL
	)
GO


------------------------------------------- יצירת Views -------------------------------------------

ALTER VIEW [dbo].[V_UserInfo]
AS
SELECT        dbo.TBAccount.AccountID, dbo.TBUsers.Email, dbo.TBUsers.Name, dbo.TBUsers.PhotoUrl
FROM            dbo.TBAccount INNER JOIN
                         dbo.TBUsers ON dbo.TBAccount.Email = dbo.TBUsers.Email

GO


ALTER VIEW [dbo].[V_UserIncome]
AS
SELECT        AccountID, Date,Time,YEAR(Date) AS Year, MONTH(Date) AS Month, Amount, Type
FROM            dbo.TBIncomes



ALTER VIEW [dbo].[V_UserExpenses]
AS
SELECT        AccountID, Date,Time,YEAR(Date) AS Year, MONTH(Date) AS Month, DAY(Date) AS Day, Amount, CategoryID, Info
FROM            dbo.TBExpenses





------------------------------------------- הכנסת נתונים -------------------------------------------



------------------------------------------- יצירת פרוצדורות -------------------------------------------

ALTER PROC [dbo].[InsertUser] (
	@Email nvarchar(50),
	@Password nvarchar(12)
	)
AS
IF NOT EXISTS (SELECT * FROM TBUsers WHERE Email = @Email)
	BEGIN
		INSERT INTO TBUsers(Email,Password)
		VALUES(@Email, @Password)
		INSERT INTO TBAccount(Email)
				VALUES(@Email)
		SELECT * FROM V_UserInfo
		WHERE Email = @Email
	END
ELSE
	BEGIN
		SELECT 'User Exists' AS error
	END
GO


ALTER PROC [dbo].[InsertUserFBandGL] (
	@Email nvarchar(50),
	@Name nvarchar(50),
	@PhotoUrl nvarchar(max)
	)
AS
IF NOT EXISTS (SELECT * FROM TBUsers WHERE Email = @Email)
	BEGIN
		INSERT INTO TBUsers(Email,Name,PhotoUrl)
		VALUES(@Email, @Name,@PhotoUrl)
		INSERT INTO TBAccount(Email)
		VALUES(@Email)
		SELECT * FROM V_UserInfo
		WHERE Email = @Email
	END
ELSE
	BEGIN
		SELECT * FROM V_UserInfo
		WHERE Email = @Email
	END
GO



CREATE PROC [dbo].[UpdateUserName] (
	@Email nvarchar(50),
	@Name nvarchar(50)
	)
AS
IF EXISTS (SELECT * FROM TBUsers WHERE Email = @Email )
	BEGIN
		UPDATE TBUsers
		SET Name = @Name
		WHERE Email = @Email
		RETURN 0
	END
ELSE
	BEGIN
		RETURN 1
	END
GO


CREATE PROC [dbo].[Login] (
	@Email nvarchar(50),
	@Password nvarchar(12)
	)
AS
IF EXISTS (SELECT * FROM TBUsers WHERE Email = @Email AND Password = @Password)
	BEGIN
		SELECT * FROM V_UserInfo
		WHERE Email = @Email
	END
ELSE
	BEGIN
		SELECT 'Wrong Credentials' AS error
	END
GO



ALTER PROC [dbo].[UpdateUserPicture] (
	@Email nvarchar(50),
	@PhotoUrl nvarchar(max)
	)
AS
IF EXISTS (SELECT * FROM TBUsers WHERE Email = @Email )
	BEGIN
		UPDATE TBUsers
		SET PhotoUrl = @PhotoUrl
		WHERE Email = @Email
		RETURN 0
	END
ELSE
	BEGIN
		RETURN 1
	END
GO

CREATE PROC [dbo].[GetIncomeUserByYear] (
	@AccountID int,
	@Date date
	)
AS
	SELECT * FROM [dbo].[V_UserIncome]
	WHERE (AccountID = @AccountID) AND (Year = YEAR(@Date))



CREATE PROC [dbo].[GetExpensesUserByYear] (
	@AccountID int,
	@Date date
	)
AS
	SELECT * FROM [dbo].[V_UserExpenses]
	WHERE (AccountID = @AccountID) AND (Year = YEAR(@Date))

CREATE PROC	[dbo].[InsertIncome] (
	@AccountID int,
	@Date date,
	@Time time,
	@Amount decimal(18,2),
	@Type nvarchar(50)
	)
AS
	INSERT INTO TBIncomes(AccountID,Date,Time,Amount,Type)
					VALUES(@AccountID,@Date,@Time,@Amount,@Type)
GO


CREATE PROC	[dbo].[InsertExpense] (
	@AccountID int,
	@Date date,
	@Time time,
	@Amount decimal(18,2),
	@CategoryID int,
	@Info nvarchar(50)
	)
AS
	INSERT INTO TBExpenses(AccountID,Date,Time,Amount,CategoryID,Info)
					VALUES(@AccountID,@Date,@Time,@Amount,@CategoryID,@Info)
GO

CREATE PROC [dbo].[DeleteExpense] (
	@AccountID int,
	@Date date,
	@Time time,
	@Amount decimal(18,2)
	)
AS
	DELETE FROM TBExpenses
	WHERE AccountID = @AccountID AND
		  Date = @Date AND
		  Time = @Time AND
		  Amount = @Amount
GO

exec DeleteExpense 1011,'2019-03-08','18:04:37',117


------------------------------------------- בדיקות -------------------------------------------
select * from TBIncomes
where AccountID = 1011 and month(Date) = '08'

