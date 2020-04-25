/* Check if database already exists and delete it if it does exist*/
IF EXISTS(SELECT 1
FROM master.dbo.sysdatabases
WHERE name = 'dialdash') 
BEGIN
	DROP DATABASE dialdash
	print ''
	print '*** dropping database dialdash'
END
GO

print  ''
print '*** Creating dialdash Database'
GO
CREATE DATABASE dialdash
GO

print ''
print '*** Using dialdash database'
GO
USE [dialdash]
GO

--  Tables below --

print ''
print '*** Creating table Category'
GO
CREATE TABLE [dbo].[Category]
(
	[Id] [int] NOT NULL IDENTITY,
	[Name] [nvarchar](50) NOT NULL

	CONSTRAINT [PK_CategoryId] PRIMARY KEY([Id] ASC)
)
GO

print ''
print '*** Creating table Topic'
GO
CREATE TABLE [dbo].[Topic]
(
	[Id] [int] NOT NULL IDENTITY,
	[CategoryId] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NUll,

	CONSTRAINT [PK_TopicId] PRIMARY KEY([Id] ASC)
)
GO

print ''
print '*** Creating table TopicExpert'
GO
CREATE TABLE [dbo].[TopicExpert]
(
    	[Id] [int] NOT NULL IDENTITY,
	[ExpertId] [NVARCHAR] (128) NOT NULL,
	[TopicId] [int] NOT NULL,

	CONSTRAINT [PK_TopicExpertId] PRIMARY KEY([Id] ASC)
)
GO

print ''
print '*** Creating table Expert'
GO
CREATE TABLE [dbo].[Expert]
(
	[Id] [NVARCHAR] (128) NOT NULL,
    	[UserId] [NVARCHAR] (128) NOT NULL,
	[Days] [NVARCHAR] (50) NOT NULL,
	[Hours] [NVARCHAR] (50) NOT NUll,
	[Rank] [int] NOT NULL DEFAULT 1,
	[Rating] [decimal](3,1) NOT NULL,
	[IsActive] [BIT] NOT NULL,

	CONSTRAINT [PK_ExpertId] PRIMARY KEY([Id] ASC)
)
GO

print ''
print '*** Creating table Reviews'
GO
CREATE TABLE [dbo].[Reviews]
(
    [Id] [int] NOT NULL IDENTITY,
    [ExpertId] [NVARCHAR] (128) NOT NULL,
	[UserId] [NVARCHAR] (128) NOT NULL,
	[Message] [NVARCHAR] (500) NOT NULL,

	CONSTRAINT [PK_ReviewsId] PRIMARY KEY([Id] ASC)
)
GO

print ''
print '*** Creating table UserExperts'
GO
CREATE TABLE [dbo].[UserExperts]
(
	[ExpertId] [NVARCHAR] (128) NOT NULL,
    [UserId] [NVARCHAR] (128) NOT NULL,

	CONSTRAINT [PK_UserExpertsExpertIdUserId] PRIMARY KEY([ExpertId],[UserId])
)
GO

/*     Adding AspNet Identity tables  */

GO
CREATE TABLE [dbo].[AspNetRoles]
(
	[Id] NVARCHAR (128) NOT NULL,
	[Name] NVARCHAR (256) NOT NULL
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex]
    ON [dbo].[AspNetRoles]([Name] ASC);


GO
ALTER TABLE [dbo].[AspNetRoles]
    ADD CONSTRAINT [PK_dbo.AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC);

GO
CREATE TABLE [dbo].[AspNetUsers]
(
	[Id] NVARCHAR (128) NOT NULL,
	[Email] NVARCHAR (256) NULL,
    [FirstName] NVARCHAR (50) NOT NULL,
    [LastName] NVARCHAR (50) NOT NULL, 
	[EmailConfirmed] BIT NOT NULL,
	[PasswordHash] NVARCHAR (MAX) NULL,
	[SecurityStamp] NVARCHAR (MAX) NULL,
	[PhoneNumber] NVARCHAR (MAX) NULL,
	[PhoneNumberConfirmed] BIT NOT NULL,
	[TwoFactorEnabled] BIT NOT NULL,
	[LockoutEndDateUtc] DATETIME NULL,
	[LockoutEnabled] BIT NOT NULL,
	[AccessFailedCount] INT NOT NULL,
	[UserName] NVARCHAR (256) NOT NULL,
	[IsEnabled] BIT NOT NULL,
    [IsActive] BIT NOT NULL,
    [Phone] NVARCHAR (15) NOT NULL
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex]
    ON [dbo].[AspNetUsers]([UserName] ASC);


GO
ALTER TABLE [dbo].[AspNetUsers]
    ADD CONSTRAINT [PK_dbo.AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC);

GO
CREATE TABLE [dbo].[AspNetUserRoles]
(
	[UserId] NVARCHAR (128) NOT NULL,
	[RoleId] NVARCHAR (128) NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[AspNetUserRoles]([UserId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_RoleId]
    ON [dbo].[AspNetUserRoles]([RoleId] ASC);


GO
ALTER TABLE [dbo].[AspNetUserRoles]
    ADD CONSTRAINT [PK_dbo.AspNetUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC);


GO
ALTER TABLE [dbo].[AspNetUserRoles]
    ADD CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE;

GO
ALTER TABLE [dbo].[AspNetUserRoles]
    ADD CONSTRAINT [FK_dbo.AspNetUserRoles_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE;

GO

CREATE TABLE [dbo].[AspNetUserClaims]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[UserId] NVARCHAR (128) NOT NULL,
	[ClaimType] NVARCHAR (MAX) NULL,
	[ClaimValue] NVARCHAR (MAX) NULL
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[AspNetUserClaims]([UserId] ASC);


GO
ALTER TABLE [dbo].[AspNetUserClaims]
    ADD CONSTRAINT [PK_dbo.AspNetUserClaims] PRIMARY KEY CLUSTERED ([Id] ASC);


GO
ALTER TABLE [dbo].[AspNetUserClaims]
    ADD CONSTRAINT [FK_dbo.AspNetUserClaims_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE;

GO
CREATE TABLE [dbo].[AspNetUserLogins]
(
	[LoginProvider] NVARCHAR (128) NOT NULL,
	[ProviderKey] NVARCHAR (128) NOT NULL,
	[UserId] NVARCHAR (128) NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [IX_UserId]
    ON [dbo].[AspNetUserLogins]([UserId] ASC);


GO
ALTER TABLE [dbo].[AspNetUserLogins]
    ADD CONSTRAINT [PK_dbo.AspNetUserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC);


GO
ALTER TABLE [dbo].[AspNetUserLogins]
    ADD CONSTRAINT [FK_dbo.AspNetUserLogins_dbo.AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE;

/* DONE ADDING ASPNET TABLES */

-- Adding foreign Keys --

print''
print '*** Adding foreign key to Topic table'
GO
ALTER TABLE [dbo].[Topic] WITH NOCHECK
	ADD FOREIGN KEY ([CategoryId])
	REFERENCES [dbo].[Category] ([Id])
GO

print''
print '*** Adding foreign key to TopicExpert table'
GO
ALTER TABLE [dbo].[TopicExpert] WITH NOCHECK
	ADD FOREIGN KEY ([ExpertId])
	REFERENCES [dbo].[Expert] ([Id])
GO

print''
print '*** Adding foreign key to TopicExpert table'
GO
ALTER TABLE [dbo].[TopicExpert] WITH NOCHECK
	ADD FOREIGN KEY ([TopicId])
	REFERENCES [dbo].[Topic] ([Id])
GO

print''
print '*** Adding foreign key to UserExperts table'
GO
ALTER TABLE [dbo].[UserExperts] WITH NOCHECK
	ADD FOREIGN KEY ([UserId])
	REFERENCES [dbo].[AspNetUsers] ([Id])
GO

print''
print '*** Adding foreign key to UserExperts table'
GO
ALTER TABLE [dbo].[UserExperts] WITH NOCHECK
	ADD FOREIGN KEY ([ExpertId])
	REFERENCES [dbo].[Expert] ([Id])
GO

print''
print '*** Adding foreign key to Reviews table'
GO
ALTER TABLE [dbo].[Reviews] WITH NOCHECK
	ADD FOREIGN KEY ([ExpertId])
	REFERENCES [dbo].[Expert] ([Id])
GO

print''
print '*** Adding foreign key to Reviews table'
GO
ALTER TABLE [dbo].[Reviews] WITH NOCHECK
	ADD FOREIGN KEY ([UserId])
	REFERENCES [dbo].[AspNetUsers] ([Id])
GO
-- Done adding foreign keys --

-- Adding dummy data --

print ''
print '*** Adding test data to Categories table'
GO
SET IDENTITY_INSERT [dbo].[Category] ON

INSERT INTO [dbo].[Category]
	([Id],[Name])
VALUES
	(1, 'Technology'),
	(2, 'Health'),
	(3, 'Automotive'),
	(4, 'Food'),
	(5, 'History'),
	(6, 'Geography'),
	(7, 'Science'),
	(8, 'Housing'),
	(9, 'Finance'),
	(10, 'Animals')
GO
SET IDENTITY_INSERT [dbo].[Category] OFF


print ''
print '*** Adding test data to Topics table'
GO
INSERT INTO [dbo].[Topic]
	([CategoryId],[Name])
VALUES
	(1, 'Programming'),
	(1, "TV's"),
	(1, 'Audio'),
	(1, 'Computers'),
	(1, 'Video Games'),
	(2, 'Medication'),
	(2, 'Fitness'),
	(9, 'Home Loans'),
	(9, '401K'),
	(10, 'Pets')
GO
