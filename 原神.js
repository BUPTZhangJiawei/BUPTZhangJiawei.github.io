// 获取要操作的标签对象
const selectParent = document.querySelector(".mid-intro-list > div > ul")  //中间列表事件的委派对象
const selectList = document.getElementsByClassName("select-list");   //获取中间列表选项
const contentsList = document.getElementsByClassName("contents-container");  //获取主要页面对象列表
const beforeContentsList = document.getElementsByClassName("rectangle");   //获取主要页面对象前面的伪元素列表
const bkImg = document.querySelectorAll("#details > ul > li > img");   //获取轮播图背景图片对象列表
const listImg = document.querySelectorAll("#details > div.scroll-list > div.img-ul-container > ul > li > img"); //获取轮播图列表图片对象列表
const ImgParent = document.querySelector("#details > div.scroll-list > div.img-ul-container > ul");   //轮播图事件的委派对象
const video = document.getElementsByTagName("video")[0];   //轮播图视频对象
const videoCurrentTime = document.getElementsByClassName("current-time")[0];      //视频当前时间显示对象
const videoTotalTime = document.getElementsByClassName("total-time")[0];     //视频总时长显示对象
const pauseButton = document.getElementById("pause-button");      //视频暂停按钮对象
const volumeButton = document.getElementById("volume-button");      //视频音量按钮对象
const flexButton = document.getElementById("flex-button");      //视频缩放按钮对象
const volumeCircle = document.getElementById("volume-circle");      //视频音量圆圈对象
const volumeInner = document.getElementById("volume-inner");      //视频音量条对象
const progressBar = document.getElementById("progress-bar");      //视频总进度条对象
const progressPer = document.getElementById("progress-percent");      //视频当前进度条对象
const zoomBtn = document.getElementsByClassName("zoom-button");     //获取文本缩放按钮对象
const zoomText = document.getElementsByClassName("zoom-text");    //获取缩放文本容器对象
const moreInfo = document.getElementsByClassName("more-information")[0];   //获取更多信息面板对象
const midInfoList = document.getElementsByClassName("mid-intro-list")[0];   //获取中间列表容器对象
const navBar = document.getElementsByClassName("nav-bar")[0];   //获取游戏信息右侧导航条对象
const navBarList = document.getElementById("scroll-list");   //获取游戏信息右侧导航条内部滚动列表对象
const navBarLinks = navBarList.getElementsByTagName("a");      //获取导航条里的链接对象
const pageList = document.getElementsByClassName("page-list");   //获取页面链接表对象
const pageJump = document.getElementsByName("page-jump");   //获取页面跳转输入框对象
const godsWords = document.getElementsByClassName("gods-words")[0];   //获取大神说板块对象
const myVideos = document.getElementsByClassName("video-content")[0];   //获取视频板块对象
const commentList = document.getElementsByClassName("comment-list")[0];   //获取评论板块对象
const qaList = document.getElementsByClassName("qa-list")[0];      //获取问答板块对象
const zoomDiscuss = document.getElementsByClassName("zoom-discuss");    //获取评论板块回复收缩按钮对象
const cmtSub = document.getElementsByClassName("cmt-sub");          //获取评论板块回复框对象
const addReplay = document.getElementsByClassName("add-replay");    //获取评论板块回复图标对象
const addReplayButton = document.getElementsByClassName("joinit");  //获取评论板块回复按钮对象
const praiseButton = document.getElementsByClassName("praise");      //获取点赞图标对象
const trampleButton = document.getElementsByClassName("trample");    //获取踩图标对象
const submitReplay = document.getElementsByClassName("submit-replay");  //获取评论发表按钮对象
const writeEva = document.getElementById("write-evaluations");     //获取写评价按钮对象
const writeEvaContainer = document.getElementById("write-evaluations-container");   //获取评价书写框对象
const quitEva = document.getElementById("quit-eva");        //获取退出评论按钮对象
const evaStars = document.querySelectorAll(".eva-stars > i");       //获取评论框的星星对象
const starWords = document.getElementById("star-words");     //获取评论框打星赠语对象
const myevaText = document.getElementById("myeva");   //获取评论框文本框对象
const evaTextNum = document.getElementById("totaleva");   //获取评论框文本计数对象
const submitMyReplay = document.getElementById("eva-replay");   //获取评论框发表按钮对象
const forMoreEva = document.getElementsByClassName("more-evaluations")[0];    //获取评论板块查看更多按钮对象
const forMoreQa = document.getElementsByClassName("more-qa")[0];    //获取问答板块更多按钮对象
console.log("hahahahah")
const CONTAINER_NUM = [3,18,10,10];

const MYIMG = "./imags/87.jpg";
const MYNAME = "萝卜抱枕";

let currentEVAPageListNode = null;
video.currentTime = 0;

class qas{         //问答内容类
    constructor(title,joinNum,viewNum,authorImg,authorName,contentImg,contentTitle,time,praiseNum,trampleNum,contentLink){
        this.title = title;
        this.joinNum = joinNum;
        this.viewNum = viewNum;
        this.authorImg = authorImg;
        this.authorName = authorName;
        this.contentImg= contentImg;
        this.contentTitle = contentTitle;
        this.time = time;
        this.praiseNum = praiseNum;
        this.trampleNum = trampleNum;
        this.contentLink = contentLink;
    }
}

class commentor{       //评论者内容类
    constructor(authorImg,authorName,authorContent,authorTime,authorPraiseNum,authorTrampleNum){
        this.authorImg = authorImg;
        this.authorName = authorName;
        this.authorContent = authorContent;
        this.authorTime = authorTime;
        this.authorPraiseNum = authorPraiseNum;
        this.authorTrampleNum = authorTrampleNum;
    }
}

class comments extends commentor{        //评论发布者内容类
    constructor(authorImg,authorName,authorContent,authorTime,authorPraiseNum,authorTrampleNum,cmtStars,...myCommentors){
        super(authorImg,authorName,authorContent,authorTime,authorPraiseNum,authorTrampleNum);
        this.cmtStars = cmtStars;
        this.myCommentors = myCommentors;
    }
}

class videos{                //视频板块内容类
    constructor(videoImg,viewNum,likeNum,duration,title,sourceWeb,time,videoLink){
        this.videoImg = videoImg;
        this.viewNum = viewNum;
        this.likeNum = likeNum;
        this.duration = duration;
        this.title = title;
        this.sourceWeb = sourceWeb;
        this.time = time;
        this.videoLink = videoLink;
    }
}

class godswords{                //大神说板块内容类
    constructor(authorImg,authorName,contentImg,title,content,viewNum,contentLink){
        this.authorImg = authorImg;
        this.authorName = authorName;
        this.contentImg = contentImg;
        this.title = title;
        this.content = content;
        this.viewNum = viewNum;
        this.contentLink = contentLink;
    }
}

function fillContainer(container,index){        //根据后端数据填充容器
    if(container === godsWords && index < godsobj.length){         //填充大神说板块容器
        godsWords.insertAdjacentHTML("beforeend",
    `<div class = "gods-words-container">
        <div class = "player-info">
            <a href = "javascript:;">
                <img src = ${godsobj[index].authorImg}></img>
            </a>
            <div>
                <a href = "javascript:;" class = "authorName"></a>
                <br>
                <a href = "javascript:;">百度贴吧大神</a>
            </div>
        </div>
        <div class="player-content">
            <div class = "common">
                <a href = ${godsobj[index].contentLink}>
                    <img src = ${godsobj[index].contentImg}></img>
                </a>
                <div>
                    <a class = "title" href = ${godsobj[index].contentLink}></a>
                    <a class = "content" href = ${godsobj[index].contentLink}></a>
                    <div>
                        <span class = "viewNum"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>`);             //插入容器对象
        //为容器对象填充内容
        godsWords.lastElementChild.getElementsByClassName("authorName")[0].textContent = godsobj[index].authorName;
        godsWords.lastElementChild.getElementsByClassName("title")[0].textContent = godsobj[index].title;
        godsWords.lastElementChild.getElementsByClassName("content")[0].textContent = godsobj[index].content;
        godsWords.lastElementChild.getElementsByClassName("viewNum")[0].textContent = godsobj[index].viewNum;
    }else if(container === myVideos && index < videoobj.length){
        myVideos.insertAdjacentHTML("beforeend",`
        <div class = "video-box">
        <a href = ${videoobj[index].videoLink}>
            <div class = "img-container">
                <img src = ${videoobj[index].videoImg}>
                <div class = "video-data">
                    <div>
                        <div class = "view-num">${videoobj[index].viewNum}</div>
                        <div class = "like-num">${videoobj[index].likeNum}</div>
                    </div>
                    <div class = "duration">${videoobj[index].duration}</div>
                </div>
            </div>
            <span class = "title"></span>
        </a>
        <div class = "info-bottom">
            <span>${videoobj[index].sourceWeb}</span>
            <span>${videoobj[index].time}</span>
        </div>
    </div>`);       //插入容器对象
        //为容器对象填充内容
        myVideos.lastElementChild.getElementsByClassName("title")[0].textContent = videoobj[index].title;
    }else if(container === qaList && index < qaobj.length){
        qaList.insertAdjacentHTML("beforeend",`
        <div class = "qa-container">
            <a href = ${qaobj[index].contentLink} class = "title"></a>
            <div class = "card-brows">
                <span>${qaobj[index].joinNum}</span>
                <div></div>
                <span>${qaobj[index].viewNum}</span>
            </div>
            <div class = "author-info">
                <img src = ${qaobj[index].authorImg}></img>
                <span class = "authorName"></span>
                <img src = "./imags/73.png"></img>
            </div>
            <a href = ${qaobj[index].contentLink} class = "main-content">
                <div>
                    <img src = ${qaobj[index].contentImg}></img>
                    <p></p>
                </div>
            </a>
            <div class = "bot-nav">
                <span>${qaobj[index].time}</span>
                <div>
                    <div class = "praise"><img src = ${qaobj[index].praiseNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${qaobj[index].praiseNum.value}</span></div>
                    <div></div>
                    <div class = "trample"><img src = ${qaobj[index].trampleNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${qaobj[index].trampleNum.value}</span></div>
                </div>
            </div>
        </div>`);     //插入容器对象
        //为容器对象填充内容
        qaList.lastElementChild.getElementsByClassName("title")[0].textContent = qaobj[index].title;
        qaList.lastElementChild.getElementsByClassName("authorName")[0].textContent = qaobj[index].authorName;
        qaList.lastElementChild.getElementsByTagName("p")[0].textContent = qaobj[index].contentTitle;
    }else if(container === commentList && index < commentobj.length){
        commentList.insertAdjacentHTML("beforeend",
        `<div class = "comment-container">
            <div class = "main-cmt-unit">
                <img class = "icon" src = ${commentobj[index].authorImg}></img>
                <div class = "main" style = "width:725px;">
                    <div class = "main-1">
                        <span class = "commentAuthorName"></span>
                        <div class = "cmt-stars">
                            <i class = "fas fa-star" style = "color:rgb(202,202,202);"></i>
                            <i class = "fas fa-star" style = "color:rgb(202,202,202);"></i>
                            <i class = "fas fa-star" style = "color:rgb(202,202,202);"></i>
                            <i class = "fas fa-star" style = "color:rgb(202,202,202);"></i>
                            <i class = "fas fa-star" style = "color:rgb(202,202,202);"></i>
                        </div>
                    </div>
                    <div class = "main-2"></div>
                    <div class = "main-3">
                        <span>${commentobj[index].authorTime}</span>
                        <div>
                            <div class = "praise"><img src = ${commentobj[index].authorPraiseNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].authorPraiseNum.value}</span></div>
                            <div class = "trample"><img src = ${commentobj[index].authorTrampleNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].authorTrampleNum.value}</span></div>
                            <div class = ${commentobj[index].myCommentors.length !== 0 ? "" : "add-replay"}><img src = "./imags/68.png" class = ${commentobj[index].myCommentors.length !== 0 ? "zoom-discuss" : ""}></img><span></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);      //插入容器对象
        //为容器对象填充内容
        commentList.lastElementChild.getElementsByClassName("main-cmt-unit")[0].getElementsByClassName("commentAuthorName")[0].textContent = commentobj[index].authorName;
        commentList.lastElementChild.getElementsByClassName("main-cmt-unit")[0].getElementsByClassName("main-2")[0].textContent = commentobj[index].authorContent;
        cmtStars = commentList.lastElementChild.getElementsByClassName("fa-star");
        for(let i = 0;i < parseInt(commentobj[index].cmtStars);i++){
            cmtStars[i].style.color = "#F14027";
        }

        if(commentobj[index].myCommentors.length === 1){
            commentList.lastElementChild.insertAdjacentHTML("beforeend",`
            <div class = "cmt-sub">
                <div class = "cmt-unit">
                    <img class = "icon" src = ${commentobj[index].myCommentors[0].authorImg}></img>
                    <div class = "main" style = "width:661px;">
                        <div class = "main-1">
                            <span class = "commentAuthorName"></span>
                        </div>
                        <div class = "main-2">
                            <span class = "prev-content"></span>
                        </div>
                        <div class = "main-3">
                            <span>${commentobj[index].myCommentors[0].authorTime}</span>
                            <div>
                                <div class = "praise"><img src = ${commentobj[index].myCommentors[0].authorPraiseNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[0].authorPraiseNum.value}</span></div>
                                <div class = "trample"><img src = ${commentobj[index].myCommentors[0].authorTrampleNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[0].authorTrampleNum.value}</span></div>
                                <div class = "add-replay"><img src = "./imags/68.png"></img><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "cmt-botton-btns">
                    <div class = "for-more no-enough-replay"></div>
                    <div class = "joinit">我也说一句</div>
                </div>
            </div>
            `);
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("commentAuthorName")[0].textContent = commentobj[index].myCommentors[0].authorName;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("prev-content")[0].textContent = commentobj[index].myCommentors[0].authorContent.preContent;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("main-2")[0].insertAdjacentText("beforeend",commentobj[index].myCommentors[0].authorContent.bodyContent);
        }

        if(commentobj[index].myCommentors.length >= 2){
            commentList.lastElementChild.insertAdjacentHTML("beforeend",`
            <div class = "cmt-sub">
                <div class = "cmt-unit">
                    <img class = "icon" src = ${commentobj[index].myCommentors[0].authorImg}></img>
                    <div class = "main" style = "width:661px;">
                        <div class = "main-1">
                            <span class = "commentAuthorName"></span>
                        </div>
                        <div class = "main-2">
                            <span class = "prev-content"></span>
                        </div>
                        <div class = "main-3">
                            <span>${commentobj[index].myCommentors[0].authorTime}</span>
                            <div>
                                <div class = "praise"><img src = ${commentobj[index].myCommentors[0].authorPraiseNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[0].authorPraiseNum.value}</span></div>
                                <div class = "trample"><img src = ${commentobj[index].myCommentors[0].authorTrampleNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[0].authorTrampleNum.value}</span></div>
                                <div class = "add-replay"><img src = "./imags/68.png"></img><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "cmt-unit">
                    <img class = "icon" src = ${commentobj[index].myCommentors[1].authorImg}></img>
                    <div class = "main" style = "width:661px;">
                        <div class = "main-1">
                            <span class = "commentAuthorName"></span>
                        </div>
                        <div class = "main-2">
                            <span class = "prev-content"></span>
                        </div>
                        <div class = "main-3">
                            <span>${commentobj[index].myCommentors[1].authorTime}</span>
                            <div>
                                <div class = "praise"><img src = ${commentobj[index].myCommentors[1].authorPraiseNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[1].authorPraiseNum.value}</span></div>
                                <div class = "trample"><img src = ${commentobj[index].myCommentors[1].authorTrampleNum.state === false ? "./imags/67.png" : "./imags/86.png"}><span>${commentobj[index].myCommentors[1].authorTrampleNum.value}</span></div>
                                <div class = "add-replay"><img src = "./imags/68.png"></img><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class = "cmt-botton-btns">
                    <div class = "for-more ${(commentobj[index].myCommentors.length > 2) ? "" : "no-enough-replay"}">还有${commentobj[index].myCommentors.length - 2}条回复</div>
                    <div class = "joinit">我也说一句</div>
                </div>
            </div>
            `);

            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("commentAuthorName")[0].textContent = commentobj[index].myCommentors[0].authorName;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("prev-content")[0].textContent = commentobj[index].myCommentors[0].authorContent.preContent;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[0].getElementsByClassName("main-2")[0].insertAdjacentText("beforeend",commentobj[index].myCommentors[0].authorContent.bodyContent);
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[1].getElementsByClassName("commentAuthorName")[0].textContent = commentobj[index].myCommentors[1].authorName;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[1].getElementsByClassName("prev-content")[0].textContent = commentobj[index].myCommentors[1].authorContent.preContent;
            commentList.lastElementChild.getElementsByClassName("cmt-unit")[1].getElementsByClassName("main-2")[0].insertAdjacentText("beforeend",commentobj[index].myCommentors[1].authorContent.bodyContent);
        }

    }
}

let godsobj = [new godswords("./imags/80.jpeg","胡堂主","./imags/81.jpeg","3.4花神长眠之地「永恒绿洲」BGM！先行试听！","上次听到原神里这么好听的bgm还是风龙废墟...","1.3万人看过","https://lewan.baidu.com/lewanevaluate?nid=&rid=432983836279564687&gameName=%E5%8E%9F%E7%A5%9E&gameId=145260682134401024&type=12&evaType=3"),
                new godswords("./imags/82.jpeg","眼镜宅丶","./imags/83.jpeg","[3.5-BETA][.51]七圣召唤相关","","5964人看过","https://lewan.baidu.com/lewanevaluate?nid=&rid=347938419982328474&gameName=%E5%8E%9F%E7%A5%9E&gameId=145260682134401024&type=12&evaType=3"),
                new godswords("./imags/84.jpeg","泽奇","./imags/85.jpeg","3.6大家觉得女庄主会是岩系吗？","希望女庄主早点爆消息 这样就可以安心跳海哥了 抱歉了海哥，白术强度美和岩五更吸引我","5012人看过","https://lewan.baidu.com/lewanevaluate?nid=&rid=161471474331502454&gameName=%E5%8E%9F%E7%A5%9E&gameId=145260682134401024&type=12&evaType=3")];
let godsinfor = new Array(101);

let videoobj = [new videos("./imags/60.jpg","23.0万","2048","02:41","PDD怎么玩《原神》？氪金十几万还说便宜，劝人辞职去他家上班","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3404169115542057189&resourceId=3404169115542057189&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/64.jpg","12.0万","78","03:05","原神：你们知道如何秒杀风老BOSS吗？不知道看这里","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3417828267735202421&resourceId=3417828267735202421&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/65.jpg","11.9万","374","01:49","原神：八重神子使用率高达42.5%，2.8版本复刻万叶？","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3941367523228580857&resourceId=3941367523228580857&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/61.jpg","22.5万","568","41:25","《原神》前往稻妻！新的冒险","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3335537639257730133&resourceId=3335537639257730133&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/62.jpg","13.5万","2583","04:19","原神：雷系角色的噩梦？冒险等级40级后，为何突然就成废物？","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3574206107186408476&resourceId=3574206107186408476&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/63.jpg","12.7万","14","04:17","【原神】胡桃，我抽完武器回来了！","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3762970979930544595&resourceId=3762970979930544595&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/60.jpg","23.0万","2048","02:41","PDD怎么玩《原神》？氪金十几万还说便宜，劝人辞职去他家上班","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3404169115542057189&resourceId=3404169115542057189&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/61.jpg","22.5万","568","41:25","《原神》前往稻妻！新的冒险","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3335537639257730133&resourceId=3335537639257730133&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/62.jpg","13.5万","2583","04:19","原神：雷系角色的噩梦？冒险等级40级后，为何突然就成废物？","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3574206107186408476&resourceId=3574206107186408476&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/63.jpg","12.7万","14","04:17","【原神】胡桃，我抽完武器回来了！","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3762970979930544595&resourceId=3762970979930544595&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/64.jpg","12.0万","78","03:05","原神：你们知道如何秒杀风老BOSS吗？不知道看这里","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3417828267735202421&resourceId=3417828267735202421&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/62.jpg","13.5万","2583","04:19","原神：雷系角色的噩梦？冒险等级40级后，为何突然就成废物？","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3574206107186408476&resourceId=3574206107186408476&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/63.jpg","12.7万","14","04:17","【原神】胡桃，我抽完武器回来了！","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3762970979930544595&resourceId=3762970979930544595&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/64.jpg","12.0万","78","03:05","原神：你们知道如何秒杀风老BOSS吗？不知道看这里","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3417828267735202421&resourceId=3417828267735202421&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/65.jpg","11.9万","374","01:49","原神：八重神子使用率高达42.5%，2.8版本复刻万叶？","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3941367523228580857&resourceId=3941367523228580857&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/60.jpg","23.0万","2048","02:41","PDD怎么玩《原神》？氪金十几万还说便宜，劝人辞职去他家上班","好看视频","3年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3404169115542057189&resourceId=3404169115542057189&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/61.jpg","22.5万","568","41:25","《原神》前往稻妻！新的冒险","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3335537639257730133&resourceId=3335537639257730133&type=12&gameName=%E5%8E%9F%E7%A5%9E"),
                new videos("./imags/65.jpg","11.9万","374","01:49","原神：八重神子使用率高达42.5%，2.8版本复刻万叶？","好看视频","2年前","https://lewan.baidu.com/lewanvideo?gameId=145260682134401024&rid=3941367523228580857&resourceId=3941367523228580857&type=12&gameName=%E5%8E%9F%E7%A5%9E")];
let videoinfor = new Array(100);

let commentobj = [new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false})),
                    new comments("./imags/69.jpg","虚雷彻电","我就服了那些说要举报原神的 怎地 你们也是做游戏的？看到它盈利就眼红呗？一天天老说害青少年的 你们自己不管好孩子来这赖游戏？？？","1年前",{value:"811",state:false},{value:"83",state:false},"4",
                    new commentor("./imags/70.jpg","蹦蹦小圆帽2048",{preContent:"回复百度网友87ddd2d：",bodyContent:"笑死　给你点了右边那个赞"},"1月前",{value:"1",state:false},{value:"",state:false}),
                    new commentor('./imags/71.jpg',"百度网友fe249aad7",{preContent:"",bodyContent:"没错！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！"},"1月前",{value:"1",state:false},{value:"",state:false}))];
let commentinfor = new Array(8265);

let qaobj = [new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264"),
            new qas("芬德尼尔之顶怎么去？","10人回答","4人看过","./imags/72.jpg","老子是无言WY","./imags/74.jpg","原神芬德尼尔之顶在什么地方？原神芬德尼尔之顶要怎么才能进入？原神1.2版本中增加了全新的秘境-芬德尼尔之顶，进入了这里才有机会获得圣物。不过圣物不是哪么好得的。下面就来告诉大家进入的方法以及需要注意的问题。进入芬德尼尔之顶秘境详细答案:全新秘境「芬德尼尔之顶」完成任务「山中之物」后，旅行者将能够前往山顶解锁全新秘境「芬德尼尔之顶」，挑战秘境可获得「冰风迷途的勇士」、「沉沦之心」等圣遗物。在秘境中，角色会持续积累「严寒」。挑战平台中的地面会间歇性变为「温暖」与「极寒」状态。温暖状态的地面可以为角色削减严寒积累，极寒的地面会加速严寒积累。","2年前发布",{value:"260",state:false},{value:"",state:false},"https://lewan.baidu.com/lewanqapage?gameId=145260682134401024&questionId=186189514656395264")];
let qainfor = new Array(1498);

function initialPageList(container,information,num){               //初始化页面列表，形参分别为对应的页面对象，填充信息，每个页面的容器个数
    let pages = Math.ceil(information.length / num);           //获取页面数
    const firstPage = container.nextElementSibling.children[1];
    if(pages <= 7){
        for(let i = pages;i > 1;i--){
            firstPage.insertAdjacentHTML("afterend",`<li>${i}</li>`);
        }
    }else if(pages <= 50){
        firstPage.insertAdjacentHTML("afterend",`<li>${pages}</li>`);
        firstPage.insertAdjacentHTML("afterend",`<li class = "jumpafter">···</li>`);
        for(let i = 6;i > 1;i--){
            firstPage.insertAdjacentHTML("afterend",`<li>${i}</li>`);
        }
    }else{
        container.nextElementSibling.lastElementChild.insertAdjacentHTML("afterend","<div>跳至<input name = 'page-jump' type = 'text'></input>页</div>");
        firstPage.insertAdjacentHTML("afterend",`<li>${pages}</li>`);
        firstPage.insertAdjacentHTML("afterend",`<li class = "jumpafter">···</li>`);
        for(let i = 6;i > 1;i--){
            firstPage.insertAdjacentHTML("afterend",`<li>${i}</li>`);
        }
    }
}

//填充大神说板块
initialPageList(godsWords,godsinfor,CONTAINER_NUM[0]);
for(let i = 0; i < CONTAINER_NUM[0]; i++){
    fillContainer(godsWords,i);
}

//填充视频板块
initialPageList(myVideos,videoinfor,CONTAINER_NUM[1]);
for(let i = 0; i < CONTAINER_NUM[1]; i++){
    fillContainer(myVideos,i);
}

//填充讨论板块
initialPageList(commentList,commentinfor,CONTAINER_NUM[2]);
for(let i = 0; i < CONTAINER_NUM[2]; i++){
    fillContainer(commentList,i);
}
currentEVAPageListNode = pageList[2].cloneNode(true);
pageList[2].remove();

//填充问答板块
initialPageList(qaList,qainfor,CONTAINER_NUM[3]);
for(let i = 0; i < CONTAINER_NUM[3]; i++){
    fillContainer(qaList,i);
}


function changePageButton(pageButtons,totalPage,currentPage){     //更新页面按钮的函数，形参分别为对应的页面对象，总页数，当前更新页数
    const container = pageButtons[0].parentNode.previousElementSibling;    //获取页面列表控制的板块
    const containerNum = CONTAINER_NUM[Array.from(pageList).indexOf(pageButtons[0].parentNode)];      //获取板块每页容器数
    while(container.firstElementChild !== container.lastElementChild){
        container.lastElementChild.remove();
    }
    for(let i = 0;i < containerNum;i++){
        fillContainer(container,i);
    }

    //更新页面按钮
    if(totalPage <= 7){
        pageButtons[currentPage].classList.add("current-page");
    }else if(currentPage < 5){
        for(;pageButtons.length > 4;){
            pageButtons[2].remove();             //将中间的按钮删除
        }
        pageButtons[1].insertAdjacentHTML("afterend",`<li class = "jumpafter">···</li>`);
        for(let i = 6;i > 1;i--){
            if(i === currentPage){
                pageButtons[1].insertAdjacentHTML("afterend",`<li class = "current-page">${i}</li>`);
            }else{
                pageButtons[1].insertAdjacentHTML("afterend",`<li>${i}</li>`);
            }
        }
    }else if(currentPage >= 5 && totalPage - currentPage >= 4){
        for(;pageButtons.length > 4;){
            pageButtons[2].remove();             //将中间的按钮删除
        }
        pageButtons[1].insertAdjacentHTML("afterend",`<li class = "jumpafter">···</li>`);
        for(let i = currentPage + 2;i >= currentPage - 2;i--){
            if(i === currentPage){
                pageButtons[1].insertAdjacentHTML("afterend",`<li class = "current-page">${i}</li>`);
            }else{
                pageButtons[1].insertAdjacentHTML("afterend",`<li>${i}</li>`);
            }
        }
        pageButtons[1].insertAdjacentHTML("afterend",`<li class = "jumpbefore">···</li>`);
    }else if(currentPage >=5 && totalPage - currentPage < 4){
        for(;pageButtons.length > 4;){
            pageButtons[2].remove();             //将中间的按钮删除
        }
        for(let i = totalPage - 1;i > totalPage - 6;i--){
            if(i === currentPage){
                pageButtons[1].insertAdjacentHTML("afterend",`<li class = "current-page">${i}</li>`);
            }else{
                pageButtons[1].insertAdjacentHTML("afterend",`<li>${i}</li>`);
            }
        }
        pageButtons[1].insertAdjacentHTML("afterend",`<li class = "jumpbefore">···</li>`);
    }
}

function changePageList(container,page){                //更新页面列表形式，形参分别为对应的页面对象，跳转页面值
    const pageButtons = container.getElementsByTagName("li");
    const totalPage = parseInt(pageButtons[pageButtons.length - 2].textContent);   //获取该列表总页面数
    const current = container.getElementsByClassName("current-page")[0];
    current.classList.remove("current-page");
    if(page <= 1){            //目标页面数小于最小值，跳转到1页面
        changePageButton(pageButtons,totalPage,1);
        container.children[1].classList.add("current-page");
        container.children[0].classList.add("banned-button");   //将上一页的按钮置为不可点击状态
        pageButtons[pageButtons.length - 1].classList.remove("banned-button");   //将下一页的按钮置为可点击状态
    }else if(page >= totalPage){
        changePageButton(pageButtons,totalPage,totalPage);
        pageButtons[pageButtons.length - 2].classList.add("current-page");
        pageButtons[pageButtons.length - 1].classList.add("banned-button");   //将下一页的按钮置为不可点击状态
        container.children[0].classList.remove("banned-button");   //将上一页的按钮置为可点击状态
    }else{
        changePageButton(pageButtons,totalPage,page);
        container.children[0].classList.remove("banned-button");   //将上一页的按钮置为可点击状态
        pageButtons[pageButtons.length - 1].classList.remove("banned-button");   //将下一页的按钮置为可点击状态
    }
}


function selecthover(num,item){
    let index = Array.from(selectList).indexOf(item);    //获取触发对象索引，方便对相关联对象操作
    item.style.opacity = num;
    beforeContentsList[index].style.opacity = num;
}

let changetimer = (function changeImg(){
    let timer = null;       //定时器
    return function(){
        if(timer === null){      //当前定时器已关闭
            let index = Array.from(listImg).indexOf(document.getElementsByClassName("current-listimg")[0]);    //获取当前焦点图片索引
            timer = setTimeout(function change(){
                listImg[index].classList.remove("current-listimg");     //移除当前焦点图片状态
                listImg[index].parentNode.style.border = "none";   //去除当前焦点图片边框
                if(index === 0){     //当前焦点背景为视频  
                    video.parentNode.style.visibility = "hidden";   //将背景视频设为不可见
                    video.currentTime = 0;    //将视频进度条设为开始
                    video.pause();   //暂停视频
                }else{   //当前焦点背景为图片
                    bkImg[index - 1].classList.remove("current-bkimg");     //移除当前焦点图片状态
                }
                if(index === listImg.length - 1){     //已切换到最后一张图片
                    index = 0;
                    clearTimeout(timer);
                    timer = null;
                    video.parentNode.style.visibility = "visible";  //将背景视频设为可见
                    video.play();   //开始播放视频
                }else{
                    index++;
                    bkImg[index - 1].classList.add("current-bkimg");     //将当前图片设为焦点状态
                    timer = setTimeout(change,4000);
                }
                listImg[index].classList.add("current-listimg");     //将当前图片设为焦点状态
                listImg[index].parentNode.style.border = "2px solid #fff";  //将当前图片添加边框
            },4000);                    //每四秒切换一次图片
        }
        else{          //当前定时器已打开
            clearTimeout(timer);
            timer = null;
        }
    }
})();

for(let i = 0; i < selectList.length; i++){            //依次为每个列表选项绑定触发函数
    selectList[i].onmouseenter = (event) => {
        selecthover(0.5,event.target);
    }
    selectList[i].onmouseleave = (event) => {
        selecthover(1,event.target);
    }
}

selectParent.onclick = function(event){
    let flag = false;
    let parentnode = null;
    for(let node of selectList){            //判断点击对象是否为正确对象
        if(node.contains(event.target)){
            flag = true;
            parentnode = node;
            break;
        }
    }
    if(flag){
        const current = selectParent.getElementsByClassName("current-select")[0];      //找到当前焦点对象
        if(current === parentnode){           //若点击的就是当前焦点对象，则无需进行后续操作
            return
        }
        current.classList.remove("current-select");      //移除该对象的焦点状态
        const currentImg = current.getElementsByTagName("img")[0]; //找到当前焦点对象下的图片对象
        currentImg.src = currentImg.src.slice(0,-3) + "png";   //将图片更换
        const currentrectangle = current.getElementsByClassName("rectangle")[0];   //找到当前焦点对象下的三角对象
        currentrectangle.style.visibility = "hidden";    //隐藏该三角对象
        const currentIndex = Array.from(selectList).indexOf(current); //获取触发对象索引，方便对相关联对象操作
        contentsList[currentIndex].classList.remove("current-content");   //移除该对象的焦点状态
        if(currentIndex === 0){
            contentsList[2].classList.remove("current-content");
            contentsList[3].classList.remove("current-content");
            forMoreQa.parentNode.style.display = "none";
            writeEva.previousElementSibling.remove();
            commentList.insertAdjacentElement("afterend",currentEVAPageListNode);
            contentsList[3].style.height = "auto";
            forMoreEva.parentElement.parentElement.style.display = "none";
        }

        parentnode.classList.add("current-select");    //将点击对象设为新的焦点对象
        const img = parentnode.getElementsByTagName("img")[0];   //找到点击对象下的图片对象
        img.src = img.src.slice(0,-3) + "jpg";   //将图片更换
        const index = Array.from(selectList).indexOf(parentnode); //获取触发对象索引，方便对相关联对象操作
        beforeContentsList[index].style.visibility = "visible";  //显示该三角对象
        contentsList[index].classList.add("current-content");   //将该对象设为焦点对象
        document.scrollingElement.scrollTo(0,0);     //使页面回到顶部
        if(index === 0){
            contentsList[2].classList.add("current-content");
            contentsList[3].classList.add("current-content");
            writeEva.insertAdjacentHTML("beforebegin","<h4>评价</h4>");
            forMoreQa.parentNode.style.display = "flex";
            currentEVAPageListNode = pageList[2].cloneNode(true);
            pageList[2].remove();
            contentsList[3].style.height = "600px";
            forMoreEva.parentElement.parentElement.style.display = "block";
        }
    }
}

ImgParent.onmousemove = function(event){
    let index = Array.from(listImg).indexOf(event.target);   //获取触发事件对象的索引
    if(index !== -1){   //判断触发事件对象是否为正确对象
        const current = document.getElementsByClassName("current-listimg")[0];   //获取当前焦点列表图片对象
        if(current === event.target){ //若触发对象就是当前焦点对象，则无需进行后续操作
            return
        }
        current.classList.remove("current-listimg");  //移除该对象的焦点状态
        current.parentNode.style.border = "none";   //去除当前焦点图片边框
        listImg[index].classList.add("current-listimg");  //将该对象设为焦点对象
        listImg[index].parentNode.style.border = "2px solid #fff";  //为该对象添加边框

        const currentBkimg = document.getElementsByClassName("current-bkimg")[0];   //获取当前背景图片对象
        if(currentBkimg === undefined){   //判断视频播放时是否选中图片
            video.parentNode.style.visibility = "hidden";
            video.currentTime = 0;
            video.pause();    //将视频暂停
        }else{
            currentBkimg.classList.remove("current-bkimg");  //移除该对象的焦点状态
            changetimer();
        }
        if(index !== 0){    //判断新选中对象是否为视频
            bkImg[index - 1].classList.add("current-bkimg");  //将该对象设为焦点对象
        }else{
            video.parentNode.style.visibility = "visible";
            video.currentTime = 0;
            video.play();
        }
    }
}

ImgParent.onmouseout = function(event){
    let index = Array.from(listImg).indexOf(event.target);   //获取触发事件对象的索引
    if(index !== 0 && index !== -1){   //判断触发事件对象是否为正确对象
        changetimer();
    }
}

video.addEventListener("loadeddata",function(){
    videoTotalTime.textContent = `${video.duration > 600 ? "" : "0"}` + parseInt(video.duration / 60) + " : " + parseInt(video.duration % 60);
})

video.addEventListener("ended",function(event){    //视频播放完后触发轮播图定时器
    changetimer();
})

video.addEventListener("timeupdate",function(){
    videoCurrentTime.textContent = `${video.currentTime > 600 ? "" : "0"}` + parseInt(video.currentTime / 60) + " : " + `${video.currentTime % 60 >= 10 ? "" : "0"}` + parseInt(video.currentTime % 60);
    progressPer.style.width = video.currentTime / video.duration * 100 + "%";
})

for(let i = 0; i < zoomBtn.length; i++){    //为文本显示的省略按钮绑定点击事件
    zoomBtn[i].onclick = function(event){
        if(i < 2){
            if(zoomBtn[i].textContent === "展开更多"){
                zoomBtn[i].textContent = "收起";
                zoomText[i].style.height = "auto";
                zoomBtn[i].parentNode.parentNode.style.boxShadow = "none";
                if(i === 0){
                    zoomBtn[i].parentNode.classList.add("anewstyle");
                    zoomBtn[i].insertAdjacentHTML("beforeEnd","<div></div>");
                    zoomBtn[i].parentNode.parentNode.style.paddingTop = 0;
                }
            }else{
                zoomBtn[i].textContent = "展开更多";
                if(i === 0){
                    zoomText[i].style.height = "610px";
                    zoomBtn[i].parentNode.parentNode.style.boxShadow = "0 -20px 30px white";
                    zoomBtn[i].parentNode.parentNode.style.paddingTop = "20px";
                    zoomBtn[i].parentNode.classList.remove("anewstyle");
                    if(parseInt(navBar.style.top) > parseInt(getComputedStyle(document.getElementsByClassName("game-ency")[0]).height) - parseInt(getComputedStyle(navBar).height) - 54 - 43){
                        navBar.style.top = parseInt(getComputedStyle(document.getElementsByClassName("game-ency")[0]).height) - parseInt(getComputedStyle(navBar).height) - 54 - 43 + "px";
                    }
                }else{
                    zoomText[i].style.height = "150px";
                    zoomBtn[i].parentNode.parentNode.style.boxShadow = "0 -30px 30px white";
                }
                if(parseInt(moreInfo.style.top) > parseInt(getComputedStyle(document.getElementsByClassName("main-contents")[0]).height) - parseInt(getComputedStyle(moreInfo).height)){
                    moreInfo.style.top = parseInt(getComputedStyle(document.getElementsByClassName("main-contents")[0]).height) - parseInt(getComputedStyle(moreInfo).height) + "px";
                }
            }
        }else{
            if(RegExp("^\.{3}.*展开$").test(zoomBtn[i].textContent)){
                zoomBtn[i].textContent = "收起";
                zoomText[i].style.height = "auto";
                if(i === 2){
                    zoomBtn[i].style.right = "530px";
                }
            }else{
                if(i === 2){
                    zoomBtn[i].textContent = "...展开";
                    zoomText[i].style.height = "234px";
                    zoomBtn[i].style.right = "0px";
                    if(parseInt(moreInfo.style.top) > parseInt(getComputedStyle(document.getElementsByClassName("main-contents")[0]).height) - parseInt(getComputedStyle(moreInfo).height)){
                        moreInfo.style.top = parseInt(getComputedStyle(document.getElementsByClassName("main-contents")[0]).height) - parseInt(getComputedStyle(moreInfo).height) + "px";
                    }
                }else{
                    zoomBtn[i].textContent = "... 展开";
                    zoomText[i].style.height = "84px";
                }
            }
        }
    }
}

document.onscroll = function(){
    // 为更多信息容器设置粘滞定位
    if(document.scrollingElement.scrollTop < 562){
        moreInfo.style.top = "0";
    }
    if(document.scrollingElement.scrollTop >= 562 && document.scrollingElement.scrollTop - 562 <= parseInt(getComputedStyle(document.getElementsByClassName("main-contents")[0]).height) - parseInt(getComputedStyle(moreInfo).height)){        //页面滚动到分界位置，改变更多信息容器的位置
        moreInfo.style.top = document.scrollingElement.scrollTop - 562 + "px";
    }
    // 为中间列表容器设置粘滞定位
    if(document.scrollingElement.scrollTop < 562){
        midInfoList.classList.remove("moved-mid-intro-list");
        midInfoList.style.top = "0";
        midInfoList.getElementsByTagName("ul")[0].style.paddingLeft = "27px";
        if(midInfoList.children[0].children.length === 2){
            midInfoList.children[0].removeChild(midInfoList.children[0].children[1]);     //移除下载链接按钮
        }
    }else{        //页面滚动到分界位置，改变中间列表容器的位置和样式
        midInfoList.classList.add("moved-mid-intro-list");
        midInfoList.style.top = document.scrollingElement.scrollTop - 562 + "px";
        midInfoList.getElementsByTagName("ul")[0].style.paddingLeft = 0;
        if(midInfoList.children[0].children.length === 1){
            midInfoList.children[0].insertAdjacentHTML("beforeend","<a href = 'https://ys.mihoyo.com/'><img src = './imags/75.png'></img><span font-family = 'PingFangSC-Regular'>官方正版下载</span></a>");    //添加下载链接按钮
        }
    }
    // 为游戏信息右侧导航条设置粘滞定位
    if(document.scrollingElement.scrollTop < 1250){
        navBar.style.top = "43px";
    }else if(document.scrollingElement.scrollTop < 1520){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[0].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }else if(document.scrollingElement.scrollTop < 1690){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[1].classList.add("current-tag");   //为当前位置对象设置焦点状态
        if(navBarList.scrollTop > 60){      //页面滚动条从上往下滚动
            navBarList.scrollTo(0,0);
        }
    }else if(document.scrollingElement.scrollTop < 1920){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[2].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }else if(document.scrollingElement.scrollTop < 2120){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[3].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }else if(document.scrollingElement.scrollTop < 2240){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[4].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }else if(document.scrollingElement.scrollTop < 2400){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[5].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }else if(document.scrollingElement.scrollTop < 2580){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[6].classList.add("current-tag");   //为当前位置对象设置焦点状态
        if(navBarList.scrollTop < 60){      //页面滚动条从上往下滚动
            navBarList.scrollTo(0,80);
        }
    }else if(document.scrollingElement.scrollTop >= 2580){
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        navBarLinks[7].classList.add("current-tag");   //为当前位置对象设置焦点状态
    }
    if(document.scrollingElement.scrollTop >= 1250 && document.scrollingElement.scrollTop - 1250 <= parseInt(getComputedStyle(document.getElementsByClassName("game-ency")[0]).height) - parseInt(getComputedStyle(navBar).height) - 54 - 43){
        navBar.style.top = document.scrollingElement.scrollTop - 1250 + 43 + "px";
    }
}

navBarList.onscroll = function(event){
    if(event.target.scrollTop < 60){
        if(event.target.parentNode.lastElementChild === event.target){
            event.target.parentNode.removeChild(event.target.parentNode.firstElementChild);
            event.target.parentNode.insertAdjacentHTML("beforeEnd","<div style = 'margin-top:10px;'></div>");
        }
    }else{
        if(event.target.parentNode.firstElementChild === event.target){
            event.target.parentNode.removeChild(event.target.parentNode.lastElementChild);
            event.target.parentNode.insertAdjacentHTML("afterBegin","<div style = 'transform:rotateZ(180deg);margin-bottom:10px;'></div>");
        }
    }
}

navBar.onclick = function(event){
    if(Array.from(navBarLinks).includes(event.target)){      //确定是否为点击链接事件
        const current = navBar.getElementsByClassName("current-tag")[0];   //获取当前焦点对象
        if(current === event.target){    //点击的就是当前焦点对象
            return
        }
        current.classList.remove("current-tag");     //去除当前对象的焦点状态
        event.target.classList.add("current-tag");   //为点击对象设置焦点状态
    }

    if(navBar.querySelector("#details > .game-ency > div.nav-bar > div") === event.target){      //确定是否为点击三角箭头事件
        if(event.target.style.marginTop === "10px"){
            navBarList.scrollTo(0,80);
        }else{
            navBarList.scrollTo(0,0);
        }
    }
}

document.addEventListener("focusout",function(event){
    if(Array.from(pageJump).indexOf(event.target) !== -1){
        const value = Number(event.target.value);
        if(Number.isInteger(value)){
            changePageList(event.target.parentNode.parentNode,value);
        }
    }
})

document.addEventListener("mousedown",function(event){             //绑定给鼠标按下事件是为了让其执行在输入框失去焦点事件之前
    const index = Array.from(pageList).indexOf(event.target.parentNode)     //获取触发对象所在页面列表索引
    if(index !== -1){
        
        const innerPages = pageList[index].getElementsByTagName("li");      //获取该页面列表内部的页面对象
        if(Array.from(innerPages).includes(event.target) && pageList[index].getElementsByClassName("current-page")[0] !== event.target){       //点击的页面不是当前跳转页面
            const innerIndex = Array.from(innerPages).indexOf(event.target);     //获取触发事件对象在该页面列表内部的索引
            if(innerIndex === 0){          //点击对象为“上一页”
                if(!innerPages[0].classList.contains("banned-button")){
                    changePageList(pageList[index],parseInt(pageList[index].getElementsByClassName("current-page")[0].previousElementSibling.textContent));
                }
            }else if(innerIndex === innerPages.length - 1){          //点击对象为“下一页”
                if(!innerPages[innerPages.length - 1].classList.contains("banned-button")){
                    changePageList(pageList[index],parseInt(pageList[index].getElementsByClassName("current-page")[0].nextElementSibling.textContent));
                }
            }else if(innerPages[innerIndex].classList.contains("jumpbefore")){         //点击向前跳转按钮
                changePageList(pageList[index],parseInt(pageList[index].getElementsByClassName("current-page")[0].textContent) - 5);
            }else if(innerPages[innerIndex].classList.contains("jumpafter")){         //点击向后跳转按钮
                changePageList(pageList[index],parseInt(pageList[index].getElementsByClassName("current-page")[0].textContent) + 5);
            }else{                 //点击显示的页面按钮
                changePageList(pageList[index],parseInt(event.target.textContent));
            }
        }
    }
},true)

document.addEventListener("click",function(event){
    const index = Array.from(zoomDiscuss).indexOf(event.target);
    if(index !== -1){
        if(event.target.classList.contains("not-open")){
            event.target.nextElementSibling.textContent = "";
            event.target.nextElementSibling.style.marginLeft = "0";
            event.target.classList.remove("not-open");
            cmtSub[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + index].style.display = "block";
        }else{
            event.target.nextElementSibling.textContent = commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + index].myCommentors.length + "";
            event.target.nextElementSibling.style.marginLeft = "5px";
            event.target.classList.add("not-open");
            cmtSub[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + index].style.display = "none";
        }
        return;
    }

    const clickedPraiseButton = Array.from(praiseButton).filter(item => item.contains(event.target))[0];
    if(clickedPraiseButton !== undefined){
        if(clickedPraiseButton.children[1].style.color === "red"){
            clickedPraiseButton.children[1].style.color = "#333333";
            clickedPraiseButton.children[0].src = "./imags/67.png";
            if(clickedPraiseButton.children[1].textContent !== "1"){
                clickedPraiseButton.children[1].textContent = parseInt(clickedPraiseButton.children[1].textContent) - 1 + "";
            }else{
                clickedPraiseButton.children[1].textContent = "抢首赞";
            }
        }else{
            clickedPraiseButton.children[1].style.color = "red";
            if(clickedPraiseButton.children[1].textContent !== "抢首赞"){
                clickedPraiseButton.children[1].textContent = parseInt(clickedPraiseButton.children[1].textContent) + 1 + "";
            }else{
                clickedPraiseButton.children[1].textContent = "1";
            }
            clickedPraiseButton.children[0].src = "./imags/86.png";
        }
        if(commentList.contains(clickedPraiseButton)){
            const clickedContainer = Array.from(commentList.getElementsByClassName("comment-container")).filter(item => item.contains(clickedPraiseButton))[0];
            const clickedContainerIndex = Array.from(commentList.getElementsByClassName("comment-container")).indexOf(clickedContainer);
            const clickedUnit = Array.from(clickedContainer.lastElementChild.getElementsByClassName("cmt-unit")).filter(item => item.contains(clickedPraiseButton))[0];
            const clickedUnitIndex = Array.from(clickedContainer.lastElementChild.getElementsByClassName("cmt-unit")).indexOf(clickedUnit);

            if(clickedUnitIndex === -1){
                commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[2] + clickedContainerIndex].authorPraiseNum = {value:clickedPraiseButton.children[1].textContent,state:!Boolean(commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[2] + clickedContainerIndex].authorPraiseNum.state)};
            }else{
                commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[2] + clickedContainerIndex].myCommentors[clickedUnitIndex].authorPraiseNum = {value:clickedPraiseButton.children[1].textContent,state:!Boolean(commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[2] + clickedContainerIndex].myCommentors[clickedUnitIndex].authorPraiseNum.state)};
            }
        }else{
            const clickedContainer = Array.from(qaList.getElementsByClassName("qa-container")).filter(item => item.contains(clickedPraiseButton))[0];
            const clickedContainerIndex = Array.from(qaList.getElementsByClassName("qa-container")).indexOf(clickedContainer);

            qaobj[(parseInt(pageList[3].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[3] + clickedContainerIndex].praiseNum = {value:clickedPraiseButton.children[1].textContent,state:!Boolean(qaobj[(parseInt(pageList[3].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[3] + clickedContainerIndex].praiseNum.state)};
        }
        return;
    }

    const clickedTrampleButton = Array.from(trampleButton).filter(item => item.contains(event.target))[0];
    if(clickedTrampleButton !== undefined){
        if(clickedTrampleButton.children[1].style.color === "red"){
            clickedTrampleButton.children[1].style.color = "#333333";
            clickedTrampleButton.children[0].src = "./imags/67.png";
            if(clickedTrampleButton.children[1].textContent !== "1"){
                clickedTrampleButton.children[1].textContent = parseInt(clickedTrampleButton.children[1].textContent) - 1 + "";
            }else{
                clickedTrampleButton.children[1].textContent = "";
            }
        }else{
            clickedTrampleButton.children[1].style.color = "red";
            clickedTrampleButton.children[0].src = "./imags/86.png";
            if(clickedTrampleButton.children[1].textContent !== ""){
                clickedTrampleButton.children[1].textContent = parseInt(clickedTrampleButton.children[1].textContent) + 1 + "";
            }else{
                clickedTrampleButton.children[1].textContent = "1";
            }
        }

        if(commentList.contains(clickedPraiseButton)){
            const clickedContainer = Array.from(commentList.getElementsByClassName("comment-container")).filter(item => item.contains(clickedTrampleButton))[0];
            const clickedContainerIndex = Array.from(commentList.getElementsByClassName("comment-container")).indexOf(clickedContainer);
            const clickedUnit = Array.from(clickedContainer.lastElementChild.getElementsByClassName("cmt-unit")).filter(item => item.contains(clickedTrampleButton))[0];
            const clickedUnitIndex = Array.from(clickedContainer.lastElementChild.getElementsByClassName("cmt-unit")).indexOf(clickedUnit);
            if(clickedUnitIndex === -1){
                commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + clickedContainerIndex].authorTrampleNum = {value:clickedTrampleButton.children[1].textContent,state:!Boolean(commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + clickedContainerIndex].authorTrampleNum.state)};
            }else{
                commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + clickedContainerIndex].myCommentors[clickedUnitIndex].authorTrampleNum = {value:clickedTrampleButton.children[1].textContent,state:!Boolean(commentobj[(parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + clickedContainerIndex].myCommentors[clickedUnitIndex].authorTrampleNum.state)};
            }
        }else{
            const clickedContainer = Array.from(qaList.getElementsByClassName("qa-container")).filter(item => item.contains(clickedTrampleButton))[0];
            const clickedContainerIndex = Array.from(qaList.getElementsByClassName("qa-container")).indexOf(clickedContainer);

            qaobj[(parseInt(pageList[3].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[3] + clickedContainerIndex].trampleNum = {value:clickedTrampleButton.children[1].textContent,state:!Boolean(qaobj[(parseInt(pageList[3].getElementsByClassName("current-page")[0].textContent) - 1) * CONTAINER_NUM[3] + clickedContainerIndex].trampleNum.state)};
        }
        return;
    }

    const replayIcon = Array.from(addReplay).filter(item => item.contains(event.target))[0];
    if(replayIcon !== undefined){
        if(replayIcon.classList.contains("replaying")){
            replayIcon.classList.remove("replaying");
            replayIcon.lastElementChild.textContent = "";
            replayIcon.lastElementChild.style.marginLeft = "0";
            replayIcon.parentNode.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.remove();
        }else{
            replayIcon.parentNode.parentNode.parentNode.parentNode.lastElementChild.insertAdjacentHTML("beforeend",`
            <div class = "replay-container">
                <textarea placeholder = "回复@${replayIcon.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("commentAuthorName")[0].textContent}："></textarea>
                <div class = "submit-replay">发表</div>
            </div>`);
            replayIcon.lastElementChild.textContent = "取消";
            replayIcon.lastElementChild.style.marginLeft = "5px";
            replayIcon.classList.add("replaying");
        }
        return;
    }

    const replayButtonIndex = Array.from(addReplayButton).indexOf(event.target);
    if(replayButtonIndex !== -1){
        if(event.target.classList.contains("replaying")){
            event.target.classList.remove("replaying");
            cmtSub[replayButtonIndex].removeChild(cmtSub[replayButtonIndex].lastElementChild);
        }else{
            cmtSub[replayButtonIndex].insertAdjacentHTML("beforeend",`
            <div class = "replay-container">
                <textarea></textarea>
                <div class = "submit-replay">发表</div>
            </div>`);
            event.target.classList.add("replaying");
        }
        return;
    }

    const submitReplayButtonIndex = Array.from(submitReplay).indexOf(event.target);
    if(submitReplayButtonIndex !== -1 && event.target.previousElementSibling.value !== ""){
        const clickedContainer = Array.from(commentList.getElementsByClassName("comment-container")).filter(item => item.contains(event.target))[0];
        const clickedContainerIndex = Array.from(commentList.getElementsByClassName("comment-container")).indexOf(clickedContainer);
        const objIndex = (parseInt(pageList[2].getElementsByClassName("current-page")[0].textContent) - 1) * COMMENT_CONTAINER_NUM + clickedContainerIndex;
        commentobj[objIndex].myCommentors.unshift(new commentor(MYIMG,MYNAME,{preContent:(event.target.previousElementSibling.placeholder.substring(0,2) + event.target.previousElementSibling.placeholder.substring(3)),bodyContent:event.target.previousElementSibling.value},"刚刚",{value:"",state:false},{value:"",state:false}));
    
        //更新评论板块
        const container = pageList[2].previousElementSibling;    //获取评论板块对象
        const containerNum = container.children.length - 1;      //获取板块每页容器数
        while(container.firstElementChild !== container.lastElementChild){
            container.lastElementChild.remove();
        }
        for(let i = 0;i < containerNum;i++){
            fillContainer(container,i);
        }
        return;
    }

    if(forMoreEva === event.target){
        const current = selectList[0];
        current.classList.remove("current-select");      //移除该对象的焦点状态
        const currentImg = current.getElementsByTagName("img")[0]; //找到当前焦点对象下的图片对象
        currentImg.src = currentImg.src.slice(0,-3) + "png";   //将图片更换
        const currentrectangle = current.getElementsByClassName("rectangle")[0];   //找到当前焦点对象下的三角对象
        currentrectangle.style.visibility = "hidden";    //隐藏该三角对象
        contentsList[0].classList.remove("current-content");   //移除该对象的焦点状态
        contentsList[3].classList.remove("current-content");   //移除该对象的焦点状态
        writeEva.previousElementSibling.remove();
        contentsList[2].insertAdjacentElement("beforeend",currentEVAPageListNode);
        forMoreEva.parentElement.parentElement.remove();

        selectList[2].classList.add("current-select");
        const img = selectList[2].getElementsByTagName("img")[0];   //找到点击对象下的图片对象
        img.src = img.src.slice(0,-3) + "jpg";   //将图片更换
        beforeContentsList[2].style.visibility = "visible";  //显示该三角对象
        document.scrollingElement.scrollTo(0,0);     //使页面回到顶部
        return;
    }

    if(forMoreQa === event.target){
        const current = selectList[0];
        current.classList.remove("current-select");      //移除该对象的焦点状态
        const currentImg = current.getElementsByTagName("img")[0]; //找到当前焦点对象下的图片对象
        currentImg.src = currentImg.src.slice(0,-3) + "png";   //将图片更换
        const currentrectangle = current.getElementsByClassName("rectangle")[0];   //找到当前焦点对象下的三角对象
        currentrectangle.style.visibility = "hidden";    //隐藏该三角对象
        contentsList[0].classList.remove("current-content");   //移除该对象的焦点状态
        contentsList[2].classList.remove("current-content");   //移除该对象的焦点状态
        forMoreQa.parentNode.style.display = "none";
        contentsList[3].style.height = "auto";
        contentsList[3].insertAdjacentElement("beforeend",currentEVAPageListNode);

        selectList[3].classList.add("current-select");
        const img = selectList[3].getElementsByTagName("img")[0];   //找到点击对象下的图片对象
        img.src = img.src.slice(0,-3) + "jpg";   //将图片更换
        beforeContentsList[3].style.visibility = "visible";  //显示该三角对象
        document.scrollingElement.scrollTo(0,0);     //使页面回到顶部
        return;
    }

    if(pauseButton === event.target){
        if(video.paused){
            video.play();
            pauseButton.src = "./imags/89.png";
        }else{
            video.pause();
            pauseButton.src = "./imags/93.png";
        }
        return;
    }

    if(volumeButton === event.target){
        if(video.muted){
            video.volume = 0.5;
            volumeButton.src = "./imags/91.png";
            video.muted = false;
            volumeInner.style.width = "50%";
            volumeCircle.style.left = "35px";
        }else{
            if(video.volume !== 0.5){
                video.volume = 0.5;
                volumeInner.style.width = "50%";
                volumeCircle.style.left = "35px";
            }else{
                video.volume = 0;
                volumeButton.src = "./imags/90.png";
                volumeInner.style.width = "0";
                volumeCircle.style.left = "-6px";
                video.muted = true;
            }
        }
        return;
    }

    if(flexButton === event.target){
        if(video.paused){
            pauseButton.src = "./imags/89.png";
        }else{
            pauseButton.src = "./imags/93.png";
        }
        video.requestFullscreen();
        return;
    }
})

writeEva.addEventListener("click",function(){
    writeEvaContainer.style.visibility = "visible";
})

writeEvaContainer.addEventListener("click",function(event){
    if(event.target === quitEva || event.target === submitMyReplay){
        if(event.target === submitMyReplay){
            let starNum = 0;
            Array.from(evaStars).map(item => {
                if(item.style.color === "rgb(241, 64, 39)"){
                    starNum += 1;
                }
            });

            commentobj.unshift(new comments(MYIMG,MYNAME,myevaText.value,"刚刚",{value:"抢首赞",state:false},{value:"",state:false},starNum + ""));
            selectList[2].children[1].textContent = `评价(${parseInt(RegExp("[0-9]+").exec(selectList[2].children[1].textContent)[0]) + 1 + ""})`;
            
        }

        for(let i = 0;i < evaStars.length;i++){
            evaStars[i].style.color = "rgba(202,202,202,0.4)";
        }
        myevaText.value = "";
        evaTextNum.textContent = "0";
        starWords.textContent = "\"点击星星来评分\"";
        starWords.style.color = "#333333";
        writeEvaContainer.style.visibility = "hidden";

        const container = pageList[2].previousElementSibling;    //获取评论板块对象
        const containerNum = container.children.length - 1;      //获取板块每页容器数
        while(container.firstElementChild !== container.lastElementChild){
            container.lastElementChild.remove();
        }
        for(let i = 0;i < containerNum;i++){
            fillContainer(container,i);
        }
    }

    const starIndex = Array.from(evaStars).indexOf(event.target);
    if(starIndex !== -1){
        for(let i = 0;i <= starIndex;i++){
            evaStars[i].style.color = "#f14027";
        }
        for(let i = starIndex + 1;i < evaStars.length;i++){
            evaStars[i].style.color = "rgba(202,202,202,0.4)";
        }
        switch(starIndex){
            case 0:{
                starWords.textContent = "\"给个同情分，继续加油\"";
                starWords.style.color = "#333333";
                break;
            }
            case 1:{
                starWords.textContent = "\"这不是我的菜\"";
                starWords.style.color = "#333333";
                break;
            }
            case 2:{
                starWords.textContent = "\"没事玩玩还不错\"";
                starWords.style.color = "#333333";
                break;
            }
            case 3:{
                starWords.textContent = "\"太好玩了，极力推荐\"";
                starWords.style.color = "#f14027";
                break;
            }
            case 4:{
                starWords.textContent = "\"我被神作砸中了！\"";
                starWords.style.color = "#f14027";
                break;
            }
        }
    }

})

myevaText.addEventListener("input",() => {
    evaTextNum.textContent = `${myevaText.value.length}`;
})

progressBar.addEventListener("click",function(event){
    video.currentTime = parseInt(parseInt(event.offsetX) / 755 * video.duration);
    videoCurrentTime.textContent = `${video.currentTime > 600 ? "" : "0"}` + parseInt(video.currentTime / 60) + " : " + `${video.currentTime % 60 >= 10 ? "" : "0"}` + parseInt(video.currentTime % 60);
    progressPer.style.width = video.currentTime / video.duration * 100 + "%";
})

volumeInner.parentNode.addEventListener("mousedown",function(event){
    video.volume = parseInt(event.offsetX) / 82;
    if(video.muted && video.volume !== 0){
        volumeButton.src = "./imags/91.png";
        video.muted = false;
        volumeInner.style.width = video.volume * 100 + "%";
        volumeCircle.style.left = event.offsetX - 6 + "px";
    }else{
        if(video.volume !== 0){
            volumeInner.style.width = video.volume * 100 + "%";
            volumeCircle.style.left = event.offsetX - 6 + "px";
        }else{
            volumeButton.src = "./imags/90.png";
            volumeInner.style.width = "0";
            volumeCircle.style.left = "-6px";
        }
        video.muted = true;
    }
})

volumeCircle.addEventListener("mousedown", function(event){
    event.stopPropagation();
    volumeCircle.parentNode.onmousemove = function(e){
        const movedX = e.offsetX - event.offsetX;
        const newoffset = parseInt(getComputedStyle(volumeCircle).getPropertyValue("left")) + movedX;
        if(newoffset <= -6){
            volumeCircle.style.left = "-6px";
            volumeInner.style.width = "0";             
            volumeButton.src = "./imags/90.png";
            video.muted = true;
        }else if(newoffset >= 76){
            volumeCircle.style.left = "76px";
            volumeInner.style.width = "82px";
            volumeButton.src = "./imags/91.png";
            video.muted = false;
        }else{
            volumeCircle.style.left = newoffset + "px";
            volumeInner.style.width = parseInt(getComputedStyle(volumeInner).getPropertyValue("width")) + movedX + "px";
            volumeButton.src = "./imags/91.png";
            video.muted = false;
        }
    };
    volumeCircle.parentNode.onmouseup = function(){
        volumeCircle.parentNode.onmousemove = null;
    };
    volumeCircle.parentNode.onmouseleave = function(){
        volumeCircle.parentNode.onmousemove = null;
    };
})

volumeCircle.parentNode.parentNode.addEventListener("mouseleave",function(){
    volumeCircle.parentNode.style.display = "none";
})

volumeButton.addEventListener("mouseenter",function(){
    volumeButton.previousElementSibling.style.display = "block";
})

video.parentNode.addEventListener("mouseenter",function(){
    video.nextElementSibling.style.opacity = "1";
})

video.parentNode.addEventListener("mouseleave",function(){
    video.nextElementSibling.style.opacity = "0";
})

