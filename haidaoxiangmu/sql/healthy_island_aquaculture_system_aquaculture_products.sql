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
-- Table structure for table `aquaculture_products`
--

DROP TABLE IF EXISTS `aquaculture_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aquaculture_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text,
  `imgUrl` varchar(255) DEFAULT NULL,
  `breedMethod` varchar(255) DEFAULT NULL,
  `breedTech` text,
  `diseases` text,
  `checkStatus` varchar(255) DEFAULT NULL,
  `deleteStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquaculture_products`
--

LOCK TABLES `aquaculture_products` WRITE;
/*!40000 ALTER TABLE `aquaculture_products` DISABLE KEYS */;
INSERT INTO `aquaculture_products` VALUES (1,'锯缘青蟹','甲壳纲','<p> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹（学名：<em>Scylla serrata</em>）是梭子蟹科、青蟹属<a href=\"https://baike.baidu.com/item/%E7%94%B2%E5%A3%B3%E7%B1%BB%E5%8A%A8%E7%89%A9/334514?fromModule=lemma_inlink\" target=\"_blank\">甲壳类动物</a>。头胸甲卵圆形，背面隆起而光滑，因体色青绿而得名。头胸甲的胃、心区有一个明显的“H”形凹痕，胃区有一细而中断的横行颗粒隆起，前侧缘短于后侧缘，具9枚等大的齿。额分4齿，内眼窝齿大于额齿。螯足粗壮，稍不对称，长节的前缘有3刺，后缘有2刺；掌膨肿，两指内缘有钝齿。前3对步足指节边缘有刷状毛、末对步足的指、掌节扁平呈桨状，善于游泳。雄性腹部呈宽三角形，雌性腹部呈圆形。</p><p> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹栖息于浅海及潮间带（即涨溯淹没，退潮干露的滩涂），多栖息在泥沙底质和有海草而低凹、退潮后还有水的地方，以及红树的根基附近和浅海岩礁石洞或有其他掩蔽物的地方。食物组成中以软体动物和小型甲壳动物为主，也常以滩涂蠕虫为食，也食小鱼、小虾，有时在胃中也有发现植物的茎叶碎片。广布于印度至西太平洋热带、亚热带海域。</p>','http://localhost:3000/products/1670139413529eyJhbGciOi119806.png','围塘养殖','<h3>蟹场选择</h3><p><strong>位置：</strong>蟹池应选在风浪平静的内湾、港汊、鱼塭和河口沿岸等地，地势高低适宜，位置在中潮线以下，在小潮时也便于注排水。不宜建在高潮线或低潮线上。</p><p><strong>底质：</strong>蟹池底质要求沙泥底，尤以沙多泥少为宜，这样可使池水容易澄清，且在夏天不太热，冬天又适宜锯缘青蟹潜伏。黑色腐殖土的地方不宜建蟹池。因为池底是锯缘青蟹活动的场所，特别在夏天低潮时由于有机质分解，加上锯缘青蟹的活动，不仅会使水色混浊，水质变坏，甚至导致锯缘青蟹因缺氧而窒息死亡。在选择底质时还要注意保证养殖池不漏水，选用土质可使筑坝坚固，不易被潮水冲塌，保水力强。</p><p><strong>水质：</strong>水质好坏是养殖锯缘青蟹的重要条件之一，建造蟹池必须选择四周海水无工业废水或农药的污染，特别是无化工厂或油脂类工厂的滩涂，以免污水造成蟹中毒死亡。另外要注意咸、淡水源充足，注水方便，能及时调节池水的比重。建池地点及其附近的pH值（酸碱度）应当在6.8-8.5之间，海水比重为1.008-1.020之间（1.010-1.015为最佳）即盐度在10-26‰之间（以18-20‰为最佳）。</p><p><strong>饵料资源：</strong>锯缘青蟹的生长发育、雌蟹的卵巢催熟与雄蟹的长肉育肥都取决于饵料的数量和质量。锯缘青蟹的最佳饵料是红肉蓝蛤，红肉蓝蛤的壳薄易吃，投喂时不必捣碎；而且适应蟹池内的海水比重，投下养蟹池后尚能存活几天不死，使锯缘青蟹能连续吃到鲜活饵料，促进其生长发育。此外，红肉蓝蛤是群集性贝类，可进行人工养殖，产量多。全年四季，均易于捕捞，价格便宜，成本较低。其它饵料如钉螺、杂蛤、小杂鱼等也可，但数量比红肉蓝蛤少。因此，建造养蟹池时，应考虑当地或附近是否有充足的饵料资源。</p><h3>蟹池建造</h3><ul><li style=\"text-align: start;\"><strong>建池方式</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;中国广东潮汕地区建造蟹池一般有两种方式：一是塭内挖地建池，二是海滩围坝建池。塭内挖地建池是利用大围塭内靠近海堤拦水闸边而且地势较高的滩除，用挖出的滩诡围筑堤埂而成养蟹池。这种池一般保水性能好，堤埂不必那么高大，利用现成的大拦水闸进行间接排注水，因此比较省工省力，投资较少。</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;海滩围坝建池是在地势低洼的滩面上围坝建设蟹池。这种池的堤坝必须高大坚固，外砌石头，才抵抗合风的侵袭和海潮海浪的冲击，在围坝的同时要考虑建设水闸和运送饵料的道路，坝面要宽坦，因此投资较多。建选养蟹池面积不宜过大，养成池一般为2-3亩，最大不超过千亩。育肥池以1-2亩为宜，最大不超过2亩。因自然捕捞的种苗规格和质量各不相同，蟹体躯肥满的时间也不一致，必须分池饲养。蟹池面积过大会浪费水面，收蟹时比较困难，池间管理也不容易，而且往往由于淡季时种苗来源不足而不能充分利用其水面。</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;蟹池和构造可分单塘式和双塘式两种，一池设一个闸门的称单塘；二池相靠设三个闸门，其中一个闸门互通的叫双塘。双塘式比单塘式优越，当其中一个池塘的水质恶化时，可打开互通的闸门，及时采取抢救措施。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>修筑堤坝</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;堤坝的修筑应根据建池方式而定。属于海滩围坝建池的迎海大坝，顶宽度3-4米，坝高应超出当地历年最高潮位1米。迎海面需用石块浆砌护坡，坡度1:2-1:3。属于塭内挖池建池的堤埂，其堤面宽度和高度可根据挖池深度而灵活掌握。堤埂建好后可在两面种裁耐盐碱性的植物或铺上草皮。如属沙多泥少、粘性不大的土质，蟹池的堤埂可考虑用石块浆砌。无论哪种建筑形式，其堤坝必须牢固，且具有蓄水和防逃作用。为了防止锯缘青蟹逃走，蟹池四周的堤基要铺设竹篱。如果池内四周是用石块砌成垂直的池岸，石隙用水泥浆勾缝的，则可采用压箔法防逃，即用50-60厘米长的竹片编成一块长竹篱，将竹箔压泥20厘米，伸出30-40厘米成“T”形。如果蟹池是泥堤的，铺设竹箔则有两种办法，一是压箱（方法同上），二是在池堤内侧与堤身垂直的四周围插80厘米长的竹篱，并以小木桩等距离固定，同时在蟹池堤边四周铺上一层粗沙，厚度80-50厘米，用夯压实，可防止锯缘青蟹挖洞穴居。否则池堤会渐渐被挖成深洞，造成漏水或陷堤。</p><ul><li style=\"text-align: start;\"><strong>闸门设施</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;养蟹池的闸门一般是一池建一个，进排水共用。当涨潮时闸外的水位高于池内水位时，可打开闸门进水调节水质；当退潮时闸外的水位低于闸内水位时，可打开闸门把池内污水排出海滩。因此闸门应建于底质坚实、流水畅通的地点。闸底要低于池内最深处或与池底中央成水平线，便以清塘时把池水排净。</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;闸门由石块和水泥浆砌成，务求坚固；尤其是外闸门，更要经得起强台风的侵袭。在闸门内外闸口两侧要竖立4条石柱，两柱相对的一面中间凿成深5厘米、宽8-4厘米的槽沟。在堤外闸口的槽沟作为装插闸门开关术板之用，在堤内闸门的槽沟作为装插竹篱（（防止开闸时锯缘青蟹逃走）之用。竹篱要选用质地坚硬、大小均匀、两端直势的竹子编成，竹间距离1-1.5厘米，为使流水畅通，竹篱要编得坚固，免致被锯缘青蟹的鳌足钳断。闸孔的大小要根据养蟹池的面积而定。4亩左右的蟹池，闸门可建0.7米×1.5米；2.5-8亩的蟹池，闸门可建0.7×1.2米。闸门的长度与堤的底宽相同。闸口两端筑成八字形，有利于臧少进排水时的阻力。靠近堤内面的闸口两侧附近要各留存约8-4平方米的平台，便以捕捞。</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;双塘式的闸门应建在两塘间的共堤中间。建闸方法及闸.门规格与单塘式基本相同。此外如果养蟹池附近有农田和山坑淡水沟，在建闸时还要根据情况需要，设计并修建排洪沟和排酸水沟。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>池形及水深</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;养蟹池的池底可呈四方形或锅形，四周稍浅，均匀向中间倾斜。水深以涨潮时能保持1.5-2米中间最深处可达8米，干潮时能保持0.8-1.2米为宜，这样便于锯缘青蟹摄食和活动，以防止夏热冬冷，影响锯缘青蟹生长。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><h3>种苗放养</h3><ul><li style=\"text-align: start;\"><strong>放养时间</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;在中国南方一年四季都可放养锯缘青蟹，但养成的时间长短与水温、比重和饵料有密切关系，一般饲养时间为20-40天（指瘦蟹的饲养，下同），最快10多天就可收获。在2-3月，锯缘青蟹生殖腺发育最快，放养后18天即可收获，4-5月需饲养20天，5月以后则需20多天才可收获；7-9月间，由于天气炎热，水温过高，蟹的生长不好，而且易死亡；10-12月水温较低，要放养30-40天才能收获。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>放养密度</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹的放养密度，要根据季节、个体大小、饵料和蟹池等条件来定。若放养密度过大，因拥挤容易发生互相钳斗的现象，引起伤亡。若放养密度太小，则浪费水体，影响效益。一般在水温较高时，蟹的摄食量大，生长迅速。但在4-8月间，由于气温逐日升高，又是雨季，水温、比重变化较大，易引起青蟹死亡，故放养密度要适当减少，一般每平方米放养4.5只左右。秋季以后至翌年的3月，水温较低，透明度大，可以多放，每平方米放养6-7.5只为宜。中国台湾省是每平方米放养8只。菲律宾是锯缘青蟹与<a href=\"https://baike.baidu.com/item/%E9%81%AE%E7%9B%AE%E9%B1%BC/456627?fromModule=lemma_inlink\" target=\"_blank\">遮目鱼</a>混养，放养密度较疏，每平方米为0.35-2.5只。上述的放养密度一般是指瘦成蟹，如果是150克以下的小蟹，特别是仅有25-50克的幼蟹，放养密度可适当增大。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;为了便于管理，在放养过程中，最好按种苗规格进行放养，一般规定按瘦雌蟹、花蟹、未受精蟹、雄蟹、25-75克的幼蟹和100-150克的小蟹分池饲养。但往往由于种苗供应不足，不能及时满足放养要求，可以分批放养。初时若放养量少，应少投饵，待种苗放足数量后，再多投饵，使其迅速生长。这样饲养，若管理得当，成活率最高可达90%，一般为75%左右。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><h3>投饵技术</h3><ul><li style=\"text-align: start;\"><strong>饵料的种类</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹以肉食性为主，但有时也摄食一些植物性饵料（如海草嫩芽和海藻类等）。用来作为锯缘青蟹饵料的有：小型的贝类，如蟹守螺、红肉兰蛤、短齿蛤、中国绿螂、鸭嘴蛤、偏顶蛤、牡蛎或陆地的蜗牛等，以及小鱼、小虾、小蟹等。实践证明，用蟹守螺和牡蛎做饵料饲养效果很好。每年8-10月，蟹守螺很肥，锯缘青蟹最爱吃，经常投喂，锯缘青蟹的卵巢成熟快，肉肥满，质量好。但一般多采用鱼、贝的混合饵料。各地应根据实际情况，因地制宜地选择饵料种类，并要求饵料新鲜。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>投饵量</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;投饵量的多少和温度等环境条件有密切关系。锯缘青蟹在水温18℃以上时摄食旺盛，到25℃时达最高峰，水温降至13℃以下时，摄食量大为减少，降到9℃左右时停止摄食，水温超过30℃时摄食量也明显降低。据有人试验，以小鱼为饵料，锯缘青蟹在25℃时的摄食量为体重的17-20%。因此在投饵前，要检查锯缘青蟹对前次投饵的觅食情况，酌情增减饵料。饵料投放过少会影响蟹的生长发育，投放过多则浪费饵料，且易造成水质变坏。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;综上所述，应根据季节、天气变化、潮汐等不同情况进行投饵。一般在4-6月及9-10月间，气候条件较好，锯缘青蟹的摄食量最大，以100只蟹来计算，小潮期每天投蛤仔5千克或蟹守螺6千克，或小鱼1.5千克；在大潮期换水后蟹的摄食量更大，应增加投饵量一倍；如遇雨水过多，池水混浊，蟹不便摄食，可适当减少投饵量；天气闷热时，蟹的食欲也会诚弱；天气寒冷，水温降到9℃以下时，可以停止投饵。在泰国，养蟹是用低质量的鱼类做饵料，每天投饵量为锯缘青蟹体重的5-7%。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>投饵方法</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;根据锯缘青蟹多为昼伏夜出觅食的习性，一天应分两次投饵，早晨5点左右投放一次，投放量为一天投饵量的40%左右；晚上19点再投放一次，投饵量为60%左右。饵料要投放在池的四周，不能投在池的中央，且要均匀，以免蟹争食引起钳斗而伤亡，还便于检查饵料的被食情况及残饵的清理工作。</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;有的饵料要处理后才能投放。若用鱼虾做饵料，要求不能变质发臭，以免影响水质和锯缘青蟹的健康。大鱼要切碎后投放，壳厚的螺或双壳类要打碎壳后才投放，壳薄的小贝，如红肉兰蛤、俎齿蛤、鸭嘴蛤、偏顶蛤、中国绿螂等可投放带壳的活体，这样可避免蟹吃不完而影响水质。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><h3>日常管理</h3><p> &nbsp; &nbsp; &nbsp; &nbsp;池塘生态环境的优劣直接影响锯缘青蟹的生理活动，在优良的生态环境中，锯缘青蟹摄食旺盛，蜕壳正常，生长速度块，病害少。所以，搞好日常管理保持池塘优良的生态环境是养殖成功的关键技术。</p><ul><li style=\"text-align: start;\"><strong>巡池观察</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;坚持每天早、中、晚巡池检查，观察池塘水色、水位、蟹的活动和摄食情况，测量水温、溶解氧、透明度，经常检查堤坝、闸门和防逃设施有无损坏，及时采取措施。每10-15天测量一次青蟹的甲宽、体重等，掌握锯缘青蟹的生长情况。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>经常换水</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;养殖初期主要向养殖池内添加水，逐渐将水位加到1.5米左右，视水质情况数天换水一次，每次换水量为池水的20-30%。养殖中、后期应加大换水量，小潮汛以添加水为主，大潮汛大换水1-2次。大换水时不要排完池水，应保持水深20-30厘米以上，防止进水时将泥浆冲起而淹没锯缘青蟹，造成锯缘青蟹窒息。进水时水流不宜过急，免得增加水的混浊度。一般情况下，排水时最好从闸底排水，既能多排底层水，又能增加水体交换能力。酷暑季节，采取夜间涨潮时进水为好。大换水时可以结合进行清污工作，先将贝壳及杂物捞出，再用耙搅动，使有机物质随水流排出池外。</p><ul><li style=\"text-align: start;\"><strong>控制水位</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;水位的控制以创造一个夏凉冬暖的环境来适应锯缘青蟹的生活和生长为目的。冬季退潮时水位保持30-50厘米，涨潮时应在1米左右。寒潮来时要再提高水位，夏天炎热时水深应增至1.5米左右。若放养密度较大时，水位要相应增高。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>调节盐度</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹对海水盐度适应范围较广，但对盐度突变适应能力较差。当久旱无雨，池水盐度太高时，可开启底层的闸板，让盐度较高的底层水排出池外，然后引进淡水或纳入涨潮时盐度较低的潮头水。在雨季淡水期，池水盐度太低时，则关闭下闸板，开启上闸板，使盐度较低的表层水先排出，然后纳入涨潮咸水。如遇大暴雨，海区水盐度又很低时，应采取加低值盐的办法，使池水盐度调节到10以上。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>稳定水质</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹养成池池水透明度以30-40厘米为宜。pH值以7.8-8.4为宜，溶解氧含量应在3毫克/升以上。随着养殖时间的加长，蟹池中的有机物质不断增多，池中的细菌、浮游动植物、原生动物必然大量繁殖，极大地影响着池塘生态环境的质量。有机物质经细菌作用，氧化分解消耗大量溶解氧，往往使池塘下层水中本来就不多的氧气消耗殆尽，造成缺氧状态。在缺氧状态下，厌氧菌大量繁殖，对有机物质进行发酵作用，产生较多的氨、硫化氢、甲烷、有机酸等还原性中间产物，这些物质对青蟹有害，而且与氧化合而消耗水中的氧。在夏季高温期，遇到天气不正常时，很容易造成池中青蟹缺氧死亡。可见，大量的有机物质在池塘中的积累引起池塘溶氧降低，从而引起透明度的不稳定，酸碱度的不平衡，使池塘生态质量下降。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>其他管理</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;有条件的可在养殖过程中（最好是从养殖初期起）施放有益微生物制剂，及时降解进入池塘中的有机物质，保持池塘生态的平衡，而且能够抑制病原细菌的繁殖，减少疾病的发生。在高温季节，无风闷热，低气压的傍晚和早晨日出之前，或是久晴后下大雨，盐度突变时，要开动增氧机。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p>','<h3>病害防治</h3><p style=\"text-align: start;\"><span style=\"font-size: 22px;\"><strong>病害类型</strong></span></p><ul><li style=\"text-align: start;\"><strong>细菌性疾病</strong></li></ul><p style=\"text-align: start;\">①弧菌性细菌疾病</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;弧菌属细菌（如鳗弧菌、副熔血弧菌）均可引起鱼类、贝类及甲壳类等水生动物血淋巴等器官发生疾病，该类疾病给水产养殖业造成巨大的经济损失。毛芝娟等报道了在患病的锯缘青蟹胸足组织液中分离得到了辛辛那提弧菌、溶藻弧菌、副溶血弧菌等多种对青蟹致病的弧菌。</p><p style=\"text-align: start;\">②甲壳溃疡病</p><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;甲壳溃疡病主要是由降解壳质类的细菌引起的，如常见的气单胞菌属、黄质菌属、巴斯德菌以及微弧菌属等，这类细菌主要降解甲壳动物的外骨骼，引发降解壳质类的细菌和真菌对含有壳质素的表皮组织的侵染，使甲壳组织发生溃疡、糜烂。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>真菌性疾病</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹真菌性疾病主要以霉菌病为主，如霉菌中链壶菌属、离壶菌属和海壶菌属等都可以引起蟹类致病。患有真菌性疾病的锯缘青蟹幼体通常趋光性差，活力减退，多游离在水层的中下层或底部；卵体发育受阻，不能被孵化。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><ul><li style=\"text-align: start;\"><strong>病毒性疾病</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;引起锯缘青蟹致病的病毒主要有呼肠孤病毒、疱疹病毒、白斑综合症病毒等。</p><ul><li style=\"text-align: start;\"><strong>寄生虫性疾病</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;寄生锯缘青蟹的常见的寄生虫有蟹奴、藤壶、鳃虫、海蛸等。此类寄生虫一旦进入蟹体就开始繁殖并侵染鳃腔、腹部、肌肉等组织器官，最后导致锯缘青蟹死亡。传统的防治措施以预防为主，治疗为辅，主要体现在以下几个方面：①做好放养前的整池消毒和定期除去淤泥等工作；②适时换水；③加强人工管理：做好蟹苗的选种、放养及日常的饲养、管理工作，以降低锯缘青蟹疾病发生的机率；④定期使用大蒜素在养殖池中进行泼洒，以杀死水体中的病原微生物，杜绝细菌性疾病和寄生虫病的发生。<span style=\"color: rgb(51, 102, 204); font-size: 12px;\"><sup> </sup></span></p><p style=\"text-align: start;\"><span style=\"font-size: 22px;\"><strong>防治方法</strong></span></p><ul><li style=\"text-align: start;\"><strong>抗病新品种的培育</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;培育抗病能力强的新品种是防御锯缘青蟹疾病发生的重要措施之一。新品种的培育可以改良蟹体的种质特性，加强其抗病能力。常用的品种改良技术主要有：①采用远缘杂交技术培育新型抗病蟹种；②转基因技术可以使得蟹种的抗逆基因得到表达，提高抗病能力；③多倍体育种技术可以提高蟹种培育的成活率，减少疾病的发生。</p><ul><li style=\"text-align: start;\"><strong>生物类制剂的利用</strong></li></ul><p style=\"text-align: start;\"> &nbsp; &nbsp; &nbsp; &nbsp;锯缘青蟹先天特异性免疫机制不够健全，易被一些致病微生物侵入并致病，用传统的药物（如土霉素、青霉素、链霉素等）治疗易产生耐药性等缺点，不能有效地治愈疾病。而将生物类制剂接种蟹体，提高抗病能力，从而起到预防与治疗作用。常用的生物制剂主要有高免疫血清、抗毒素等。</p>','1','0'),(2,'蛏子','双壳纲','<p>蛏子为海产贝类。软体动物。介壳两扇，形状狭而长，外面蛋黄色，里面白色，生活在近岸的海水里，也可人工养殖，肉味鲜美。有缢蛏、竹蛏等种类。</p>','http://localhost:3000/products/1670138925716eyJhbGciOi144571.jpg','滩涂养殖','<p>蛏子养殖的苗种来源,主要依靠采捕野生苗和海区半人工采苗。 1.采捕野生苗 自然海区蛏苗分布在高潮区下部河口、港叉、水沟两侧。每年立冬开始采苗,至大寒 前后结束。采苗方法.</p>','<p>要勤给它换水，以免水里面产生有害的细菌，只有水质干净才能让它生存的时间更长。蛏子喜欢低温，所以低温的养护环境它更不容易死</p>','1','0'),(6,'大黄鱼','硬骨鱼纲','<p>体延长，侧扁，体侧腹面有多列发光颗粒；头钝尖形。口裂大，端位，倾斜，吻不突出，上颌长等于下颌，上颌骨后缘达眼眶后缘；下颌齿内列齿较大，外列齿紧贴内列齿；颏孔4或6个，中央4孔呈四方排列在颐缝合周围，前2孔细小。鼻孔2个，长圆形后鼻孔较圆形前鼻孔大。</p>','http://localhost:3000/products/1670137589068eyJhbGciOi114932.webp','网箱养殖/围网养殖/土池养殖','<p>养殖池是东西走向的长方形池，面积6亩，可保持水深2.5米以上，池底向排水口方向倾斜一定的坡度，底质为沙泥质。养殖地点交通方便，周围环境较安静，淡水资源丰富，进排水方便。养殖池配置2台1.5千瓦水车式增氧机、1台1.5千瓦射流式增氧机。</p>','养殖全程贯彻“防重于治”和“无病先防、有病早治”的方针，在养殖期间定期对食场进行消毒，鱼病多发季节做好药物预防及水质调节等措施，养殖过程没有发生重大的病害','1','0'),(7,'牡蛎','双壳纲','<p>牡蛎的种类很多，其中具有商业价值的牡蛎大约有20种，可供人食用的牡蛎品种通常都来自牡蛎属（Ostrea）和巨牡蛎属（Crassostrea）。他们不仅肉鲜味美、营养丰富, 而且具有独特的保健功能和药用价值，是一种营养价值很高的海产珍品。</p>','http://localhost:3000/products/1670138248865eyJhbGciOi125260.jpg','吊绳养殖/插柱养殖/打桩养殖','<p>牡蛎筏式养殖应选择海区风浪较小、水质稳定、无工业污染的海区，海区水深在8m以上的，水温常年变化稳定，夏季不超过30℃，海区表层流速一般以0.3～0.5m/s为宜，比重应在1.008～1.020，海底为泥质或泥沙质的海区。</p>','牡蛎的敌害有藤壶、贻贝、苔藓虫以及海鞘等，它们与牡蛎争夺固着基和养料，影响牡蛎生长和附着。根据历年海区采苗经验，贻贝在高潮区附着量较少，低潮区附着量相对多，牡蛎采苗应选择适宜潮区投放附着基。按技术人员指导，显微镜下检测蛎苗成熟，方能投放附苗器','1','0'),(8,'血蛤','双壳纲','<p>血蛤， 又名泥蚶、花蚶，是一种贝类海洋生物，生长在滩涂里。在东南沿海地带，经开水烫几秒之后就可以吃，拨开壳可以看见血一样的分泌液，所以称之为血蛤，东南亚和江浙广东福建沿海一带认为这个东西很滋补，补血。</p>','http://localhost:3000/products/1670138710549eyJhbGciOi127633.jpg','滩涂养殖','<p>生活在潮间带至浅海的软泥海底，多在潮流畅通、风平浪静、有淡水注入的内湾栖息。一般泥层埋深约0.5～1厘米，蛤苗(壳长0.3～0.5厘米)在泥层中仅潜埋0.1～0.2厘米。</p>','无','1','0'),(9,'泥鳅','硬骨鱼纲','<p>泥鳅为底栖鱼类，栖息于河流、湖泊、沟渠水田、池沼等各种浅水多淤泥环境水域的底层。昼伏夜出，适应性强，可生活在腐殖质丰富的环境内。水中缺氧时，能跳跃到水面吞入空气进行肠呼吸。在水池干涸时，潜入泥中，只要泥土有少量水分保持湿润，便不致死亡。泥鳅广泛分布于亚洲沿岸的中国、日本、朝鲜、俄罗斯及印度等地。</p>','http://localhost:3000/products/1670139630614eyJhbGciOi108826.jpg','围塘养殖','<p>池塘混养即和其他鱼类混养，如和鲢鱼、鳙鱼、草鱼、鳊鱼等混养。这种养殖方式的选塘、清塘、消毒、放养等和池塘养殖相同。混养的优点：不需专门给泥鳅投喂较多饵料，只需给其他鱼类投饵，而鱼类吃不完的饵料和排出的粪便即为泥鳅的食物来源。这种养殖方式效益高，水面利用价值大，值得大力推广。</p>','勤刷网衣，保持网箱内水体流通、溶氧丰富，并使足够的浮游生物进入箱内，为泥鳅提供丰富的天然饲料。','1','0'),(21,'基围虾','软甲纲','<p>“基”就是基堤、堤坝，“围”就是围起来。中国<a href=\"https://baike.baidu.com/item/%E5%8D%8E%E5%8D%97%E5%9C%B0%E5%8C%BA/7596721?fromModule=lemma_inlink\" target=\"_blank\">华南地区</a>有些人会在河流入海口用石头围起堤坝，早期是为了防御海水侵袭田地，后来发现，有些<a href=\"https://baike.baidu.com/item/%E8%99%BE%E8%8B%97/5880469?fromModule=lemma_inlink\" target=\"_blank\">虾苗</a>会在<a href=\"https://baike.baidu.com/item/%E6%B6%A8%E6%BD%AE%E6%97%B6/22634686?fromModule=lemma_inlink\" target=\"_blank\">涨潮时</a>进入堤内，出不去了，慢慢长大。这样不出海就能捞到虾。于是，广东渔民就把这种堤坝发展成石头围起来的池塘，用来养虾，基围里的虾，都叫基围虾。</p><p>基围虾的虾苗来自<a href=\"https://baike.baidu.com/item/%E6%B6%A8%E6%BD%AE/1938485?fromModule=lemma_inlink\" target=\"_blank\">涨潮</a>带来的野生虾苗，期间不用投喂，自有<a href=\"https://baike.baidu.com/item/%E7%BA%A2%E6%A0%91%E6%9E%97/13210?fromModule=lemma_inlink\" target=\"_blank\">红树林</a>滩涂的各种小生物供虾捕食。人只用隔半个月开闸放掉污水，等涨潮带进新鲜海水即可。这种养虾方式几乎零成本，而且虾肉口感基本等同于野生虾，一时大受欢迎。1980年代，香港的基围虾售价甚至接近<a href=\"https://baike.baidu.com/item/%E7%9F%B3%E6%96%91%E9%B1%BC/425506?fromModule=lemma_inlink\" target=\"_blank\">石斑鱼</a>。</p><p>早期，基围里养的虾主要是<a href=\"https://baike.baidu.com/item/%E5%88%80%E9%A2%9D%E6%96%B0%E5%AF%B9%E8%99%BE/1561468?fromModule=lemma_inlink\" target=\"_blank\">刀额新对虾</a>（<a href=\"https://baike.baidu.com/item/%E8%8A%A6%E8%99%BE/18437272?fromModule=lemma_inlink\" target=\"_blank\">芦虾</a>），所以它算是最正统的基围虾。后来，<a href=\"https://baike.baidu.com/item/%E9%95%BF%E6%AF%9B%E5%AF%B9%E8%99%BE/2170132?fromModule=lemma_inlink\" target=\"_blank\">长毛对虾</a>（<a href=\"https://baike.baidu.com/item/%E7%99%BD%E8%99%BE/888982?fromModule=lemma_inlink\" target=\"_blank\">白虾</a>）、<a href=\"https://baike.baidu.com/item/%E6%97%A5%E6%9C%AC%E5%9B%8A%E5%AF%B9%E8%99%BE/2823473?fromModule=lemma_inlink\" target=\"_blank\">日本囊对虾</a>（<a href=\"https://baike.baidu.com/item/%E7%AB%B9%E8%8A%82%E8%99%BE/370185?fromModule=lemma_inlink\" target=\"_blank\">竹节虾</a>）也被称为基围虾。但随着基围所需的原生滩涂越来越少，而且产量低，竞争不过现代的<a href=\"https://baike.baidu.com/item/%E8%99%BE%E6%B1%A0/7616936?fromModule=lemma_inlink\" target=\"_blank\">虾池</a>，基围纷纷消失了。如今，在香港<a href=\"https://baike.baidu.com/item/%E7%B1%B3%E5%9F%94/3959576?fromModule=lemma_inlink\" target=\"_blank\">米埔</a>保护区，还保留着一些基围。里面依旧养虾，但不卖，用来做<a href=\"https://baike.baidu.com/item/%E8%87%AA%E7%84%B6%E6%95%99%E8%82%B2/5409762?fromModule=lemma_inlink\" target=\"_blank\">自然教育</a>。</p>','http://localhost:3000/products/1674388055409eyJhbGciOi146555.jpeg','围塘养殖','<p>111222</p>','<p>333222</p>','1','0'),(24,'test','硬骨鱼纲','<p>test</p>','http://localhost:3000/products/1678272266024eyJhbGciOi184779.jpg','滩涂养殖','<p>test</p>','<p>test</p>','1','1'),(27,'812','双壳纲','<p>8</p>','http://localhost:3000/products/1678273034935eyJhbGciOi112653.jpeg','围塘养殖','<p>8</p>','<p>8</p>','1','1'),(29,'123123','双壳纲','<p>123</p>','http://localhost:3000/products/1678277109652eyJhbGciOi162086.jpg','围塘养殖','<p>123</p>','<p>123</p>','1','1'),(30,'456','硬骨鱼纲','<p>456 &nbsp; &nbsp;</p>','http://localhost:3000/products/1678279869617eyJhbGciOi101110.jpg','滩涂养殖','<p>456</p>','<p>456</p>','1','1'),(31,',./','硬骨鱼纲','<p>,./</p>','http://localhost:3000/products/1678281162325eyJhbGciOi163690.jpg','滩涂养殖','<p>/.,</p>','<p>/.,</p>','1','1'),(32,'13123','软甲纲','<p>7897879</p>','http://localhost:3000/products/1678281738857eyJhbGciOi177816.jpg','滩涂养殖','<p>adwd</p>','<p>dawda</p>','1','1'),(33,'123','硬骨鱼纲','<p>123</p>','http://localhost:3000/products/1678362732192eyJhbGciOi152910.jpg','滩涂养殖','<p>123</p>','<p>123</p>','1','1'),(34,'456','双壳纲','<p>456</p>','http://localhost:3000/products/1678362743642eyJhbGciOi197894.jpg','滩涂养殖','<p>456</p>','<p>456</p>','1','1'),(35,'123456','硬骨鱼纲','<p>123</p>','http://localhost:3000/products/1678364152415eyJhbGciOi151674.jpeg','滩涂养殖','<p>123</p>','<p>123</p>','1','1'),(36,'548951','硬骨鱼纲','<p>vcxv</p>','http://localhost:3000/products/1678435164145eyJhbGciOi168334.png','滩涂养殖','<p>vcxv</p>','<p>vcxv</p>','1','1'),(37,'12','硬骨鱼纲','<p>11</p>','http://localhost:3000/products/1679906979391eyJhbGciOi127176.jpg','滩涂养殖','<p>22</p>','<p>33</p>','2','1');
/*!40000 ALTER TABLE `aquaculture_products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 17:46:52
