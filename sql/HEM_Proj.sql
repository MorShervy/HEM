

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

------------------------------------------- יצירת פרוצדורות -------------------------------------------

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

update TBUsers set Name = 'a a' where Email = 'A@a.aa'
exec [dbo].[UpdateUserName] 'A@a.aa', 'a111a1'
CREATE PROC [dbo].[Login] (
	@Email nvarchar(50),
	@Password nvarchar(12)
	)
AS
IF EXISTS (SELECT * FROM TBUsers WHERE Email = @Email AND Password = @Password)
	BEGIN
		RETURN 0
	END
ELSE
	BEGIN
		RETURN 1
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

exec [dbo].[UpdateUserPicture] 'A@a.aa', 'stam bdika'