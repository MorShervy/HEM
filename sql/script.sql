
CREATE TABLE [dbo].[TBUsers](
	[Email] [nvarchar](50) NOT NULL PRIMARY KEY,
	[Password] [nvarchar](12) NULL,
	[Name] [nvarchar](50) NULL,
	[PhotoUrl] [nvarchar](max) NULL,



CREATE TABLE [dbo].[TBAccount](
	[AccountID] [int] IDENTITY(1000,1) NOT NULL PRIMARY KEY,
	[Email] [nvarchar](50) NOT NULL,

	
CREATE VIEW [dbo].[V_UserInfo]
AS
SELECT        dbo.TBAccount.AccountID, dbo.TBUsers.Email, dbo.TBUsers.Name, dbo.TBUsers.PhotoUrl
FROM            dbo.TBAccount INNER JOIN
                         dbo.TBUsers ON dbo.TBAccount.Email = dbo.TBUsers.Email


CREATE TABLE [dbo].[TBIncomes](
	[AccountID] [int] NOT NULL PRIMARY KEY,
	[Date] [date] NOT NULL PRIMARY KEY,
	[Time] [time](7) NOT NULL PRIMARY KEY,
	[Amount] [decimal](18, 2) NOT NULL,
	[Type] [nvarchar](50) NULL,


CREATE VIEW [dbo].[V_UserIncome]
AS
SELECT        AccountID, YEAR(Date) AS Year, MONTH(Date) AS Month, Amount, Type
FROM            dbo.TBIncomes
GO

CREATE TABLE [dbo].[TBExpenses](
	[AccountID] [int] NOT NULL PRIMARY KEY,
	[Date] [date] NOT NULL PRIMARY KEY,
	[Time] [time](0) NOT NULL PRIMARY KEY,
	[Amount] [decimal](18, 2) NOT NULL,
	[CategoryID] [int] NOT NULL,
	[Info] [nvarchar](50) NULL,

GO

CREATE VIEW [dbo].[V_UserExpenses]
AS
SELECT        AccountID, YEAR(Date) AS Year, MONTH(Date) AS Month, DAY(Date) AS Day, Time, Amount, CategoryID, Info
FROM            dbo.TBExpenses
GO

SET IDENTITY_INSERT [dbo].[TBAccount] ON 

INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1000, N'test1@test1.com')
INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1001, N'test2@test2.com')
INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1002, N'test1@test1.com1')
INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1003, N'test3@test3.com')
INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1004, N'test4@test4.com')
INSERT [dbo].[TBAccount] ([AccountID], [Email]) VALUES (1005, N'test5@test5.com')
SET IDENTITY_INSERT [dbo].[TBAccount] OFF
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2018-05-01' AS Date), CAST(N'11:00:00' AS Time), CAST(1000.00 AS Decimal(18, 2)), 2, N'sds')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-05-02' AS Date), CAST(N'15:00:00' AS Time), CAST(1000.00 AS Decimal(18, 2)), 2, N'dsad')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-06-01' AS Date), CAST(N'11:00:00' AS Time), CAST(11.00 AS Decimal(18, 2)), 1, N'dsad')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-07-01' AS Date), CAST(N'10:00:00' AS Time), CAST(12.00 AS Decimal(18, 2)), 1, N'dad')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-08-12' AS Date), CAST(N'16:00:00' AS Time), CAST(15.00 AS Decimal(18, 2)), 1, N'bamba')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-08-13' AS Date), CAST(N'17:00:00' AS Time), CAST(93.12 AS Decimal(18, 2)), 1, N'drug store')
INSERT [dbo].[TBExpenses] ([AccountID], [Date], [Time], [Amount], [CategoryID], [Info]) VALUES (1000, CAST(N'2019-08-14' AS Date), CAST(N'12:00:00' AS Time), CAST(100.00 AS Decimal(18, 2)), 1, N'coffe')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2017-05-04' AS Date), CAST(N'00:00:00' AS Time), CAST(9000.00 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2018-05-04' AS Date), CAST(N'00:00:00' AS Time), CAST(9000.00 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2019-05-04' AS Date), CAST(N'17:00:00' AS Time), CAST(12000.00 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2019-06-04' AS Date), CAST(N'17:00:00' AS Time), CAST(12000.00 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2019-07-14' AS Date), CAST(N'17:00:00' AS Time), CAST(12000.00 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBIncomes] ([AccountID], [Date], [Time], [Amount], [Type]) VALUES (1000, CAST(N'2019-08-14' AS Date), CAST(N'17:06:00' AS Time), CAST(14000.35 AS Decimal(18, 2)), N'work')
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test1@test1.com', N'test1', NULL, NULL)
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test1@test1.com1', N'test1', NULL, NULL)
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test2@test2.com', N'test2', NULL, NULL)
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test3@test3.com', NULL, N'name', N'photo')
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test4@test4.com', N'test4', NULL, NULL)
INSERT [dbo].[TBUsers] ([Email], [Password], [Name], [PhotoUrl]) VALUES (N'test5@test5.com', NULL, N'name5', N'stam photo')
ALTER TABLE [dbo].[TBAccount]  WITH CHECK ADD  CONSTRAINT [FK_TBAccount_TBUsers] FOREIGN KEY([Email])
REFERENCES [dbo].[TBUsers] ([Email])
GO
ALTER TABLE [dbo].[TBAccount] CHECK CONSTRAINT [FK_TBAccount_TBUsers]
GO

CREATE PROC [dbo].[GetExpensesUserByYear] (
	@AccountID int,
	@Date date
	)
AS
	SELECT * FROM [dbo].[V_UserExpenses]
	WHERE (AccountID = @AccountID) AND (Year = YEAR(@Date))
GO

CREATE PROC [dbo].[GetIncomeUserByYear] (
	@AccountID int,
	@Date date
	)
AS
	SELECT * FROM [dbo].[V_UserIncome]
	WHERE (AccountID = @AccountID) AND (Year = YEAR(@Date))
GO


CREATE PROC [dbo].[InsertUser] (
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

CREATE PROC [dbo].[InsertUserFBandGL] (
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
