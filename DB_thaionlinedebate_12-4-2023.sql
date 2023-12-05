-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: thaionlinedebate
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `act_id` int NOT NULL AUTO_INCREMENT,
  `act_start_date` datetime NOT NULL,
  `act_end_date` datetime NOT NULL,
  `admin_id` char(8) NOT NULL,
  `dbt_id` int DEFAULT NULL,
  PRIMARY KEY (`act_id`),
  KEY `act_dbt_idx` (`dbt_id`),
  KEY `act_admin_idx` (`admin_id`),
  CONSTRAINT `act_admin` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `act_dbt` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'2023-12-03 01:39:00','2023-12-10 03:39:00','8rxq9hvm',40);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` char(8) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_username` varchar(15) NOT NULL,
  `admin_phonenum` varchar(10) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('8rxq9hvm','mofin@mail.com','mofin news234','','$2a$10$8h3GvXAzBk9KVqsTD8XYfOgoNTuPviuw3GMm62JQDydg3Cxu2JXC6');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approval`
--

DROP TABLE IF EXISTS `approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approval` (
  `dr_id` int NOT NULL,
  `admin_id` char(8) DEFAULT NULL,
  `ap_timestamp` timestamp NOT NULL,
  `ap_download_expired_date` datetime NOT NULL,
  `ap_status` varchar(15) NOT NULL,
  KEY `ap_rq_idx` (`dr_id`),
  KEY `ap_approval_idx` (`admin_id`),
  CONSTRAINT `ap_approval` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ap_rq` FOREIGN KEY (`dr_id`) REFERENCES `downloadrequest` (`dr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approval`
--

LOCK TABLES `approval` WRITE;
/*!40000 ALTER TABLE `approval` DISABLE KEYS */;
INSERT INTO `approval` VALUES (13,'8rxq9hvm','2023-12-02 15:57:19','2023-12-09 22:57:19','approved'),(14,'8rxq9hvm','2023-12-02 16:30:15','2023-12-09 23:30:15','approved'),(15,'8rxq9hvm','2023-12-02 16:35:38','2023-12-02 23:35:38','rejected');
/*!40000 ALTER TABLE `approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `dbc_id` int NOT NULL,
  `user_id` char(8) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_dbc_idx` (`dbc_id`),
  CONSTRAINT `comment_dbc` FOREIGN KEY (`dbc_id`) REFERENCES `debatecomment` (`dbc_id`),
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debatecomment`
--

DROP TABLE IF EXISTS `debatecomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debatecomment` (
  `dbc_id` int NOT NULL AUTO_INCREMENT,
  `dbc_comment` varchar(300) NOT NULL,
  `dbc_total_like` int NOT NULL,
  `dbc_stance` tinyint NOT NULL,
  `dbc_timestamp` timestamp NOT NULL,
  `user_id` char(8) NOT NULL,
  `dbt_id` int DEFAULT NULL,
  PRIMARY KEY (`dbc_id`),
  KEY `dbc_user_idx` (`user_id`),
  KEY `dbc_dbt_idx` (`dbt_id`),
  CONSTRAINT `dbc_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `dbt_dbc` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debatecomment`
--

LOCK TABLES `debatecomment` WRITE;
/*!40000 ALTER TABLE `debatecomment` DISABLE KEYS */;
INSERT INTO `debatecomment` VALUES (1,'สนุกมาก ๆ ปีที่แล้วเรามากับเพื่อน พี่ๆน่ารักมาก',0,0,'2023-11-08 06:24:38','dehs5oxy',1),(2,'ไม่ชอบอยู่รังสิตครับ เสียดายมหาลัยดี ๆ',0,1,'2023-11-08 06:29:21','zwef8vbn',1),(3,'บุหรี่ไฟฟ้าเป็นทางเลือกสำหรับผู้ที่ต้องการเลิกบุหรี่จริง แต่ก็มีความเสี่ยงที่จะติดบุหรี่ไฟฟ้าแทนบุหรี่ธรรมดาได้',0,0,'2023-11-09 01:42:07','cr5sitso',2),(4,'บุหรี่ไฟฟ้าเป็นช่องทางในการเข้าถึงบุหรี่ได้ง่ายขึ้น เด็กและเยาวชนสามารถเข้าถึงบุหรี่ไฟฟ้าได้ผ่านช่องทางออนไลน์และช่องทางอื่นๆ ได้ง่าย ส่งผลให้เด็กและเยาวชนเริ่มสูบบุหรี่ได้เร็วขึ้น',0,0,'2023-11-09 01:43:25','t4w6h82s',2),(5,'บุหรี่ไฟฟ้าเป็นทางเลือกสำหรับผู้ที่ต้องการเลิกบุหรี่ บุหรี่ไฟฟ้ามีอันตรายน้อยกว่าบุหรี่ธรรมดา และสามารถช่วยลดปัญหาการลักลอบนำเข้าบุหรี่เถื่อน',0,1,'2023-11-09 01:50:33','kfyahp2x',2),(6,'ควรยกเลิกแล้วเปลี่ยนเป็นระบบสมัครใจเพราะจะได้มีทหารที่อยากทำหน้าที่ป้องกันประเทศจริง ๆ',0,0,'2023-11-09 01:53:47','kfyahp2x',3),(7,'ถ้าไม่มีทหารก็ไม่มีรั้วของชาติ ดังนั้นชายไทยทุกคนจึงต้องเข้ารับการเกณฑ์ทหาร',0,1,'2023-11-09 01:54:58','t4w6h82s',3),(8,'เกณฑ์ทหารเป็นการเสียโอกาสและเวลาที่เปล่าประโยชน์ เพราะเข้าไปช่วยเมียผบ.ซักเสื้อผ้า รบกับหญ้าฆ่ากับหมด',0,0,'2023-11-09 01:55:59','cr5sitso',3),(9,'บุหรี่ไฟฟ้า ยังคงมีโทษให้ทั้งคนที่สูบและคนที่อยู่บริเวณรอบข้างด้วย นอกจากจะทำให้ตัวเองสุขภาพแย่แล้ว ยังจะทำให้คนอื่นที่ไม่เกี่ยวข้องสุขภาพแย่ตามไปด้วย',0,0,'2023-11-09 02:02:07','88bf63hw',2),(10,'ส่วนประกอบน้ำปลามากกว่าพริกจึงเรียก น้ำปลาพริก',0,0,'2023-11-09 02:05:41','88bf63hw',4),(11,'มันมีความน่าสนใจน่าาาา มีกิจกรรมทำให้มากมายเข้ามาดูกันเยอะๆน่าาา',0,0,'2023-11-09 03:16:32','8fp5wafa',1),(12,'น้ำปลาเยอะกว่าพริก',0,0,'2023-11-09 03:45:53','8fp5wafa',4),(13,'ส่วนตัวเซฟคิดว่าเรียก พริกน้ำปลา เพราะว่ามีพริกมากกว่าน้ำปลา',0,1,'2023-11-09 04:10:38','cr5sitso',4),(14,'สนับสนุนครับ เพราะผมก็สูบเหมือนกัน',0,0,'2023-11-09 04:22:09','0j7t2s4m',2),(15,'มันชินปากค่ะ',0,1,'2023-11-09 04:44:58','0j7t2s4m',4),(16,'ส่วนมากใช้กินกับปลา\n',0,0,'2023-11-09 04:45:42','0j7t2s4m',4),(17,'เห็นด้วย',0,0,'2023-11-09 06:06:15','0j7t2s4m',1),(18,'เพราะ common sane',0,1,'2023-11-09 06:42:48','0j7t2s4m',4),(19,'เห็นด้วยอย่างยิ่ง',0,0,'2023-11-09 06:44:43','0j7t2s4m',5),(20,'รัฐบาลจะได้ไม่โกงค่าบุหรี่',0,0,'2023-11-09 06:47:11','celuc60j',2),(21,'อย่ามั่ว LOL คือเกมที่ดีที่สุดในโลก',0,1,'2023-11-09 06:55:21','wayp6n63',5),(22,'ร้านเกมมีที่บ้านลงเกม Dota2 ก่อน LOL',0,0,'2023-11-09 07:38:45','t4w6h82s',5),(23,'ใช่แล้วไม่ไหวจะตายแล้วทำงานหนักมากกกกก',0,0,'2023-11-09 08:05:32','0j7t2s4m',8),(24,'ไม่รู้เหมือนกัน ผู้ใหญ่เรียกแบบนี้เลยเรียกตามค่ะ\n',0,1,'2023-11-10 04:53:06','hlq6voz3',4),(25,'ได้ของฟรี ชอบค่ะ ดีค่ะ',0,0,'2023-11-10 04:54:30','hlq6voz3',1),(26,'ชอบแมวกว่า เพราะมันอ้วน',0,1,'2023-11-10 04:59:33','hlq6voz3',9),(27,'ส่วนตัวเรียกว่าพริกน้ำปลา\n',0,1,'2023-11-10 06:31:30','hlq6voz3',4),(28,'เพราะหมาเล่นด้วยได้ ฝึกได้เข้าใจคนสั่งได้',0,0,'2023-11-10 06:40:46','rg81oli9',9),(29,'เพราะมันเผ็ดมากกว่าน้ำปลาปกติ',0,1,'2023-11-10 07:20:23','hlq6voz3',4),(30,'เพราะว่าพ่อขับปาดกว่า',0,1,'2023-11-10 07:23:51','0j7t2s4m',10),(31,'แต่แมวไม่วิ่งมาก',0,1,'2023-11-10 07:26:52','0j7t2s4m',9),(32,'พริก คือ สิ่งที่ถูกมองเห็นก่อน',0,1,'2023-11-10 07:40:29','0j7t2s4m',4),(33,'เพราะแมวน่ารักและอยู่เป็นที่มากกว่า เช่นแมวที่บ้าน',0,1,'2023-11-10 07:58:55','0j7t2s4m',9),(34,'LOL เกมดีมากครับพี่เพลงโคตรเพราะะะะะ',0,1,'2023-11-10 08:00:48','0j7t2s4m',5),(35,'มันทำให้ใครหลายคนเสียโอกาสเพียงเพราะจับได้ใบแดง ดังนั้นเราควรได้รับความสมัครใจมากกว่า',0,0,'2023-11-10 08:02:54','0j7t2s4m',3),(36,'น้ำท่วมบ่อยครับ',0,1,'2023-11-10 08:03:36','0j7t2s4m',1),(37,'อันตรายกว่าบุหรี่ปกติ ไม่ได้ดีขึ้นเลยจ้า',0,0,'2023-11-10 08:06:03','0j7t2s4m',2),(38,'Dota2 ชื่อติดหูมากกว่า ตำนานกว่า',0,0,'2023-11-10 08:13:20','0j7t2s4m',5),(39,'LOL มี Arcane นะห๊ะ',0,1,'2023-11-10 08:14:00','0j7t2s4m',5),(40,'น้ำปลาพริก',0,0,'2023-11-11 02:04:24','hlq6voz3',4),(41,'เคนได้ยินตั้งแต่เด็ก\n',0,1,'2023-11-11 03:01:32','hlq6voz3',4),(42,'เพราะฝึกได้\n',0,0,'2023-11-11 03:02:35','hlq6voz3',9),(43,'มีแมวเยอะมากค่ะ\n',0,1,'2023-11-11 03:03:00','hlq6voz3',9),(44,'เอาพริกไปใส่น้ำปลา',0,0,'2023-11-11 03:33:38','hlq6voz3',4),(45,'ชอบสวบพุงแมว',0,1,'2023-11-11 03:34:27','hlq6voz3',9),(46,'เพราะว่าพริกใส่ในน้ำปลาไม่ใช่น้ำปลาใส่ในพริก',0,1,'2023-11-11 04:18:09','9mz2hc28',4),(47,'ชอบเสียง',0,1,'2023-11-11 04:19:05','9mz2hc28',9),(48,'พริกใส่น้ำปลา\n',0,0,'2023-11-11 04:53:43','9mz2hc28',4),(49,'เพราะจะให้เป็นพริกน้ำปลา',0,1,'2023-11-11 04:54:34','9mz2hc28',4),(50,'แม่เรียกงี้เลยเรียกใช้ตาม',0,1,'2023-11-11 06:01:02','9mz2hc28',4),(51,'ก็แม่บอกให้เรียกแบบนี้',0,1,'2023-11-11 06:24:57','9mz2hc28',4),(52,'เพราะเห็นบ่อย',0,1,'2023-11-11 07:12:55','hlq6voz3',4),(53,'ดดดดดดด',0,1,'2023-12-01 18:53:22','8rxq9hvm',29),(54,'333',0,1,'2023-12-02 17:55:08','8rxq9hvm',40);
/*!40000 ALTER TABLE `debatecomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debatetag`
--

DROP TABLE IF EXISTS `debatetag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debatetag` (
  `dbt_id` int DEFAULT NULL,
  `tag_id` int NOT NULL,
  KEY `dbttag_dbt_idx` (`dbt_id`),
  KEY `dbttag_tagid_idx` (`tag_id`),
  CONSTRAINT `dbttag_dbt` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dbttag_tagid` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debatetag`
--

LOCK TABLES `debatetag` WRITE;
/*!40000 ALTER TABLE `debatetag` DISABLE KEYS */;
INSERT INTO `debatetag` VALUES (29,4),(29,12),(29,13),(31,4),(31,13),(31,18),(31,19),(31,20),(32,20),(32,21),(32,22),(32,23),(40,21),(40,20),(40,25),(4,26),(4,27),(4,28),(4,29);
/*!40000 ALTER TABLE `debatetag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debatetopic`
--

DROP TABLE IF EXISTS `debatetopic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debatetopic` (
  `dbt_id` int NOT NULL AUTO_INCREMENT,
  `dbt_title` text NOT NULL,
  `dbt_description` text NOT NULL,
  `dbt_timestamp` timestamp NOT NULL,
  `dbt_agree` varchar(45) NOT NULL,
  `dbt_disagree` varchar(45) NOT NULL,
  `user_id` char(8) NOT NULL,
  PRIMARY KEY (`dbt_id`),
  KEY `dbt_user_idx` (`user_id`),
  CONSTRAINT `dbt_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debatetopic`
--

LOCK TABLES `debatetopic` WRITE;
/*!40000 ALTER TABLE `debatetopic` DISABLE KEYS */;
INSERT INTO `debatetopic` VALUES (1,'OPEN HOUSE 2023 น่าสนใจ ?','วันที่ 9-12 จะมีงาน open house BU อย่าลืมมาร่วมสนุกและหาประสบการณ์กับพี่ ๆ ในคณะได้','2023-11-08 06:23:46','เห็นด้วย','ไม่เห็นด้วย','dehs5oxy'),(2,'ประเทศไทยควรมีกฎหมายห้ามขายบุหรี่ไฟฟ้าหรือไม่','ในปัจจุบันประเทศไทยสามารถพบเห็นคนดูดบุหรี่ไฟฟ้าได้ทั่วไปในที่สาธารณะ แม้กระทั่งในโรงเรียนและมหาวิทยาลัย ซึ่งทำให้ส่งผลเสียต่อสุขภาพของเยาวชนและคนที่ไม่ได้สูบ เราควรมีการห้ามขายบุหรี่ไฟฟ้าหรือไม่','2023-11-09 01:41:36','เห็นด้วย','ไม่เห็นด้วย','cr5sitso'),(3,'ประเทศไทยควรยกเลิกการเกณฑ์ทหารหรือไม่','ในปัจจุบันประเทศไทยใช้ระบบการเกณฑ์ทหาร ซึ่งบังคับให้ชายไทยที่มีอายุครบ 21 ปีต้องเข้ารับการเกณฑ์ทหารเป็นเวลา 2 ปี บางคนมองว่าระบบการเกณฑ์ทหารเป็นระบบที่ล้าสมัยและควรยกเลิก ส่วนบางคนมองว่าระบบการเกณฑ์ทหารเป็นระบบที่มีประโยชน์และควรรักษาไว้','2023-11-09 01:53:30','เห็นด้วย','ไม่เห็นด้วย','kfyahp2x'),(4,'น้ำปลาพริก หรือ พริกน้ำปลา ','จากการที่ไปกินข้าวร้านแกงมา มีการถกเถียงเรื่องนี้กันเกิดขึ้น ทุกคนคิดว่ามันเรียกว่าอะไรกันแน่ 1','2023-11-09 02:04:19','น้ำปลาพริก','พริกน้ำปลา','88bf63hw'),(5,'เห็นด้วยไหมที่ Dota2 > LOL','dots2 is the best (เกมส์)','2023-11-09 06:44:15','เห็นด้วย','ไม่เห็นด้วย','0j7t2s4m'),(6,'สวยธรรมชาติดีกว่าสวยศัลยกรรม','สวยศัลยกรรมดีกว่าเพราะในปัจจุบันใครหลายๆคนก็อยากจะเป็นคนที่ได้รับการยอมรับ','2023-11-09 07:02:27','เห็นด้วย','ไม่เห็นด้วย','t4w6h82s'),(7,'สวยศัลยกรรมดีกว่าสวยธรรมชาติ','สวยศัลยกรรมดีกว่าเพราะในปัจจุบันใครหลายๆคนก็อยากจะเป็นคนที่ได้รับการยอมรับ','2023-11-09 07:05:58','สวยธรรมชาติ','สวยศัล','t4w6h82s'),(8,'เห็นด้วยไมที่คนเราควรทำงานแค่ 4 วันต่อสัปดาห์','คิดว่าปัจจุบันทำงานเยอะมากกกกกกกกกกก ไม่ไหวแล้วจะตาย','2023-11-09 08:05:00','เห็นด้วย','ไม่เห็นด้วย','0j7t2s4m'),(9,'ทาสหมา หรือ ทาสแมว','น้องหมาน่ารักเชื่อฟัง ทำไมคนยังเป็นทาสแมวอยู่คะ','2023-11-10 04:58:06','ทาสหมา','ทาสแมว','hlq6voz3'),(10,'ผู้หญิงขับรถแย่ทุกคนจริงมั้ย','นั่งรถกับครอบครัว แล้วเจอรถขับปาด พ่อบอกว่า เพราะผู้หญิงขับ จริงมั้ย ','2023-11-10 07:23:09','เห็นด้วย','ไม่เห็นด้วย','hlq6voz3'),(11,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','เรารู้สึกว่าคนหน้าตาดีมีสิทธิ์ทางสังคมมากกว่าคนอื่น ๆ เช่น การได้งาน การได้รับการปฎิบัติ','2023-11-11 02:10:05','คนหน้าตาดีมีสิทธิ์มากกว่า','คนหน้าตาไม่ดีก็มีสิทธิ์เท่ากัน','hlq6voz3'),(29,'รังสิตมันร้ายจริงไหม','ได้ข่าวว่ารังสิตมันร้าย จะย้ายไปอยู่จะได้รู้','2023-11-26 15:29:58','จริง','ไม่จริง','i36r53nk'),(31,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-11-27 06:32:18','เห็นด้วย','ไม่เห็นด้วย','i36r53nk'),(32,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-11-27 07:16:40','เห็นด้วย','ไม่เห็นด้วย','i36r53nk'),(33,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','หหหหหหหหหหหหหหหหห','2023-12-01 19:50:19','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(34,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:41:02','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(35,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:41:10','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(36,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:42:01','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(37,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:46:42','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(39,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:49:21','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm'),(40,'คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','คนหน้าตาดีมีสิทธิ์พิเศษในสังคมมากกว่า?','2023-12-01 20:50:17','เห็นด้วย','ไม่เห็นด้วย','8rxq9hvm');
/*!40000 ALTER TABLE `debatetopic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `downloadrequest`
--

DROP TABLE IF EXISTS `downloadrequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `downloadrequest` (
  `dr_id` int NOT NULL AUTO_INCREMENT,
  `dr_timestamp` timestamp NOT NULL,
  `dr_total_topic` tinyint NOT NULL,
  `dr_proof_one` varchar(255) DEFAULT NULL,
  `dr_proof_two` varchar(255) DEFAULT NULL,
  `dr_status` varchar(45) NOT NULL,
  `dr_name` varchar(100) DEFAULT NULL,
  `dr_desc` varchar(255) DEFAULT NULL,
  `user_id` char(8) NOT NULL,
  PRIMARY KEY (`dr_id`),
  KEY `dr_user_idx` (`user_id`),
  CONSTRAINT `dr_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `downloadrequest`
--

LOCK TABLES `downloadrequest` WRITE;
/*!40000 ALTER TABLE `downloadrequest` DISABLE KEYS */;
INSERT INTO `downloadrequest` VALUES (13,'2023-12-02 15:55:42',1,'170153254221511.png','1701532542216Poomwipat_resume.pdf','approved','ภูมิวิพัส ยิ้มใหญ่หลวง','123123123','8rxq9hvm'),(14,'2023-12-02 16:27:50',1,'17015344704755.png','1701534470476Poomwipat_resume.pdf','approved','ภูมิวิพัส ยิ้มใหญ่หลวง','rrrrrrr','8rxq9hvm'),(15,'2023-12-02 16:32:34',1,'170153475479912.png','1701534754800Poomwipat_resume.pdf','rejected','ภูมิวิพัส ยิ้มใหญ่หลวง','rrrrrrr','8rxq9hvm');
/*!40000 ALTER TABLE `downloadrequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritetopic`
--

DROP TABLE IF EXISTS `favoritetopic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritetopic` (
  `favtop_id` char(8) NOT NULL,
  `favtop_timestamp` timestamp NOT NULL,
  `user_id` char(8) NOT NULL,
  `dbt_id` int DEFAULT NULL,
  PRIMARY KEY (`favtop_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `fav_dbt_idx` (`dbt_id`),
  CONSTRAINT `fav_dbt` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fav_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritetopic`
--

LOCK TABLES `favoritetopic` WRITE;
/*!40000 ALTER TABLE `favoritetopic` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritetopic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportedproblem`
--

DROP TABLE IF EXISTS `reportedproblem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportedproblem` (
  `rp_id` int NOT NULL AUTO_INCREMENT,
  `rp_description` text NOT NULL,
  `rp_timestamp` timestamp NOT NULL,
  `rp_status` varchar(15) NOT NULL,
  `rp_admin_note` varchar(600) DEFAULT NULL,
  `dbt_id` int DEFAULT NULL,
  `dbc_id` int DEFAULT NULL,
  `user_id` char(8) NOT NULL,
  `rp_type` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`rp_id`),
  KEY `rp_user_idx` (`user_id`),
  KEY `rp_dbt_idx` (`dbt_id`),
  KEY `rp_dbc_idx` (`dbc_id`),
  CONSTRAINT `rp_dbc` FOREIGN KEY (`dbc_id`) REFERENCES `debatecomment` (`dbc_id`),
  CONSTRAINT `rp_dbt` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rp_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportedproblem`
--

LOCK TABLES `reportedproblem` WRITE;
/*!40000 ALTER TABLE `reportedproblem` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportedproblem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requestdebate`
--

DROP TABLE IF EXISTS `requestdebate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requestdebate` (
  `dr_id` int NOT NULL,
  `dbt_id` int NOT NULL,
  PRIMARY KEY (`dr_id`,`dbt_id`),
  KEY `rq_dbt_idx` (`dbt_id`),
  CONSTRAINT `rq_dbt` FOREIGN KEY (`dbt_id`) REFERENCES `debatetopic` (`dbt_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rq_dr` FOREIGN KEY (`dr_id`) REFERENCES `downloadrequest` (`dr_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requestdebate`
--

LOCK TABLES `requestdebate` WRITE;
/*!40000 ALTER TABLE `requestdebate` DISABLE KEYS */;
INSERT INTO `requestdebate` VALUES (13,2),(14,4),(15,9);
/*!40000 ALTER TABLE `requestdebate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_title` varchar(20) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'การเมือง'),(2,'มหาลัย'),(3,'การเงิน'),(4,'ปัญหาชีวิต'),(5,'เทคโนโลยี'),(6,'กฎหมายชาวบ้าน'),(7,'ปัญหาสังคม'),(8,'ไฟฟ้า'),(9,'ประเทศไทย'),(10,'อุบัติเหตุบนท้องถนน'),(11,'Part Time'),(12,'มหาวิทยาลัย'),(13,'ประสบการณ์ชีวิตคู่'),(14,'อาวุธยุทโธปกรณ์'),(15,'ทหารเกณฑ์'),(16,'รัฐศาสตร์'),(17,'ประชามติ'),(18,'ความรักวัยรุ่น'),(19,'ปัญหาความรัก'),(20,'ชีวิตวัยรุ่น'),(21,'ความรักวัยทำงาน'),(22,'ภาพยนตร์'),(23,'ปรัชญา'),(24,'ANOMALISA (ภาพยนตร์)'),(25,'ภาพยนตร์ต่างประเทศ'),(26,'เครื่องปรุง'),(27,'อาหารไทย'),(28,'ทำอาหาร'),(29,'วัตถุดิบทำอาหาร');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` char(8) NOT NULL,
  `user_name` varchar(15) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phonenum` varchar(10) DEFAULT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_pic` varchar(255) DEFAULT 'profile.png',
  `role_id` char(5) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expire` datetime DEFAULT NULL,
  `user_status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0j7t2s4m','openhouse3','openhouse3@bumail.com','0874532365','$2a$10$fDdloHplArmmT/vbIoDFs.VYrGYe13XmnPsTZDmH/b5cII0BAKvGu','profile.png','admin',NULL,NULL,'active'),('2rtdwzxr','mofinmofin','mofin123@gmail.com','','$2a$10$quy58VxaTD3eAuQ914PzVeATiX6q9GnoaooTdknUsB6Xn.uzbo4tu','profile.png',NULL,NULL,NULL,'active'),('3xytd1kt','testermaster','tester443@gmail.com','1234567890','$2a$10$5WMeCgsTmptbXI3D0v6B.uPfuOj2NonwCNqmWuSS5M0T/VYJQ5NMa','profile.png',NULL,NULL,NULL,'active'),('7qne5g1h','arjarn2','arjarn2@gmail.com','','$2a$10$./7TDWuFwEZ2o3jfSnC0puS8TMs1iIrgA2582aj3MUuABSla.D5Zu','profile.png',NULL,NULL,NULL,'active'),('7xufvt0b','news','mofinnews@gmail.com','','$2a$10$vXRYr3O2wN6y6mlnCz3SvO3mQFRvzAMTLRXxEkmSKqFOE5x3jR1S6','profile.png',NULL,NULL,NULL,'active'),('88bf63hw','Tanya','test.tanyasorn@gmail.com','','$2a$10$dz4kRBnRS7Dpxkyiqg52EugshzNFeUJ3cL83YOOFBZbUaZS2HmDLq','profile.png',NULL,NULL,NULL,'active'),('8fp5wafa','PhoomPhoom','Phoomtep.pita@bumail.net','0960150773','$2a$10$X4NPRuZ66E3n2niNqRl8OOaMnsiEZhwFQNPaP/BsLkWoSwAAFzwNu','profile.png',NULL,NULL,NULL,'active'),('8rxq9hvm','mofin news234','mofin@mail.com','','$2a$10$8h3GvXAzBk9KVqsTD8XYfOgoNTuPviuw3GMm62JQDydg3Cxu2JXC6','profile.png','admin',NULL,NULL,'active'),('9mz2hc28','nemotime','pajar@gmail.com','','$2a$10$YHjh.WZYauPX1gjupigAz.pJwVyzzNZY4ZjQouskWb/Sa/yFLnFPG','profile.png',NULL,NULL,NULL,'active'),('celuc60j','leoStupid','leo@gmail.com','0100000001','$2a$10$FBLBpy/duBJv2ux91DSh9estho6qNm.n08uDLlSvXT/vSu2iVjrf6','profile.png',NULL,NULL,NULL,'active'),('cr5sitso','nathan kays','nktest@gmail.com','0874546777','$2a$10$WP6gjp7iC4pO8kdWteaVneOOQMositggRiDqE3pzdQAsEio2PhNZu','profile.png',NULL,NULL,NULL,'active'),('dehs5oxy','openhouse','open@bumail.com','','$2a$10$WSSecmagybPcFBMMjKrC9uQkyWFg/XguHHgbUsRR5SYTFJP9iNDDW','profile.png',NULL,NULL,NULL,'active'),('hlq6voz3','CATMEOW','openhouse2@bumail.com','','$2a$10$B7mD69Qew7WI9Pfp9FGawOJMu.K/OuVHs8n9uXG58MQs55q9EU5Yi','profile.png',NULL,NULL,NULL,'active'),('i36r53nk','mofinf','mofinfia@gmail.com','','$2a$10$LshT7CAF1K0t0wFGovZpkeLN4SDZGbccMvZ70a6UiEStnE2RQhzwq','profile.png',NULL,'$2a$10$/qrUA6S3ttRgLHgrzH2kcuEbFDVW2XGW6hGhlHHH2F0K34hKC5ZV.','2023-12-01 06:47:10','active'),('ixnj6aqv','testadmin','adadad@gmail.com','','$2a$10$T/V10m.lZeDxOePunqNt2.HZaE8GyJQhwNjI4QxCnTAy1m8JzG.bi','profile.png',NULL,NULL,NULL,'active'),('jpmugfp6','gg123','mofinfiagg@gmail.com','','$2a$10$fMzfpKVqX4yxLYL9m6ZycuaF2K9BXYpWEV4nGxYDUeSVxWQuj1yza','profile.png',NULL,NULL,NULL,'active'),('kfyahp2x','muffin','muffin@gmail.com','1234544564','$2a$10$CH/ufpHsh5OruGD9XYFgEupUy3uOnz6vTNDRDvO/uE6SkoVckfhvG','profile.png',NULL,NULL,NULL,'active'),('lqdmrm20','123','mofin1@mail.com','1','$2a$10$E3VAo6NfMmUtKBU5jdTFQext5erLMAqbSj1728EvrTHUkwGVMWbv6','profile.png',NULL,NULL,NULL,'active'),('poyadrpv','testphoom','molk@gmail','','$2a$10$b.KiZ2V//HsFnpEibKnmTupFQnr5gOvaBn7AbMniaCzTX1vC6WMze','profile.png',NULL,NULL,NULL,'active'),('qmiaktld','newTest','nt@gmail.com','','$2a$10$ieKIbNWC7S5UuEcsDF.7.OoIq.Fdzf44XwH0rZXsPN6S3nYvIFmpK','profile.png',NULL,NULL,NULL,'active'),('rg81oli9','NongPhoom','nongphoom@yahoo.net','1111111111','$2a$10$I15Z2UywdlDnvfyCClc8puoQqtDA.fsvQBGFAHsXPEjI2YcUQ1K1G','profile.png',NULL,NULL,NULL,'active'),('t4w6h82s','น้านึก','openhouse@bumail.com','1234567890','$2a$10$/IQ0ugUk8mMikSJ4k7630ubP59FxPc6vW9ccw44fW.fQnQHFOh02W','profile.png',NULL,NULL,NULL,'active'),('wayp6n63','DotaSlayer','mofin@gmail.com','','$2a$10$djMvo6aW0yaBgA.kFQ0wru5hyl4PUOfw2ZqVNYiRLRCfIeNJXXKNW','profile.png',NULL,NULL,NULL,'active'),('zwef8vbn','น้านึก','meow@gmail.com','0932191926','$2a$10$U3qoBuzcuf/3DgYf56zsIelrZttaTkDCK2jzGzbBBwL.nhRZ3DVqa','profile.png',NULL,NULL,NULL,'active');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-04 22:27:00
