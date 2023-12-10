<script setup></script>

<template>
  <div class="swiperDiv">
    <el-carousel>
      <el-carousel-item>
        <img src="@/assets/images/swiper1.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/images/swiper2.jpg" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/images/swiper3.jpg" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="infoDiv">
    <div class="infoDivItem">
      <div class="infoDivItemTitle">
        <div class="infoDivItemTitleBig"><span>校招流程</span></div>
        <div class="infoDivItemTitleSmall">
          <span>明确校招流程，提高工作效率</span>
        </div>
      </div>
      <div class="infoDivItemContent">
        <div class="infoDivItemContentItem1">
          <div class="infoDivItemContentItemMain">
            <div class="infoDivItemContentItemMain1Img">
              <img
                class="process-icon__1MzIH"
                src="@/assets/images/flow-apply.png"
                alt="网申/内推"
              />
            </div>
            <div class="infoDivItemContentItemMain1Title">
              <span>投递</span>
            </div>
            <div class="infoDivItemContentItemMain1Bottom">
              <span>内推：3月1日-4月7日</span><br />
              <span>网申：3月1日-4月7日</span>
            </div>
          </div>
        </div>
        <div class="infoDivItemContentItem1">
          <div class="infoDivItemContentItemMain">
            <div class="infoDivItemContentItemMain1Img">
              <img
                class="process-icon__1MzIH"
                src="@/assets/images/flow-exam.png"
                alt="笔试/测评"
              />
            </div>
            <div class="infoDivItemContentItemMain1Title">
              <span>笔试/测评</span>
            </div>
            <div class="infoDivItemContentItemMain1Bottom">
              <span>3月中旬起</span>
            </div>
          </div>
        </div>
        <div class="infoDivItemContentItem1">
          <div class="infoDivItemContentItemMain">
            <div class="infoDivItemContentItemMain1Img">
              <img
                class="process-icon__1MzIH"
                src="@/assets/images/flow-meeting.png"
                alt="面试"
              />
            </div>
            <div class="infoDivItemContentItemMain1Title">
              <span>面试</span>
            </div>
            <div class="infoDivItemContentItemMain1Bottom">
              <span>3月中旬起</span>
            </div>
          </div>
        </div>
        <div class="infoDivItemContentItem1">
          <div class="infoDivItemContentItemMain">
            <div class="infoDivItemContentItemMain1Img">
              <img
                class="process-icon__1MzIH"
                src="@/assets/images/flow-offer.png"
                alt="录取"
              />
            </div>
            <div class="infoDivItemContentItemMain1Title">
              <span>录取</span>
            </div>
            <div class="infoDivItemContentItemMain1Bottom">
              <span>3月底起</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="infoDivItem">
      <div class="infoDivItemTitle">
        <div class="infoDivItemTitleBig"><span>热门企业</span></div>
        <div class="infoDivItemTitleSmall"><span>已有近万家企业加入</span></div>
      </div>
      <div class="infoDivItemContent">
        <div class="infoDivItemContentItem" v-for="index in 5" :key="index">
          <div class="infoDivItemContentItemMain">
            <div class="infoDivItemContentItemMainImg">
              <img
                src="https://image0.lietou-static.com/bg_white_222x222/5bfe919474719d35745adb7903a.png"
                alt=""
              />
            </div>
            <div class="infoDivItemContentItemMainContent">
              <span>腾讯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.homeDiv {
  position: relative;
}
@media screen and (max-width: 1000px) {
  .swiperDiv .el-carousel__container {
    height: 180px;
  }

  .swiperDiv img {
    width: 100%;
    height: 180px;
  }
}

@media screen and (min-width: 1000px) {
  .swiperDiv .el-carousel__container {
    height: 400px;
  }

  .swiperDiv img {
    width: 100%;
    height: 100%;
  }
}
.infoDiv {
  width: 90%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
}

.infoDivItem {
  background: white;
  padding: 10px;
  margin: 20px 0 20px 0;
}

.infoDivItemTitle {
  height: 35px;
  display: flex;
  align-items: center;
}

.infoDivItemTitleBig {
  font-size: 24px;
  font-weight: 500;
  color: #000;
}

.infoDivItemTitleSmall {
  font-size: 16px;
  font-weight: 400;
  color: #333;
  margin-left: 12px;
}

.infoDivItemContentItemMain {
  width: 90%;
  margin: auto;
}

.infoDivItemContentItemMainImg {
  text-align: center;
  cursor: pointer;
}

.infoDivItemContentItemMain1Img {
  margin: 10px 0 0 0;
  text-align: center;
}

.infoDivItemContentItemMain1Img img {
  height: 140px;
  width: 198px;
}

.infoDivItemContentItemMainImg img {
  height: 80px;
  width: 80px;
}

.infoDivItemContentItemMainImg1 {
  overflow: hidden;
  height: 114px;
  cursor: pointer;
}

.infoDivItemContentItemMainImg1 img {
  width: 100%;
  transition: transform 0.5s ease-out;
}

.infoDivItemContentItemMainImg1:hover img {
  transform: scale(1.2);
}

.infoDivItemContentItemMainContent {
  text-align: center;
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  line-height: 22px;
  margin: 10px;
}

.infoDivItemContentItemMainContent1 {
  height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(0, 0, 0);
  line-height: 22px;
  margin: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.infoDivItemContentItemMainBottom {
  margin-top: 8px;
  margin-bottom: 0;
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #999;
  line-height: 17px;
}

.infoDivItemContentItemMain1Title {
  color: #282a33;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 18px;
  text-align: center;
}

.infoDivItemContentItemMain1Bottom {
  color: #595b66;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

@media screen and (min-width: 1200px) {
  .infoDivItemContent {
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-around;
  }

  .infoDivItemContentItem1 {
    width: 25%;
    height: 250px;
  }

  .infoDivItemContentItem {
    width: 20%;
    height: 200px;
  }
}

@media screen and (max-width: 1200px) {
  .infoDivItemContent {
    margin: 10px 0 10px 0;
  }

  .infoDivItemContentItem1 {
    width: 100%;
    height: 250px;
  }

  .infoDivItemContentItem {
    width: 100%;
    height: 200px;
  }
}
</style>
