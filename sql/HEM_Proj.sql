

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


CREATE PROC [dbo].[InsertUser] (
	@Email nvarchar(50),
	@Password nvarchar(12)
	)
AS
IF NOT EXISTS (SELECT * FROM TBUsers WHERE Email = @Email)
	BEGIN
		INSERT INTO TBUsers(Email,Password)
		VALUES(@Email, @Password)
		RETURN 0
	END
ELSE
	BEGIN
		RETURN 1
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
		RETURN 0
	END
ELSE
	BEGIN
		RETURN 1
	END
GO