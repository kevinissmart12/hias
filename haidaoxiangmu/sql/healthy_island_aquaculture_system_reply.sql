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
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `uid` varchar(45) DEFAULT NULL,
  `did` varchar(45) DEFAULT NULL,
  `rid` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,'asdasda','2022-12-13T05:51:31.634Z','2','1',''),(6,'ddsad111','2022-12-13T05:51:31.634Z','6','5',''),(8,'5416-+*12!@$%','2022-12-13T06:29:09.115Z','1','5',''),(9,'5416-+*12!@$%','2022-12-13T06:29:09.115Z','1','5',''),(10,'afwudbni','2022-12-13T06:32:28.249Z','1','5','6'),(13,'908j238xe45','2022-12-13T06:32:28.249Z','2','5','6'),(15,'222','2022-12-13T05:51:31.634Z','1','9',''),(25,'<p>好的11</p>','2023-03-12T06:29:41.017Z','1','5',''),(26,'一条新消息','2022-12-20T07:17:44.058Z','1','5',''),(27,'111','2022-12-20T07:23:31.015Z','1','22',''),(28,'222','2022-12-20T07:30:35.671Z','1','22',''),(29,'111','2022-12-20T07:33:43.683Z','1','8',''),(32,'111','2022-12-20T07:41:13.571Z','1','1',''),(33,'222','2022-12-20T07:49:50.483Z','1','1',''),(34,'333','2022-12-20T07:50:56.996Z','1','1',''),(35,'444','2022-12-20T07:59:22.767Z','3','1',''),(40,'<p>46544</p>','2023-03-12T06:37:01.453Z','3','2',''),(41,'987654321','2022-12-20T08:20:31.745Z','3','2','40'),(42,'123sdaad','2022-12-20T08:50:00.016Z','3','2','41'),(43,'222','2022-12-20T08:52:05.321Z','3','8','29'),(44,'2231','2022-12-20T08:54:45.293Z','3','8','43'),(45,'1','2022-12-20T08:57:31.403Z','3','8','44'),(46,'ncbv','2022-12-20T08:58:04.448Z','3','8','45'),(47,'321321dadqwe','2022-12-20T08:58:56.152Z','1','8',''),(48,'dwdsadasdqw','2022-12-20T08:59:41.014Z','1','8',''),(49,'haha!!','2022-12-20T09:02:39.641Z','1','7',''),(50,'adsxzq','2022-12-20T09:13:09.215Z','1','1',''),(52,'2130mnkmk,','2022-12-20T09:15:31.325Z','1','1',''),(54,'.......','2022-12-20T09:16:31.176Z','1','8','29'),(75,'1','2022-12-20T11:16:01.268Z','1','23',''),(76,'2','2022-12-20T11:16:04.054Z','1','23','75'),(77,'3','2022-12-20T11:16:06.655Z','1','23','76'),(78,'4','2022-12-20T11:16:09.740Z','1','23','76'),(79,'qqq','2022-12-20T11:20:52.580Z','1','23','75'),(80,'www','2022-12-20T11:21:00.390Z','1','23','79'),(81,'<p><span style=\"color: rgb(225, 60, 57); font-size: 48px;\"><u><em><strong>你好，我的朋友</strong></em></u></span></p>','2023-02-24T05:22:51.455Z','1','23',''),(82,'<p><span style=\"color: rgb(0, 0, 0); font-size: 48px;\">111，地狱火</span></p>','2023-02-24T05:23:26.243Z','1','23','81'),(91,'<p>456</p>','2023-03-12T06:30:15.010Z','1','25',''),(93,'<p>789</p>','2023-03-12T06:36:19.197Z','1','25','91'),(94,'<p>111</p>','2023-03-28T09:00:24.417Z','1','29',''),(95,'<p>111222333</p>','2023-03-28T09:02:16.504Z','1','29','94'),(96,'<p>112233</p>','2023-03-28T09:04:07.520Z','1','29','95'),(97,'<p>312132</p>','2023-03-28T09:04:35.240Z','1','29',''),(98,'<p>3213123231</p>','2023-03-28T09:04:41.764Z','1','29','96'),(99,'<p>1111</p>','2023-03-28T14:09:06.788Z','1','29',''),(100,'<p>wasd</p>','2023-03-28T14:12:35.236Z','1','30','');
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 17:46:53
