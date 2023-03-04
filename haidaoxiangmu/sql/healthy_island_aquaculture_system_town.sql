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
-- Table structure for table `town`
--

DROP TABLE IF EXISTS `town`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `town` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `town` varchar(45) DEFAULT NULL,
  `countyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `town`
--

LOCK TABLES `town` WRITE;
/*!40000 ALTER TABLE `town` DISABLE KEYS */;
INSERT INTO `town` VALUES (1,'昌国街道',1),(2,'环南街道',1),(3,'城东街道',1),(4,'盐仓街道',1),(5,'临城街道',1),(6,'岑港街道',1),(7,'马岙街道',1),(8,'双桥街道',1),(9,'小沙街道',1),(10,'千岛街道',1),(11,'金塘镇',1),(12,'白泉镇',1),(13,'干览镇',1),(14,'沈家门街道',2),(15,'东港街道',2),(16,'朱家尖街道',2),(17,'展茅街道',2),(18,'六横镇',2),(19,'虾峙镇',2),(20,'桃花镇',2),(21,'东极镇',2),(22,'普陀山镇',2),(23,'高亭镇',3),(24,'东沙镇',3),(25,'岱东镇',3),(26,'岱西镇',3),(27,'长涂镇',3),(28,'衢山镇',3),(29,'秀山乡',3),(30,'菜园镇',4),(31,'嵊山镇',4),(32,'洋山镇',4),(33,'五龙乡',4),(34,'黄龙乡',4),(35,'枸杞乡',4),(36,'花鸟乡',4);
/*!40000 ALTER TABLE `town` ENABLE KEYS */;
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
