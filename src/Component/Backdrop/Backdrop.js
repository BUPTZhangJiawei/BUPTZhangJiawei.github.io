import classes from "./Backdrop.module.css";
import {createPortal} from "react-dom";
import {useRef,useState,useEffect} from "react";

const backdropDom = document.getElementById("backdrop");

const Backdrop = (props) => {
    const currentDate = new Date();
    const [yearOptions,setYearOptions] = useState([]);
    const [monthOptions,setMonthOptions] = useState([]);
    const [dayOptions,setDayOptions] = useState([]);
    const [year,setYear] = useState(currentDate.getFullYear());
    const [month,setMonth] = useState(currentDate.getMonth() + 1);
    const [day,setDay] = useState(currentDate.getDate());
    const yearRef = useRef();
    const monthRef = useRef();
    const dayRef = useRef();

    useEffect(() => {
        setYearOptions(() => {
            const years = new Array(100);
            for(let i = 0; i < 100; i++){
                years[i] = currentDate.getFullYear() - (99 - i);
            }
            return years;
        });
        setMonthOptions(() => {
            const months = new Array(12);
            for(let i = 0; i < 12; i++){
                months[i] = i + 1;
            }
            return months;
        });
    },[]);

    useEffect(() => {
        const longMonth = [1,3,5,7,8,10,12];
        const shortMonth = [4,6,9,11];
        setDayOptions(() => {
            if(longMonth.includes(month)){
                const days = new Array(31);
                for(let i = 0; i < 31; i++){
                    days[i] = i + 1;
                }
                return days;
            }else if(shortMonth.includes(month)){
                const days = new Array(30);
                for(let i = 0; i < 30; i++){
                    days[i] = i + 1;
                }
                return days;
            }
            if(month === 2 && (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))){
                const days = new Array(29);
                for(let i = 0; i < 29; i++){
                    days[i] = i + 1;
                }
                return days;
            }else{
                const days = new Array(28);
                for(let i = 0; i < 28; i++){
                    days[i] = i + 1;
                }
                return days;
            }
        });
    },[year,month]);

    const yearWheelHandler = (event) => {
        if(event.deltaY > 0){
            setYear(prevState => {
                if(prevState === parseInt(yearRef.current.lastChild.textContent)){
                    return prevState;
                }else{
                    return prevState + 1;
                }
            });
        }else{
            setYear(prevState => {
                if(prevState === parseInt(yearRef.current.firstChild.textContent)){
                    return prevState;
                }else{
                    return prevState - 1;
                }
            });
        }
    };

    const monthWheelHandler = (event) => {
        if(event.deltaY > 0){
            setMonth(prevState => {
                if(prevState === 12){
                    return prevState;
                }else{
                    return prevState + 1;
                }
            });
        }else{
            setMonth(prevState => {
                if(prevState === 1){
                    return prevState;
                }else{
                    return prevState - 1;
                }
            });
        }
    };

    const dayWheelHandler = (event) => {
        if(event.deltaY > 0){
            setDay(prevState => {
                if(prevState === parseInt(dayRef.current.lastChild.textContent)){
                    return prevState;
                }else{
                    return prevState + 1;
                }
            });
        }else{
            setDay(prevState => {
                if(prevState === 1){
                    return prevState;
                }else{
                    return prevState - 1;
                }
            });
        }
    };

    const confirmHandler = () => {
        props.confirmFn({
            YEAR:year,
            MONTH:month,
            DAY:day
        });
    };

    const setTodayHandler = () => {
        setYear(currentDate.getFullYear());
        setMonth(currentDate.getMonth() + 1);
        setDay(currentDate.getDate());
    };

    const cancelHandler = () => {
        props.cancelFn();
    };

    return createPortal(
        <div className = {classes.backdrop}>
            <div className = {classes.selectContainer}>
                <div className = {classes.selectResult}>2024-05-17</div>
                <div className = {classes.dateList}>
                    <div className = {classes.dateTitle}>
                        <span>年</span>
                        <span>月</span>
                        <span>日</span>
                    </div>
                    <div className = {classes.numberList}>
                        <div onWheel = {yearWheelHandler}>
                            <div className = {classes.shadow}></div>
                            <ul ref = {yearRef} style = {{top:`${((currentDate.getFullYear() - year) - 97) * 20}%`}}>
                                {yearOptions.map(item => <li className = {(item === year) ? classes.selected : ""} key = {item}>{item}</li>)}
                            </ul>
                        </div>
                        <div onWheel = {monthWheelHandler}>
                            <div className = {classes.shadow}></div>
                            <ul ref = {monthRef} style = {{top:`${-(month - 3) * 20}%`}}>
                                {monthOptions.map(item => <li className = {(item === month) ? classes.selected : ""} key = {item}>{`${item < 10 ? "0" : ""}${item}`}</li>)}
                            </ul>
                        </div>
                        <div onWheel = {dayWheelHandler}>
                            <div className = {classes.shadow}></div>
                            <ul ref = {dayRef} style = {{top:`${-(day - 3) * 20}%`}}>
                                {dayOptions.map(item => <li className = {(item === day) ? classes.selected : ""} key = {item}>{`${item < 10 ? "0" : ""}${item}`}</li>)}
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className = {classes.button}>
                    <div onClick = {confirmHandler}>确定</div>
                    <div onClick = {setTodayHandler}>今天</div>
                    <div onClick = {cancelHandler}>取消</div>
                </div>
            </div>
        </div>,backdropDom
    )
};

export default Backdrop;