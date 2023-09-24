use BulletinBoard

select * from POST
select * from Registration
select * from Category
select * from Comments



create table Comments(CId int identity(1,1) primary key,
                       Comments nvarchar(1000),
					   Pid int, 
					   UserName varchar(100) foreign key REFERENCES Registration(UserName) ,
					   Email varchar(100) FOREIGN KEY REFERENCES Registration(Email),
					   Date_Time datetime);

 ALTER TABLE POST ADD Email varchar(100) FOREIGN KEY REFERENCES Registration(Email) , Date_Time timestamp;

 Alter table Registration add unique(Email);

select * from Comments


 Alter table Category add CateId int identity(1,1);
create table Category(CatId int primary key ,CategoryName nvarchar(100) unique)


ALTER TABLE POST
ADD FOREIGN KEY (Pid) REFERENCES POST(PId);
ALTER TABLE Category
DROP COLUMN CatId;



truncate table POST
ALTER TABLE POST ADD Date_Time datetime

ALTER TABLE POST ADD Likes int
ALTER TABLE POST ADD Views int
truncate table comments
truncate table Category
drop table Category
truncate table POST


INSERT INTO post (views)
values (1)


DELETE FROM post WHERE PId=28;

insert into post(views) values(1)
update post set views=1 ;
update post set likes=1;

