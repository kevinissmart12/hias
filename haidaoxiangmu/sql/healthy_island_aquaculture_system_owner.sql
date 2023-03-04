CREATE DATABASE  IF NOT EXISTS `healthy_island_aquaculture_system` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `healthy_island_aquaculture_system`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: healthy_island_aquaculture_system
-- ------------------------------------------------------
-- Server version	5.7.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `imgUrl` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `town` varchar(255) DEFAULT NULL,
  `village` varchar(255) DEFAULT NULL,
  `engagedTime` varchar(255) DEFAULT NULL,
  `educationLevel` varchar(255) DEFAULT NULL,
  `farmerTitle` varchar(255) DEFAULT NULL,
  `departmentId` varchar(255) DEFAULT NULL,
  `discriminator` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `establishedTime` varchar(255) DEFAULT NULL,
  `fixedAssets` varchar(255) DEFAULT NULL,
  `businessContents` varchar(255) DEFAULT NULL,
  `isBaseOfEmployee` varchar(45) DEFAULT NULL,
  `numberOfEmployee` varchar(255) DEFAULT NULL,
  `featuredProducts` varchar(255) DEFAULT NULL,
  `creditLevel` varchar(255) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `checkStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (4,'李四区','1777777777','2020-4-1','男','http://localhost:3000/products/1670139413529eyJhbGciOi119806.png','舟山青山渔村','2','18','254','10年','高中','普通农民','11-85po-58','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','12000万','水产养殖','1','20','基围虾 ','A','无','1'),(13,'王五','1666666666','2001-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山青山渔村','2','18','254','10年','初中','低级农民','123qwe-798','个人','','','','','','','','B','无','1'),(14,'王五六','15555555555','2001-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山苍洞渔业村','2','18','265','8年','初中','低级农民','123qwe-798','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','12000万','水产养殖','1','20','基围虾 ','A','无','1'),(15,'小张','1444444444','2001-01-31T16:00:00.000Z','女','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山苍洞渔业村','2','18','265','6年','大学','高级农民','123qwe-798','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','12000万','水产养殖','1','20','基围虾 ','A','无','1'),(16,'小王','1333333333','2001-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山苍洞渔业村','2','18','265','4年','大学','高级农民','123qwe-798','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','12000万','水产养殖','1','20','基围虾 ','A','无','1'),(18,'小陈','1999999999','2001-01-31T16:00:00.000Z','女','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山虾峙镇晨港村','2','19','277','2年','大学','低级农民','789-asd-123','个人',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'C','无','1'),(19,'小萧','158888888','2001-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山虾峙镇晨港村','2','19','277','4年','大学','低级农民','789-asd-123','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','1800万','水产养殖','0','30','大闸蟹','A','无','1'),(20,'小石','1464864868','2001-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山虾峙镇晨港村','2','19','277','5年','大学','高级农民','789-asd-123','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','1800万','水产养殖','0','30','大闸蟹','A','无','1'),(21,'小韩','1875543122','2001-01-31T16:00:00.000Z','女','http://localhost:3000/owner/1670230329134eyJhbGciOi104283.webp','舟山虾峙镇晨港村','2','19','277','6年','初中','高级农民','789-asd-123','企业','舟山市经济合作社','2001-05-31T16:00:00.000Z','1800万','水产养殖','0','30','大闸蟹','A','无','1'),(22,'小刘','1789562315','2000-01-31T16:00:00.000Z','男','http://localhost:3000/owner/1670309869508eyJhbGciOi117403.webp','舟山苍洞渔业村','2','18','265','5年','大学','高级农民','123qwe-798','个人','','','','','','','','A','111','1'),(23,'小明','1654872564','2000-02-07T16:00:00.000Z','男','http://localhost:3000/owner/1670310122903eyJhbGciOi157460.jpg','舟山青山渔村','2','18','254','8年','研究生','高级农民','123qwe-798','企业','舟山市22经济合作社','2001-02-05T16:00:00.000Z','16亿','水产养殖','1','100','龙虾','A','','0'),(27,'test','test','2023-01-23T16:00:00.000Z','女','http://localhost:3000/owner/1674301609497eyJhbGciOi110180.jpg','test','1','2','20','test','小学','test','test','个人','','','','','','','','A','test','1'),(28,'user003','1121212','2023-02-21T16:00:00.000Z','男','http://localhost:3000/owner/1677567231668eyJhbGciOi102995.jpg','1212','2','14','169','212','小学','12','1221','个人','','','','','','','','A','','2'),(29,'1','1','2023-03-14T16:00:00.000Z','女','','1','2','14','165','1','初中','2','1','个人','','','','','','','','B','','1'),(30,'1','1','2023-03-29T16:00:00.000Z','男','','1','1','1','2','1','博士','1','1','企业','1','2023-03-05T16:00:00.000Z','1','1','1','1','1','A','','1');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-04 16:31:06
