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
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `uid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
INSERT INTO `discussion` VALUES (1,'111222333','<p><u><em><strong>1235sadas??!!</strong></em></u></p>','2023-02-25T09:26:47.293Z','1'),(2,'asdawcc','564as5d6a','2022-12-11T08:53:21.923Z','1'),(5,'222222','<p><span style=\"color: rgb(120, 6, 80); background-color: rgb(140, 140, 140); font-size: 24px;\"><u><em><strong>da4s56da</strong></em></u></span></p>','2023-02-24T06:32:07.125Z','4'),(7,'养殖问题','大闸蟹怎么养殖？','2022-12-11T08:53:21.923Z','1'),(8,'问大家一个问题','蛏子怎么养殖？','2022-12-11T08:55:54.265Z','2'),(9,'111','222','2022-12-11T09:26:31.961Z','2'),(16,'dsa','asd','2022-12-20T07:01:31.491Z','1'),(20,'ssss','dddd','2022-12-20T07:13:43.082Z','1'),(21,'qweqe','qweqweq','2022-12-20T07:14:05.141Z','1'),(22,'aaaa','ddddsss','2022-12-20T07:14:40.259Z','1'),(23,'这是一个新的讨论','这是新讨论的呢容','2022-12-20T09:18:48.454Z','1'),(24,'一个新讨论','<h1><strong>这是一个新</strong><span style=\"font-size: 32px;\"><strong>讨论，欢迎参加，test</strong></span></h1>','2023-02-24T05:18:00.726Z','1'),(25,'222','<p><span style=\"color: rgb(130, 0, 20);\">欢迎讨论</span></p>','2023-02-24T05:21:07.645Z','1');
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
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
