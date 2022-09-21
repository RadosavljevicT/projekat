/*
SQLyog Community
MySQL - 10.4.20-MariaDB : Database - animals
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `animals`;

/*Table structure for table `animal_type` */

DROP TABLE IF EXISTS `animal_type`;

CREATE TABLE `animal_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `animal_type` */

insert  into `animal_type`(`id`,`value`) values 
(1,'persian cat'),
(2,'white cat'),
(3,'furry cat'),
(4,'sick cat'),
(5,'other');

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`postId`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  KEY `FK_c0354a9a009d3bb45a08655ce3b` (`userId`),
  CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/*Data for the table `comment` */

insert  into `comment`(`id`,`postId`,`userId`,`content`) values 
(1,1,1,'Koliko je stara? Kog je pola? Jel ima nekih problema...'),
(2,1,2,'adfsgdsf');

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bc096b4e18b1f9508197cd98066` (`senderId`),
  KEY `FK_71fb36906595c602056d936fc13` (`receiverId`),
  CONSTRAINT `FK_71fb36906595c602056d936fc13` FOREIGN KEY (`receiverId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_bc096b4e18b1f9508197cd98066` FOREIGN KEY (`senderId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/*Data for the table `message` */

insert  into `message`(`id`,`content`,`createdAt`,`senderId`,`receiverId`) values 
(1,'afds','2022-09-21 17:15:43.046545',2,1),
(2,'fads','2022-09-21 17:15:43.417092',2,1),
(3,'adfs','2022-09-21 17:15:43.851061',2,1),
(4,'a','2022-09-21 17:15:44.086093',2,1);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`timestamp`,`name`) values 
(1,1663521415868,'usertable1663521415868'),
(2,1663521459467,'animaltypetable1663521459467'),
(3,1663622587066,'posts1663622587066'),
(4,1663622622845,'messages1663622622845');

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `animalTypeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5c1cf55c308037b5aca1038a131` (`userId`),
  KEY `FK_d437a52a3a7c7e6157c5e0766f8` (`animalTypeId`),
  CONSTRAINT `FK_5c1cf55c308037b5aca1038a131` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d437a52a3a7c7e6157c5e0766f8` FOREIGN KEY (`animalTypeId`) REFERENCES `animal_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

/*Data for the table `post` */

insert  into `post`(`id`,`createdAt`,`animalTypeId`,`userId`,`content`) values 
(1,'2022-09-21 17:10:54.919816',2,1,'<p><img src=\"https://localhost:8000/img/1ddba4fe-f2ee-4988-bd8b-334595ef28c3-cats_image5.jpg\"></p><p><br></p><p>Da li neko zeli da udomi ovu macu</p>');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL DEFAULT 0,
  `blocked` tinyint(4) NOT NULL DEFAULT 0,
  `imageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
);

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`email`,`password`,`admin`,`blocked`,`imageUrl`) values 
(1,'Milica ','Vasic','m@test.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=',0,0,'https://localhost:8000/img/dc58989c-ef72-477b-8e16-39e17b5bf8da-270774619_2693029367672450_3974280042621720511_n.jpg'),
(2,'Milica','Vidic','mv@test.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=',0,0,'https://localhost:8000/img/f069946b-3608-4083-88dd-e66a2880be92.png'),
(3,'Tamara','Radosavljevic','t@gmail.com','/1rBkZBCSx2I+UGe+UmuVm99EJL9j/wWOMl9pvJ/Oxg=',1,0,'https://localhost:8000/img/1c036a7f-e652-43f1-9c57-d28b80893b9a.png');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
