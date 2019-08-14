

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


------------------------------------------- יצירת Views -------------------------------------------

ALTER VIEW [dbo].[V_UserInfo]
AS
SELECT        dbo.TBAccount.AccountID, dbo.TBUsers.Email, dbo.TBUsers.Name, dbo.TBUsers.PhotoUrl
FROM            dbo.TBAccount INNER JOIN
                         dbo.TBUsers ON dbo.TBAccount.Email = dbo.TBUsers.Email

GO

SELECT * FROM V_UserInfo
WHERE Email = 'test1@test1.com'

CREATE VIEW [dbo].[V_UserIncome]
AS
SELECT        AccountID, YEAR(Date) AS Year, MONTH(Date) AS Month, Amount, Type
FROM            dbo.TBIncomes
--test--
SELECT * FROM [dbo].[V_UserIncome]
WHERE        (AccountID = 1000) AND (Year = YEAR(GETDATE()))


ALTER VIEW [dbo].[V_UserExpenses]
AS
SELECT        AccountID, YEAR(Date) AS Year, MONTH(Date) AS Month, DAY(Date) AS Day, Time, Amount, CategoryID, Info
FROM            dbo.TBExpenses

--test--
SELECT * FROM [dbo].[V_UserExpenses]
WHERE        (AccountID = 1000) AND (Year = YEAR(GETDATE()))



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


ALTER PROC [dbo].[UpdateUserName] (
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

--test--
exec [GetIncomeUserByYear] '1000', '2019-01-01'

CREATE PROC [dbo].[GetExpensesUserByYear] (
	@AccountID int,
	@Date date
	)
AS
	SELECT * FROM [dbo].[V_UserExpenses]
	WHERE (AccountID = @AccountID) AND (Year = YEAR(@Date))

--test--
exec [GetExpensesUserByYear] '1000', '2019-01-01'

------------------------------------------- בדיקות -------------------------------------------

insert into TBUsers(Email,Name,Password)
		values('test1@test1.com','test1','test1')


insert into TBUsers(Email,Name,Password)
		values('test2@test2.com','test2','test2')


				INSERT INTO TBUsers(Email,Password)
		VALUES('test2@test2.com', 'test2')
		INSERT INTO TBAccount(Email)
				VALUES('test2@test2.com')
				SELECT * FROM TBAccount WHERE AccountID = @@IDENTITY