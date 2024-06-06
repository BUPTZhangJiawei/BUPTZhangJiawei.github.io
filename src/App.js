import './App.css';
import {useState,useRef,useEffect} from "react";
import Backdrop from './Component/Backdrop/Backdrop';
import { useRegisterUserMutation } from './Component/store/registerApi';

const PROJECT = [
  {
    id:1,
    name:"大熊猫"
  },{
    id:2,
    name:"雪豹"
  },{
    id:3,
    name:"东北虎"
  },{
    id:4,
    name:"江豚"
  },{
    id:5,
    name:"湿地与飞鸟"
  },{
    id:6,
    name:"中华白海豚"
  },{
    id:7,
    name:"气候变化"
  },{
    id:8,
    name:"大象"
  },{
    id:9,
    name:"穿山甲"
  },{
    id:10,
    name:"森林"
  },{
    id:11,
    name:"淡水"
  },{
    id:12,
    name:"绿色金融"
  },{
    id:13,
    name:"海洋保护"
  }
]

const PROVINCE = ["- 请选择 -","北京市","天津市","河北省","山西省"];
const CITY = [["- 请选择 -","市辖区"],
["- 请选择 -","市辖区"],
["- 请选择 -","石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","沧州市","廊坊市","衡水市"],
["- 请选择 -","太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁市"]
];
const COUNTY = [[["- 请选择 -","东城区","西城区","朝阳区","丰台区","石景山区","海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区","怀柔区","平谷区","密云区","延庆区"]],
[["- 请选择 -","和平区","河东区","河西区","南开区","河北区","红桥区","东丽区","西青区","津南区","北辰区","武清区","宝坻区","滨海新区","宁河区","静海区"," 蓟州区"]]];

function App() {
  const AppRef = useRef();
  //姓名栏状态
  const [nameFill,setNameFill] = useState(true);
  const [nameInput,setNameInput] = useState("");
  const nameRef = useRef();
  const nameBlurHandler = () => {
    if(nameInput === ""){
      setNameFill(false);
    }else{
      setNameFill(true);
    }
  };
  const nameChangeInputHandler = () => {
    setNameInput(nameRef.current.value);
  };

  //邮箱栏状态
  const [emailFill,setEmailFill] = useState(true);
  const [emailInput,setEmailInput] = useState("");
  const emailRef = useRef();
  const emailBlurHandler = () => {
    if(emailInput === ""){
      setEmailFill(false);
    }else{
      setEmailFill(true);
    }
  };
  const emailChangeInputHandler = () => {
    setEmailInput(emailRef.current.value);
  };

  //手机栏状态
  const [phoneFill,setPhoneFill] = useState(true);
  const [phoneInput,setPhoneInput] = useState("");
  const phoneRef = useRef();
  const phoneBlurHandler = () => {
    if(phoneInput === ""){
      setPhoneFill(false);
    }else{
      setPhoneFill(true);
    }
  };
  const phoneChangeInputHandler = () => {
    setPhoneInput(phoneRef.current.value);
  };

  //手机拖动条状态
  const [dragLength,setDragLength] = useState(0);    
  const [isDrag,setIsDrag] = useState(false);
  const [isHuman,setIsHuman] = useState(false);
  const [isHumanFill,setIsHumanFill] = useState(true);
  const [verCodeFill,setVerCodeFill] = useState(true);
  const [verCodeInput,setVerCodeInput] = useState("");
  const [hasClicked,setHasClicked] = useState(false);
  const [secondNum,setSecondNum] = useState(10);
  const verCodeRef = useRef();
  const dragButtonRef = useRef();
  useEffect(() => {               //拖动条事件
    document.addEventListener("mousedown",(event) => {
      if(event.target === dragButtonRef.current){
        setIsDrag(true);
        let startX = event.clientX;
        document.onmousemove = (e) => {
          const moved = e.clientX - startX;
          const newDragLength = parseInt(getComputedStyle(dragButtonRef.current).getPropertyValue("left")) + moved;
          if(newDragLength <= 0){
            setDragLength(0);
          }else if(newDragLength >= 510){
            setDragLength(510);
          }else{
            startX = startX + moved;
            setDragLength(newDragLength);
          }
        }
      }
      });

    document.addEventListener("mouseup",() => {
      document.onmousemove = null;
      setIsDrag(false);
      if(dragButtonRef.current){
        if(parseInt(getComputedStyle(dragButtonRef.current).getPropertyValue("left")) !== 510){
          setDragLength(0);
        }
      }
      
    });

  },[]);

  useEffect(() => {
    if(dragLength === 510){
      document.onmousemove = null;
      setIsHuman(true);
    }
  },[dragLength]);
  const verCodeChangeHandler = () => {
    setVerCodeInput(verCodeRef.current.value);
  };
  
  const timer = useRef();

  useEffect(() => {
    if(hasClicked && secondNum !== 0){
      timer.current = setTimeout(() => {
        setSecondNum(prevState => prevState - 1);
      },1000);
    }
    if(secondNum === 0){
      setHasClicked(false);
    }
    return () => clearTimeout(timer.current);
  },[hasClicked,secondNum]);

  const verCodeBlurHandler = () => {
    if(verCodeInput === ""){
      setVerCodeFill(false);
    }else{
      setVerCodeFill(true);
    }
  };
  const messageClick = () => {
    if(hasClicked){
      return;
    }
    if(phoneInput === ""){
      setPhoneFill(false);
      return;
    }
    alert("叮铃，来短信啦~~\n验证码是3208");
    setHasClicked(true);
    setSecondNum(10);
  };
  const audioClick = () => {
    if(phoneInput === ""){
      setPhoneFill(false);
      return;
    }
    alert("嘟嘟嘟，来电话啦~~\n验证码是3208");
  };

  //生日栏状态
  const [isSelectBirth,setIsSelectBirth] = useState(false);
  const [birthInput,setBirthInput] = useState("");
  const birthInputClickHandler = () => {
    setIsSelectBirth(true);
  };
  const returnBirth = (birth) => {
    setBirthInput(`${birth.YEAR}-${birth.MONTH}-${birth.DAY}`);
    setIsSelectBirth(false);
  };
  const cancelBirthSelect = () => {
    setIsSelectBirth(false);
  };

  //学历栏状态
  const [eduBackInput,setEduBackInput] = useState("");
  const eduBackRef = useRef();
  const eduBackChangeHandler = () => {
    setEduBackInput(eduBackRef.current.value);
  };

  //所属行业栏状态
  const [workInput,setWorkInput] = useState("");
  const workRef = useRef();
  const workChangeHandler = () => {
    setWorkInput(workRef.current.value);
  };

  //特长栏状态
  const [talentInput,setTalentInput] = useState("");
  const talentRef = useRef();
  const talentChangeHandler = () => {
    setTalentInput(talentRef.current.value);
  };

  //地址栏选择框状态
  const [province,setProvince] = useState(0);
  const provinceRef = useRef();
  const [city,setCity] = useState(0);
  const cityRef = useRef();
  const [county,setCounty] = useState(0);
  const countyRef = useRef();
  const [addressInput,setAddressInput] = useState("");
  const addressRef = useRef();
  const ProvinceHandler = () => {
    if(PROVINCE.indexOf(provinceRef.current.value) === 0){
      setCity(0);
      setCounty(0);
    }
    setProvince(PROVINCE.indexOf(provinceRef.current.value));
  };

  const CityHandler = () => {
    if(CITY[province - 1].indexOf(cityRef.current.value) === 0){
      setCounty(0);
    }
    setCity(CITY[province - 1].indexOf(cityRef.current.value));
  };

  const CountyHandler = () => {
    setCounty(COUNTY[province - 1][city - 1].indexOf(countyRef.current.value));
  };

  const addressChangeHandler = () => {
    setAddressInput(addressRef.current.value);
  };

  //项目栏状态
  const [addProject,setAddProject] = useState("");
  const projectRef = useRef();
  const addProjectRef = useRef();
  const addProjectInputRef = useRef();
  const addProjectInputChangeHandler = () => {
    setAddProject(addProjectInputRef.current.value);
  };
  const addProjectInputFocusHandler = () => {
    addProjectRef.current.checked = true;
  };
  const addProjectChangeHandler = () => {
    if(!addProjectRef.current.checked){
      setAddProject("");
    }
  };

  const clearHandler = () => {
    setNameInput("");
    setNameFill(true);
    setEmailInput("");
    setEmailFill(true);
    setPhoneInput("");
    setPhoneFill(true);
    setDragLength(0);
    setIsDrag(false);
    setIsHuman(false);
    setIsHumanFill(true);
    setVerCodeFill(true);
    setVerCodeInput("");
    setHasClicked(false);
    setBirthInput("");
    setEduBackInput("");
    setWorkInput("");
    setTalentInput("");
    setProvince(0);
    setCity(0);
    setCounty(0);
    setAddressInput("");
    Array.from(projectRef.current.children).forEach(item => {item.getElementsByTagName("input")[0].checked = false;});
    setAddressInput("");
    setAddProject("");
    addProjectRef.current.checked = false;
  };

  //提交表单
  const [registerFn] = useRegisterUserMutation();
  const submitHandler = (event) => {
    event.preventDefault();
    if(nameInput === "" || emailInput === "" || phoneInput === "" || verCodeInput !== "3208" || !isHuman){
      if(nameInput === ""){
        setNameFill(false);
      }
      if(emailInput === ""){
        setEmailFill(false);
      }
      if(phoneInput === ""){
        setPhoneFill(false);
      }else if(!isHuman){
        setIsHumanFill(false);
      }else if(verCodeInput !== "3208"){
        setVerCodeFill(false);
      }      
      AppRef.current.scroll(0,400);
      return;
    }
    const interestProject = [];
    Array.from(projectRef.current.children).filter(item => item.getElementsByTagName("input")[0].checked).forEach(item => interestProject.push(item.textContent));
    if(addProjectRef.current.checked){
      interestProject.push(addProject);
    }

    const userInfo = {
      name:nameInput,
      email:emailInput,
      phone:phoneInput,
      birth:birthInput,
      eduBack:eduBackInput,
      work:workInput,
      talent:talentInput,
      address:`${(province * city * county === 0) ? "" : PROVINCE[province] + CITY[province - 1][city] + COUNTY[province - 1][city - 1][county]}${addressInput}`,
      project:interestProject
    };
    registerFn(userInfo).then((res) => {
      if(!res.error){
        alert("表单提交成功，感谢您愿意加入WWF大家庭！");
        clearHandler();
      }else{
        throw new Error(res.error.message);
      }
    }).catch(err => {
      alert("表单提交失败，请稍后重新尝试~" + "\n" + err);
    });
  };

  return (
    <div ref = {AppRef} className="App">
        <div className = "contentContainer">
            <div className = "formintro">
              <h3>成为熊猫客，即刻助力环保</h3>
              <div>什么是熊猫客（PANDA pals）？</div>
              <div>认同PANDA的使命和价值观，不断学习环保知识、关爱自然与生活，热心公益并愿意携手世界自然基金会 (WWF) ，一同为地球做出改变，成为具有环境责任感和公益行动力的公益公民。</div>
              <div>
                <p>熊猫客的使命和价值观：（PANDA）</p>
                <p>相信专业 - Professionalism</p>
                <p>承担责任 - Accountability</p>
                <p>自然为本 - Nature-centered</p>
                <p>坚定决心 - Determination</p>
                <p>即刻行动 - Action</p>
              </div>
              <div className = "endwords">
                <p>我们相信，每一份努力都会带来改变。</p>
                <p>TOGETHER Possible!</p>
              </div>
              <p>注：报名信息将用于发送环保咨询及公益活动等信息。</p>
            </div>
            <div className = "clearButton">
              <span>根据你的过往填写记录，已为你自动填充表单，</span><span onClick = {clearHandler} className = "cleartext">点击清除</span>
            </div>
            <div className = {nameFill ? "" : "inputNotFill"}>
                <p className = "necessaryInfo">姓名</p>
                <input ref = {nameRef} onBlur = {nameBlurHandler} onChange = {nameChangeInputHandler} type = "text" value = {nameInput}></input>
            </div>
            <div className = {emailFill ? "" : "inputNotFill"}>
                <p className = "necessaryInfo">邮箱</p>
                <input ref = {emailRef} onBlur = {emailBlurHandler} onChange = {emailChangeInputHandler} type = "email" value = {emailInput}></input>
            </div>
            <div className = {phoneFill ? "" : "inputNotFill"}>
                <p className = "necessaryInfo">手机</p>
                <input ref = {phoneRef} onBlur = {phoneBlurHandler} onChange = {phoneChangeInputHandler} type = "tel" value = {phoneInput}></input>
                {isHuman ? <div className = {`getVerCode ${verCodeFill ? "" : "inputNotFill"}`}>
                  <p>短信验证码</p>
                  <input onBlur = {verCodeBlurHandler} onChange = {verCodeChangeHandler} ref = {verCodeRef} type = "text" placeholder = "短信验证码" value = {verCodeInput}></input>
                  <div className = {`getVerCodeButton ${hasClicked ? "hasClicked" : ""}`} onClick = {messageClick}>{hasClicked ? `${secondNum}s` : "获取验证码"}</div>
                  <span>接收不到验证码？可尝试&nbsp;</span><span className = "getVerCodeVideo" onClick = {audioClick}>语音接听验证码</span>
                </div> : 
                <div className = {`dragContainer ${isHumanFill ? "" : "notHuman"}`}>
                  <div ref = {dragButtonRef} className = {`dragButton ${isDrag ? "" : "buttonGoBack"}`} style = {{left:`${dragLength}px`}}></div>
                  <div className = {`completeblock ${isDrag ? "" : "buttonGoBack"}`} style = {{width:`${dragLength}px`}}></div>
                  <span>请按住滑块，拖动到最右边</span>
                </div>
                }
            </div>
            <div>
                <p>生日</p>
                <input onChange = {() => {}} onClick = {birthInputClickHandler} type = "text" style = {{cursor:"not-allowed"}} value = {birthInput}></input>
                {isSelectBirth && <Backdrop confirmFn = {returnBirth} cancelFn = {cancelBirthSelect}/>}
            </div>
            <div>
                <p>学历</p>
                <input onChange = {eduBackChangeHandler} ref = {eduBackRef} type = "text" value = {eduBackInput}></input>
            </div>
            <div>
                <p>所属行业</p>
                <input onChange = {workChangeHandler} ref = {workRef} type = "text" value = {workInput}></input>
            </div>
            <div>
                <p>个人特长</p>
                <p className = "extrodesc">我们希望了解您在某一领域的突出能力以及您有意向的志愿服务内容</p>
                <input onChange = {talentChangeHandler} ref = {talentRef} type = "text" value = {talentInput}></input>
            </div>
            <div>
                <p>联系地址</p>
                <div className = "addressSelectContainer">
                  <select ref = {provinceRef} onChange = {ProvinceHandler} className = "addressSelect" value = {PROVINCE[province]}>
                    {PROVINCE.map(item => <option key = {item} value = {item}>{item}</option>)}
                  </select>
                  {province !== 0 && 
                    <select ref = {cityRef} onClick = {CityHandler} className = "addressSelect">
                      {CITY[province - 1].map(item => <option key = {item} value = {item}>{item}</option>)}
                    </select>}
                  {city !== 0 && 
                  <select ref = {countyRef} onClick = {CountyHandler} className = "addressSelect">
                    {COUNTY[province - 1][city - 1].map(item => <option key = {item} value = {item}>{item}</option>)}
                  </select>}
                </div>
                <input onChange = {addressChangeHandler} ref = {addressRef} type = "text" value = {addressInput}></input>
            </div>
            <div>
                <p>感兴趣的项目</p>
                <ul ref = {projectRef}>
                  {PROJECT.map(item => <li key = {item.id}>
                    <input type = "checkbox"></input>
                    <span>{item.name}</span>
                  </li>)}
                </ul>
                <div className = "moreoption">
                  <input onChange = {addProjectChangeHandler} ref = {addProjectRef} type = "checkbox"></input>
                  <span>其他</span>
                  <input onFocus = {addProjectInputFocusHandler} onChange = {addProjectInputChangeHandler} ref = {addProjectInputRef} type = "text" value = {addProject}></input>
                </div>
            </div>
            <button onClick = {submitHandler} className = "submitButton">提交</button>
            <div>
              <a target = "_black" href = "https://www.lingxi360.com/?source=form&team_id=caypqrolg7zwk4635pw80v8xem3295n1&module_id=caklxnremov5gy6o25mlw019z84pwq23">灵析提供技术支持</a>
              <a href = "https://ff.lingxi360.com/f?fid=4VQ_MsAnzDa=i&utm_bccid=LXEOTGW7FivPBFFg&team=%E4%B8%80%E4%B8%AA%E5%9C%B0%E7%90%83%E8%87%AA%E7%84%B6%E5%9F%BA%E9%87%91%E4%BC%9A%EF%BC%88OPF%EF%BC%89&name=%E6%88%90%E4%B8%BA%E7%86%8A%E7%8C%AB%E5%AE%A2%EF%BC%8C%E5%8D%B3%E5%88%BB%E5%8A%A9%E5%8A%9B%E7%8E%AF%E4%BF%9D&team_id=69572&link=https%3A%2F%2Fff.lingxi360.com%2Ff%3Ffid%3D5CtVSv5V6B9NT%26s%3D%252Ff%26utm_bccid%3DLXEeiNOS&module=%E8%A1%A8%E5%8D%95">举报</a>
            </div>
        </div>
        <div className = "QRcodeContainer" style = {{left:`${window.innerWidth / 2 + 310}px`}}>
            <img src = "/imags/p12.png" alt = ""></img>
            <p>扫一扫分享给好友</p>
        </div>
        
    </div>
  );
}

export default App;
